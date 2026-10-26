import React, { useState } from 'react';
import { ActiveTab, SimulationMissionId } from '../types/index.ts';
import { SIMULATION_MISSIONS } from '../data/curriculumData.ts';
import { 
  RotateCcw, Check, Sparkles, AlertCircle, ArrowRight, BookOpen, 
  Layers, Scale, TrendingUp, Search, ShoppingBag, Gauge, Droplets
} from 'lucide-react';
import { soundFx } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface SimulationsViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

// Greatest Common Divisor helper for 2 and 3 numbers
function getGCD(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function getGCD3(a: number, b: number, c: number): number {
  return getGCD(getGCD(a, b), c);
}

export const SimulationsView: React.FC<SimulationsViewProps> = ({ setActiveTab }) => {
  const [activeMission, setActiveMission] = useState<SimulationMissionId>('misi-1');

  // ==========================================
  // MISI 1 STATES: Ramuan 3 Bahan & Part-to-Whole
  // ==========================================
  const [partA, setPartA] = useState(2); // Kunyit / Markisa
  const [partB, setPartB] = useState(3); // Madu
  const [partC, setPartC] = useState(5); // Air Mineral
  const [multiplicativeFactor, setMultiplicativeFactor] = useState(1);

  // Misi 1 Calculations
  const scaledA = partA * multiplicativeFactor;
  const scaledB = partB * multiplicativeFactor;
  const scaledC = partC * multiplicativeFactor;
  const totalVolume = scaledA + scaledB + scaledC;
  const gcd3 = getGCD3(scaledA, scaledB, scaledC);
  const simpleA = scaledA / gcd3;
  const simpleB = scaledB / gcd3;
  const simpleC = scaledC / gcd3;
  const pctA = Math.round((scaledA / totalVolume) * 100);
  const pctB = Math.round((scaledB / totalVolume) * 100);
  const pctC = 100 - pctA - pctB;

  // ==========================================
  // MISI 2 STATES: Konversi Satuan Sejenis
  // ==========================================
  type UnitCategory = 'panjang' | 'massa' | 'waktu' | 'benda';
  const [unitCategory, setUnitCategory] = useState<UnitCategory>('panjang');

  // Length presets: cm, m, km
  const [lenVal1, setLenVal1] = useState(45);
  const [lenUnit1, setLenUnit1] = useState<'cm' | 'm'>('cm');
  const [lenVal2, setLenVal2] = useState(1.5);
  const [lenUnit2, setLenUnit2] = useState<'cm' | 'm'>('m');

  // Mass presets: gram, ons, kg
  const [massVal1, setMassVal1] = useState(250);
  const [massUnit1, setMassUnit1] = useState<'gram' | 'ons' | 'kg'>('gram');
  const [massVal2, setMassVal2] = useState(1);
  const [massUnit2, setMassUnit2] = useState<'gram' | 'ons' | 'kg'>('kg');

  // Time presets: detik, menit, jam
  const [timeVal1, setTimeVal1] = useState(30);
  const [timeUnit1, setTimeUnit1] = useState<'detik' | 'menit' | 'jam'>('menit');
  const [timeVal2, setTimeVal2] = useState(2);
  const [timeUnit2, setTimeUnit2] = useState<'detik' | 'menit' | 'jam'>('jam');

  // Objects count: buah, lusin, kodi
  const [countVal1, setCountVal1] = useState(18);
  const [countUnit1, setCountUnit1] = useState<'buah' | 'lusin' | 'kodi'>('buah');
  const [countVal2, setCountVal2] = useState(2);
  const [countUnit2, setCountUnit2] = useState<'buah' | 'lusin' | 'kodi'>('lusin');

  // Misi 2 Calculations Helper
  let convertedA = 0;
  let convertedB = 0;
  let baseUnitLabel = '';
  let conversionNote = '';

  if (unitCategory === 'panjang') {
    convertedA = lenUnit1 === 'm' ? lenVal1 * 100 : lenVal1;
    convertedB = lenUnit2 === 'm' ? lenVal2 * 100 : lenVal2;
    baseUnitLabel = 'cm';
    conversionNote = `${lenVal1} ${lenUnit1} = ${convertedA} cm dan ${lenVal2} ${lenUnit2} = ${convertedB} cm`;
  } else if (unitCategory === 'massa') {
    convertedA = massUnit1 === 'kg' ? massVal1 * 1000 : massUnit1 === 'ons' ? massVal1 * 100 : massVal1;
    convertedB = massUnit2 === 'kg' ? massVal2 * 1000 : massUnit2 === 'ons' ? massVal2 * 100 : massVal2;
    baseUnitLabel = 'gram';
    conversionNote = `${massVal1} ${massUnit1} = ${convertedA} g dan ${massVal2} ${massUnit2} = ${convertedB} g`;
  } else if (unitCategory === 'waktu') {
    convertedA = timeUnit1 === 'jam' ? timeVal1 * 3600 : timeUnit1 === 'menit' ? timeVal1 * 60 : timeVal1;
    convertedB = timeUnit2 === 'jam' ? timeVal2 * 3600 : timeUnit2 === 'menit' ? timeVal2 * 60 : timeVal2;
    baseUnitLabel = 'detik';
    conversionNote = `${timeVal1} ${timeUnit1} = ${convertedA} dtk dan ${timeVal2} ${timeUnit2} = ${convertedB} dtk`;
  } else {
    convertedA = countUnit1 === 'kodi' ? countVal1 * 20 : countUnit1 === 'lusin' ? countVal1 * 12 : countVal1;
    convertedB = countUnit2 === 'kodi' ? countVal2 * 20 : countUnit2 === 'lusin' ? countVal2 * 12 : countVal2;
    baseUnitLabel = 'buah';
    conversionNote = `${countVal1} ${countUnit1} = ${convertedA} buah dan ${countVal2} ${countUnit2} = ${convertedB} buah`;
  }

  const gcdUnit = getGCD(convertedA, convertedB);
  const simpleUnitA = Math.round(convertedA / gcdUnit);
  const simpleUnitB = Math.round(convertedB / gcdUnit);

  // ==========================================
  // MISI 3 STATES: Senilai vs Berbalik vs Bukan Proporsional
  // ==========================================
  type ProportionalRelation = 'senilai' | 'berbalik' | 'bukan';
  const [selectedRelation, setSelectedRelation] = useState<ProportionalRelation>('senilai');
  const [inputX, setInputX] = useState(4);

  // Misi 3 Calculations
  // Case 1: Senilai: Bensin vs Jarak (y = 15x km) -> k = 15
  // Case 2: Berbalik: Pekerja vs Hari (y = 120 / x) -> k = 120
  // Case 3: Bukan Proporsional: Buka Pintu Taksi (y = 10000 + 4000x)
  let yVal = 0;
  let kConstantText = '';
  let relationFormula = '';
  let graphType = '';

  if (selectedRelation === 'senilai') {
    yVal = inputX * 15;
    kConstantText = `k = y / x = ${yVal} / ${inputX} = 15 (Konstan!)`;
    relationFormula = 'y = 15 · x';
    graphType = 'Garis lurus melintasi titik asal (0, 0)';
  } else if (selectedRelation === 'berbalik') {
    yVal = Math.round((120 / inputX) * 10) / 10;
    kConstantText = `k = x · y = ${inputX} × ${yVal} ≈ ${Math.round(inputX * yVal)} (Konstan!)`;
    relationFormula = 'y = 120 / x';
    graphType = 'Kurva hiperbola melengkung mulus';
  } else {
    yVal = 10000 + inputX * 4000;
    kConstantText = `y/x = ${(yVal / inputX).toFixed(0)} (Berubah-ubah, BUKAN konstan!)`;
    relationFormula = 'y = 10.000 + 4.000 · x';
    graphType = 'Garis lurus dengan perpotongan awal non-nol di (0, 10.000)';
  }

  // ==========================================
  // MISI 4 STATES: Skala & Faktor Pengecilan/Pembesaran
  // ==========================================
  type ScaleMode = 'pengecilan' | 'pembesaran';
  const [scaleMode, setScaleMode] = useState<ScaleMode>('pengecilan');

  // Pengecilan (1 : n)
  const [reductionScaleN, setReductionScaleN] = useState(100); // 1 : 100
  const [selectedObject, setSelectedObject] = useState<'borobudur' | 'tongkonan' | 'denah_kamar'>('borobudur');

  // Pembesaran (n : 1)
  const [magnifyN, setMagnifyN] = useState(20); // 20 : 1
  const [microscopeObject, setMicroscopeObject] = useState<'stomata' | 'kristal'>('stomata');

  const reductionObjects = {
    borobudur: { name: 'Candi Borobudur', realCm: 3500, realLabel: '35 meter (3.500 cm)', unit: 'Tinggi' },
    tongkonan: { name: 'Rumah Tongkonan Toraja', realCm: 1400, realLabel: '14 meter (1.400 cm)', unit: 'Tinggi' },
    denah_kamar: { name: 'Ruang Tamu Rumah Tradisional', realCm: 600, realLabel: '6 meter (600 cm)', unit: 'Panjang' },
  };

  const magnifyObjects = {
    stomata: { name: 'Stomata Sel Daun', realMm: 0.05, realLabel: '0,05 mm (50 mikron)' },
    kristal: { name: 'Kristal Garam Dapur', realMm: 0.4, realLabel: '0,40 mm' },
  };

  // Calculations for Misi 4
  const activeReduction = reductionObjects[selectedObject];
  const drawingDimensionCm = (activeReduction.realCm / reductionScaleN).toFixed(2);
  const isFitsTable = Number(drawingDimensionCm) <= 150; // Exhibition table limit 150 cm

  const activeMagnify = magnifyObjects[microscopeObject];
  const microscopeViewMm = (activeMagnify.realMm * magnifyN).toFixed(2);
  const microscopeViewCm = (Number(microscopeViewMm) / 10).toFixed(2);

  // ==========================================
  // MISI 5 STATES: Laju Satuan (Unit Rate) & Smart Shopper
  // ==========================================
  type UnitRateMode = 'shopper' | 'debit' | 'kecepatan';
  const [rateMode, setRateMode] = useState<UnitRateMode>('shopper');

  // Shopper comparison: 2 packages of Liquid Milk
  const [packAVolume, setPackAVolume] = useState(250);
  const [packAPrice, setPackAPrice] = useState(8000);
  const [packBVolume, setPackBVolume] = useState(900);
  const [packBPrice, setPackBPrice] = useState(25000);

  // Water tap flow (Debit)
  const [tapVolumeL, setTapVolumeL] = useState(60);
  const [tapTimeMin, setTapTimeMin] = useState(5);

  // Speed
  const [speedDistanceKm, setSpeedDistanceKm] = useState(120);
  const [speedTimeH, setSpeedTimeH] = useState(2);

  // Misi 5 Calculations
  const unitPriceA = packAPrice / packAVolume; // Rp / ml
  const unitPriceB = packBPrice / packBVolume; // Rp / ml
  const isPackBCheaper = unitPriceB < unitPriceA;
  const savingPct = Math.round((Math.abs(unitPriceA - unitPriceB) / Math.max(unitPriceA, unitPriceB)) * 100);

  const debitRate = (tapVolumeL / tapTimeMin).toFixed(1); // L/menit
  const speedRate = (speedDistanceKm / speedTimeH).toFixed(1); // km/jam

  // Mission switch helper
  const handleSelectMission = (mId: SimulationMissionId) => {
    soundFx.playClick();
    setActiveMission(mId);
  };

  const activeMissionMeta = SIMULATION_MISSIONS.find((m) => m.id === activeMission)!;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
          <span>Laboratorium Interaktif</span>
          <span aria-hidden="true">·</span>
          <span>5 Ruang Lingkup Materi</span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-700 font-semibold">4 Tujuan Pembelajaran (TP)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Lab Simulasi Digital Rasio Matematika
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
          Pilih misi laboratorium di bawah ini. Tiap simulasi dirancang khusus untuk memvisualisasikan satu tujuan pembelajaran (TP) melalui manipulasi parameter real-time.
        </p>
      </div>

      {/* 5-Mission Segmented Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-8">
        {SIMULATION_MISSIONS.map((mission) => {
          const isSelected = activeMission === mission.id;
          return (
            <button
              key={mission.id}
              onClick={() => handleSelectMission(mission.id)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-50 border-sky-600 text-sky-950 shadow-sm ring-1 ring-sky-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                  <span className={`font-bold ${isSelected ? 'text-sky-700' : 'text-slate-500'}`}>
                    MISI 0{mission.missionNumber}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-semibold">
                    {mission.tpCode}
                  </span>
                </div>
                <div className="text-xs font-bold font-display leading-snug line-clamp-2">
                  {mission.title}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 mt-2 line-clamp-1">
                {mission.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Mission Context Banner */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <span>{activeMissionMeta.tpCode}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{activeMissionMeta.title}</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {activeMissionMeta.conceptSummary}
          </div>
        </div>
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveTab('inkuiri');
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg cursor-pointer whitespace-nowrap"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Buka LKPD Misi</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MISI 1: LAB PERACIK RAMUAN 3 KOMPONEN (TP 1.1) */}
      {/* ========================================================================= */}
      {activeMission === 'misi-1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Stage */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Visualisasi Bejana 3 Lapis Bahan</span>
              </span>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setPartA(2);
                  setPartB(3);
                  setPartC(5);
                  setMultiplicativeFactor(1);
                }}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Ramuan Standar</span>
              </button>
            </div>

            {/* Cylinder Liquid Stage */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
              {/* Layered Pitcher Cylinder */}
              <div className="relative w-44 h-72 border-4 border-slate-700 rounded-b-3xl bg-slate-50 overflow-hidden shadow-inner flex flex-col justify-end p-1">
                {/* Layer C: Air Mineral */}
                <div
                  className="w-full bg-sky-300/80 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-slate-900 border-b border-sky-400"
                  style={{ height: `${(scaledC / totalVolume) * 100}%` }}
                >
                  C: Air ({scaledC} tkr)
                </div>
                {/* Layer B: Madu */}
                <div
                  className="w-full bg-amber-600/90 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white border-b border-amber-700"
                  style={{ height: `${(scaledB / totalVolume) * 100}%` }}
                >
                  B: Madu ({scaledB} tkr)
                </div>
                {/* Layer A: Ekstrak Kunyit/Markisa */}
                <div
                  className="w-full bg-amber-400/95 rounded-b-2xl transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-slate-900"
                  style={{ height: `${(scaledA / totalVolume) * 100}%` }}
                >
                  A: Kunyit ({scaledA} tkr)
                </div>
              </div>

              {/* Analytical Readouts */}
              <div className="flex-1 space-y-3 w-full">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">Notasi Rasio 3 Bahan (A : B : C)</div>
                  <div className="text-xl font-bold font-mono text-slate-900">
                    {scaledA} : {scaledB} : {scaledC}
                  </div>
                  <div className="text-xs text-sky-700 font-mono mt-0.5">
                    Bentuk Paling Sederhana: <strong>{simpleA} : {simpleB} : {simpleC}</strong> (FPB = {gcd3})
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <div className="text-[11px] text-slate-500 font-medium mb-1">
                    Bagian terhadap Keseluruhan (Part-to-Whole):
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Bahan A / Total:</span>
                    <strong className="text-slate-900">{scaledA}/{totalVolume} ({pctA}%)</strong>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Bahan B / Total:</span>
                    <strong className="text-slate-900">{scaledB}/{totalVolume} ({pctB}%)</strong>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Bahan C / Total:</span>
                    <strong className="text-slate-900">{scaledC}/{totalVolume} ({pctC}%)</strong>
                  </div>
                </div>

                {/* Multiplicative Principle Note */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <div className="font-bold mb-0.5">● Perbandingan Multiplikatif Terverifikasi</div>
                  <p className="text-[11px] leading-relaxed">
                    Meskipun takaran dikalikan <strong>{multiplicativeFactor}x</strong>, rasio sederhananya tetap <strong>{simpleA} : {simpleB} : {simpleC}</strong>. Komposisi rasa tidak berubah!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Control Deck */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1 text-xs">
                <label className="font-semibold text-slate-800">Bahan A (Kunyit/Markisa)</label>
                <span className="font-mono font-bold text-amber-700">{partA} Takar</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={partA}
                onChange={(e) => setPartA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1 text-xs">
                <label className="font-semibold text-slate-800">Bahan B (Madu Hutan)</label>
                <span className="font-mono font-bold text-amber-800">{partB} Takar</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={partB}
                onChange={(e) => setPartB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1 text-xs">
                <label className="font-semibold text-slate-800">Bahan C (Air Mineral/Kelapa)</label>
                <span className="font-mono font-bold text-sky-700">{partC} Takar</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={partC}
                onChange={(e) => setPartC(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Multiplier button strip */}
            <div className="pt-3 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-800 block mb-2">
                Faktor Pengali Skala Multiplikatif (Ekuivalensi)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 5].map((factor) => (
                  <button
                    key={factor}
                    onClick={() => {
                      soundFx.playClick();
                      setMultiplicativeFactor(factor);
                    }}
                    className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg border cursor-pointer transition-all ${
                      multiplicativeFactor === factor
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {factor}× Takaran
                  </button>
                ))}
              </div>
            </div>

            {/* Inkuiri Quick Challenge */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
              <div className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Tantangan Ekuivalensi TP 1.1</span>
              </div>
              <p className="text-amber-950 text-[11px] leading-relaxed">
                Buatlah ramuan dengan rasio sederhana <strong>1 : 2 : 4</strong> dengan cara mengatur A = 2, B = 4, C = 8, lalu uji tombol pengali 3× untuk melihat volume totalnya (42 takar)!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MISI 2: LAB PENYETARAAN SATUAN SEJENIS (TP 1.2) */}
      {/* ========================================================================= */}
      {activeMission === 'misi-2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Stage */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-sky-600" />
                <span>Neraca Penyetaraan Satuan Sejenis</span>
              </span>
              <span className="text-xs font-mono font-bold text-sky-800">
                Kategori: {unitCategory.toUpperCase()}
              </span>
            </div>

            {/* Comparison Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] font-bold text-slate-500 mb-1">Objek Pertama (A)</div>
                <div className="text-2xl font-bold font-mono text-slate-900">
                  {unitCategory === 'panjang' && `${lenVal1} ${lenUnit1}`}
                  {unitCategory === 'massa' && `${massVal1} ${massUnit1}`}
                  {unitCategory === 'waktu' && `${timeVal1} ${timeUnit1}`}
                  {unitCategory === 'benda' && `${countVal1} ${countUnit1}`}
                </div>
                <div className="text-xs font-mono text-sky-700 mt-1">
                  = {convertedA.toLocaleString('id-ID')} {baseUnitLabel}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] font-bold text-slate-500 mb-1">Objek Kedua (B)</div>
                <div className="text-2xl font-bold font-mono text-slate-900">
                  {unitCategory === 'panjang' && `${lenVal2} ${lenUnit2}`}
                  {unitCategory === 'massa' && `${massVal2} ${massUnit2}`}
                  {unitCategory === 'waktu' && `${timeVal2} ${timeUnit2}`}
                  {unitCategory === 'benda' && `${countVal2} ${countUnit2}`}
                </div>
                <div className="text-xs font-mono text-sky-700 mt-1">
                  = {convertedB.toLocaleString('id-ID')} {baseUnitLabel}
                </div>
              </div>
            </div>

            {/* 4-Step Scientific Derivation */}
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2 mt-2">
              <div className="text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                Langkah Matematis Penyetaraan Satuan:
              </div>
              <div className="text-slate-300">
                1. Satuan Awal: <strong>{conversionNote}</strong>
              </div>
              <div className="text-slate-300">
                2. Rasio Bersatuan Sama: <strong>{convertedA} {baseUnitLabel} : {convertedB} {baseUnitLabel}</strong>
              </div>
              <div className="text-sky-300">
                3. Faktor Pembagi Terbesar: <strong>FPB({convertedA}, {convertedB}) = {gcdUnit}</strong>
              </div>
              <div className="text-emerald-300 font-bold text-sm pt-1 border-t border-slate-800">
                ➔ Bentuk Sederhana Akhir: {simpleUnitA} : {simpleUnitB}
              </div>
            </div>
          </div>

          {/* Control Deck */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-2">
                Pilih Besaran Sejenis
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'panjang', label: 'Panjang (cm, m)' },
                  { id: 'massa', label: 'Massa (g, ons, kg)' },
                  { id: 'waktu', label: 'Waktu (dtk, mnt, jam)' },
                  { id: 'benda', label: 'Benda (buah, lusin)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundFx.playClick();
                      setUnitCategory(item.id as UnitCategory);
                    }}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-left cursor-pointer transition-all ${
                      unitCategory === item.id
                        ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Controls based on selected category */}
            {unitCategory === 'panjang' && (
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Nilai Panjang 1 ({lenUnit1})</span>
                    <span className="font-mono font-bold text-sky-700">{lenVal1} {lenUnit1}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={lenVal1}
                    onChange={(e) => setLenVal1(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Nilai Panjang 2 ({lenUnit2})</span>
                    <span className="font-mono font-bold text-sky-700">{lenVal2} {lenUnit2}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={lenVal2}
                    onChange={(e) => setLenVal2(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
              </div>
            )}

            {unitCategory === 'massa' && (
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Massa 1 ({massUnit1})</span>
                    <span className="font-mono font-bold text-sky-700">{massVal1} {massUnit1}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={massVal1}
                    onChange={(e) => setMassVal1(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Massa 2 ({massUnit2})</span>
                    <span className="font-mono font-bold text-sky-700">{massVal2} {massUnit2}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={massVal2}
                    onChange={(e) => setMassVal2(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
              </div>
            )}

            {unitCategory === 'waktu' && (
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Waktu 1 ({timeUnit1})</span>
                    <span className="font-mono font-bold text-sky-700">{timeVal1} {timeUnit1}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={timeVal1}
                    onChange={(e) => setTimeVal1(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Waktu 2 ({timeUnit2})</span>
                    <span className="font-mono font-bold text-sky-700">{timeVal2} {timeUnit2}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={timeVal2}
                    onChange={(e) => setTimeVal2(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
              </div>
            )}

            {unitCategory === 'benda' && (
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Benda 1 ({countUnit1})</span>
                    <span className="font-mono font-bold text-sky-700">{countVal1} {countUnit1}</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={countVal1}
                    onChange={(e) => setCountVal1(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Benda 2 ({countUnit2})</span>
                    <span className="font-mono font-bold text-sky-700">{countVal2} {countUnit2}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={countVal2}
                    onChange={(e) => setCountVal2(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MISI 3: LAB KOMPARATOR HUBUNGAN PROPORSIONAL (TP 2) */}
      {/* ========================================================================= */}
      {activeMission === 'misi-3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Coordinate Graph Stage */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Visualisasi Grafik Bidang Koordinat Kartesius</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-800">
                {relationFormula}
              </span>
            </div>

            {/* SVG Graph Canvas */}
            <div className="relative w-full h-64 bg-slate-950 rounded-xl overflow-hidden p-4 flex items-center justify-center">
              {/* Coordinate Grid Lines */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 180">
                {/* Horizontal grid lines */}
                <line x1="30" y1="20" x2="280" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="30" y1="60" x2="280" y2="60" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="30" y1="100" x2="280" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="30" y1="140" x2="280" y2="140" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* Axes */}
                <line x1="30" y1="150" x2="285" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="30" y1="10" x2="30" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="280" y="165" fill="#94a3b8" fontSize="10" fontFamily="monospace">x</text>
                <text x="15" y="18" fill="#94a3b8" fontSize="10" fontFamily="monospace">y</text>

                {/* Curve plotting according to selected relation */}
                {selectedRelation === 'senilai' && (
                  <>
                    <line x1="30" y1="150" x2="270" y2="20" stroke="#38bdf8" strokeWidth="2.5" />
                    {/* Active point */}
                    <circle
                      cx={30 + (inputX / 10) * 240}
                      cy={150 - (inputX / 10) * 130}
                      r="5"
                      fill="#38bdf8"
                      className="animate-pulse"
                    />
                  </>
                )}

                {selectedRelation === 'berbalik' && (
                  <>
                    <path
                      d="M 45 30 Q 75 110 270 145"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={30 + (inputX / 12) * 240}
                      cy={Math.max(25, Math.min(145, 150 - (120 / inputX / 120) * 125))}
                      r="5"
                      fill="#34d399"
                      className="animate-pulse"
                    />
                  </>
                )}

                {selectedRelation === 'bukan' && (
                  <>
                    <line x1="30" y1="115" x2="270" y2="25" stroke="#f43f5e" strokeWidth="2.5" />
                    <circle
                      cx={30 + (inputX / 10) * 240}
                      cy={115 - (inputX / 10) * 90}
                      r="5"
                      fill="#f43f5e"
                      className="animate-pulse"
                    />
                  </>
                )}
              </svg>

              <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-400">
                Titik Aktif: ({inputX}, {yVal.toLocaleString('id-ID')})
              </div>
            </div>

            {/* Diagnostic Table */}
            <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="p-2 border-b">Variabel x</th>
                    <th className="p-2 border-b">Variabel y</th>
                    <th className="p-2 border-b">Uji Hasil Bagi (y/x)</th>
                    <th className="p-2 border-b">Uji Hasil Kali (x·y)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {[2, 4, 6, 8].map((val) => {
                    let y = 0;
                    if (selectedRelation === 'senilai') y = val * 15;
                    else if (selectedRelation === 'berbalik') y = Math.round((120 / val) * 10) / 10;
                    else y = 10000 + val * 4000;

                    const isCurrent = inputX === val;
                    return (
                      <tr key={val} className={isCurrent ? 'bg-sky-50 font-bold text-sky-900' : ''}>
                        <td className="p-2">{val}</td>
                        <td className="p-2">{y}</td>
                        <td className="p-2">{(y / val).toFixed(1)}</td>
                        <td className="p-2">{(val * y).toFixed(0)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Control Deck */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-2">
                Pilih Model Kasus Hubungan
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedRelation('senilai');
                    setInputX(4);
                  }}
                  className={`w-full p-3 rounded-lg text-xs font-medium border text-left cursor-pointer transition-all ${
                    selectedRelation === 'senilai'
                      ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span>Kasus 1: Hubungan Senilai</span>
                    <span className="font-mono text-[10px] text-sky-700">y = 15x</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">Bensin 1 liter menempuh 15 km</div>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedRelation('berbalik');
                    setInputX(4);
                  }}
                  className={`w-full p-3 rounded-lg text-xs font-medium border text-left cursor-pointer transition-all ${
                    selectedRelation === 'berbalik'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span>Kasus 2: Hubungan Berbalik Nilai</span>
                    <span className="font-mono text-[10px] text-emerald-700">x · y = 120</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">Pekerja vs hari penyelesaian jembatan</div>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedRelation('bukan');
                    setInputX(4);
                  }}
                  className={`w-full p-3 rounded-lg text-xs font-medium border text-left cursor-pointer transition-all ${
                    selectedRelation === 'bukan'
                      ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span>Kasus 3: Bukan Proporsional</span>
                    <span className="font-mono text-[10px] text-rose-600">y = 10.000 + 4.000x</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">Tarif buka pintu taksi (ada biaya awal)</div>
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">Ubah Nilai x (Input Slider)</span>
                <span className="font-mono font-bold text-slate-900">x = {inputX}</span>
              </div>
              <input
                type="range"
                min="1"
                max={selectedRelation === 'berbalik' ? 12 : 10}
                value={inputX}
                onChange={(e) => setInputX(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            {/* Mathematical Verdict */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 mb-1">Kesimpulan Karakteristik TP 2:</div>
              <div className="font-mono text-sky-800 mb-1">{kConstantText}</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Bentuk kurva: <strong>{graphType}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MISI 4: STUDIO SKALA & MIKROSKOP (TP 3) */}
      {/* ========================================================================= */}
      {activeMission === 'misi-4' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Stage */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>
                  {scaleMode === 'pengecilan' ? 'Studio Gambar Skala Arsitektur' : 'Lensa Mikroskop Pembesaran'}
                </span>
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700">
                {scaleMode === 'pengecilan' ? `Skala 1 : ${reductionScaleN}` : `Skala ${magnifyN} : 1`}
              </span>
            </div>

            {scaleMode === 'pengecilan' ? (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] font-bold text-slate-500 mb-1">Ukuran Sebenarnya (Js)</div>
                    <div className="text-xl font-bold text-slate-900 mb-1">{activeReduction.name}</div>
                    <div className="text-2xl font-extrabold text-sky-800 font-mono">
                      {activeReduction.realLabel}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-center">
                    <div className="text-[11px] font-bold text-indigo-800 mb-1">Ukuran pada Gambar / Maket (Jp)</div>
                    <div className="text-xl font-bold text-slate-900 mb-1">Dimensi Model Meja</div>
                    <div className="text-2xl font-extrabold text-indigo-700 font-mono">
                      {drawingDimensionCm} cm
                    </div>
                  </div>
                </div>

                {/* Reality Check Box */}
                <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                  isFitsTable
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}>
                  {isFitsTable ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-bold">
                      {isFitsTable ? '● Kewajaran Ukuran Nyata: SESUAI' : '▲ Melebihi Kapasitas Meja Pameran'}
                    </strong>
                    <p className="text-[11px] mt-0.5 leading-relaxed">
                      {isFitsTable
                        ? `Dengan panjang ${drawingDimensionCm} cm, miniatur ini muat secara proporsional di atas meja pameran museum (maks 150 cm).`
                        : `Ukuran ${drawingDimensionCm} cm terlalu besar untuk meja museum! Perbesar faktor skala (misal 1 : 100 atau 1 : 200).`}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] font-bold text-slate-500 mb-1">Ukuran Preparat Asli (Js)</div>
                    <div className="text-xl font-bold text-slate-900 mb-1">{activeMagnify.name}</div>
                    <div className="text-2xl font-extrabold text-slate-800 font-mono">
                      {activeMagnify.realLabel}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-center">
                    <div className="text-[11px] font-bold text-indigo-800 mb-1">Ukuran Lensa Mikroskop (Jp)</div>
                    <div className="text-xl font-bold text-slate-900 mb-1">Tampak Pengamatan</div>
                    <div className="text-2xl font-extrabold text-indigo-700 font-mono">
                      {microscopeViewMm} mm ({microscopeViewCm} cm)
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
                  <div className="text-amber-400 font-bold uppercase text-[10px]">Prinsip Skala Pembesaran (n : 1):</div>
                  <div>Jp = Js × Faktor Pembesaran</div>
                  <div className="text-sky-300">
                    = {activeMagnify.realMm} mm × {magnifyN} = <strong>{microscopeViewMm} mm</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Control Deck */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-2">
                Pilih Mode Eksplorasi Skala
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setScaleMode('pengecilan');
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium border text-center cursor-pointer transition-all ${
                    scaleMode === 'pengecilan'
                      ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Pengecilan (1 : n)
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setScaleMode('pembesaran');
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium border text-center cursor-pointer transition-all ${
                    scaleMode === 'pembesaran'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Pembesaran (n : 1)
                </button>
              </div>
            </div>

            {scaleMode === 'pengecilan' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Objek Cagar Budaya / Bangunan
                  </label>
                  <select
                    value={selectedObject}
                    onChange={(e) => setSelectedObject(e.target.value as 'borobudur' | 'tongkonan' | 'denah_kamar')}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option value="borobudur">Candi Borobudur (35 m)</option>
                    <option value="tongkonan">Rumah Tongkonan (14 m)</option>
                    <option value="denah_kamar">Ruang Tamu (6 m)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">Faktor Pengecilan (1 : n)</span>
                    <span className="font-mono font-bold text-sky-700">1 : {reductionScaleN}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={reductionScaleN}
                    onChange={(e) => setReductionScaleN(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>1:20 (Besar)</span>
                    <span>1:500 (Kecil)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Objek Mikroskopis
                  </label>
                  <select
                    value={microscopeObject}
                    onChange={(e) => setMicroscopeObject(e.target.value as 'stomata' | 'kristal')}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option value="stomata">Stomata Daun (0,05 mm)</option>
                    <option value="kristal">Kristal Garam (0,40 mm)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">Lensa Pembesaran (n : 1)</span>
                    <span className="font-mono font-bold text-indigo-700">{magnifyN} : 1</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={magnifyN}
                    onChange={(e) => setMagnifyN(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>5x</span>
                    <span>100x</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MISI 5: ARENA LAJU SATUAN & SMART SHOPPER (TP 4) */}
      {/* ========================================================================= */}
      {activeMission === 'misi-5' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Stage */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>
                  {rateMode === 'shopper' && 'Kalkulator Belanja Cerdas (Best-Buy Price / ml)'}
                  {rateMode === 'debit' && 'Laju Aliran Debit Keran Air (L / menit)'}
                  {rateMode === 'kecepatan' && 'Laju Kecepatan Rata-Rata (km / jam)'}
                </span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                Rasio Besaran Beda Jenis
              </span>
            </div>

            {rateMode === 'shopper' && (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Kemasan A */}
                  <div className={`p-4 rounded-xl border text-center transition-all ${
                    !isPackBCheaper ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[11px] font-bold text-slate-500 mb-0.5">Kemasan A (Kecil)</div>
                    <div className="text-lg font-bold text-slate-900">{packAVolume} ml</div>
                    <div className="text-xs text-slate-500 mb-2">Rp{packAPrice.toLocaleString('id-ID')}</div>
                    <div className="text-2xl font-black font-mono text-slate-900">
                      Rp{unitPriceA.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ ml</span>
                    </div>
                    {!isPackBCheaper && (
                      <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 py-1 rounded">
                        ★ PALING HEMAT (BEST VALUE)
                      </div>
                    )}
                  </div>

                  {/* Kemasan B */}
                  <div className={`p-4 rounded-xl border text-center transition-all ${
                    isPackBCheaper ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[11px] font-bold text-slate-500 mb-0.5">Kemasan B (Besar/Pouch)</div>
                    <div className="text-lg font-bold text-slate-900">{packBVolume} ml</div>
                    <div className="text-xs text-slate-500 mb-2">Rp{packBPrice.toLocaleString('id-ID')}</div>
                    <div className="text-2xl font-black font-mono text-slate-900">
                      Rp{unitPriceB.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ ml</span>
                    </div>
                    {isPackBCheaper && (
                      <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 py-1 rounded">
                        ★ PALING HEMAT (BEST VALUE)
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1.5">
                  <div className="text-amber-400 font-bold uppercase text-[10px]">Analisis Hemat Belanja:</div>
                  <div>
                    Kemasan {isPackBCheaper ? 'B' : 'A'} lebih hemat sebesar <strong>{savingPct}% per mililiter</strong> dibandingkan kemasan lainnya.
                  </div>
                  <p className="text-slate-400 text-[11px] pt-1">
                    Laju satuan (Unit Rate) membandingkan harga terhadap 1 satuan volume (Rp / 1 ml) agar perbandingan menjadi adil.
                  </p>
                </div>
              </div>
            )}

            {rateMode === 'debit' && (
              <div className="space-y-4 py-2">
                <div className="p-5 rounded-xl bg-sky-50 border border-sky-200 text-center">
                  <div className="text-xs text-slate-600 mb-1">Volume Tangki: {tapVolumeL} Liter · Waktu: {tapTimeMin} Menit</div>
                  <div className="text-3xl font-black text-sky-800 font-mono my-2">
                    {debitRate} <span className="text-base font-normal text-slate-600">Liter / Menit</span>
                  </div>
                  <div className="text-xs text-sky-700 font-mono">
                    Laju Debit Aliran = Volume ÷ Waktu
                  </div>
                </div>
              </div>
            )}

            {rateMode === 'kecepatan' && (
              <div className="space-y-4 py-2">
                <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                  <div className="text-xs text-slate-600 mb-1">Jarak: {speedDistanceKm} km · Waktu: {speedTimeH} Jam</div>
                  <div className="text-3xl font-black text-indigo-800 font-mono my-2">
                    {speedRate} <span className="text-base font-normal text-slate-600">km / jam</span>
                  </div>
                  <div className="text-xs text-indigo-700 font-mono">
                    Kecepatan Rata-Rata = Jarak Tempuh ÷ Waktu
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Control Deck */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-2">
                Pilih Arena Laju Satuan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'shopper', label: 'Harga Satuan' },
                  { id: 'debit', label: 'Debit Air' },
                  { id: 'kecepatan', label: 'Kecepatan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundFx.playClick();
                      setRateMode(item.id as UnitRateMode);
                    }}
                    className={`py-2 px-1 rounded-lg text-xs font-medium border text-center cursor-pointer transition-all ${
                      rateMode === item.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {rateMode === 'shopper' && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-semibold text-xs text-slate-800">Atur Kemasan A:</div>
                  <div className="flex justify-between text-[11px]">
                    <span>Volume: {packAVolume} ml</span>
                    <input
                      type="range"
                      min="100"
                      max="500"
                      step="50"
                      value={packAVolume}
                      onChange={(e) => setPackAVolume(Number(e.target.value))}
                      className="w-32 accent-slate-600"
                    />
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>Harga: Rp{packAPrice.toLocaleString('id-ID')}</span>
                    <input
                      type="range"
                      min="3000"
                      max="15000"
                      step="500"
                      value={packAPrice}
                      onChange={(e) => setPackAPrice(Number(e.target.value))}
                      className="w-32 accent-slate-600"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-semibold text-xs text-slate-800">Atur Kemasan B:</div>
                  <div className="flex justify-between text-[11px]">
                    <span>Volume: {packBVolume} ml</span>
                    <input
                      type="range"
                      min="500"
                      max="1500"
                      step="50"
                      value={packBVolume}
                      onChange={(e) => setPackBVolume(Number(e.target.value))}
                      className="w-32 accent-emerald-600"
                    />
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>Harga: Rp{packBPrice.toLocaleString('id-ID')}</span>
                    <input
                      type="range"
                      min="15000"
                      max="40000"
                      step="1000"
                      value={packBPrice}
                      onChange={(e) => setPackBPrice(Number(e.target.value))}
                      className="w-32 accent-emerald-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {rateMode === 'debit' && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Volume Tangki ({tapVolumeL} L)</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="10"
                    value={tapVolumeL}
                    onChange={(e) => setTapVolumeL(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Waktu Pengisian ({tapTimeMin} Menit)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={tapTimeMin}
                    onChange={(e) => setTapTimeMin(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>
            )}

            {rateMode === 'kecepatan' && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Jarak Tempuh ({speedDistanceKm} km)</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="300"
                    step="10"
                    value={speedDistanceKm}
                    onChange={(e) => setSpeedDistanceKm(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Waktu Perjalanan ({speedTimeH} Jam)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={speedTimeH}
                    onChange={(e) => setSpeedTimeH(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
