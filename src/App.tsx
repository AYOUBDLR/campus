/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Download, Check, Users, Star, Play, Sparkles, Film, ArrowRight, LayoutGrid, CheckCircle2, Search, X } from 'lucide-react';
import { SyncModal } from './components/SyncModal';
import { VideoModal } from './components/VideoModal';

type ActiveRelease = 'campus-drivers' | 'south-park' | 'both';

export default function App() {
  const [activeRelease, setActiveRelease] = useState<ActiveRelease>('campus-drivers');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [syncRedirectUrl, setSyncRedirectUrl] = useState('https://apptrck.net/cl/i/d23gr7');
  const [videoModalData, setVideoModalData] = useState({
    title: 'CAMPUS DRIVERS: SUPERCHARGED',
    seriesName: 'CAMPUS DRIVERS',
    posterUrl: '/assets/aistudio/image_8cbde70f.png',
    description: 'Four college drivers. A vintage muscle car fleet. High speed campus rides and the rules of love on the road.',
  });

  const campusDriverPreview = '/assets/aistudio/image_8cbde70f.png';
  const campusDriverLogo = '/assets/logo.webp';
  const southParkPreview = '/assets/south_park_preview.png';
  const southParkAvatar = '/assets/south_park_avatar.png';
  const ambientBg = '/src/assets/images/campus_driver_ambient_bg_1794069517939.jpg';

  const isSearching = searchQuery.trim().length > 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesCampusDrivers = useMemo(() => {
    if (!isSearching) return true;
    return ['campus', 'driver', 'drivers', 'lane', 'lois', 'car', 'supercharged'].some((k) =>
      normalizedQuery.includes(k)
    ) || 'campus drivers'.includes(normalizedQuery);
  }, [isSearching, normalizedQuery]);

  const matchesSouthPark = useMemo(() => {
    if (!isSearching) return true;
    return ['south', 'park', 'cartman', 'kyle', 'stan', 'kenny', 'comedy', 'animation'].some((k) =>
      normalizedQuery.includes(k)
    ) || 'south park'.includes(normalizedQuery);
  }, [isSearching, normalizedQuery]);

  const isCustomMovie = isSearching && !matchesCampusDrivers && !matchesSouthPark;

  const handleOpenDownload = (series: string) => {
    if (series === 'south-park') {
      setSyncRedirectUrl('https://apptrck.net/cl/i/5nlp41');
    } else {
      setSyncRedirectUrl('https://apptrck.net/cl/i/d23gr7');
    }
    setIsSyncModalOpen(true);
  };

  const handleOpenVideo = (series: string) => {
    if (series === 'campus-drivers') {
      setVideoModalData({
        title: 'CAMPUS DRIVERS: SUPERCHARGED',
        seriesName: 'CAMPUS DRIVERS',
        posterUrl: campusDriverPreview,
        description: 'Four college drivers. A vintage muscle car fleet. High speed campus rides and the rules of love on the road.',
      });
    } else if (series === 'south-park') {
      setVideoModalData({
        title: 'SOUTH PARK: THE STREAMING WARS & COMPLETE SEASONS',
        seriesName: 'SOUTH PARK',
        posterUrl: southParkPreview,
        description: 'Join Stan, Kyle, Cartman, and Kenny in the quiet mountain town of South Park. Full HD uncensored specials and episodes.',
      });
    } else {
      setVideoModalData({
        title: `${searchQuery.toUpperCase()} — 4K UHD MASTER`,
        seriesName: searchQuery.toUpperCase(),
        posterUrl: campusDriverPreview,
        description: `High-definition master preview for ${searchQuery}. Full media packages with dual audio and subtitle tracks.`,
      });
    }
    setIsVideoModalOpen(true);
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
        {/* Glowing radial blooms */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#ff0077]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-[#ff6600]/8 rounded-full blur-[130px] pointer-events-none" />
      </div>

      {/* SEARCH MOVIE OR SERIES BAR */}
      <div className="relative z-20 w-full max-w-xl mb-4">
        <div className="relative flex items-center bg-[#0b0e18]/95 border border-slate-800 rounded-2xl shadow-xl transition-all duration-300 focus-within:border-[#ff0077] focus-within:shadow-[0_0_25px_rgba(255,0,119,0.35)] overflow-hidden">
          <div className="pl-4 pr-2 text-slate-400">
            <Search className="w-4 h-4 text-[#ff0077]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie..."
            className="w-full bg-transparent py-3 pr-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-hidden font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* TOP RELEASE SWITCHER TABS (Clean & neat portal navigation) */}
      {!isSearching && (
        <div className="relative z-20 w-full max-w-xl mb-4 sm:mb-5">
          <div className="p-1.5 bg-[#0b0e18]/90 border border-slate-800/80 rounded-2xl backdrop-blur-md shadow-xl flex items-center justify-between gap-1.5">
            <button
              onClick={() => setActiveRelease('campus-drivers')}
              className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl text-xs sm:text-[13px] font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeRelease === 'campus-drivers'
                  ? 'bg-gradient-to-r from-[#ff0077] to-[#ff5500] text-white shadow-[0_0_20px_rgba(255,0,119,0.45)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>🚗</span>
              <span className="truncate">Campus Drivers</span>
              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-black/30 font-sans hidden sm:inline">4K UHD</span>
            </button>

            <button
              onClick={() => setActiveRelease('south-park')}
              className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl text-xs sm:text-[13px] font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeRelease === 'south-park'
                  ? 'bg-gradient-to-r from-[#ff0077] to-[#ff5500] text-white shadow-[0_0_20px_rgba(255,0,119,0.45)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>🏔️</span>
              <span className="truncate">South Park</span>
              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-black/30 font-sans hidden sm:inline">Full HD</span>
            </button>

            <button
              onClick={() => setActiveRelease(activeRelease === 'both' ? 'campus-drivers' : 'both')}
              title="View both releases side by side"
              className={`py-2 sm:py-2.5 px-3 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeRelease === 'both'
                  ? 'bg-gradient-to-r from-[#ff0077] to-[#ff5500] text-white shadow-[0_0_20px_rgba(255,0,119,0.45)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Both</span>
            </button>
          </div>
        </div>
      )}

      {/* SEARCH ACTIVE NOTICE */}
      {isSearching && (
        <div className="relative z-20 w-full max-w-xl mb-4 flex items-center justify-between text-xs font-mono px-2 text-slate-400">
          <span>Search Results for: <strong className="text-white">"{searchQuery}"</strong></span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-[#ff0077] hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* RELEASES CONTAINER (Single or Dual Grid) */}
      <div className={`relative z-10 w-full ${!isSearching && activeRelease === 'both' ? 'max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6' : 'max-w-xl'}`}>

        {/* ======================================================== */}
        {/* RELEASE 1: CAMPUS DRIVERS CARD (100% Faithful to Image 1 & 2) */}
        {/* ======================================================== */}
        {((!isSearching && (activeRelease === 'campus-drivers' || activeRelease === 'both')) || (isSearching && matchesCampusDrivers)) && (
          <main className="w-full bg-[#0b0e18] border border-slate-800/80 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(255,0,119,0.15)] overflow-hidden">
            {/* TOP HAZARD STRIPE BANNER */}
            <div className="hazard-stripes py-2.5 px-4 text-center select-none shadow-md">
              <p className="text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase drop-shadow-md flex items-center justify-center gap-1.5 font-mono">
                <span>✨</span>
                <span>EXCLUSIVE CAMPUS DRIVERS DOWNLOAD PORTAL</span>
                <span>✨</span>
              </p>
            </div>

            {/* CARD BODY CONTENT */}
            <div className="p-5 sm:p-8 space-y-6">

              {/* CIRCULAR GLOWING AVATAR BADGE */}
              <div className="flex justify-center pt-2">
                <div className="relative group cursor-pointer" onClick={() => handleOpenVideo('campus-drivers')}>
                  {/* Glowing Outer Pink Ring */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#ff0077] via-[#ff0055] to-[#ff7700] shadow-[0_0_30px_rgba(255,0,119,0.7)] group-hover:shadow-[0_0_40px_rgba(255,0,119,0.9)] transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
                      <img
                        src={campusDriverLogo}
                        alt="Campus Drivers Official Logo"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Bottom Right Checkmark Badge */}
                  <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#ff0077] text-white flex items-center justify-center border-2 border-[#0b0e18] shadow-[0_0_12px_rgba(255,0,119,0.8)]">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* MAIN HEADLINE & SUBTEXT */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold font-serif-display text-white tracking-wider uppercase drop-shadow-lg">
                  CAMPUS DRIVERS
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-300 font-mono tracking-wide">
                  Campus Drivers (2024) · Dir. C.S. Quill · 4K UHD Master
                </p>

                {/* FAST OFFLINE MIRROR • AVAILABLE NOW */}
                <div className="pt-2 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061e17] border border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.25)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-pulse" />
                    <span className="text-[#00ff9d] font-mono font-bold text-[11px] sm:text-xs tracking-widest uppercase">
                      FAST OFFLINE MIRROR • AVAILABLE NOW
                    </span>
                  </div>
                </div>
              </div>

              {/* SCENE PREVIEW CARD */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl group bg-[#070911]">
                <img
                  src={campusDriverPreview}
                  alt="Campus Driver series still"
                  className="w-full aspect-[679/253] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                {/* Interactive play button overlay */}
                <button
                  onClick={() => handleOpenVideo('campus-drivers')}
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

              {/* BIG CTA BUTTON */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={() => handleOpenDownload('campus-drivers')}
                  className="w-full py-4 sm:py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff0077] via-[#ff0055] to-[#ff6600] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,0,119,0.55)] hover:shadow-[0_0_50px_rgba(255,0,119,0.8)] hover:scale-[1.015] active:scale-[0.985] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Download className="w-6 h-6 stroke-[3]" />
                  <span>DOWNLOAD SERIES (4K / 1080P)</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[#ff0077] font-mono font-bold text-[11px] sm:text-xs tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#ff0077] shadow-[0_0_8px_#ff0077] animate-pulse" />
                  <span>START HIGH-SPEED MIRRORS DOWNLOAD IMMEDIATELY</span>
                </div>
              </div>

              {/* EASY 3-STEP DIRECT ACCESS CARD */}
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

              {/* TWO STATS CARDS */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#080b14] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-slate-700/80 transition-colors">
                  <Users className="w-6 h-6 text-[#ff0077] mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    14,820+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 font-medium">
                    ACTIVE STREAMS TODAY
                  </div>
                </div>

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
        )}

        {/* ======================================================== */}
        {/* RELEASE 2: SOUTH PARK CARD (100% Faithful to image_e6a65502) */}
        {/* ======================================================== */}
        {((!isSearching && (activeRelease === 'south-park' || activeRelease === 'both')) || (isSearching && matchesSouthPark)) && (
          <main className="w-full bg-[#0b0e18] border border-slate-800/80 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(255,0,119,0.15)] overflow-hidden">
            {/* TOP HAZARD STRIPE BANNER */}
            <div className="hazard-stripes py-2.5 px-4 text-center select-none shadow-md">
              <p className="text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase drop-shadow-md flex items-center justify-center gap-1.5 font-mono">
                <span>✨</span>
                <span>EXCLUSIVE SOUTH PARK DOWNLOAD PORTAL</span>
                <span>✨</span>
              </p>
            </div>

            {/* CARD BODY CONTENT */}
            <div className="p-5 sm:p-8 space-y-6">

              {/* CIRCULAR GLOWING AVATAR BADGE */}
              <div className="flex justify-center pt-2">
                <div className="relative group cursor-pointer" onClick={() => handleOpenVideo('south-park')}>
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#ff0077] via-[#ff0055] to-[#ff7700] shadow-[0_0_30px_rgba(255,0,119,0.7)] group-hover:shadow-[0_0_40px_rgba(255,0,119,0.9)] transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
                      <img
                        src={southParkAvatar}
                        alt="South Park Official Badge"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Bottom Right Checkmark Badge */}
                  <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#ff0077] text-white flex items-center justify-center border-2 border-[#0b0e18] shadow-[0_0_12px_rgba(255,0,119,0.8)]">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* SOUTH PARK PREVIEW MEDIA CARD (Exact layout from image_e6a65502.png) */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl group bg-[#070911]">
                <img
                  src={southParkPreview}
                  alt="South Park scene preview"
                  className="w-full aspect-[500/280] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Central Vivid Pink Play Button (Exact match from image_e6a65502) */}
                <button
                  onClick={() => handleOpenVideo('south-park')}
                  aria-label="Play South Park preview"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer group/btn"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff0077] text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,0,119,0.9)] transition-transform duration-300 group-hover/btn:scale-110">
                    <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
                  </div>

                  {/* PLAY EPISODE PREVIEW Pill Button (Exact match from image_e6a65502) */}
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#ff0077] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-slate-100 transition-colors">
                    <Film className="w-3.5 h-3.5" />
                    <span>PLAY EPISODE PREVIEW</span>
                  </div>
                </button>
              </div>

              {/* HEADLINE & SUBTEXT (Exact text & styling from image_e6a65502.png) */}
              <div className="text-center space-y-2.5">
                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold font-serif-display text-white tracking-wide uppercase drop-shadow-lg">
                  DOWNLOAD SOUTH PARK IN FULL HD
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-md mx-auto">
                  Get high-speed offline mirror access to the complete South Park specials and episodes.{' '}
                  <span className="text-[#ff0077] font-semibold">100% Free & Fast</span>. Starts instantly.
                </p>

                {/* FAST OFFLINE MIRROR • AVAILABLE NOW */}
                <div className="pt-1 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061e17] border border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.25)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-pulse" />
                    <span className="text-[#00ff9d] font-mono font-bold text-[11px] sm:text-xs tracking-widest uppercase">
                      FAST OFFLINE MIRROR • AVAILABLE NOW
                    </span>
                  </div>
                </div>
              </div>

              {/* BIG CTA BUTTON (Exact match to image_e6a65502.png) */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={() => handleOpenDownload('south-park')}
                  className="w-full py-4 sm:py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff0077] via-[#ff0055] to-[#ff6600] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,0,119,0.55)] hover:shadow-[0_0_50px_rgba(255,0,119,0.8)] hover:scale-[1.015] active:scale-[0.985] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Download className="w-6 h-6 stroke-[3]" />
                  <span>DOWNLOAD SOUTH PARK</span>
                </button>

                {/* Dot subtext line (Exact match from image_e6a65502) */}
                <div className="flex items-center justify-center gap-2 text-[#ff0077] font-mono font-bold text-[11px] sm:text-xs tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#ff0077] shadow-[0_0_8px_#ff0077] animate-pulse" />
                  <span>START HIGH-SPEED DOWNLOAD INSTANTLY</span>
                </div>
              </div>

              {/* EASY 3-STEP DIRECT ACCESS CARD */}
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
                        CLICK DOWNLOAD SOUTH PARK
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Press the orange-pink CTA button above to load active cloud mirrors.
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
                        SELECT SEASONS & SPECIALS
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Choose between Season 1–26 boxsets, Post Covid, or The Streaming Wars specials in 1080p.
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

              {/* TWO STATS CARDS */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#080b14] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-slate-700/80 transition-colors">
                  <Users className="w-6 h-6 text-[#ff0077] mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    28,450+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 font-medium">
                    ACTIVE STREAMS TODAY
                  </div>
                </div>

                <div className="bg-[#080b14] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-slate-700/80 transition-colors">
                  <div className="flex items-center gap-0.5 text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-serif-display tracking-tight">
                    4.95/5 Rating
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 font-medium">
                    USER SATISFACTION
                  </div>
                </div>
              </div>

            </div>
          </main>
        )}

        {/* ======================================================== */}
        {/* RELEASE 3: DYNAMIC SEARCHED MOVIE CARD */}
        {/* ======================================================== */}
        {isCustomMovie && (
          <main className="w-full bg-[#0b0e18] border border-slate-800/80 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(255,0,119,0.15)] overflow-hidden">
            {/* TOP HAZARD STRIPE BANNER */}
            <div className="hazard-stripes py-2.5 px-4 text-center select-none shadow-md">
              <p className="text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase drop-shadow-md flex items-center justify-center gap-1.5 font-mono">
                <span>✨</span>
                <span>EXCLUSIVE {searchQuery.toUpperCase()} DOWNLOAD PORTAL</span>
                <span>✨</span>
              </p>
            </div>

            {/* CARD BODY CONTENT */}
            <div className="p-5 sm:p-8 space-y-6">

              {/* CIRCULAR GLOWING AVATAR BADGE */}
              <div className="flex justify-center pt-2">
                <div className="relative group cursor-pointer" onClick={() => handleOpenVideo(searchQuery)}>
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#ff0077] via-[#ff0055] to-[#ff7700] shadow-[0_0_30px_rgba(255,0,119,0.7)] group-hover:shadow-[0_0_40px_rgba(255,0,119,0.9)] transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-br from-[#121626] to-[#070911] flex flex-col items-center justify-center text-center p-2">
                      <Film className="w-8 h-8 text-[#ff0077] mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold font-mono tracking-wider text-white uppercase truncate max-w-[80px]">
                        {searchQuery}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Right Checkmark Badge */}
                  <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#ff0077] text-white flex items-center justify-center border-2 border-[#0b0e18] shadow-[0_0_12px_rgba(255,0,119,0.8)]">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* HEADLINE & SUBTEXT */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold font-serif-display text-white tracking-wider uppercase drop-shadow-lg">
                  {searchQuery}
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 font-mono tracking-wide">
                  {searchQuery} · High-Speed CDN Mirror · 4K UHD Master
                </p>

                {/* FAST OFFLINE MIRROR • AVAILABLE NOW */}
                <div className="pt-2 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061e17] border border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.25)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-pulse" />
                    <span className="text-[#00ff9d] font-mono font-bold text-[11px] sm:text-xs tracking-widest uppercase">
                      FAST OFFLINE MIRROR • AVAILABLE NOW
                    </span>
                  </div>
                </div>
              </div>

              {/* SCENE PREVIEW CARD */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl group bg-[#070911]">
                <img
                  src={ambientBg}
                  alt={`${searchQuery} preview`}
                  className="w-full aspect-[16/9] object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Center Title & Play Button Overlay */}
                <button
                  onClick={() => handleOpenVideo(searchQuery)}
                  aria-label={`Play preview for ${searchQuery}`}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <div className="w-16 h-16 rounded-full bg-[#ff0077]/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,0,119,0.8)] backdrop-blur-xs transition-transform duration-300 group-hover/btn:scale-110">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/10">
                    PLAY 4K PREVIEW
                  </span>
                </button>

                {/* Media overlay badge */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-white font-medium">
                    Complete Master Package
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px]">
                    2160p HDR10+
                  </span>
                </div>
              </div>

              {/* BIG CTA BUTTON */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={() => handleOpenDownload(searchQuery)}
                  className="w-full py-4 sm:py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff0077] via-[#ff0055] to-[#ff6600] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,0,119,0.55)] hover:shadow-[0_0_50px_rgba(255,0,119,0.8)] hover:scale-[1.015] active:scale-[0.985] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Download className="w-6 h-6 stroke-[3]" />
                  <span className="truncate">DOWNLOAD {searchQuery.toUpperCase()} (4K / 1080P)</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[#ff0077] font-mono font-bold text-[11px] sm:text-xs tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#ff0077] shadow-[0_0_8px_#ff0077] animate-pulse" />
                  <span>START HIGH-SPEED MIRRORS DOWNLOAD IMMEDIATELY</span>
                </div>
              </div>

              {/* EASY 3-STEP DIRECT ACCESS CARD */}
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

              {/* TWO STATS CARDS */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#080b14] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-slate-700/80 transition-colors">
                  <Users className="w-6 h-6 text-[#ff0077] mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    19,420+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 font-medium">
                    ACTIVE STREAMS TODAY
                  </div>
                </div>

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
        )}

      </div>

      {/* FOOTER NOTICE */}
      <div className="relative z-10 pt-6 text-center space-y-1.5 text-slate-500 text-[11px] font-mono">
        <p>Verified High-Speed Cloud Mirror Network · TLS 1.3 End-to-End Secure</p>
        <p className="text-slate-600">All media packages verified with SHA-256 hashes and high-bandwidth caching nodes.</p>
      </div>

      {/* POPUP MODAL 1: THE SYNC MODAL (MATCHES IMAGE 3 100%) */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        redirectUrl={syncRedirectUrl}
      />

      {/* POPUP MODAL 2: VIDEO TEASER PLAYER */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        posterUrl={videoModalData.posterUrl}
        title={videoModalData.title}
        seriesName={videoModalData.seriesName}
        description={videoModalData.description}
      />
    </div>
  );
}
