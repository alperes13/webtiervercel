'use client';

import { useEffect, useState } from 'react';
import { FileText, ExternalLink } from 'lucide-react';

interface UserDocument {
  id: string;
  type: 'file' | 'link';
  name: string;
  url: string;
  file_extension: string | null;
  created_at: string;
}

const STOCK_ANALYSIS_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="12" fill="%23EFF6FF"/><rect x="16" y="52" width="10" height="16" rx="2" fill="%2393C5FD"/><rect x="30" y="40" width="10" height="28" rx="2" fill="%2360A5FA"/><rect x="44" y="30" width="10" height="38" rx="2" fill="%233B82F6"/><rect x="58" y="20" width="10" height="48" rx="2" fill="%231D4ED8"/><polyline points="21,40 35,28 49,22 63,14" stroke="%2393C5FD" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const DRIVE_ICON = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="12" fill="%23F0FDF4"/><path d="M40 16L56 44H24L40 16Z" fill="%2334D399"/><path d="M24 44L16 58H40L48 44H24Z" fill="%2360A5FA"/><path d="M48 44L56 58H64L56 44H48Z" fill="%23FBBF24"/></svg>';

interface Props {
  token: string;
}

export default function UserDocuments({ token }: Props) {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch('/api/user/documents', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => { if (data.success) setDocuments(data.documents); })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-5 h-5 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
      </div>
    );
  }

  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">Dökümanlar & Linkler</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {documents.map(doc => (
          <a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-black/8 overflow-hidden hover:border-black/16 hover:shadow-sm transition-all bg-white"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-slate-50 overflow-hidden">
              <img
                src={doc.type === 'link' ? DRIVE_ICON : STOCK_ANALYSIS_IMAGE}
                alt={doc.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-2.5">
              <div className="flex items-start gap-1.5">
                {doc.type === 'link' ? (
                  <ExternalLink size={11} className="text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <FileText size={11} className="text-blue-500 flex-shrink-0 mt-0.5" />
                )}
                <p className="text-xs font-medium text-[var(--color-text)] leading-tight line-clamp-2">{doc.name}</p>
              </div>
              {doc.file_extension && (
                <span className="mt-1 inline-block px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-semibold text-slate-500 uppercase">
                  {doc.file_extension}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
