export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  nim: string; // Changed from ktm to nim
  role: 'mahasiswa'; // Only mahasiswa can login
  fakultas: string;
  programStudi: string;
  universitas: string;
  angkatan: string;
  semester: number; // Current semester
  points: number;
  walletBalance: number;
  isVerified: boolean;
  avatar?: string;
  totalUploads: number;
  totalDownloads: number;
  reputation: number;
  createdAt: Date;
}

export interface University {
  id: string;
  name: string;
  location: string;
  type: 'negeri' | 'swasta';
  faculties: Faculty[];
}

export interface Faculty {
  id: string;
  name: string;
  universityId: string;
  programs: StudyProgram[];
}

export interface StudyProgram {
  id: string;
  name: string;
  facultyId: string;
  field: StudyField; // New field for filtering
  degree: 'D3' | 'D4' | 'S1' | 'S2' | 'S3';
  description: string;
}

export type StudyField = 
  | 'Teknik'
  | 'Bisnis'
  | 'Kesehatan'
  | 'Pendidikan'
  | 'Sains'
  | 'Sosial'
  | 'Seni'
  | 'Hukum'
  | 'Pertanian'
  | 'Teknologi Informasi';

export interface Semester {
  id: string;
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  name: string;
  materials: Material[];
}

export interface Material {
  id: string;
  title: string;
  description: string;
  content: string;
  mataKuliah: string;
  semesterId: string;
  semester: number;
  programStudiId: string;
  authorId: string;
  author: User;
  tags: string[];
  downloadCount: number;
  appreciationCount: number;
  viewCount: number;
  comments: Comment[];
  fileUrl?: string;
  pdfUrl?: string;
  thumbnailUrl?: string;
  status: 'draft' | 'published' | 'under_review';
  aiReviewScore?: number;
  aiReviewFeedback?: string;
  aiReviewSummary?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  isOpenSource: boolean;
  license: 'CC0' | 'CC-BY' | 'CC-BY-SA' | 'MIT';
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume {
  id: string;
  title: string;
  description: string;
  content: string;
  mataKuliah: string;
  semester: number;
  fakultas: string;
  programStudi: string;
  universitas: string;
  angkatan: string;
  authorId: string;
  author: User;
  tags: string[];
  downloadCount: number;
  appreciationCount: number;
  viewCount: number;
  comments: Comment[];
  fileUrl?: string;
  pdfUrl?: string;
  thumbnailUrl?: string;
  status: 'draft' | 'published' | 'under_review';
  aiReviewScore?: number;
  aiReviewFeedback?: string;
  aiReviewSummary?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  isOpenSource: boolean;
  license: 'CC0' | 'CC-BY' | 'CC-BY-SA' | 'MIT';
  createdAt: Date;
  updatedAt: Date;
}

export interface AIReview {
  id: string;
  resumeId: string;
  score: number;
  feedback: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  createdAt: Date;
}

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'converted';
  amount: number;
  reason: string;
  resumeId?: string;
  createdAt: Date;
}

export interface Appreciation {
  id: string;
  userId: string;
  resumeId: string;
  type: 'like' | 'helpful' | 'excellent';
  message?: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  resumeId: string;
  parentId?: string;
  replies?: Comment[];
  isHighlighted: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  universitas: string;
  fakultas: string;
  programStudi: string;
  angkatan: string;
  semester: number;
  resumeCount: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  currentPage: 'landing' | 'login' | 'register' | 'home' | 'detail' | 'profile' | 'upload' | 'edit' | 'reader' | 'wallet' | 'analytics';
  selectedResume: Resume | null;
  selectedCategory: Category | null;
  searchTerm: string;
  filters: {
    universitas?: string;
    fakultas?: string;
    programStudi?: string;
    field?: StudyField;
    angkatan?: string;
    semester?: number;
    difficulty?: string;
    tags?: string[];
    aiScore?: number;
  };
}