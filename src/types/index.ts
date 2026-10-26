export type ActiveTab = 
  | 'beranda'
  | 'storytelling'
  | 'video'
  | 'simulasi'
  | 'materi'
  | 'inkuiri'
  | 'latihan'
  | 'panduan';

export type SimulationMissionId = 'misi-1' | 'misi-2' | 'misi-3' | 'misi-4' | 'misi-5';

export interface SimulationMissionMeta {
  id: SimulationMissionId;
  missionNumber: number;
  tpCode: string;
  title: string;
  subtitle: string;
  scope: string;
  conceptSummary: string;
}

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  character: string;
  image: string;
  narrative: string[];
  mathContext: string;
  interactiveChallenge: {
    prompt: string;
    question: string;
    options: {
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
}

export interface VideoCheckpoint {
  timeInSeconds: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface InquiryStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  guidingQuestions: string[];
}

export interface QuizQuestion {
  id: number;
  type: 'senilai' | 'berbalik_nilai' | 'skala' | 'dasar_rasio';
  question: string;
  contextStory?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Dasar' | 'Sedang' | 'HOTS';
}

export interface StudentWorksheetData {
  studentName: string;
  studentClass: string;
  schoolName: string;
  problemOrientation: string;
  hypothesis: string;
  experimentData: {
    trial: number;
    valA: number;
    valB: number;
    ratio: string;
    kValue: string;
    note: string;
  }[];
  analysisAnswer1: string;
  analysisAnswer2: string;
  conclusion: string;
  selfReflection: string;
}
