import { Material, StudyField, University, User } from '../types';

// Mock Indonesian State Universities Data
export const universities: University[] = [
  {
    id: 'upi',
    name: 'Universitas Pendidikan Indonesia',
    location: 'Bandung, Jawa Barat',
    type: 'negeri',
    faculties: [
      {
        id: 'fptk-upi',
        name: 'Fakultas Pendidikan Teknologi dan Kejuruan',
        universityId: 'upi',
        programs: [
          {
            id: 'rpl-upi',
            name: 'Rekayasa Perangkat Lunak',
            facultyId: 'fptk-upi',
            field: 'Teknologi Informasi',
            degree: 'S1',
            description: 'Program studi yang mempelajari rekayasa perangkat lunak dan pengembangan aplikasi.'
          }
        ]
      }
    ]
  }
];

// Tambahan universitas baru
universities.push(
  {
    id: 'itb',
    name: 'Institut Teknologi Bandung',
    location: 'Bandung, Jawa Barat',
    type: 'negeri',
    faculties: [
      {
        id: 'stei-itb',
        name: 'Sekolah Teknik Elektro dan Informatika',
        universityId: 'itb',
        programs: [
          {
            id: 'informatika-itb',
            name: 'Teknik Informatika',
            facultyId: 'stei-itb',
            field: 'Teknologi Informasi',
            degree: 'S1',
            description: 'Program studi informatika di ITB.'
          },
          {
            id: 'elektro-itb',
            name: 'Teknik Elektro',
            facultyId: 'stei-itb',
            field: 'Teknik',
            degree: 'S1',
            description: 'Program studi elektro di ITB.'
          }
        ]
      }
    ]
  },
  {
    id: 'ugm',
    name: 'Universitas Gadjah Mada',
    location: 'Yogyakarta',
    type: 'negeri',
    faculties: [
      {
        id: 'fmipa-ugm',
        name: 'Fakultas MIPA',
        universityId: 'ugm',
        programs: [
          {
            id: 'matematika-ugm',
            name: 'Matematika',
            facultyId: 'fmipa-ugm',
            field: 'Sains',
            degree: 'S1',
            description: 'Program studi matematika di UGM.'
          },
          {
            id: 'kimia-ugm',
            name: 'Kimia',
            facultyId: 'fmipa-ugm',
            field: 'Sains',
            degree: 'S1',
            description: 'Program studi kimia di UGM.'
          }
        ]
      }
    ]
  }
);

// Study Fields for filtering
export const studyFields: StudyField[] = [
  'Teknik',
  'Bisnis', 
  'Kesehatan',
  'Pendidikan',
  'Sains',
  'Sosial',
  'Seni',
  'Hukum',
  'Pertanian',
  'Teknologi Informasi'
];

// Mock users (mahasiswa)
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmad Rizki Pratama',
    username: 'ahmadrizki',
    email: 'ahmad.rizki@ui.ac.id',
    nim: '2106123456',
    role: 'mahasiswa',
    fakultas: 'Fakultas Pendidikan Teknologi dan Kejuruan',
    programStudi: 'Rekayasa Perangkat Lunak',
    universitas: 'Universitas Pendidikan Indonesia',
    angkatan: '2021',
    semester: 6,
    points: 250,
    walletBalance: 50000,
    isVerified: true,
    totalUploads: 15,
    totalDownloads: 1250,
    reputation: 4.5,
    createdAt: new Date('2021-08-15'),
  },
  {
    id: '2',
    name: 'Sari Dewi Lestari',
    username: 'saridewi',
    email: 'sari.dewi@ui.ac.id',
    nim: '2106123457',
    role: 'mahasiswa',
    fakultas: 'Fakultas Pendidikan Teknologi dan Kejuruan',
    programStudi: 'Rekayasa Perangkat Lunak',
    universitas: 'Universitas Pendidikan Indonesia',
    angkatan: '2021',
    semester: 6,
    points: 180,
    walletBalance: 25000,
    isVerified: true,
    totalUploads: 8,
    totalDownloads: 890,
    reputation: 4.2,
    createdAt: new Date('2021-08-15'),
  }
];

// Tambahkan user baru untuk UGM dan ITB
const ugmUser: User = {
  id: '3',
  name: 'Budi Santoso',
  username: 'budiugm',
  email: 'budi.santoso@ugm.ac.id',
  nim: '2106123458',
  role: 'mahasiswa',
  fakultas: 'Fakultas MIPA',
  programStudi: 'Matematika',
  universitas: 'Universitas Gadjah Mada',
  angkatan: '2021',
  semester: 4,
  points: 120,
  walletBalance: 20000,
  isVerified: true,
  totalUploads: 5,
  totalDownloads: 300,
  reputation: 4.0,
  createdAt: new Date('2021-08-15'),
};
const itbUser: User = {
  id: '4',
  name: 'Sinta Dewi',
  username: 'sintaitb',
  email: 'sinta.dewi@itb.ac.id',
  nim: '2106123459',
  role: 'mahasiswa',
  fakultas: 'Sekolah Teknik Elektro dan Informatika',
  programStudi: 'Teknik Informatika',
  universitas: 'Institut Teknologi Bandung',
  angkatan: '2021',
  semester: 4,
  points: 110,
  walletBalance: 15000,
  isVerified: true,
  totalUploads: 3,
  totalDownloads: 200,
  reputation: 4.1,
  createdAt: new Date('2021-08-15'),
};

mockUsers.push(ugmUser, itbUser);

// Mock materials for 8 semesters, 5 materials each
export const mockMaterials: Material[] = [
  // Semester 1
  {
    id: 'mat-1-1',
    title: 'Pengantar Teknologi Informasi',
    description: 'Konsep dasar teknologi informasi dan komputer',
    content: 'Materi lengkap tentang pengantar TI...',
    mataKuliah: 'Pengantar Teknologi Informasi',
    semesterId: 'sem-1',
    semester: 1,
    programStudiId: 'rpl-upi',
    authorId: '1',
    author: mockUsers[0],
    tags: ['teknologi-informasi', 'dasar', 'komputer'],
    downloadCount: 450,
    appreciationCount: 89,
    viewCount: 1200,
    comments: [],
    pdfUrl: '/mock-pdf-url',
    status: 'published',
    aiReviewScore: 4.3,
    aiReviewSummary: 'Materi pengantar yang komprehensif',
    difficulty: 'beginner',
    estimatedReadTime: 20,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'mat-1-2',
    title: 'Matematika Diskrit',
    description: 'Logika matematika dan teori himpunan',
    content: 'Materi matematika diskrit...',
    mataKuliah: 'Matematika Diskrit',
    semesterId: 'sem-1',
    semester: 1,
    programStudiId: 'rpl-upi',
    authorId: '1',
    author: mockUsers[0],
    tags: ['matematika', 'logika', 'himpunan'],
    downloadCount: 380,
    appreciationCount: 67,
    viewCount: 980,
    comments: [],
    pdfUrl: '/mock-pdf-url-2',
    status: 'published',
    aiReviewScore: 4.1,
    aiReviewSummary: 'Penjelasan logika yang sistematis',
    difficulty: 'intermediate',
    estimatedReadTime: 35,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'mat-1-3',
    title: 'Algoritma dan Pemrograman Dasar',
    description: 'Konsep algoritma dan pemrograman dengan Python',
    content: 'Materi algoritma dasar...',
    mataKuliah: 'Algoritma dan Pemrograman Dasar',
    semesterId: 'sem-1',
    semester: 1,
    programStudiId: 'rpl-upi',
    authorId: '2',
    author: mockUsers[1],
    tags: ['algoritma', 'python', 'programming'],
    downloadCount: 620,
    appreciationCount: 124,
    viewCount: 1560,
    comments: [],
    pdfUrl: '/mock-pdf-url-3',
    status: 'published',
    aiReviewScore: 4.6,
    aiReviewSummary: 'Tutorial programming yang sangat baik',
    difficulty: 'beginner',
    estimatedReadTime: 40,
    isOpenSource: true,
    license: 'MIT',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'mat-1-4',
    title: 'Sistem Digital',
    description: 'Konsep sistem digital dan logika Boolean',
    content: 'Materi sistem digital...',
    mataKuliah: 'Sistem Digital',
    semesterId: 'sem-1',
    semester: 1,
    programStudiId: 'rpl-upi',
    authorId: '1',
    author: mockUsers[0],
    tags: ['digital', 'boolean', 'logika'],
    downloadCount: 290,
    appreciationCount: 45,
    viewCount: 720,
    comments: [],
    pdfUrl: '/mock-pdf-url-4',
    status: 'published',
    aiReviewScore: 4.0,
    aiReviewSummary: 'Penjelasan sistem digital yang jelas',
    difficulty: 'intermediate',
    estimatedReadTime: 30,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'mat-1-5',
    title: 'Bahasa Inggris Teknik',
    description: 'Bahasa Inggris untuk bidang teknik informatika',
    content: 'Materi bahasa Inggris teknik...',
    mataKuliah: 'Bahasa Inggris Teknik',
    semesterId: 'sem-1',
    semester: 1,
    programStudiId: 'rpl-upi',
    authorId: '2',
    author: mockUsers[1],
    tags: ['english', 'technical', 'communication'],
    downloadCount: 340,
    appreciationCount: 56,
    viewCount: 890,
    comments: [],
    pdfUrl: '/mock-pdf-url-5',
    status: 'published',
    aiReviewScore: 3.9,
    aiReviewSummary: 'Materi bahasa Inggris yang praktis',
    difficulty: 'beginner',
    estimatedReadTime: 25,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },

  // Semester 2
  {
    id: 'mat-2-1',
    title: 'Struktur Data',
    description: 'Array, linked list, stack, queue, dan tree',
    content: 'Materi struktur data...',
    mataKuliah: 'Struktur Data',
    semesterId: 'sem-2',
    semester: 2,
    programStudiId: 'rpl-upi',
    authorId: '1',
    author: mockUsers[0],
    tags: ['struktur-data', 'array', 'tree'],
    downloadCount: 580,
    appreciationCount: 98,
    viewCount: 1450,
    comments: [],
    pdfUrl: '/mock-pdf-url-6',
    status: 'published',
    aiReviewScore: 4.5,
    aiReviewSummary: 'Penjelasan struktur data yang komprehensif',
    difficulty: 'intermediate',
    estimatedReadTime: 45,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'mat-2-2',
    title: 'Pemrograman Berorientasi Objek',
    description: 'Konsep OOP dengan Java',
    content: 'Materi OOP...',
    mataKuliah: 'Pemrograman Berorientasi Objek',
    semesterId: 'sem-2',
    semester: 2,
    programStudiId: 'rpl-upi',
    authorId: '2',
    author: mockUsers[1],
    tags: ['oop', 'java', 'object-oriented'],
    downloadCount: 720,
    appreciationCount: 134,
    viewCount: 1890,
    comments: [],
    pdfUrl: '/mock-pdf-url-7',
    status: 'published',
    aiReviewScore: 4.7,
    aiReviewSummary: 'Tutorial OOP yang sangat detail',
    difficulty: 'intermediate',
    estimatedReadTime: 50,
    isOpenSource: true,
    license: 'MIT',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: 'mat-2-3',
    title: 'Basis Data',
    description: 'Konsep database dan SQL',
    content: 'Materi basis data...',
    mataKuliah: 'Basis Data',
    semesterId: 'sem-2',
    semester: 2,
    programStudiId: 'rpl-upi',
    authorId: '1',
    author: mockUsers[0],
    tags: ['database', 'sql', 'relational'],
    downloadCount: 650,
    appreciationCount: 112,
    viewCount: 1670,
    comments: [],
    pdfUrl: '/mock-pdf-url-8',
    status: 'published',
    aiReviewScore: 4.4,
    aiReviewSummary: 'Materi database yang praktis',
    difficulty: 'intermediate',
    estimatedReadTime: 40,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'mat-2-4',
    title: 'Statistika dan Probabilitas',
    description: 'Konsep statistika untuk informatika',
    content: 'Materi statistika...',
    mataKuliah: 'Statistika dan Probabilitas',
    semesterId: 'sem-2',
    semester: 2,
    programStudiId: 'rpl-upi',
    authorId: '2',
    author: mockUsers[1],
    tags: ['statistika', 'probabilitas', 'data'],
    downloadCount: 420,
    appreciationCount: 78,
    viewCount: 1120,
    comments: [],
    pdfUrl: '/mock-pdf-url-9',
    status: 'published',
    aiReviewScore: 4.2,
    aiReviewSummary: 'Penjelasan statistika yang mudah dipahami',
    difficulty: 'intermediate',
    estimatedReadTime: 35,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: 'mat-2-5',
    title: 'Sistem Operasi',
    description: 'Konsep dasar sistem operasi',
    content: 'Materi sistem operasi...',
    mataKuliah: 'Sistem Operasi',
    semesterId: 'sem-2',
    semester: 2,
    programStudiId: 'rpl-upi',
    authorId: '1',
    author: mockUsers[0],
    tags: ['os', 'operating-system', 'kernel'],
    downloadCount: 510,
    appreciationCount: 89,
    viewCount: 1340,
    comments: [],
    pdfUrl: '/mock-pdf-url-10',
    status: 'published',
    aiReviewScore: 4.3,
    aiReviewSummary: 'Materi sistem operasi yang lengkap',
    difficulty: 'intermediate',
    estimatedReadTime: 42,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25'),
  },

  // Continue with more semesters...
  // Semester 3
  {
    id: 'mat-3-1',
    title: 'Algoritma dan Kompleksitas',
    description: 'Analisis algoritma dan kompleksitas waktu',
    content: 'Materi algoritma lanjut...',
    mataKuliah: 'Algoritma dan Kompleksitas',
    semesterId: 'sem-3',
    semester: 3,
    programStudiId: 'rpl-upi',
    authorId: '1',
    author: mockUsers[0],
    tags: ['algoritma', 'kompleksitas', 'big-o'],
    downloadCount: 680,
    appreciationCount: 145,
    viewCount: 1780,
    comments: [],
    pdfUrl: '/mock-pdf-url-11',
    status: 'published',
    aiReviewScore: 4.8,
    aiReviewSummary: 'Analisis algoritma yang sangat mendalam',
    difficulty: 'advanced',
    estimatedReadTime: 55,
    isOpenSource: true,
    license: 'MIT',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  }
  // Add more materials for other semesters as needed...
];

// Tambahan materi untuk prodi baru
mockMaterials.push(
  {
    id: 'mat-itb-1',
    title: 'Dasar Pemrograman ITB',
    description: 'Materi dasar pemrograman untuk mahasiswa ITB',
    content: 'Resume materi dasar pemrograman di ITB...',
    mataKuliah: 'Dasar Pemrograman',
    semesterId: 'sem-1',
    semester: 1,
    programStudiId: 'informatika-itb',
    authorId: '4',
    author: itbUser,
    tags: ['pemrograman', 'itb', 'dasar'],
    downloadCount: 100,
    appreciationCount: 10,
    viewCount: 200,
    comments: [],
    pdfUrl: '/mock-pdf-itb-1',
    status: 'published',
    aiReviewScore: 4.0,
    aiReviewSummary: 'Materi dasar yang baik untuk pemula',
    difficulty: 'beginner',
    estimatedReadTime: 30,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 'mat-ugm-1',
    title: 'Aljabar Linear ',
    description: 'Materi aljabar linear untuk mahasiswa UGM',
    content: 'Resume materi aljabar linear di UGM...',
    mataKuliah: 'Aljabar Linear',
    semesterId: 'sem-2',
    semester: 2,
    programStudiId: 'matematika-ugm',
    authorId: '3',
    author: ugmUser,
    tags: ['aljabar', 'ugm', 'matematika'],
    downloadCount: 80,
    appreciationCount: 8,
    viewCount: 150,
    comments: [],
    pdfUrl: '/mock-pdf-ugm-1',
    status: 'published',
    aiReviewScore: 4.2,
    aiReviewSummary: 'Materi aljabar linear yang jelas',
    difficulty: 'intermediate',
    estimatedReadTime: 40,
    isOpenSource: true,
    license: 'CC-BY',
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-02'),
  }
);

// Update materi UGM dan ITB agar author dan authorId sesuai user baru
mockMaterials.forEach((mat) => {
  if (mat.programStudiId === 'matematika-ugm') {
    mat.author = ugmUser;
    mat.authorId = ugmUser.id;
  }
  if (mat.programStudiId === 'informatika-itb') {
    mat.author = itbUser;
    mat.authorId = itbUser.id;
  }
});

// Helper function to get materials by semester
export const getMaterialsBySemester = (semester: number): Material[] => {
  return mockMaterials.filter(material => material.semester === semester);
};

// Helper function to get materials by field
export const getMaterialsByField = (field: StudyField): Material[] => {
  const program = universities[0].faculties[0].programs.find(p => p.field === field);
  if (!program) return [];
  return mockMaterials.filter(material => material.programStudiId === program.id);
};