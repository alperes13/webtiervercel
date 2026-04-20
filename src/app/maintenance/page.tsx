import Link from 'next/link';

export const metadata = {
  title: 'Bakım Çalışması | Webtier',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.1"/>
              <path d="M8 16L13 11L18 16L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 21L13 16L18 21L23 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
            </svg>
          </div>
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase">Bakım Modu</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Kısa Süreliğine Bakımdayız
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          Webtier platformunu sizin için daha iyi hale getirmek amacıyla bakım çalışması yapıyoruz.
          Kısa süre içinde geri döneceğiz.
        </p>

        {/* Info card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-1">Anlık bildirim almak ister misiniz?</p>
              <p className="text-xs text-slate-400">
                Sistem tekrar aktif olduğunda bildirim almak için{' '}
                <a href="mailto:info@webtier.com.tr" className="text-blue-400 hover:underline">
                  info@webtier.com.tr
                </a>{' '}
                adresine e-posta gönderebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} Webtier &mdash;{' '}
          <Link href="/adminpanel" className="hover:text-slate-500 transition-colors">
            Yönetici Girişi
          </Link>
        </p>
      </div>
    </div>
  );
}
