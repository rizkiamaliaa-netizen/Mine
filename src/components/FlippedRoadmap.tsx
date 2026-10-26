import React, { useState } from 'react';
import { ActiveTab } from '../types/index.ts';
import { Home, School, GraduationCap, ChevronRight, Play, Sliders, CheckSquare, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';

interface FlippedRoadmapProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const FlippedRoadmap: React.FC<FlippedRoadmapProps> = ({ setActiveTab }) => {
  const [activeStage, setActiveStage] = useState<'pra' | 'saat' | 'pasca'>('pra');

  const handleStageSelect = (stage: 'pra' | 'saat' | 'pasca') => {
    soundFx.playClick();
    setActiveStage(stage);
  };

  const handleJump = (tab: ActiveTab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <span>Model Pedagogi F-GIBL</span>
            <span aria-hidden="true">·</span>
            <span>Kurikulum Merdeka 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Alur Pembelajaran Flipped Guided Inquiry
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Mengintegrasikan belajar mandiri berbasis cerita sebelum tatap muka dengan investigasi terarah dan eksperimen simulasi interaktif saat di kelas.
          </p>
        </div>

        {/* 3 Stage Selector Bar (Segmented Tab Control) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-xl max-w-2xl w-full">
            <button
              onClick={() => handleStageSelect('pra')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                activeStage === 'pra'
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>1. Pra-Kelas (Di Rumah)</span>
            </button>
            <button
              onClick={() => handleStageSelect('saat')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                activeStage === 'saat'
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <School className="w-4 h-4" />
              <span>2. Saat Kelas (Inkuiri)</span>
            </button>
            <button
              onClick={() => handleStageSelect('pasca')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                activeStage === 'pasca'
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>3. Pasca-Kelas (Refleksi)</span>
            </button>
          </div>
        </div>

        {/* Stage Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {activeStage === 'pra' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
                <div>
                  <div className="text-xs text-sky-700 font-semibold mb-1">FASE 1: PRE-CLASS EXPLORATION</div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Eksplorasi Konsep Mandiri & Cerita Naratif
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Siswa membaca cerita digital dan menonton video pembelajaran sebelum sesi tatap muka untuk membangun rasa ingin tahu.
                  </p>
                </div>
                <button
                  onClick={() => handleJump('storytelling')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Mulai Babak Cerita</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 mb-1">LANGKAH 01</div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">Simak Cerita Rama & Sinta</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pahami bagaimana Rama menghadapi masalah resep sirup markisa di kedai dan bagaimana Sinta mengukur skala miniatur Candi Borobudur.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 mb-1">LANGKAH 02</div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">Tonton Video Konsep Rasio</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Saksikan animasi konsep video dengan titik henti interaktif (checkpoints) untuk menguji pemahaman part-to-part vs part-to-whole.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 mb-1">LANGKAH 03</div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">Catat Pertanyaan Pemantik</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tuliskan hal-hal menarik atau hal yang masih membingungkan untuk dibawa ke sesi diskusi kelompok dan inkuiri di kelas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'saat' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
                <div>
                  <div className="text-xs text-sky-700 font-semibold mb-1">FASE 2: IN-CLASS GUIDED INQUIRY</div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    5 Tahap Penyelidikan Terbimbing (Guided Inquiry)
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Bekerja sama dalam kelompok melakukan eksperimen virtual pada simulator rasio dan mengisi LKPD digital.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleJump('simulasi')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer whitespace-nowrap"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Buka Simulator</span>
                  </button>
                  <button
                    onClick={() => handleJump('inkuiri')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Lembar Kerja (LKPD)</span>
                  </button>
                </div>
              </div>

              {/* 5 Inquiry Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="text-[11px] font-bold text-sky-800 mb-1">TAHAP 1</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">Orientasi Masalah</div>
                  <p className="text-xs text-slate-600">Mengamati fenomena resep & pekerjaan proyek.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="text-[11px] font-bold text-sky-800 mb-1">TAHAP 2</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">Rumuskan Hipotesis</div>
                  <p className="text-xs text-slate-600">Membuat dugaan hubungan variabel senilai / berbalik nilai.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="text-[11px] font-bold text-sky-800 mb-1">TAHAP 3</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">Uji Coba Simulator</div>
                  <p className="text-xs text-slate-600">Menggeser slider nilai dan mencatat tabel data.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="text-[11px] font-bold text-sky-800 mb-1">TAHAP 4</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">Analisis Konstanta</div>
                  <p className="text-xs text-slate-600">Menghitung k = y/x atau k = x·y pada tabel hasil.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="text-[11px] font-bold text-sky-800 mb-1">TAHAP 5</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">Tarik Kesimpulan</div>
                  <p className="text-xs text-slate-600">Menyimpulkan formula umum dan mempresentasikan.</p>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'pasca' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
                <div>
                  <div className="text-xs text-sky-700 font-semibold mb-1">FASE 3: POST-CLASS MASTERY</div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Penguatan Kemampuan, Kuis Formatif & Sertifikasi
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Menguji penguasaan materi dengan soal bertingkat dan mengunduh sertifikat digital pencapaian belajar.
                  </p>
                </div>
                <button
                  onClick={() => handleJump('latihan')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mulai Latihan & Kuis</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 mb-1">KOMPONEN 01</div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">Soal Latihan Terbimbing</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Siswa mencoba soal latihan dengan panduan petunjuk (hint) langkah demi langkah untuk membangun kepercayaan diri.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 mb-1">KOMPONEN 02</div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">Evaluasi Formatif 10 Soal</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ujian singkat terukur mencakup indikator perbandingan senilai, berbalik nilai, dan skala peta dengan analisis jawaban langsung.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 mb-1">KOMPONEN 03</div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">Sertifikat Digital Prestasi</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Siswa yang memperoleh skor memuaskan dapat mencetak / mengunduh sertifikat resmi bertanda tangan digital guru.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
