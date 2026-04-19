'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, redirectToGoogleOAuth } from '@/lib/api';
import { SignInPage, type Testimonial } from "@/components/ui/sign-in";
import { useState, useEffect, Suspense } from 'react';

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Mükemmel bir platform! Kullanıcı deneyimi sorunsuz ve özellikler tam ihtiyacım olan şey."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "Bu servis çalışma şeklimi değiştirdi. Temiz tasarım, güçlü özellikler ve mükemmel destek."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "Birçok platform denedim ama bu gerçekten öne çıkıyor. Sezgisel, güvenilir ve üretkenlik için gerçekten yardımcı."
  },
];

const OAUTH_ERRORS: Record<string, string> = {
  oauth_failed: 'Google ile giriş başarısız oldu. Lütfen tekrar deneyin.',
  oauth_cancelled: 'Google girişi iptal edildi.',
  oauth_config: 'Sunucu yapılandırma hatası. Lütfen daha sonra tekrar deneyin.',
};

function LoginPageInner() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('error');
    if (code) {
      setError(OAUTH_ERRORS[code] ?? 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    setError('');
    try {
      const res = await loginUser(email, password);
      login(res.session);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  const handleGoogleSignIn = () => {
    redirectToGoogleOAuth();
  };
  
  const handleResetPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };

  return (
    <SignInPage
      theme="light"
      title={<span className="font-light tracking-tighter">Tekrar Hoş Geldiniz</span>}
      description="Hesabınıza erişin ve dijital dönüşüm yolculuğunuza devam edin."
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      testimonials={sampleTestimonials}
      onSignIn={handleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleCreateAccount}
      submitButtonText="Giriş Yap"
    >
      {error && (
        <div className="animate-element mt-1 bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs font-medium text-center">
          {error}
        </div>
      )}
    </SignInPage>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
