import React, { useEffect, useRef } from "react";
import { BookOpen, Shield, Database, RefreshCw } from "lucide-react";

interface LoginScreenProps {
  onLogin: (user: TelegramUser) => void;
  error: string | null;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose callback for Telegram widget
    (window as any).onTelegramAuth = (user: TelegramUser) => {
      onLogin(user);
    };

    // Inject Telegram login widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "studyloginbot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }

    return () => {
      delete (window as any).onTelegramAuth;
    };
  }, [onLogin]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #fafafa 0%, #fff5f5 50%, #f0f4ff 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(229,62,62,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229,62,62,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#E53E3E] via-[#F97316] to-[#1E3A5F]" />

          <div className="p-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#E53E3E] flex items-center justify-center shadow-lg shadow-red-200 mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-black text-[#1a1a2e] tracking-tight">
                Marks Tracker
              </h1>
              <p className="text-gray-400 text-sm mt-1 text-center">
                Chemistry · Physics · Maths
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: Shield, text: "Secure Telegram login — no password needed", color: "text-green-600", bg: "bg-green-50" },
                { icon: Database, text: "Your marks saved in the cloud", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: RefreshCw, text: "Sync across all your devices", color: "text-purple-600", bg: "bg-purple-50" },
              ].map(({ icon: Icon, text, color, bg }) => (
                <div key={text} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <span className="text-sm text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            {/* Telegram widget */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Sign in with
              </p>
              <div ref={containerRef} className="flex justify-center min-h-[48px] items-center" />
              {error && (
                <p className="text-xs text-red-500 text-center bg-red-50 px-4 py-2 rounded-lg">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Your data is private and only accessible by you
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
