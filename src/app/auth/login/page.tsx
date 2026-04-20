'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, redirectToGoogleOAuth } from '@/lib/api';
import { SignInPage, type Testimonial } from "@/components/ui/sign-in";
import { useState, useEffect, Suspense } from 'react';

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Burak Yılmaz",
    handle: "@burak_ecommerce",
    text: "CRO-X Ultra analizi sonrası sepet terk oranımız %40 düştü. İnanılmaz sonuçlar."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Ayşe Kaya",
    handle: "@aysekaya_design",
    text: "Webtier ile sitemiz sadece güzel değil, aynı zamanda gerçek bir satış makinesi haline geldi."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Can Demir",
    handle: "@candemir_saas",
    text: "A/B testleri sayesinde lead kazanım maliyetimizi tam yarıya indirmeyi başardık."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Merve Aras",
    handle: "@mervepazarlama",
    text: "Dönüşüm odaklı tasarım yaklaşımı gerçekten fark yaratıyor. Teşekkürler Webtier!"
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Emre Koç",
    handle: "@emrekoc_agency",
    text: "Müşterilerimize artık Webtier Retrainer ile sürdürülebilir büyüme vaat edebiliyoruz."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Selin Deniz",
    handle: "@selindeniz_corp",
    text: "Kurumsal sitemiz artık sadece bir kartvizit değil, gerçek bir lead jeneratörü."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Kerem Öztürk",
    handle: "@keremozturk_vc",
    text: "Dönüşüm oranlarındaki artış doğrudan ROI'mize yansıdı. Her kuruşuna kesinlikle değer."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Deniz Yıldız",
    handle: "@denizyildiz_shop",
    text: "Shopify optimizasyonları sonrası sayfa hızımız ve dönüşümümüz inanılmaz arttı."
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
