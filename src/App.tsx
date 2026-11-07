/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Check, Users, Star, Play } from 'lucide-react';
import { SyncModal } from './components/SyncModal';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const previewImage = '/assets/aistudio/image_8cbde70f.png';
  const avatarImage = '/assets/logo.webp';
  const ambientBg = '/src/assets/images/campus_driver_ambient_bg_1794069517939.jpg';

  const handleOpenDownload = () => {
    setIsSyncModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 flex flex-col items-center justify-start py-4 sm:py-8 px-3 sm:px-6 overflow-x-hidden selection:bg-[#ff0077] selection:text-white">
      {/* Background Ambient Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src={ambientBg}
          alt=""
          className="w-full h-full object-cover opacity-20 filter blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/95 to-[#07090e]" />
        {/* Subtle glowing radial blooms */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff0077]/10 rounded-full blur-[130px] pointer-events-none" />
      </div>

      {/* MAIN CARD CONTAINER (Replicating exact layout and proportions from screenshots) */}
      <main className="relative z-10 w-full max-w-xl bg-[#0b0e18] border border-slate-800/80 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(255,0,119,0.15)] overflow-hidden">
        
        {/* TOP HAZARD STRIPE BANNER (Exact match to Image 1) */}
        <div className="hazard-stripes py-2.5 px-4 text-center select-none shadow-md">
          <p className="text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase drop-shadow-md flex items-center justify-center gap-1.5 font-mono">
            <span>✨</span>
            <span>EXCLUSIVE CAMPUS DRIVERS DOWNLOAD PORTAL</span>
            <span>✨</span>
          </p>
        </div>

        {/* CARD BODY CONTENT */}
        <div className="p-5 sm:p-8 space-y-6">

          {/* CIRCULAR GLOWING AVATAR BADGE (Exact match to Image 1) */}
          <div className="flex justify-center pt-2">
            <div className="relative group cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
              {/* Glowing Outer Pink Ring */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#ff0077] via-[#ff0055] to-[#ff7700] shadow-[0_0_30px_rgba(255,0,119,0.7)] group-hover:shadow-[0_0_40px_rgba(255,0,119,0.9)] transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
                  <img
                    src={avatarImage}
                    alt="Campus Drivers Official Logo"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Right Checkmark Badge (Exact match to Image 1) */}
              <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#ff0077] text-white flex items-center justify-center border-2 border-[#0b0e18] shadow-[0_0_12px_rgba(255,0,119,0.8)]">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* MAIN HEADLINE & SUBTEXT (Exact match to Image 1) */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold font-serif-display text-white tracking-wider uppercase drop-shadow-lg">
              CAMPUS DRIVERS
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 font-mono tracking-wide">
              Campus Drivers (2024) · Dir. C.S. Quill · 4K UHD Master
            </p>

            {/* FAST OFFLINE MIRROR • AVAILABLE NOW (Exact pill badge match from Image 1) */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061e17] border border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.25)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-pulse" />
                <span className="text-[#00ff9d] font-mono font-bold text-[11px] sm:text-xs tracking-widest uppercase">
                  FAST OFFLINE MIRROR • AVAILABLE NOW
                </span>
              </div>
            </div>
          </div>

          {/* SCENE PREVIEW CARD (Image 1 bottom section) */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl group bg-[#070911]">
            <img
              src={previewImage}
              alt="Campus Driver series still"
              className="w-full aspect-[679/253] object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            {/* Interactive play button overlay */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              aria-label="Play 4K Official Trailer"
              className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
            >
              <div className="w-16 h-16 rounded-full bg-[#ff0077]/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,0,119,0.8)] backdrop-blur-xs transition-transform duration-300 group-hover/btn:scale-110">
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              </div>
            </button>

            {/* Media overlay badge */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-white font-medium">
                S01-S03 Complete Boxset
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px]">
                HEVC HDR10+
              </span>
            </div>
          </div>

          {/* BIG CTA BUTTON (Exact match to Image 2) */}
          <div className="space-y-3 pt-1">
            <button
              onClick={handleOpenDownload}
              className="w-full py-4 sm:py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff0077] via-[#ff0055] to-[#ff6600] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,0,119,0.55)] hover:shadow-[0_0_50px_rgba(255,0,119,0.8)] hover:scale-[1.015] active:scale-[0.985] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Download className="w-6 h-6 stroke-[3]" />
              <span>DOWNLOAD SERIES (4K / 1080P)</span>
            </button>

            {/* Magenta dot subtext line (Exact match to Image 2) */}
            <div className="flex items-center justify-center gap-2 text-[#ff0077] font-mono font-bold text-[11px] sm:text-xs tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff0077] shadow-[0_0_8px_#ff0077] animate-pulse" />
              <span>START HIGH-SPEED MIRRORS DOWNLOAD IMMEDIATELY</span>
            </div>
          </div>

          {/* EASY 3-STEP DIRECT ACCESS CARD (Exact match to Image 2) */}
          <div className="bg-[#080b13] border border-slate-800/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-5">
            <h3 className="text-center text-xs sm:text-[13px] font-extrabold tracking-widest text-[#ff1493] uppercase font-mono">
              EASY 3-STEP DIRECT ACCESS
            </h3>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-[#ff0077] text-[#ff0077] flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_12px_rgba(255,0,119,0.4)] bg-[#0d101d]">
                  1
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
                    CLICK DOWNLOAD BUTTON
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Press the pink CTA button above to load active cloud mirrors.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-[#ff0077] text-[#ff0077] flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_12px_rgba(255,0,119,0.4)] bg-[#0d101d]">
                  2
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
                    SELECT FILE FORMAT AND QUALITY
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Choose your preferred download quality (4K UHD 2160p, Full HD 1080p, or MP4 mobile optimized).
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-[#ff0077] text-[#ff0077] flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_12px_rgba(255,0,119,0.4)] bg-[#0d101d]">
                  3
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
                    DOWNLOAD BEAUTIFUL FULL HD
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Your browser will instantly retrieve the high quality zip packages or individual files.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TWO STATS CARDS (Exact match to Image 2) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Card 1: Active Streams */}
            <div className="bg-[#080b14] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-slate-700/80 transition-colors">
              <Users className="w-6 h-6 text-[#ff0077] mb-2" />
              <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                14,820+
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 font-medium">
                ACTIVE STREAMS TODAY
              </div>
            </div>

            {/* Card 2: Rating */}
            <div className="bg-[#080b14] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-slate-700/80 transition-colors">
              <div className="flex items-center gap-0.5 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-serif-display tracking-tight">
                4.9/5 Rating
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 font-medium">
                USER SATISFACTION
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* POPUP MODAL 1: THE SYNC MODAL (EXACT MATCH TO IMAGE 3) */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      {/* POPUP MODAL 2: VIDEO TEASER PLAYER */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        posterUrl={previewImage}
      />
    </div>
  );
}
