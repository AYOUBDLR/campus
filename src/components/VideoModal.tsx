import React, { useState } from 'react';
import { X, Play, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterUrl: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, posterUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-md" />

      <div className="relative z-10 w-full max-w-3xl bg-[#090c14] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-[#0d101a]">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#ff0077]" />
            <span className="text-xs sm:text-sm font-bold text-white font-mono">
              CAMPUS DRIVER — 4K UHD OFFICIAL TEASER
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Canvas / Simulation */}
        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
          <img
            src={posterUrl}
            alt="Campus Driver Trailer Preview"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Cinematic overlay banner */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ff0077]/80 text-[11px] font-mono font-bold tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>ULTRA HD 2160P MASTER PREVIEW</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display tracking-wide">
              CAMPUS DRIVERS: SUPERCHARGED
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl line-clamp-2">
              Four college drivers. A vintage muscle car fleet. High speed campus rides and the rules of love on the road.
            </p>
          </div>

          {/* Player controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm border border-white/10 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Specs Bar */}
        <div className="p-4 bg-[#0a0d17] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">● 60 FPS HDR10+</span>
            <span>Bitrate: 34.8 Mbps</span>
            <span>Dolby Atmos 7.1</span>
          </div>
          <span className="text-pink-400">Audio: French Original & English Dub</span>
        </div>
      </div>
    </div>
  );
};
