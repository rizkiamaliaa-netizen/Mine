import React, { useState } from 'react';
import { ActiveTab } from '../types/index.ts';
import { Volume2, VolumeX, Menu, X, BookOpen } from 'lucide-react';
import { soundFx } from '../utils/audio.ts';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  completedActivitiesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedActivitiesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundFx.soundEnabled = next;
    if (next) soundFx.playClick();
  };

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'storytelling', label: 'Storytelling' },
    { id: 'video', label: 'Video Pembelajaran' },
    { id: 'simulasi', label: 'Lab Simulasi' },
    { id: 'materi', label: 'Materi & Contoh' },
    { id: 'inkuiri', label: 'LKPD Inkuiri' },
    { id: 'latihan', label: 'Latihan & Kuis' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    soundFx.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Google Sites style banner strip */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Google Sites Edukasi</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>Matematika SMP Kelas VII</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>Model Flipped Guided Inquiry</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:inline text-slate-300">
            Progres Belajar: <strong className="text-emerald-400 font-mono">{completedActivitiesCount}/5</strong> Misi
          </span>
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={soundOn ? 'Matikan Suara Audio' : 'Aktifkan Suara Audio'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span className="text-[11px] font-mono">{soundOn ? 'Audio ON' : 'Audio OFF'}</span>
          </button>
        </div>
      </div>

      {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="text-left flex items-center gap-2.5 whitespace-nowrap shrink-0 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-sky-700 transition-colors">
              R
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight font-display">
                MathStory Rasio
              </span>
              <span className="text-[11px] text-slate-500 block">
                SMP Kelas VII · Kurikulum Merdeka
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Single-line, clean text with underline / active indicator) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer text-sm ${
                    isActive
                      ? 'text-sky-700 font-semibold'
                      : 'hover:text-slate-900 text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('inkuiri')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 active:bg-sky-800 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Buka LKPD Digital</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                activeTab === item.id
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('panduan')}
            className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100"
          >
            Panduan Guru (Model F-GIBL)
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('inkuiri')}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg"
            >
              Buka LKPD Inkuiri
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
