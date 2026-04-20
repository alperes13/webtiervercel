'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { registerUser, redirectToGoogleOAuth } from '@/lib/api';
import { SignInPage, type Testimonial } from "@/components/ui/sign-in";
import { useState } from 'react';

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

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      alert('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    try {
      const res = await registerUser(email, password);
      login(res.session);
      alert('Kaydınız başarıyla oluşturuldu! Hoş geldiniz.');
      router.push('/dashboard');
    } catch (e: any) {
      alert(e.message || 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  const handleGoogleSignIn = () => {
    redirectToGoogleOAuth();
  };
  
  const handleResetPassword = () => {
    alert("Şifre sıfırlama özelliği yakında aktif olacaktır. Lütfen destek ile iletişime geçin.");
  };

  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };

  return (
    <SignInPage
      theme="light"
      title={<span className="font-light tracking-tighter">Hesap Oluştur</span>}
      description="Webtier ailesine katılın ve dijital varlığınızı analiz etmeye bugün başlayın."
      heroImageSrc="https://images.unsplash.com/photo-1643101809754-43a91784ebec?w=2160&q=80"
      testimonials={sampleTestimonials}
      onSignIn={handleSignup}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleLoginRedirect}
      submitButtonText="Hesap Oluştur"
    >
      {error && (
        <div className="animate-element mt-1 bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs font-medium text-center">
          {error}
        </div>
      )}
    </SignInPage>
  );
}
