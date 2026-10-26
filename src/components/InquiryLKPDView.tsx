import React, { useState, useEffect } from 'react';
import { ActiveTab, StudentWorksheetData } from '../types/index.ts';
import { INITIAL_WORKSHEET_DATA, INQUIRY_STEPS } from '../data/curriculumData.ts';
import { Printer, Save, RotateCcw, CheckCircle2, FileCheck, HelpCircle, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface InquiryLKPDViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onCompleteInquiry: () => void;
}

export const InquiryLKPDView: React.FC<InquiryLKPDViewProps> = ({ setActiveTab, onCompleteInquiry }) => {
  const [worksheet, setWorksheet] = useState<StudentWorksheetData>(() => {
    try {
      const saved = localStorage.getItem('mathstory_lkpd_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_WORKSHEET_DATA;
  });

  const [activeStepTab, setActiveStepTab] = useState(1);
  const [saveMessage, setSaveMessage] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mathstory_lkpd_data', JSON.stringify(worksheet));
    } catch {
      // Ignore
    }
  }, [worksheet]);

  const handleSave = () => {
    soundFx.playSuccess();
    try {
      localStorage.setItem('mathstory_lkpd_data', JSON.stringify(worksheet));
    } catch {
      // Ignore
    }
    setSaveMessage(true);
    onCompleteInquiry();
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setSaveMessage(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Apakah kamu yakin ingin mengembalikan isi LKPD ke panduan awal?')) {
      soundFx.playClick();
      setWorksheet(INITIAL_WORKSHEET_DATA);
    }
  };

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const addTableRow = () => {
    soundFx.playClick();
    const newTrial = worksheet.experimentData.length + 1;
    setWorksheet({
      ...worksheet,
      experimentData: [
        ...worksheet.experimentData,
        {
          trial: newTrial,
          valA: newTrial * 2,
          valB: newTrial * 5,
          ratio: `${newTrial * 2} : ${newTrial * 5}`,
          kValue: '0.40',
          note: `Uji Coba ${newTrial}`
        }
      ]
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Printable Sheet Header (hidden in normal screen, visible on print) */}
      <div className="hidden print:block mb-8 text-center border-b-2 border-slate-900 pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider">LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL</h1>
        <h2 className="text-base font-semibold">Materi Rasio & Perbandingan - SMP Kelas VII (Kurikulum Merdeka)</h2>
        <div className="flex justify-between text-xs mt-4 font-mono">
          <span>Nama Siswa: {worksheet.studentName || '...............................'}</span>
          <span>Kelas: {worksheet.studentClass}</span>
          <span>Sekolah: {worksheet.schoolName}</span>
        </div>
      </div>

      {/* Screen Header */}
      <div className="print:hidden pb-6 border-b border-slate-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <span>Model Flipped Guided Inquiry</span>
            <span aria-hidden="true">·</span>
            <span>LKPD Digital Terintegrasi</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-700 font-semibold">Tersimpan Otomatis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Lembar Kerja Penyelidikan (LKPD) Inkuiri Terbimbing
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Dokumentasikan hipotesis, data eksperimen simulator, dan kesimpulan matematis kelompokmu dalam 5 tahapan terarah di bawah ini.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Jawaban</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            title="Cetak atau Simpan sebagai PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak / PDF</span>
          </button>
          <button
            onClick={handleResetToDefault}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
            title="Muat Contoh Model"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="print:hidden mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Jawaban LKPD berhasil disimpan ke penyimpanan lokal perambanmu!</span>
        </div>
      )}

      {/* Student Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm print:border-none print:shadow-none print:p-0">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-sky-600" />
          <span>Identitas Peserta Didik</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Lengkap Siswa</label>
            <input
              type="text"
              value={worksheet.studentName}
              onChange={(e) => setWorksheet({ ...worksheet, studentName: e.target.value })}
              placeholder="Contoh: Budi Pratama / Kelompok 3"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Kelas</label>
            <input
              type="text"
              value={worksheet.studentClass}
              onChange={(e) => setWorksheet({ ...worksheet, studentClass: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Sekolah</label>
            <input
              type="text"
              value={worksheet.schoolName}
              onChange={(e) => setWorksheet({ ...worksheet, schoolName: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* 5 Inquiry Steps Tab Navigation (Screen only) */}
      <div className="print:hidden flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-6 overflow-x-auto">
        {INQUIRY_STEPS.map((step) => {
          const isActive = activeStepTab === step.stepNumber;
          return (
            <button
              key={step.stepNumber}
              onClick={() => {
                soundFx.playClick();
                setActiveStepTab(step.stepNumber);
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tahap {step.stepNumber}: {step.title}
            </button>
          );
        })}
      </div>

      {/* TAHAP 1: ORIENTASI MASALAH */}
      {(activeStepTab === 1 || window.matchMedia('print').matches) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
            <span>Tahap 1: Orientasi Masalah</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
            Identifikasi Fenomena dan Pertanyaan Penyelidikan
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Perhatikan masalah Rama pada resep sirup markisa (Babak 1) dan masalah warga desa dalam proyek pembangunan jembatan (Babak 3). Tuliskan rumusan masalah utama yang akan kamu investigasi bersama kelompok!
          </p>
          <textarea
            rows={3}
            value={worksheet.problemOrientation}
            onChange={(e) => setWorksheet({ ...worksheet, problemOrientation: e.target.value })}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 leading-relaxed"
          />
        </div>
      )}

      {/* TAHAP 2: MERUMUSKAN HIPOTESIS */}
      {(activeStepTab === 2 || window.matchMedia('print').matches) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
            <span>Tahap 2: Merumuskan Hipotesis</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
            Dugaan Awal Terarah (Pola Hubungan Rasio)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Sebelum mencoba simulator, buatlah dugaan: Bagaimana sifat perbandingan antara takaran sirup vs air, dan bagaimana sifat perbandingan antara jumlah pekerja vs waktu hari pengerjaan jembatan?
          </p>
          <textarea
            rows={3}
            value={worksheet.hypothesis}
            onChange={(e) => setWorksheet({ ...worksheet, hypothesis: e.target.value })}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 leading-relaxed"
          />
        </div>
      )}

      {/* TAHAP 3: EKSPLORASI SIMULATOR (TABEL DATA) */}
      {(activeStepTab === 3 || window.matchMedia('print').matches) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider">
              <span>Tahap 3: Eksplorasi Data Simulasi</span>
            </div>
            <button
              onClick={() => setActiveTab('simulasi')}
              className="print:hidden text-xs text-sky-600 hover:text-sky-800 font-medium cursor-pointer"
            >
              Buka Lab Simulator ↗
            </button>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
            Tabel Pencatatan Eksperimen Virtual
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Catat hasil manipulasi slider dari simulator ke dalam tabel berikut untuk menguji konsistensi perbandingan nilai:
          </p>

          <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Percobaan</th>
                  <th className="p-2.5">Besaran A (x)</th>
                  <th className="p-2.5">Besaran B (y)</th>
                  <th className="p-2.5">Bentuk Rasio (x:y)</th>
                  <th className="p-2.5">Nilai Konstanta (k)</th>
                  <th className="p-2.5">Keterangan Hasil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {worksheet.experimentData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-600">Uji #{row.trial}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={row.valA}
                        onChange={(e) => {
                          const updated = [...worksheet.experimentData];
                          updated[idx].valA = Number(e.target.value);
                          setWorksheet({ ...worksheet, experimentData: updated });
                        }}
                        className="w-16 p-1 border rounded bg-white"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={row.valB}
                        onChange={(e) => {
                          const updated = [...worksheet.experimentData];
                          updated[idx].valB = Number(e.target.value);
                          setWorksheet({ ...worksheet, experimentData: updated });
                        }}
                        className="w-16 p-1 border rounded bg-white"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.ratio}
                        onChange={(e) => {
                          const updated = [...worksheet.experimentData];
                          updated[idx].ratio = e.target.value;
                          setWorksheet({ ...worksheet, experimentData: updated });
                        }}
                        className="w-24 p-1 border rounded bg-white"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.kValue}
                        onChange={(e) => {
                          const updated = [...worksheet.experimentData];
                          updated[idx].kValue = e.target.value;
                          setWorksheet({ ...worksheet, experimentData: updated });
                        }}
                        className="w-16 p-1 border rounded bg-white"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.note}
                        onChange={(e) => {
                          const updated = [...worksheet.experimentData];
                          updated[idx].note = e.target.value;
                          setWorksheet({ ...worksheet, experimentData: updated });
                        }}
                        className="w-full p-1 border rounded bg-white font-sans text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addTableRow}
            className="print:hidden px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
          >
            + Tambah Baris Uji Coba
          </button>
        </div>
      )}

      {/* TAHAP 4: ANALISIS DATA */}
      {(activeStepTab === 4 || window.matchMedia('print').matches) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <span>Tahap 4: Analisis Data & Pengujian Hipotesis</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Pengujian Konsistensi Matematis
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              1. Berdasarkan tabel di atas, apakah hasil bagi (y/x) pada kasus takaran sirup selalu sama? Jelaskan maknanya!
            </label>
            <textarea
              rows={2}
              value={worksheet.analysisAnswer1}
              onChange={(e) => setWorksheet({ ...worksheet, analysisAnswer1: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              2. Pada kasus proyek pembangunan jembatan, operasi manakah yang menghasilkan nilai tetap: penjumlahan, hasil bagi, atau hasil kali (x · y)?
            </label>
            <textarea
              rows={2}
              value={worksheet.analysisAnswer2}
              onChange={(e) => setWorksheet({ ...worksheet, analysisAnswer2: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* TAHAP 5: MENARIK KESIMPULAN & REFLEKSI */}
      {(activeStepTab === 5 || window.matchMedia('print').matches) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <span>Tahap 5: Menarik Kesimpulan & Refleksi Diri</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Konstruksi Pemahaman Konseptual
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Kesimpulan Akhir: Apa perbedaan mendasar antara Perbandingan Senilai dan Perbandingan Berbalik Nilai?
            </label>
            <textarea
              rows={3}
              value={worksheet.conclusion}
              onChange={(e) => setWorksheet({ ...worksheet, conclusion: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Refleksi Diri: Apa manfaat materi rasio ini yang paling berkesan bagi aktivitasmu sehari-hari?
            </label>
            <textarea
              rows={2}
              value={worksheet.selfReflection}
              onChange={(e) => setWorksheet({ ...worksheet, selfReflection: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 leading-relaxed"
            />
          </div>

          <div className="pt-3 flex justify-between items-center">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer shadow-sm"
            >
              Simpan & Selesaikan LKPD
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('latihan');
              }}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Lanjut ke Latihan & Kuis</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Rubric Rating Guide (For Teachers and Self Assessment) */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 print:border-t-2 print:border-slate-800">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Rubrik Penilaian Inkuiri (F-GIBL)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1">Skor 85-100 (Sangat Mahir)</div>
            Hipotesis logis, tabel terisi $\ge 4$ data akurat, analisis konstanta $k$ tepat, kesimpulan komprehensif.
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1">Skor 70-84 (Cakap)</div>
            Hipotesis terarah, tabel terisi data, perhitungan benar meski ada ketidaktelitian kecil pada satuan.
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1">Skor &lt; 70 (Perlu Bimbingan)</div>
            Belum mampu membedakan rasio senilai dan berbalik nilai; perlu pendampingan guru pada kalkulasi.
          </div>
        </div>
      </div>
    </div>
  );
};
