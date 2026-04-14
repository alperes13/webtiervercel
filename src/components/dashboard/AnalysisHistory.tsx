'use client';

import { useState, useEffect } from 'react';
import { getAnalyses } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ExternalLink, Clock, CheckCircle2, AlertCircle, BarChart3, Search } from 'lucide-react';

const formatTurkishDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

interface Analysis {
  id: string;
  website_url: string;
  analysis_type: 'mini' | 'ultra';
  status: 'pending' | 'completed' | 'failed' | 'processing';
  created_at: string;
  completed_at: string | null;
}

export default function AnalysisHistory() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    async function fetchAnalyses() {
      if (!session?.token) return;
      try {
        const res = await getAnalyses(session.token);
        if (res.success) {
          setAnalyses(res.analyses);
        } else {
          setError('Analizler yüklenemedi');
        }
      } catch (err) {
        setError('Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyses();
  }, [session?.token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <AlertCircle className="h-12 w-12 text-[var(--color-error)] opacity-50" />
        <p className="mt-4 text-[var(--color-text-secondary)]">{error}</p>
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
        <Search className="h-12 w-12 text-[var(--color-text-muted)] opacity-50" />
        <h3 className="mt-4 text-lg font-semibold text-[var(--color-text)]">Henüz analiziniz yok</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-xs">
          Hemen ilk analizinizi başlatarak sitenizin dönüşüm potansiyelini keşfedin.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Geçmiş Analizler</h2>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
          Toplam: {analyses.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {analyses.map((analysis) => (
          <Card key={analysis.id} className="p-3 hover:border-cyan-500/30 transition-colors group border-zinc-200 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${analysis.analysis_type === 'ultra' ? 'bg-cyan-50 text-cyan-600' : 'bg-zinc-50 text-zinc-400'}`}>
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13px] font-bold text-slate-900 break-all truncate max-w-[200px] sm:max-w-md">
                      {analysis.website_url}
                    </h4>
                    <ExternalLink className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-zinc-500 font-medium font-mono uppercase">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTurkishDate(analysis.created_at)}
                    </span>
                    <span className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600">
                      {analysis.analysis_type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {analysis.status === 'completed' ? (
                  <Badge variant="success" className="gap-1 px-2 py-0.5 text-[10px]">
                    <CheckCircle2 className="h-3 w-3" /> Tamamlandı
                  </Badge>
                ) : (
                  <Badge variant="warning" className="gap-1 animate-pulse px-2 py-0.5 text-[10px]">
                    <Clock className="h-3 w-3" /> {analysis.status === 'pending' ? 'Bekliyor' : 'İşleniyor'}
                  </Badge>
                )}
                
                {analysis.status === 'completed' && (
                  <button className="text-[10px] font-black text-cyan-600 hover:text-cyan-700 transition-colors uppercase tracking-widest px-2">
                    Rapor
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
