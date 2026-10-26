/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types/index.ts';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FlippedRoadmap } from './components/FlippedRoadmap.tsx';
import { StorytellingView } from './components/StorytellingView.tsx';
import { VideoPlayerView } from './components/VideoPlayerView.tsx';
import { SimulationsView } from './components/SimulationsView.tsx';
import { MaterialView } from './components/MaterialView.tsx';
import { InquiryLKPDView } from './components/InquiryLKPDView.tsx';
import { InteractiveExercises } from './components/InteractiveExercises.tsx';
import { TeacherGuideModal } from './components/TeacherGuideModal.tsx';
import { Footer } from './components/Footer.tsx';
import { ASSET_IMAGES } from './data/curriculumData.ts';
import { Play, FlaskConical, BookOpen, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundFx } from './utils/audio.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mathstory_completed_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isInquiryDone, setIsInquiryDone] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mathstory_inquiry_done') === 'true';
    } catch {
      return false;
    }
  });
  const [quizScore, setQuizScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('mathstory_quiz_score');
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteChapter = (chapterId: string) => {
    if (!completedChapters.includes(chapterId)) {
      const next = [...completedChapters, chapterId];
      setCompletedChapters(next);
      try {
        localStorage.setItem('mathstory_completed_chapters', JSON.stringify(next));
      } catch {
        // Ignore
      }
    }
  };

  const handleCompleteInquiry = () => {
    setIsInquiryDone(true);
    try {
      localStorage.setItem('mathstory_inquiry_done', 'true');
    } catch {
      // Ignore
    }
  };

  const handleCompleteQuiz = (score: number) => {
    setQuizScore(score);
    try {
      localStorage.setItem('mathstory_quiz_score', score.toString());
    } catch {
      // Ignore
    }
  };

  // Total completed activities out of 5 core milestones
  const completedCount = 
    (completedChapters.length >= 1 ? 1 : 0) +
    (completedChapters.length >= 3 ? 1 : 0) +
    (isInquiryDone ? 1 : 0) +
    (quizScore !== null ? 1 : 0) +
    (quizScore !== null && quizScore >= 70 ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      {/* Header respecting 3-zone contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        completedActivitiesCount={completedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <div>
            <HeroSection setActiveTab={handleTabChange} />
            <FlippedRoadmap setActiveTab={handleTabChange} />

            {/* Featured Interactive Modules Strip */}
            <section className="py-14 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                      <span>Eksplorasi Pembelajaran</span>
                      <span aria-hidden="true">·</span>
                      <span>3 Pilar F-GIBL</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                      Jelajahi Modul Interaktif Rasio
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                    Pilih salah satu gerbang pembelajaran di bawah ini untuk memulai investigasi matematika yang mengasyikkan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Storytelling */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                      <img
                        src={ASSET_IMAGES.resep}
                        alt="Kisah Rama dan Resep Sirup Markisa"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                        <span className="font-semibold block">Babak 1: Resep Sirup Markisa</span>
                        <span className="text-[11px] text-slate-200">Perbandingan Senilai & Partisi Campuran</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        Bantu Rama menyajikan sirup markisa legendaris untuk 20 orang tamu reuni dengan rasa manis yang identik.
                      </p>
                      <button
                        onClick={() => handleTabChange('storytelling')}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-sky-700 bg-white border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Baca & Putuskan Cerita</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Interactive Simulation */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                      <img
                        src={ASSET_IMAGES.lab}
                        alt="Laboratorium Rasio Interaktif"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                        <span className="font-semibold block">Lab Simulasi Interaktif</span>
                        <span className="text-[11px] text-slate-200">5 Misi Penyelidikan untuk 4 TP & 5 Ruang Lingkup</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        Jelajahi peracik ramuan 3 bahan, konversi besaran sejenis, komparator senilai vs berbalik nilai, studio skala & mikroskop, serta kalkulator laju satuan.
                      </p>
                      <button
                        onClick={() => handleTabChange('simulasi')}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-sky-700 bg-white border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Buka Simulator</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 3: LKPD Guided Inquiry */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                      <img
                        src={ASSET_IMAGES.skala}
                        alt="Sinta dan Skala Candi Borobudur"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                        <span className="font-semibold block">LKPD Inkuiri Digital</span>
                        <span className="text-[11px] text-slate-200">5 Tahap Penyelidikan Terarah & Ekspor PDF</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        Susun hipotesis, catat data hasil percobaan simulator, uji konstanta proporsi, dan cetak lembar kerja siswa resmi.
                      </p>
                      <button
                        onClick={() => handleTabChange('inkuiri')}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-sky-700 bg-white border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Isi Lembar Kerja (LKPD)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'storytelling' && (
          <StorytellingView
            setActiveTab={handleTabChange}
            onCompleteChapter={handleCompleteChapter}
            completedChapters={completedChapters}
          />
        )}

        {activeTab === 'video' && (
          <VideoPlayerView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'simulasi' && (
          <SimulationsView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'materi' && (
          <MaterialView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'inkuiri' && (
          <InquiryLKPDView
            setActiveTab={handleTabChange}
            onCompleteInquiry={handleCompleteInquiry}
          />
        )}

        {activeTab === 'latihan' && (
          <InteractiveExercises
            setActiveTab={handleTabChange}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {activeTab === 'panduan' && (
          <TeacherGuideModal setActiveTab={handleTabChange} />
        )}
      </main>

      {/* Educational Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}
