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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">Geçmiş Analizler</h2>
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-bold">
          Toplam: {analyses.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {analyses.map((analysis) => (
          <Card key={analysis.id} className="p-4 hover:border-cyan-500/50 transition-colors group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${analysis.analysis_type === 'ultra' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-[var(--color-surface-light)] text-[var(--color-text-muted)]'}`}>
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[var(--color-text)] break-all truncate max-w-[200px] sm:max-w-md">
                      {analysis.website_url}
                    </h4>
                    <ExternalLink className="h-3 w-3 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTurkishDate(analysis.created_at)}
                    </span>
                    <span className="capitalize px-1.5 py-0.5 rounded bg-[var(--color-surface-light)] font-medium">
                      {analysis.analysis_type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                {analysis.status === 'completed' ? (
                  <Badge variant="success" className="gap-1 px-3 py-1">
                    <CheckCircle2 className="h-3 w-3" /> Tamamlandı
                  </Badge>
                ) : (
                  <Badge variant="warning" className="gap-1 animate-pulse px-3 py-1">
                    <Clock className="h-3 w-3" /> {analysis.status === 'pending' ? 'Bekliyor' : 'İşleniyor'}
                  </Badge>
                )}
                
                {analysis.status === 'completed' && (
                  <button className="text-xs font-bold text-cyan-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                    Raporu Gör
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
