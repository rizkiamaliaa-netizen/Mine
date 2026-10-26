import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, VideoCheckpoint } from '../types/index.ts';
import { VIDEO_CHECKPOINTS } from '../data/curriculumData.ts';
import { Play, Pause, RotateCcw, CheckCircle2, AlertCircle, FileText, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface VideoPlayerViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({ setActiveTab }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 180; // 3 minutes total lecture
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeCheckpoint, setActiveCheckpoint] = useState<VideoCheckpoint | null>(null);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const answeredCheckpointsRef = useRef<Set<number>>(new Set());

  // Timer loop for video playback
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = Math.min(prev + 1, totalDuration);

          // Check if we hit any checkpoint that hasn't been answered yet
          const foundCheckpoint = VIDEO_CHECKPOINTS.find(
            (cp) => Math.abs(cp.timeInSeconds - nextTime) <= 1 && !answeredCheckpointsRef.current.has(cp.timeInSeconds)
          );

          if (foundCheckpoint) {
            setIsPlaying(false);
            setActiveCheckpoint(foundCheckpoint);
            setCheckpointAnswer(null);
            setCheckpointSubmitted(false);
            soundFx.playClick();
          }

          if (nextTime >= totalDuration) {
            setIsPlaying(false);
          }

          return nextTime;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => {
    soundFx.playClick();
    if (currentTime >= totalDuration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
  };

  const handleCheckpointSubmit = () => {
    if (checkpointAnswer === null || !activeCheckpoint) return;
    setCheckpointSubmitted(true);
    if (checkpointAnswer === activeCheckpoint.correctAnswer) {
      soundFx.playSuccess();
      answeredCheckpointsRef.current.add(activeCheckpoint.timeInSeconds);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFx.playWrong();
    }
  };

  const handleContinueAfterCheckpoint = () => {
    soundFx.playClick();
    setActiveCheckpoint(null);
    setCheckpointAnswer(null);
    setCheckpointSubmitted(false);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine current active section for dynamic stage animation
  let activeSectionTitle = 'Bagian 1: Pengenalan Konsep Rasio Part-to-Part & Part-to-Whole';
  let activeStageColor = 'from-amber-600 to-amber-800';
  if (currentTime >= 45 && currentTime < 90) {
    activeSectionTitle = 'Bagian 2: Perbandingan Senilai & Konstanta Proporsi (y = kx)';
    activeStageColor = 'from-sky-600 to-sky-800';
  } else if (currentTime >= 90 && currentTime < 135) {
    activeSectionTitle = 'Bagian 3: Rasio Skala pada Peta & Maket Bangunan (1 : s)';
    activeStageColor = 'from-indigo-600 to-indigo-800';
  } else if (currentTime >= 135) {
    activeSectionTitle = 'Bagian 4: Perbandingan Berbalik Nilai (x · y = k)';
    activeStageColor = 'from-emerald-600 to-emerald-800';
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
          <span>Mikro-Kuliah Interaktif (Pra-Kelas)</span>
          <span aria-hidden="true">·</span>
          <span>Model Edpuzzle/Nearpod Checkpoints</span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-700 font-semibold">Durasi: 3 Menit</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Video Pembelajaran: Menguasai Rasio & Proporsi SMP
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Tonton video penjelasan konsep dasar di bawah ini. Video akan berhenti sejenak pada titik evaluasi untuk memastikan kamu memahami setiap tahapan!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Video Box */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg aspect-video flex flex-col justify-between">
            {/* Visual Educational Stage Canvas */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-6 text-white text-center overflow-hidden">
              {/* Dynamic Animated Canvas Graphics based on current time */}
              <div className="relative z-10 max-w-lg">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                  MODUL RASIO SMP · KURIKULUM MERDEKA
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display mb-3 text-balance">
                  {activeSectionTitle}
                </h3>

                {/* Conceptual Diagram in Video */}
                {currentTime < 45 && (
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 my-2 text-xs">
                    <div className="flex items-center justify-center gap-6 mb-2">
                      <div className="text-center">
                        <div className="w-10 h-16 bg-amber-500 rounded-b-md mx-auto mb-1 border border-amber-300 flex items-end justify-center pb-1 text-[10px] font-bold">2 Takar</div>
                        <span>Sirup Markisa</span>
                      </div>
                      <span className="text-xl font-bold text-slate-400">:</span>
                      <div className="text-center">
                        <div className="w-14 h-16 bg-sky-400 rounded-b-md mx-auto mb-1 border border-sky-300 flex items-end justify-center pb-1 text-[10px] font-bold text-slate-900">5 Takar</div>
                        <span>Air Matang</span>
                      </div>
                    </div>
                    <p className="text-slate-300 font-mono text-[11px]">
                      Part-to-Part = 2 : 5 · Part-to-Whole = 2 : (2 + 5) = 2 : 7
                    </p>
                  </div>
                )}

                {currentTime >= 45 && currentTime < 90 && (
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 my-2 text-xs">
                    <div className="font-mono text-sm font-bold text-sky-400 mb-2">
                      y = k · x &nbsp;➔&nbsp; k = y / x (Konstan)
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-center">
                      <div className="p-2 bg-slate-800 rounded">1 Teko ➔ 2 Sirup</div>
                      <div className="p-2 bg-slate-800 rounded">2 Teko ➔ 4 Sirup</div>
                      <div className="p-2 bg-slate-800 rounded">5 Teko ➔ 10 Sirup</div>
                    </div>
                    <p className="text-slate-300 mt-2 text-[11px]">
                      Jika x naik 5×, maka y juga naik 5× secara proporsional.
                    </p>
                  </div>
                )}

                {currentTime >= 90 && currentTime < 135 && (
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 my-2 text-xs">
                    <div className="font-mono text-sm font-bold text-indigo-400 mb-2">
                      Skala = Jarak pada Gambar / Jarak Sebenarnya
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Skala 1 : 100 artinya 1 cm pada miniatur = 100 cm (1 meter) pada bangunan candi asli. Satuan ukuran harus selalu disamakan ke cm!
                    </p>
                  </div>
                )}

                {currentTime >= 135 && (
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 my-2 text-xs">
                    <div className="font-mono text-sm font-bold text-emerald-400 mb-2">
                      x · y = k &nbsp;➔&nbsp; y = k / x (Berbalik Nilai)
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      6 pekerja × 30 hari = 180 orang-hari. Jika ingin selesai dalam 10 hari, maka dibutuhkan 180 ÷ 10 = 18 orang pekerja!
                    </p>
                  </div>
                )}
              </div>

              {/* Checkpoint Overlay Modal if active */}
              {activeCheckpoint && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-30 flex flex-col justify-center items-center p-6 text-left">
                  <div className="max-w-md w-full bg-slate-900 border border-sky-500/50 rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Pertanyaan Titik Henti (Menit {formatTime(activeCheckpoint.timeInSeconds)})</span>
                    </div>

                    <h4 className="text-sm font-semibold text-white mb-4">
                      {activeCheckpoint.question}
                    </h4>

                    {/* Options */}
                    <div className="space-y-2 mb-4">
                      {activeCheckpoint.options.map((opt, optIdx) => {
                        const isChosen = checkpointAnswer === optIdx;
                        let optClass = 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-750';

                        if (isChosen) {
                          optClass = 'border-sky-500 bg-sky-950 text-sky-100 font-medium';
                        }

                        if (checkpointSubmitted) {
                          if (optIdx === activeCheckpoint.correctAnswer) {
                            optClass = 'border-emerald-500 bg-emerald-950 text-emerald-100';
                          } else if (isChosen && optIdx !== activeCheckpoint.correctAnswer) {
                            optClass = 'border-rose-500 bg-rose-950 text-rose-100';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              if (!checkpointSubmitted) {
                                soundFx.playClick();
                                setCheckpointAnswer(optIdx);
                              }
                            }}
                            disabled={checkpointSubmitted}
                            className={`w-full text-left p-3 rounded-lg border text-xs cursor-pointer transition-colors ${optClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {checkpointSubmitted && (
                      <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-300 mb-4 leading-relaxed">
                        <strong className="block text-white mb-1">
                          {checkpointAnswer === activeCheckpoint.correctAnswer ? 'Jawaban Benar!' : 'Pembahasan:'}
                        </strong>
                        {activeCheckpoint.explanation}
                      </div>
                    )}

                    {/* Submit / Continue Button */}
                    <div>
                      {!checkpointSubmitted ? (
                        <button
                          onClick={handleCheckpointSubmit}
                          disabled={checkpointAnswer === null}
                          className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-40 rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          Kirim Jawaban
                        </button>
                      ) : (
                        <button
                          onClick={handleContinueAfterCheckpoint}
                          className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          Lanjutkan Video
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-col gap-2">
              {/* Timeline Progress Bar */}
              <div className="relative w-full h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden group">
                <div
                  className="h-full bg-sky-500 transition-all rounded-full"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                />
                {/* Marker dots for checkpoints */}
                {VIDEO_CHECKPOINTS.map((cp, idx) => {
                  const leftPercent = (cp.timeInSeconds / totalDuration) * 100;
                  const isDone = answeredCheckpointsRef.current.has(cp.timeInSeconds);
                  return (
                    <div
                      key={idx}
                      className={`absolute top-0 w-2 h-2 rounded-full -translate-x-1/2 pointer-events-none ${
                        isDone ? 'bg-emerald-400' : 'bg-amber-400 ring-2 ring-slate-900'
                      }`}
                      style={{ left: `${leftPercent}%` }}
                      title={`Titik henti: ${formatTime(cp.timeInSeconds)}`}
                    />
                  );
                })}
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-colors"
                    title={isPlaying ? 'Jeda' : 'Putar'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setCurrentTime(0);
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                    title="Ulangi dari Awal"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-slate-300">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
                      setPlaybackSpeed(nextSpeed);
                      soundFx.playClick();
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-mono cursor-pointer"
                    title="Kecepatan Putar"
                  >
                    {playbackSpeed}x
                  </button>
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="flex items-center gap-1 text-[11px] hover:text-white cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{showTranscript ? 'Tutup Transkrip' : 'Transkrip'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Panel (Collapsible) */}
          {showTranscript && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-xs text-slate-700 space-y-3 leading-relaxed shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm">Transkrip Lengkap Pembelajaran Video</h4>
              <p>
                <strong>00:00 - 00:45 (Konsep Rasio Dasar):</strong> Halo sahabat pembelajar SMP! Rasio atau perbandingan adalah cara membandingkan dua besaran sejenis. Ada dua bentuk utama: part-to-part (membandingkan satu bahan dengan bahan lain, seperti 2 takar sirup berbanding 5 takar air) dan part-to-whole (membandingkan bahan terhadap total keseluruhan minuman, 2 takar sirup dari total 7 takar minuman).
              </p>
              <p>
                <strong>00:45 - 01:30 (Perbandingan Senilai):</strong> Perbandingan senilai terjadi saat satu variabel berlipat ganda, variabel pasangannya juga berlipat ganda dengan pengali yang sama. Nilai hasil bagi y/x selalu konstan (k). Contohnya adalah harga barang per kg dan konsumsi bensin terhadap jarak tempuh.
              </p>
              <p>
                <strong>01:30 - 02:15 (Skala & Miniatur):</strong> Skala adalah rasio jarak pada peta atau ukuran maket miniatur dibanding ukuran sesungguhnya di lapangan. Penting sekali: sebelum menyederhanakan rasio skala, kedua satuan panjang wajib disamakan terlebih dahulu ke centimeter (cm).
              </p>
              <p>
                <strong>02:15 - 03:00 (Perbandingan Berbalik Nilai):</strong> Berbeda dengan perbandingan senilai, pada perbandingan berbalik nilai, ketika satu variabel bertambah besar, variabel pasangannya justru mengecil secara proporsional. Yang konstan adalah hasil kalinya: x · y = k. Contoh utama: banyak pekerja terhadap hari pengerjaan, serta kecepatan kendaraan terhadap waktu tempuh perjalanan.
              </p>
            </div>
          )}
        </div>

        {/* Video Module Chapter Outline */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 font-display">
              Daftar Titik Penyelidikan Video
            </h3>
            <div className="space-y-3">
              {VIDEO_CHECKPOINTS.map((cp, idx) => {
                const isDone = answeredCheckpointsRef.current.has(cp.timeInSeconds);
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                      isDone
                        ? 'border-emerald-200 bg-emerald-50/60'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                    onClick={() => {
                      handleSeek(cp.timeInSeconds);
                      soundFx.playClick();
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-semibold text-slate-700">
                        Menit {formatTime(cp.timeInSeconds)}
                      </span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Terjawab
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-700 font-medium">Titik Pertanyaan</span>
                      )}
                    </div>
                    <p className="text-slate-600 line-clamp-2">{cp.question}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('simulasi');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm cursor-pointer"
              >
                <span>Lanjut ke Laboratorium Simulasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
