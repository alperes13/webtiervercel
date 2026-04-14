'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, redirectToGoogleOAuth } from '@/lib/api';
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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      alert('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    try {
      const res = await loginUser(email, password);
      login(res.session);
      router.push('/dashboard');
    } catch (e: any) {
      alert(e.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  const handleGoogleSignIn = () => {
    redirectToGoogleOAuth();
  };
  
  const handleResetPassword = () => {
    alert("Şifre sıfırlama özelliği yakında aktif olacaktır. Lütfen destek ile iletişime geçin.");
  };

  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };

  return (
    <SignInPage
      title={<span className="font-light text-[var(--color-text)] tracking-tighter">Tekrar Hoş Geldiniz</span>}
      description="Hesabınıza erişin ve dijital dönüşüm yolculuğunuza devam edin."
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      testimonials={sampleTestimonials}
      onSignIn={handleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleCreateAccount}
      submitButtonText="Giriş Yap"
    />
  );
}
