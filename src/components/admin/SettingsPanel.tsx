'use client';

import { useState, useEffect } from 'react';
import { Power, Wrench, Zap, Cpu } from 'lucide-react';

interface Settings {
  maintenance_mode: boolean;
  cro_mini_enabled: boolean;
  cro_ultra_enabled: boolean;
}

interface ToggleItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
  loading: boolean;
  danger?: boolean;
}

function ToggleItem({ icon, title, description, value, onChange, loading, danger }: ToggleItemProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
      danger && value
        ? 'bg-amber-500/5 border-amber-500/20'
        : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
          value
            ? danger ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'
            : 'bg-slate-800 border border-slate-700'
        }`}>
          <span className={value ? (danger ? 'text-amber-400' : 'text-emerald-400') : 'text-slate-500'}>
            {icon}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${value ? (danger ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-700'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          value ? 'translate-x-5' : 'translate-x-0'
        }`} />
      </button>
    </div>
  );
}

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Settings>({
    maintenance_mode: false,
    cro_mini_enabled: true,
    cro_ultra_enabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings', { credentials: 'include' })
      .then(r => r.json())
      .then(data => { if (data.success) setSettings(data.settings); })
      .finally(() => setLoading(false));
  }, []);

  async function updateSetting(key: keyof Settings, value: boolean) {
    setUpdating(key);
    setMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ key, value }),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(prev => ({ ...prev, [key]: value }));
        setMessage(`✓ Ayar güncellendi.`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.error || 'Hata oluştu.');
      }
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12"><div className="w-6 h-6 border-2 border-slate-700 border-t-slate-400 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-1">Site Yönetimi</h3>
        <p className="text-xs text-slate-600">Bu ayarlar tüm kullanıcıları etkiler.</p>
      </div>

      <div className="space-y-3">
        <ToggleItem
          icon={<Wrench size={16} />}
          title="Bakım Modu"
          description="/adminpanel dışındaki tüm sayfalar bakım sayfasına yönlendirilir."
          value={settings.maintenance_mode}
          onChange={v => updateSetting('maintenance_mode', v)}
          loading={updating === 'maintenance_mode'}
          danger
        />

        <div className="pt-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">CRO-X AI Kontrolü</p>
          <div className="space-y-3">
            <ToggleItem
              icon={<Cpu size={16} />}
              title="CRO-X MINI"
              description="Mini analiz inputunu aktif/pasif yap. Kapalıyken 'Bakımda' rozeti görünür."
              value={settings.cro_mini_enabled}
              onChange={v => updateSetting('cro_mini_enabled', v)}
              loading={updating === 'cro_mini_enabled'}
            />
            <ToggleItem
              icon={<Zap size={16} />}
              title="CRO-X ULTRA"
              description="Ultra analiz inputunu aktif/pasif yap. Kapalıyken 'Bakımda' rozeti görünür."
              value={settings.cro_ultra_enabled}
              onChange={v => updateSetting('cro_ultra_enabled', v)}
              loading={updating === 'cro_ultra_enabled'}
            />
          </div>
        </div>
      </div>

      {message && (
        <p className={`text-sm ${message.startsWith('✓') ? 'text-emerald-400' : 'text-red-400'}`}>{message}</p>
      )}

      {settings.maintenance_mode && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-400">
            <Power size={14} />
            <p className="text-sm font-medium">Bakım modu aktif</p>
          </div>
          <p className="text-xs text-amber-400/70 mt-1">
            Tüm ziyaretçiler bakım sayfasına yönlendiriliyor. Admin paneline erişim açık.
          </p>
        </div>
      )}
    </div>
  );
}
