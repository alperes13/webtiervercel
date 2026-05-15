'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { loginUser, redirectToGoogleOAuth } from '@/lib/api';
import { SignInPage, type Testimonial } from "@/components/ui/sign-in";
import { useState, useEffect, Suspense, startTransition } from 'react';

function LoginPageInner() {
  const { t } = useLanguage();
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  const sampleTestimonials: Testimonial[] = t.auth.testimonials.map((test, index) => ({
    avatarSrc: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`,
    name: test.name,
    handle: `@${test.name.toLowerCase().replace(' ', '_')}`,
    text: test.text
  }));

  const OAUTH_ERRORS: Record<string, string> = {
    oauth_failed: t.auth.oauthErrors.failed,
    oauth_cancelled: t.auth.oauthErrors.cancelled,
    oauth_config: t.auth.oauthErrors.config,
  };

  useEffect(() => {
    const code = searchParams.get('error');
    if (code) {
      startTransition(() => {
        setError(OAUTH_ERRORS[code] ?? t.auth.oauthErrors.generic);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError(t.auth.emailPlaceholder + ' & ' + t.auth.passwordPlaceholder);
      return;
    }

    setError('');
    try {
      const res = await loginUser(email, password);
      login(res.session);
      router.push('/dashboard');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.auth.loginFailedText);
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
      title={<span className="font-light tracking-tighter">{t.auth.loginTitleText}</span>}
      description={t.auth.loginSubtitle}
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      testimonials={sampleTestimonials}
      onSignIn={handleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleCreateAccount}
      submitButtonText={t.auth.loginButtonText}
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
        <div className="animate-element mt-1 bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-xs font-medium text-center">
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
