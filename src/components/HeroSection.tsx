import React from 'react';
import { ActiveTab } from '../types/index.ts';
import { ASSET_IMAGES } from '../data/curriculumData.ts';
import { Sparkles, Play, Compass, ArrowRight, CheckCircle2, FlaskConical, BookOpen } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  const handleAction = (tab: ActiveTab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background soft subtle geometry */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-white to-amber-50/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Pedagogical Framing & Narrative Hook */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Clean metadata without pill boxes */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                <span className="text-sky-700 font-semibold">Digital Storytelling</span>
                <span aria-hidden="true">·</span>
                <span>Matematika SMP Kelas VII</span>
                <span aria-hidden="true">·</span>
                <span>Flipped Guided Inquiry</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5 font-display text-balance">
                Petualangan Rasio & Proporsi: Menemukan Matematika dalam Kehidupan Nyata
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
                Bergabunglah bersama <strong>Rama</strong> dan <strong>Sinta</strong> dalam memecahkan misteri resep sirup nusantara, skala maket arsitektur candi, dan efisiensi waktu pembangunan jembatan dengan pendekatan penyelidikan mandiri terarah.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <button
                  onClick={() => handleAction('storytelling')}
                  className="flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 active:bg-sky-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Mulai Cerita Interaktif</span>
                </button>
                <button
                  onClick={() => handleAction('simulasi')}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <FlaskConical className="w-4 h-4 text-sky-600" />
                  <span>Coba Lab Simulasi</span>
                </button>
                <button
                  onClick={() => handleAction('inkuiri')}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Isi LKPD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Micro Learning Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 block font-medium">Flipped Learning</strong>
                  Eksplorasi konsep di rumah, investigasi aktif di kelas
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 block font-medium">Guided Inquiry</strong>
                  5 tahap inkuiri terarah menemukan rumus rasio
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 block font-medium">Simulasi Dinamis</strong>
                  Visualisasi partisi cairan, skala maket & grafik hiperbola
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-full flex flex-col">
              <img
                src={ASSET_IMAGES.hero}
                alt="Siswa SMP belajar matematika rasio dengan cerita digital dan buah segar"
                className="w-full h-64 sm:h-80 lg:h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Konteks Kontekstual Nusantara</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  "Dari Takaran Sirup Markisa hingga Kemegahan Candi Borobudur"
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Memahami rasio bukan sekadar menghafal rumus, melainkan merasakan keteraturan perbandingan dalam kehidupan sehari-hari.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
