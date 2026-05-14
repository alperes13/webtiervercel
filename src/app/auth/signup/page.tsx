'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { registerUser, redirectToGoogleOAuth } from '@/lib/api';
import { SignInPage, type Testimonial } from "@/components/ui/sign-in";
import { useState } from 'react';

export default function SignupPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const sampleTestimonials: Testimonial[] = t.auth.testimonials.map((test, index) => ({
    avatarSrc: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`,
    name: test.name,
    handle: `@${test.name.toLowerCase().replace(' ', '_')}`,
    text: test.text
  }));

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      alert(t.auth.emailPlaceholder + ' & ' + t.auth.passwordPlaceholder);
      return;
    }

    try {
      const res = await registerUser(email, password);
      login(res.session);
      alert(t.auth.welcomeMessage);
      router.push('/dashboard');
    } catch (e: any) {
      alert(e.message || t.auth.signupFailedText);
    }
  };

  const handleGoogleSignIn = () => {
    redirectToGoogleOAuth();
  };
  
  const handleResetPassword = () => {
    alert(t.auth.resetPasswordSoonText);
  };

  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };

  return (
    <SignInPage
      theme="light"
      title={<span className="font-light tracking-tighter">{t.auth.signupTitle}</span>}
      description={t.auth.signupSubtitle}
      heroImageSrc="https://images.unsplash.com/photo-1643101809754-43a91784ebec?w=2160&q=80"
      testimonials={sampleTestimonials}
      onSignIn={handleSignup}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleLoginRedirect}
      submitButtonText={t.auth.signupButtonText}
      emailLabel={t.auth.emailLabel}
      passwordLabel={t.auth.passwordLabel}
      emailPlaceholder={t.auth.emailPlaceholder}
      passwordPlaceholder={t.auth.passwordPlaceholder}
      rememberMeLabel={t.auth.rememberMe}
      forgotPasswordLabel={t.auth.forgotPassword}
      orContinueWithLabel={t.auth.orContinueWith}
      googleContinueLabel={t.auth.googleContinue}
      noAccountLabel={t.auth.noAccountYet}
      alreadyMemberLabel={t.auth.alreadyHaveAccount}
      createAccountButtonLabel={t.auth.signupButtonText}
      loginRedirectButtonLabel={t.auth.loginButtonText}
      trustedByLabel={t.auth.trustedBy}
    >
      {error && (
        <div className="animate-element mt-1 bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs font-medium text-center">
          {error}
        </div>
      )}
    </SignInPage>
  );
}
