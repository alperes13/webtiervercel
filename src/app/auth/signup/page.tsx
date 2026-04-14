'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { registerUser, redirectToGoogleOAuth } from '@/lib/api';
import { SignInPage, type Testimonial } from "@/components/ui/sign-in";
import { useState } from 'react';

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
