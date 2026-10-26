import React, { useState } from 'react';
import { ActiveTab, QuizQuestion } from '../types/index.ts';
import { QUIZ_QUESTIONS } from '../data/curriculumData.ts';
import { CheckCircle2, AlertCircle, RotateCcw, Award, Sparkles, Printer, ArrowRight, HelpCircle, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface InteractiveExercisesProps {
  setActiveTab: (tab: ActiveTab) => void;
  onCompleteQuiz: (score: number) => void;
}

export const InteractiveExercises: React.FC<InteractiveExercisesProps> = ({
  setActiveTab,
  onCompleteQuiz,
}) => {
  const [exerciseMode, setExerciseMode] = useState<'latihan' | 'kuis'>('kuis');

  // Interactive Guided Exercise States
  const [guidedInputA, setGuidedInputA] = useState('');
  const [guidedInputB, setGuidedInputB] = useState('');
  const [guidedFeedback, setGuidedFeedback] = useState<string | null>(null);
  const [showGuidedHint, setShowGuidedHint] = useState(false);

  // Quiz States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('Siswa SMP Cerdas');
  const [showCertificate, setShowCertificate] = useState(false);

  // Guided Exercise Checker
  const checkGuidedExercise = () => {
    // Problem: 8 pens cost Rp24.000. How much do 14 pens cost?
    // User enters: 1 pen = 3000, 14 pens = 42000
    const valA = parseInt(guidedInputA.replace(/\D/g, ''), 10);
    const valB = parseInt(guidedInputB.replace(/\D/g, ''), 10);

    if (valA === 3000 && valB === 42000) {
      soundFx.playSuccess();
      setGuidedFeedback('Hebat! Jawabanmu 100% benar: Harga 1 pulpen = Rp3.000, sehingga 14 pulpen = 14 × Rp3.000 = Rp42.000.');
      confetti({ particleCount: 30, spread: 50 });
    } else if (valA === 3000 && valB !== 42000) {
      soundFx.playWrong();
      setGuidedFeedback('Harga per satuannya sudah benar (Rp3.000), tetapi perkalian untuk 14 pulpen masih kurang tepat. Coba kalikan 14 × 3.000 lagi!');
    } else {
      soundFx.playWrong();
      setGuidedFeedback('Hitungan harga per satuan pulpen masih belum tepat. Ingat: Rp24.000 ÷ 8 pulpen = ?');
    }
  };

  // Quiz Handler
  const handleAnswerSelect = (optIdx: number) => {
    if (quizSubmitted) return;
    soundFx.playClick();
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIdx]: optIdx
    });
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePrevQuestion = () => {
    soundFx.playClick();
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleSubmitQuiz = () => {
    soundFx.playClick();
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    setQuizSubmitted(true);
    onCompleteQuiz(calculatedScore);

    if (calculatedScore >= 70) {
      soundFx.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      soundFx.playWrong();
    }
  };

  const handleResetQuiz = () => {
    soundFx.playClick();
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setQuizSubmitted(false);
    setShowCertificate(false);
  };

  // Calculate score
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) correctCount++;
  });
  const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const isPassed = finalScore >= 70;

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];
  const isAnswered = selectedAnswers[currentQuestionIdx] !== undefined;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <span>Fase 3: Post-Class Mastery</span>
            <span aria-hidden="true">·</span>
            <span>Evaluasi Formatif Standar SMP</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-700 font-semibold">10 Butir Soal Terukur</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Latihan Mandiri & Evaluasi Formatif
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Uji ketelitian dan pemahamanmu mengenai perbandingan senilai, berbalik nilai, dan skala. Dapatkan sertifikat kelulusan digital!
          </p>
        </div>

        {/* Mode Selector */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              setExerciseMode('kuis');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
              exerciseMode === 'kuis' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kuis Evaluasi (10 Soal)
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setExerciseMode('latihan');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
              exerciseMode === 'latihan' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Latihan Terbimbing
          </button>
        </div>
      </div>

      {/* MODE 1: LATIHAN TERBIMBING */}
      {exerciseMode === 'latihan' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
              Latihan Interaktif: Menentukan Nilai Satuan (Unitary Method)
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display mb-3">
              Kasus Pembelian Alat Tulis Koperasi Sekolah
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-6">
              Koperasi SMP Nusantara menjual <strong>8 buah pulpen gel</strong> seharga <strong>Rp24.000,00</strong>. Jika pengurus OSIS ingin membeli <strong>14 buah pulpen gel yang sama</strong> untuk hadiah lomba cerdas cermat, berapakah total uang yang harus dibayarkan?
            </p>

            <div className="space-y-4 p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Langkah 1: Berapakah harga 1 buah pulpen gel? (Rp)
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500">Rp</span>
                  <input
                    type="number"
                    value={guidedInputA}
                    onChange={(e) => setGuidedInputA(e.target.value)}
                    placeholder="Contoh: 3000"
                    className="p-2 border rounded-lg bg-white w-40 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Langkah 2: Berapakah total harga untuk 14 buah pulpen? (Rp)
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500">Rp</span>
                  <input
                    type="number"
                    value={guidedInputB}
                    onChange={(e) => setGuidedInputB(e.target.value)}
                    placeholder="Contoh: 42000"
                    className="p-2 border rounded-lg bg-white w-40 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={checkGuidedExercise}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer shadow-sm"
                >
                  Periksa Jawaban
                </button>
                <button
                  onClick={() => setShowGuidedHint(!showGuidedHint)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showGuidedHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk?'}</span>
                </button>
              </div>

              {showGuidedHint && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <strong>Petunjuk:</strong> Untuk mencari harga 1 buah, bagi harga total dengan banyak pulpen: 24.000 ÷ 8. Lalu kalikan hasilnya dengan 14.
                </div>
              )}

              {guidedFeedback && (
                <div className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                  guidedFeedback.includes('Hebat')
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  {guidedFeedback}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: KUIS FORMATIF 10 SOAL */}
      {exerciseMode === 'kuis' && !showCertificate && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Question Stage */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {/* Question Progress Tracker */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sky-800">Soal {currentQuestionIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-500">Tingkat: <strong className="text-slate-700">{currentQ.difficulty}</strong></span>
              </div>
              <div className="text-slate-500 font-mono">
                {Object.keys(selectedAnswers).length} Terjawab
              </div>
            </div>

            {/* Question Prompt */}
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed mb-6">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                let optStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                if (isSelected) {
                  optStyle = 'border-sky-600 bg-sky-50 text-sky-900 font-medium';
                }

                if (quizSubmitted) {
                  if (optIdx === currentQ.correctIndex) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                  } else if (isSelected && optIdx !== currentQ.correctIndex) {
                    optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswerSelect(optIdx)}
                    disabled={quizSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm cursor-pointer ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {quizSubmitted && optIdx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {quizSubmitted && isSelected && optIdx !== currentQ.correctIndex && (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {quizSubmitted && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-6 text-slate-700 leading-relaxed">
                <strong className="block text-slate-900 mb-1 font-semibold">Pembahasan Soal #{currentQuestionIdx + 1}:</strong>
                {currentQ.explanation}
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg cursor-pointer"
              >
                Sebelumnya
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    Selanjutnya
                  </button>
                ) : !quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                    className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 rounded-lg cursor-pointer shadow-sm"
                  >
                    Selesaikan & Kumpul Kuis
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Quiz Sidebar: Question Map & Score Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Number Map Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Nomor Soal
              </div>
              <div className="grid grid-cols-5 gap-2">
                {QUIZ_QUESTIONS.map((_, idx) => {
                  const isCurrent = currentQuestionIdx === idx;
                  const isFilled = selectedAnswers[idx] !== undefined;
                  const isCorrect = selectedAnswers[idx] === QUIZ_QUESTIONS[idx].correctIndex;

                  let boxClass = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (isFilled && !quizSubmitted) {
                    boxClass = 'bg-sky-600 text-white border-sky-600';
                  }
                  if (quizSubmitted) {
                    boxClass = isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-500 text-white border-rose-500';
                  }
                  if (isCurrent) {
                    boxClass += ' ring-2 ring-sky-600 ring-offset-2';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentQuestionIdx(idx);
                      }}
                      className={`h-9 rounded-lg font-mono text-xs font-bold border flex items-center justify-center cursor-pointer transition-all ${boxClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Score Result Card (when submitted) */}
            {quizSubmitted && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Hasil Evaluasi Belajar
                </div>
                <div className="text-4xl font-extrabold font-mono text-slate-900 mb-1">
                  {finalScore} <span className="text-base font-normal text-slate-500">/ 100</span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Menjawab benar <strong>{correctCount}</strong> dari {QUIZ_QUESTIONS.length} butir soal.
                </p>

                {isPassed ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs mb-4">
                    <strong className="block font-bold mb-0.5">Selamat, Kamu Lulus KKM!</strong>
                    Kamu telah menguasai kompetensi dasar rasio dan proporsi SMP.
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-4">
                    <strong className="block font-bold mb-0.5">Terus Semangat Belajar!</strong>
                    Batas ketuntasan adalah skor 70. Pelajari kembali materi dan coba ulang kuis.
                  </div>
                )}

                <div className="space-y-2">
                  {isPassed && (
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setShowCertificate(true);
                      }}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Award className="w-4 h-4" />
                      <span>Lihat & Cetak Sertifikat</span>
                    </button>
                  )}
                  <button
                    onClick={handleResetQuiz}
                    className="w-full py-2 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Kuis</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* DIGITAL CERTIFICATE MODAL / VIEW */}
      {showCertificate && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-between items-center print:hidden">
            <button
              onClick={() => setShowCertificate(false)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Kembali ke Lembar Kuis
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sertifikat (PDF)</span>
            </button>
          </div>

          {/* Name Editor for certificate */}
          <div className="print:hidden bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">Nama di Sertifikat:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="text-xs p-2 rounded-lg border border-slate-300 bg-white flex-1"
            />
          </div>

          {/* Certificate Body (Pristine Classical Educational Styling) */}
          <div className="bg-white rounded-3xl border-8 border-double border-sky-800 p-8 sm:p-12 shadow-lg text-center relative overflow-hidden">
            <div className="text-xs font-bold text-sky-900 tracking-widest uppercase mb-1">
              SERTIFIKAT KELULUSAN PEMBELAJARAN DIGITAL
            </div>
            <div className="text-slate-500 text-xs mb-6">
              Model Flipped Guided Inquiry Based Learning (F-GIBL) · Kurikulum Merdeka
            </div>

            <div className="text-xs text-slate-600 italic mb-2">Diberikan dengan bangga kepada:</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display border-b-2 border-slate-200 pb-3 max-w-md mx-auto">
              {studentName}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto mt-6 leading-relaxed">
              Atas keberhasilan dan dedikasi dalam menuntaskan seluruh modul Digital Mathematics Storytelling, penyelidikan simulator interaktif, serta evaluasi kompetensi <strong>Rasio & Proporsi Matematika SMP</strong> dengan perolehan nilai:
            </p>

            <div className="my-6 inline-block bg-sky-50 border-2 border-sky-600 rounded-2xl px-6 py-3 font-mono">
              <span className="text-xs font-bold text-sky-900 block">SKOR AKHIR</span>
              <span className="text-3xl font-black text-sky-700">{finalScore} / 100</span>
              <span className="text-[11px] text-emerald-700 block font-sans font-semibold mt-0.5">● KELULUSAN TERVERIFIKASI</span>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200 text-xs text-slate-600">
              <div className="text-left">
                <div>Tanggal Penyelesaian:</div>
                <strong className="text-slate-900 font-mono">{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
              </div>
              <div className="text-right">
                <div>Pengampu Platform:</div>
                <strong className="text-slate-900">Guru Matematika SMP Nusantara</strong>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
