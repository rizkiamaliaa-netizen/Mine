import React from 'react';
import { ActiveTab } from '../types/index.ts';
import { soundFx } from '../utils/audio.ts';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: ActiveTab) => {
    soundFx.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-sm">
                R
              </div>
              <span className="text-white font-bold text-base font-display">
                MathStory Rasio SMP
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Situs pembelajaran digital mathematics storytelling materi rasio dan perbandingan SMP Kelas VII dengan model <em>Flipped Guided Inquiry Based Learning (F-GIBL)</em>.
            </p>
            <div className="text-[11px] text-slate-500">
              Dikembangkan untuk mendukung implementasi Kurikulum Merdeka Fase D Matematika.
            </div>
          </div>

          {/* Quick Learning Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Menu Pembelajaran
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('storytelling')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Digital Storytelling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('video')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Video Interaktif
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('simulasi')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Laboratorium Simulasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('materi')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Materi & Contoh Soal
                </button>
              </li>
            </ul>
          </div>

          {/* Inquiry & Evaluation */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Aktivitas Siswa & Guru
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('inkuiri')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  LKPD Inkuiri Digital
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('latihan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Latihan & Kuis Formatif
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('panduan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Panduan Guru (Model F-GIBL)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} MathStory Rasio SMP. Google Sites Edukasi Matematika.
          </div>
          <div className="flex items-center gap-4">
            <span>Kurikulum Merdeka</span>
            <span aria-hidden="true">·</span>
            <span>Matematika Fase D</span>
            <span aria-hidden="true">·</span>
            <span>Bebas Akses Edukasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
