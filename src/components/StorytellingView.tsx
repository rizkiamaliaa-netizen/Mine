import React, { useState } from 'react';
import { ActiveTab, StoryChapter } from '../types/index.ts';
import { STORY_CHAPTERS } from '../data/curriculumData.ts';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Sparkles, BookOpen, ArrowRight, FlaskConical } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface StorytellingViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onCompleteChapter: (chapterId: string) => void;
  completedChapters: string[];
}

export const StorytellingView: React.FC<StorytellingViewProps> = ({
  setActiveTab,
  onCompleteChapter,
  completedChapters,
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const currentChapter = STORY_CHAPTERS[currentChapterIndex];
  const isCompleted = completedChapters.includes(currentChapter.id);

  const handleSelectChapter = (index: number) => {
    soundFx.playClick();
    setCurrentChapterIndex(index);
    setSelectedOption(null);
    setSubmitted(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    const chosen = currentChapter.interactiveChallenge.options[selectedOption];
    if (chosen.isCorrect) {
      soundFx.playSuccess();
      onCompleteChapter(currentChapter.id);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      soundFx.playWrong();
    }
  };

  const handleResetChallenge = () => {
    soundFx.playClick();
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <span>Digital Mathematics Storytelling</span>
            <span aria-hidden="true">·</span>
            <span>Babak {currentChapter.chapterNumber} dari {STORY_CHAPTERS.length}</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-700 font-semibold">{currentChapter.character}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {currentChapter.title}
          </h2>
          <p className="text-sm text-slate-600 mt-1">{currentChapter.subtitle}</p>
        </div>

        {/* Chapter Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {STORY_CHAPTERS.map((ch, idx) => {
            const isDone = completedChapters.includes(ch.id);
            const isCurrent = idx === currentChapterIndex;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-white text-sky-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Babak {ch.chapterNumber}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Content: 2-Zone Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Story Visual & Character Insight */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[4/3] bg-slate-100">
              <img
                src={currentChapter.image}
                alt={currentChapter.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                <span className="font-semibold">{currentChapter.character}</span>
                <span className="opacity-80 block text-[11px]">Konteks Cerita Babak {currentChapter.chapterNumber}</span>
              </div>
            </div>

            {/* Math Context Box */}
            <div className="p-5 border-t border-slate-100 bg-amber-50/50">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Konsep Matematika di Balik Cerita</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-mono">
                {currentChapter.mathContext}
              </p>
            </div>
          </div>

          {/* Quick link to relevant simulator */}
          <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">Ingin Menguji Sendiri?</div>
                <div className="text-[11px] text-slate-600">Buka simulator interaktif terkait babak ini</div>
              </div>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('simulasi');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-white border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Buka Lab
            </button>
          </div>
        </div>

        {/* Right Side: Narrative Prose & Interactive Decision Point */}
        <div className="lg:col-span-7 space-y-6">
          {/* Story Narrative Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {currentChapter.narrative.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Challenge Card (Decision Point) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Tantangan Interaktif Babak {currentChapter.chapterNumber}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
              {currentChapter.interactiveChallenge.prompt}
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              {currentChapter.interactiveChallenge.question}
            </p>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentChapter.interactiveChallenge.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                if (isSelected) {
                  optionStyle = 'border-sky-600 bg-sky-50 text-sky-900 font-medium';
                }

                if (submitted) {
                  if (option.isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (!submitted) {
                        soundFx.playClick();
                        setSelectedOption(optIdx);
                      }
                    }}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm cursor-pointer ${optionStyle}`}
                  >
                    <span>{option.text}</span>
                    <div className="shrink-0 ml-3">
                      {submitted && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                      {submitted && isSelected && !option.isCorrect && (
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {submitted && selectedOption !== null && (
              <div
                className={`p-4 rounded-xl mb-6 text-xs leading-relaxed ${
                  currentChapter.interactiveChallenge.options[selectedOption].isCorrect
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                <div className="font-bold mb-1">
                  {currentChapter.interactiveChallenge.options[selectedOption].isCorrect
                    ? 'Luar biasa, jawaban kamu tepat!'
                    : 'Ayo coba periksa lagi penalaranmu!'}
                </div>
                <div>{currentChapter.interactiveChallenge.options[selectedOption].explanation}</div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              {!submitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm cursor-pointer transition-all"
                >
                  Kirim Jawaban
                </button>
              ) : (
                <button
                  onClick={handleResetChallenge}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Coba Ulangi
                </button>
              )}

              {/* Navigation between chapters */}
              <div className="flex items-center gap-2">
                {currentChapterIndex > 0 && (
                  <button
                    onClick={() => handleSelectChapter(currentChapterIndex - 1)}
                    className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                    title="Babak Sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                {currentChapterIndex < STORY_CHAPTERS.length - 1 ? (
                  <button
                    onClick={() => handleSelectChapter(currentChapterIndex + 1)}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    <span>Babak Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('simulasi');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer"
                  >
                    <span>Lanjut ke Lab Simulasi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
