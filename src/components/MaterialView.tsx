import React, { useState } from 'react';
import { ActiveTab } from '../types/index.ts';
import { BookOpen, Check, Layers, ArrowRight, Lightbulb, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';

interface MaterialViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const MaterialView: React.FC<MaterialViewProps> = ({ setActiveTab }) => {
  const [activeModule, setActiveModule] = useState<'dasar' | 'senilai' | 'skala' | 'berbalik' | 'contoh'>('dasar');
  const [expandedExample, setExpandedExample] = useState<number | null>(0);

  const handleModuleClick = (m: 'dasar' | 'senilai' | 'skala' | 'berbalik' | 'contoh') => {
    soundFx.playClick();
    setActiveModule(m);
  };

  const toggleExample = (idx: number) => {
    soundFx.playClick();
    setExpandedExample(expandedExample === idx ? null : idx);
  };

  const workedExamples = [
    {
      title: 'Contoh 1: Menyederhanakan Rasio Beda Satuan',
      problem: 'Sederhanakan perbandingan antara panjang pita merah 45 cm dan pita biru 1,5 meter!',
      steps: [
        'Langkah 1: Samakan satuan terlebih dahulu ke satuan terkecil (cm). Pita biru = 1,5 m = 1,5 × 100 cm = 150 cm.',
        'Langkah 2: Tuliskan perbandingan: 45 cm : 150 cm = 45 : 150.',
        'Langkah 3: Tentukan Faktor Persekutuan Terbesar (FPB) dari 45 dan 150. FPB(45, 150) = 15.',
        'Langkah 4: Bagi kedua bilangan dengan 15: (45 ÷ 15) : (150 ÷ 15) = 3 : 10.',
        'Kesimpulan: Perbandingan paling sederhana adalah 3 : 10.'
      ]
    },
    {
      title: 'Contoh 2: Perbandingan Senilai (Resep Kue Tradisional)',
      problem: 'Untuk membuat 12 buah kue pukis dibutuhkan 200 gram tepung terigu. Jika Ibu ingin membuat 30 buah kue pukis untuk hajatan warga, berapa gram tepung terigu yang harus disiapkan?',
      steps: [
        'Langkah 1: Identifikasi besaran: Banyak kue (buah) dan berat tepung (gram). Semakin banyak kue yang dibuat, semakin banyak tepung yang dibutuhkan (Perbandingan Senilai).',
        'Langkah 2: Buat tabel nilai:',
        '   Kondisi 1: 12 buah -> 200 gram',
        '   Kondisi 2: 30 buah -> x gram',
        'Langkah 3: Gunakan perbandingan senilai: 12 / 30 = 200 / x',
        'Langkah 4: Perkalian silang: 12 · x = 30 · 200 -> 12x = 6.000 -> x = 6.000 ÷ 12 = 500 gram.',
        'Kesimpulan: Ibu memerlukan 500 gram tepung terigu.'
      ]
    },
    {
      title: 'Contoh 3: Skala Peta & Jarak Sebenarnya',
      problem: 'Jarak kota Solo dan Yogyakarta pada peta adalah 4,5 cm. Jika peta tersebut menggunakan skala 1 : 1.200.000, hitunglah jarak sebenarnya kedua kota dalam satuan kilometer (km)!',
      steps: [
        'Langkah 1: Rumus dasar: Jarak Sebenarnya (Js) = Jarak pada Peta (Jp) × Angka Skala.',
        'Langkah 2: Js = 4,5 cm × 1.200.000 = 5.400.000 cm.',
        'Langkah 3: Konversi satuan cm ke km (bagi 100.000): 5.400.000 cm ÷ 100.000 = 54 km.',
        'Kesimpulan: Jarak sebenarnya antara Solo dan Yogyakarta adalah 54 km.'
      ]
    },
    {
      title: 'Contoh 4: Perbandingan Berbalik Nilai (Pekerja Bangunan)',
      problem: 'Pembangunan pos ronda selesai dalam 15 hari jika dikerjakan oleh 4 orang tukang. Karena akan segera digunakan saat ronda malam, pos ronda harus selesai dalam 6 hari. Berapa banyak tukang tambahan yang harus dipekerjakan?',
      steps: [
        'Langkah 1: Identifikasi: Waktu berkurang (lebih cepat), maka pekerja harus bertambah (Perbandingan Berbalik Nilai).',
        'Langkah 2: Rumus berbalik nilai: x₁ · y₁ = x₂ · y₂ (Hasil kali konstan).',
        'Langkah 3: 4 orang × 15 hari = x₂ × 6 hari -> 60 = 6 · x₂ -> x₂ = 60 ÷ 6 = 10 orang total pekerja.',
        'Langkah 4: Hitung pekerja TAMBAHAN: Pekerja Baru - Pekerja Awal = 10 - 4 = 6 orang pekerja tambahan.',
        'Kesimpulan: Diperlukan tambahan 6 orang tukang agar pos ronda selesai dalam 6 hari.'
      ]
    },
    {
      title: 'Contoh 5: Kecepatan dan Waktu Tempuh Perjalanan',
      problem: 'Sebuah bus pariwisata menempuh rute dengan kecepatan rata-rata 60 km/jam dalam waktu 3 jam 30 menit. Jika bus tersebut melaju dengan kecepatan 70 km/jam, berapa lama waktu tempuh perjalanannya?',
      steps: [
        'Langkah 1: Ubah waktu ke bentuk desimal/pecahan: 3 jam 30 menit = 3,5 jam (atau 7/2 jam).',
        'Langkah 2: Hitung jarak total (k): Jarak = v₁ · t₁ = 60 km/jam × 3,5 jam = 210 km.',
        'Langkah 3: Hubungan berbalik nilai (v₂ · t₂ = 210 km): 70 km/jam × t₂ = 210 -> t₂ = 210 ÷ 70 = 3 jam.',
        'Kesimpulan: Dengan kecepatan 70 km/jam, perjalanan dapat ditempuh dalam 3 jam (lebih hemat 30 menit).'
      ]
    }
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
          <span>Buku Saku Belajar Mandiri</span>
          <span aria-hidden="true">·</span>
          <span>Kurikulum Merdeka Matematika SMP</span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-700 font-semibold">Teori & Langkah Penyelesaian</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Rangkuman Materi & Contoh Soal Rasio
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Pelajari konsep matematis mendalam, rumus baku, perbandingan karakteristik grafik, dan contoh soal kontekstual yang sering diujikan.
        </p>
      </div>

      {/* Module Selector Navigation (Segmented Tabs) */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-8 overflow-x-auto">
        <button
          onClick={() => handleModuleClick('dasar')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
            activeModule === 'dasar' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Hakikat Rasio & Bentuk Notasi
        </button>
        <button
          onClick={() => handleModuleClick('senilai')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
            activeModule === 'senilai' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Perbandingan Senilai
        </button>
        <button
          onClick={() => handleModuleClick('skala')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
            activeModule === 'skala' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Skala Peta & Denah
        </button>
        <button
          onClick={() => handleModuleClick('berbalik')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
            activeModule === 'berbalik' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          4. Perbandingan Berbalik Nilai
        </button>
        <button
          onClick={() => handleModuleClick('contoh')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
            activeModule === 'contoh' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          5. Contoh Soal Terbimbing
        </button>
      </div>

      {/* MODULE 1: DASAR RASIO */}
      {activeModule === 'dasar' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
              Topik 1: Pengertian & Notasi Rasio
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Apa itu Rasio (Perbandingan)?
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              <strong>Rasio</strong> adalah hubungan kuantitatif antara dua besaran atau lebih yang menyatakan berapa kali suatu besaran mengandung atau terkandung dalam besaran lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-2">Bentuk Penulisan Notasi Rasio</h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>• <strong>Titik Dua (:)</strong>: Notasi paling lazim, misalnya <code className="bg-slate-200 px-1 rounded">2 : 5</code> (dibaca "dua berbanding lima").</li>
                <li>• <strong>Bentuk Pecahan</strong>: Dituliskan sebagai pembilang dan penyebut, misalnya <code className="bg-slate-200 px-1 rounded">2/5</code>.</li>
                <li>• <strong>Kata Frasa</strong>: Menggunakan kata penghubung, misalnya "2 terhadap 5".</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-2">Dua Macam Perbandingan</h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>• <strong>Part-to-Part</strong>: Membandingkan suatu bagian dengan bagian lain. Contoh: 2 takar sirup berbanding 5 takar air (<code className="bg-slate-200 px-1 rounded">2 : 5</code>).</li>
                <li>• <strong>Part-to-Whole</strong>: Membandingkan suatu bagian terhadap jumlah total keseluruhan. Contoh: 2 takar sirup dari total 7 takar minuman (<code className="bg-slate-200 px-1 rounded">2 : 7</code>).</li>
              </ul>
            </div>
          </div>

          {/* Rule of Units & Simplification */}
          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1">
                <strong className="block text-sm">Syarat Mutlak Menyederhanakan Rasio:</strong>
                <p>1. <strong>Besaran Sejenis</strong>: Dua besaran yang dibandingkan harus mengukur hal yang sama (misal panjang dengan panjang, berat dengan berat).</p>
                <p>2. <strong>Satuan Harus Disamakan</strong>: Bila satuannya berbeda (misal cm dan meter), ubah dulu keduanya ke satuan yang sama sebelum menyederhanakan dengan FPB!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: SENILAI */}
      {activeModule === 'senilai' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
              Topik 2: Perbandingan Senilai (Direct Proportion)
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Konsep Hubungan Sebanding
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Dua besaran dikatakan memiliki <strong>perbandingan senilai</strong> apabila kenaikan nilai pada besaran pertama menyebabkan kenaikan proporsional pada besaran kedua, dengan rasio hasil bagi yang selalu tetap (konstan).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center">
              <div className="text-xs text-slate-500 mb-1">Formula Utama</div>
              <div className="text-lg font-bold text-sky-800">a₁ / b₁ = a₂ / b₂</div>
              <div className="text-[11px] text-slate-500 mt-1">Perkalian silang: a₁ · b₂ = a₂ · b₁</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center">
              <div className="text-xs text-slate-500 mb-1">Bentuk Fungsi</div>
              <div className="text-lg font-bold text-sky-800">y = k · x</div>
              <div className="text-[11px] text-slate-500 mt-1">Konstanta k = y / x</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center">
              <div className="text-xs text-slate-500 mb-1">Karakter Grafik</div>
              <div className="text-lg font-bold text-sky-800">Garis Lurus</div>
              <div className="text-[11px] text-slate-500 mt-1">Melalui titik asal (0, 0)</div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 text-xs text-slate-700 leading-relaxed">
            <h4 className="font-bold text-slate-900 mb-2">Contoh Nyata Perbandingan Senilai di Kehidupan:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Banyak Barang vs Total Harga:</strong> Semakin banyak buku tulis yang dibeli, semakin besar uang yang harus dibayar.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Jarak Tempuh vs Bahan Bakar:</strong> Semakin jauh jarak yang ditempuh mobil, semakin banyak liter bensin yang terpakai.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Porsi Resep Makanan:</strong> Membuat makanan untuk 4 orang berbanding 40 orang memerlukan bahan 10 kali lipat.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Lama Kerja vs Upah Harian:</strong> Bekerja 3 hari vs 6 hari menghasilkan upah yang berlipat ganda secara proporsional.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: SKALA */}
      {activeModule === 'skala' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
              Topik 3: Aplikasi Skala, Peta & Denah
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Prinsip Pengecilan & Pembesaran Proporsional
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Skala merupakan penerapan khusus dari perbandingan senilai. Skala menyatakan perbandingan antara jarak/ukuran pada gambar terhadap jarak/ukuran sesungguhnya.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 text-white font-mono text-center">
            <div className="text-xs text-amber-400 mb-1">RUMUS SEGITIGA SKALA</div>
            <div className="text-xl sm:text-2xl font-bold text-sky-300">
              Skala = Jarak pada Gambar (Jp) / Jarak Sebenarnya (Js)
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-3 text-xs text-slate-300">
              <span>• Jp = Js × Skala</span>
              <span>• Js = Jp ÷ Skala</span>
              <span>• Satuan Wajib Disamakan ke CM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Membaca Arti Skala 1 : 250.000</h4>
              <p className="leading-relaxed">
                Artinya, setiap <strong>1 cm</strong> jarak pada lembar peta mewakili <strong>250.000 cm</strong> (atau 2.500 meter = 2,5 kilometer) pada jarak sebenarnya di permukaan bumi.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Skala Luas pada Denah Bangunan</h4>
              <p className="leading-relaxed">
                Hati-hati saat menghitung luas! Luas Sebenarnya = Luas Gambar × (Faktor Skala)². Jika skala 1 : 100, maka perbandingan luasnya adalah 1 : 10.000!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: BERBALIK NILAI */}
      {activeModule === 'berbalik' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
              Topik 4: Perbandingan Berbalik Nilai (Inverse Proportion)
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Konsep Hubungan Berlawanan Arah
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Dua besaran dikatakan berbalik nilai jika peningkatan pada besaran pertama justru menyebabkan <strong>penurunan proporsional</strong> pada besaran kedua. Pada hubungan ini, <strong>hasil perkalian kedua variabel</strong> selalu bernilai konstan (tetap).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center">
              <div className="text-xs text-slate-500 mb-1">Formula Perkalian Konstan</div>
              <div className="text-lg font-bold text-emerald-800">x₁ · y₁ = x₂ · y₂</div>
              <div className="text-[11px] text-slate-500 mt-1">x · y = k (Konstan)</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center">
              <div className="text-xs text-slate-500 mb-1">Bentuk Fungsi</div>
              <div className="text-lg font-bold text-emerald-800">y = k / x</div>
              <div className="text-[11px] text-slate-500 mt-1">y berbanding terbalik dengan x</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center">
              <div className="text-xs text-slate-500 mb-1">Karakter Grafik</div>
              <div className="text-lg font-bold text-emerald-800">Kurva Hiperbola</div>
              <div className="text-[11px] text-slate-500 mt-1">Melengkung mendekati sumbu</div>
            </div>
          </div>

          {/* Table comparing Senilai vs Berbalik Nilai */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-100 p-3 font-bold text-slate-800 border-b border-slate-200">
              Tabel Komparasi Perbedaan: Senilai vs Berbalik Nilai
            </div>
            <table className="w-full text-left font-sans">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Aspek Pembeda</th>
                  <th className="p-3">Perbandingan Senilai</th>
                  <th className="p-3">Perbandingan Berbalik Nilai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Arah Perubahan</td>
                  <td className="p-3">Searah (x naik ➔ y ikut naik)</td>
                  <td className="p-3">Berlawanan (x naik ➔ y turun)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Operasi yang Tetap</td>
                  <td className="p-3 font-mono">Hasil Bagi (y / x = k)</td>
                  <td className="p-3 font-mono">Hasil Kali (x · y = k)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Bentuk Persamaan</td>
                  <td className="p-3 font-mono">a₁ / b₁ = a₂ / b₂</td>
                  <td className="p-3 font-mono">a₁ · b₁ = a₂ · b₂</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Contoh Klasik</td>
                  <td className="p-3">Beli bensin vs jarak kilometer</td>
                  <td className="p-3">Banyak pekerja vs hari selesai</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 5: CONTOH SOAL TERBIMBING */}
      {activeModule === 'contoh' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
              Koleksi Soal Cerita Kontekstual & Pembahasan
            </h3>
            <p className="text-xs text-slate-600">
              Klik setiap soal untuk membuka uraian langkah penyelesaian resmi model Kurikulum Merdeka.
            </p>
          </div>

          <div className="space-y-3">
            {workedExamples.map((ex, idx) => {
              const isExpanded = expandedExample === idx;
              return (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleExample(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-sky-700">{ex.title}</div>
                      <div className="text-sm font-bold text-slate-900 mt-1">{ex.problem}</div>
                    </div>
                    <div className="p-1 rounded-md text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 border-t border-slate-100 bg-slate-50/70 text-xs space-y-2 font-mono">
                      <div className="text-slate-500 font-sans font-bold uppercase text-[10px] tracking-wider mb-2">
                        Langkah Penyelesaian Sistematis:
                      </div>
                      {ex.steps.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-2.5 rounded-lg border text-slate-800 ${
                            sIdx === ex.steps.length - 1
                              ? 'bg-emerald-50 border-emerald-200 font-bold text-emerald-900'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          {st}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('latihan');
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer shadow-sm"
            >
              <span>Uji Kemampuan di Latihan & Kuis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
