'use client';

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: string;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  submitButtonText?: string;
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--foreground)]/5 backdrop-blur-sm transition-colors focus-within:border-[#a78bfa] focus-within:bg-[#a78bfa]/10">
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={cn("animate-testimonial flex items-start gap-3 rounded-3xl bg-[var(--color-surface-card)]/40 backdrop-blur-xl border border-white/10 p-5 w-64", delay)}>
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium text-[var(--color-text)]">{testimonial.name}</p>
      <p className="text-[var(--color-text-muted)]">{testimonial.handle}</p>
      <p className="mt-1 text-[var(--color-text-secondary)]">{testimonial.text}</p>
    </div>
  </div>
);

export const SignInPage: React.FC<SignInPageProps> = ({
  title = <span className="font-light text-[var(--color-text)] tracking-tighter">Welcome</span>,
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
  submitButtonText = "Sign In",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-[var(--color-background)] overflow-x-hidden">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8 bg-[var(--color-background)]">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight text-[var(--color-text)]">{title}</h1>
            <p className="animate-element animate-delay-200 text-[var(--color-text-secondary)]">{description}</p>
            
            <form className="space-y-5" onSubmit={onSignIn}>
              <div className="animate-element animate-delay-300">
                <label className="text-sm font-medium text-[var(--color-text-muted)]">Email Adresi</label>
                <GlassInputWrapper>
                  <input name="email" type="email" placeholder="E-posta adresinizi girin" required className="w-full bg-transparent text-sm p-4 rounded-2xl outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50" />
                </GlassInputWrapper>
              </div>
              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-[var(--color-text-muted)]">Şifre</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Şifrenizi girin"
                      required
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 cursor-pointer">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="rememberMe" className="custom-checkbox" />
                    <span className="text-[var(--color-text-secondary)]">Oturumu açık tut</span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onResetPassword?.();
                  }}
                  className="hover:underline text-[#a78bfa] transition-colors"
                >
                  Şifremi unuttum
                </button>
              </div>

              <button
                type="submit"
                className="animate-element animate-delay-600 w-full rounded-2xl bg-[#a78bfa] py-4 font-bold text-white hover:bg-[#9061f9] transition-all transform hover:scale-[0.99] active:scale-[0.97]"
              >
                {submitButtonText}
              </button>
            </form>

            <div className="animate-element animate-delay-700 relative flex items-center justify-center">
              <span className="w-full border-t border-[var(--color-border)]" />
              <span className="px-4 text-sm text-[var(--color-text-muted)] bg-[var(--color-background)] absolute">veya şununla devam et</span>
            </div>

            <button
              type="button"
              onClick={onGoogleSignIn}
              className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-[var(--color-border)] rounded-2xl py-4 hover:bg-[var(--color-surface-light)] transition-colors text-[var(--color-text)]"
            >
              <GoogleIcon />
              Google ile devam et
            </button>

            <p className="animate-element animate-delay-900 text-center text-sm text-[var(--color-text-muted)]">
              {submitButtonText === "Giriş Yap" ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onCreateAccount?.();
                }}
                className="text-[#a78bfa] font-bold hover:underline transition-colors ml-1"
              >
                {submitButtonText === "Giriş Yap" ? "Hesap Oluştur" : "Giriş Yap"}
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:flex flex-1 relative overflow-hidden bg-zinc-950 min-h-screen">
          <img src={heroImageSrc} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          
          <div className="relative z-10 w-full h-full flex flex-col justify-end p-12 gap-8">
            {testimonials.length > 0 && (
              <div className="flex flex-wrap gap-4 overflow-hidden">
                {testimonials.map((t, i) => (
                  <TestimonialCard key={i} testimonial={t} delay={`animate-delay-${(i + 1) * 200}`} />
                ))}
              </div>
            )}
            
            <div className="animate-element animate-delay-1000 flex items-center gap-4 text-white/40">
              <div className="h-px flex-1 bg-white/10" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">10,000+ KULLANICI TARAFINDAN GÜVENİLİR</p>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </section>
      )}

      {/* Styles for custom checkbox and animations */}
      <style jsx>{`
        .custom-checkbox {
          appearance: none;
          width: 1.15rem;
          height: 1.15rem;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }
        .custom-checkbox:checked {
          background: #a78bfa;
          border-color: #a78bfa;
        }
        .custom-checkbox:checked::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0.35rem;
          height: 0.6rem;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: translate(-50%, -60%) rotate(45deg);
        }
        
        .animate-element {
          opacity: 0;
          transform: translateY(20px);
          animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-500 { animation-delay: 0.5s; }
        .animate-delay-600 { animation-delay: 0.6s; }
        .animate-delay-700 { animation-delay: 0.7s; }
        .animate-delay-800 { animation-delay: 0.8s; }
        .animate-delay-900 { animation-delay: 0.9s; }
        .animate-delay-1000 { animation-delay: 1s; }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-testimonial {
          opacity: 0;
          transform: scale(0.95) translateY(20px);
          animation: testimonialIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes testimonialIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};
