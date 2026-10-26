import React from 'react';
import { ActiveTab } from '../types/index.ts';
import { BookOpen, CheckCircle2, Award, Clock, Users, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';

interface TeacherGuideModalProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ setActiveTab }) => {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
          <span>Panduan Pedagogi Pendidik</span>
          <span aria-hidden="true">·</span>
          <span>Kurikulum Merdeka Fase D</span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-700 font-semibold">Model Flipped Guided Inquiry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Pedoman Implementasi Pembelajaran untuk Guru
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Rancangan pelaksanaan pembelajaran (RPP/Modul Ajar) menggunakan pendekatan Digital Mathematics Storytelling berbasis inkuiri terbimbing.
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile & CP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Alokasi Waktu</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">2 Jam Pelajaran (2 × 40 Menit)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ditambah 30 menit pra-pembelajaran mandiri di rumah (menonton video & membaca cerita digital).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Profil Pelajar Pancasila</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Dimensi Karakter</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              1. <strong>Bernalar Kritis</strong> (menguji data & konstanta).<br />
              2. <strong>Gotong Royong</strong> (kolaborasi LKPD kelompok).<br />
              3. <strong>Mandiri</strong> (eksplorasi mandiri pra-kelas).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-sky-600" />
              <span>Capaian Pembelajaran (CP)</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Fase D (Kelas VII)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Peserta didik dapat memahami konsep rasio, menyelesaikan masalah proporsi senilai, berbalik nilai, dan skala peta dalam kehidupan nyata.
            </p>
          </div>
        </div>

        {/* Detailed 5-Step Syntax */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 font-display mb-4">
            Sintaks Pembelajaran Flipped Guided Inquiry Based Learning (F-GIBL)
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Fase 1: Pra-Pembelajaran Mandiri (Di Luar Kelas / Di Rumah)
              </div>
              <p className="text-slate-600 leading-relaxed">
                Guru membagikan tautan Google Sites ini kepada peserta didik 1 hari sebelum jadwal kelas. Siswa diarahkan membaca <strong>Babak 1 Cerita Digital</strong> dan menyaksikan <strong>Video Pembelajaran Interaktif</strong> hingga menjawab 4 titik henti (checkpoints).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 text-xs">
              <div className="font-bold text-sky-950 text-sm mb-1">
                Fase 2: Pembelajaran Tatap Muka di Kelas (80 Menit)
              </div>
              <div className="space-y-2 mt-2 text-slate-700">
                <p>
                  <strong>1. Pendahuluan (10 Menit):</strong> Guru membuka kelas, memeriksa hasil checkpoints video yang dikerjakan siswa di rumah, dan mengelompokkan siswa ke dalam tim 4-5 orang.
                </p>
                <p>
                  <strong>2. Tahap Inkuiri 1 - Orientasi Masalah (10 Menit):</strong> Guru menampilkan dilema resep minuman dan target waktu pembangunan jembatan dari cerita. Siswa merumuskan pertanyaan penyelidikan.
                </p>
                <p>
                  <strong>3. Tahap Inkuiri 2 - Perumusan Hipotesis (10 Menit):</strong> Siswa menuliskan dugaan hubungan perbandingan pada LKPD digital kelompok.
                </p>
                <p>
                  <strong>4. Tahap Inkuiri 3 - Eksplorasi Data Simulasi (20 Menit):</strong> Siswa membuka <em>Lab Simulasi Rasio</em> di perangkat masing-masing, menggeser parameter slider, dan mencatat minimal 4 kombinasi data ke tabel LKPD.
                </p>
                <p>
                  <strong>5. Tahap Inkuiri 4 - Analisis & Pengujian Data (15 Menit):</strong> Siswa menghitung nilai konstanta <em>k = y/x</em> atau <em>k = x·y</em> untuk membuktikan hipotesis mereka.
                </p>
                <p>
                  <strong>6. Tahap Inkuiri 5 - Penarikan Kesimpulan & Presentasi (15 Menit):</strong> Perwakilan kelompok mempresentasikan temuan mereka tentang perbedaan karakteristik perbandingan senilai dan berbalik nilai.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Fase 3: Pasca-Pembelajaran (Asesmen & Pengayaan)
              </div>
              <p className="text-slate-600 leading-relaxed">
                Siswa mengerjakan <strong>Kuis Formatif 10 Soal</strong> secara mandiri untuk mengukur ketercapaian tujuan pembelajaran dan dapat mencetak sertifikat penghargaan prestasi jika mencapai kriteria ketuntasan minimal (KKM).
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('inkuiri');
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer shadow-sm"
          >
            <span>Buka Lembar Kerja Siswa (LKPD)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
