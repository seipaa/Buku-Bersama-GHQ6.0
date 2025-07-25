import { ArrowLeftIcon, BookOpenIcon, ChevronDownIcon, ChevronRightIcon, DownloadIcon, EyeIcon, FileTextIcon, MessageCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Material } from "../../types";

interface DetailMateriProps {
  material: Material;
  onBack: () => void;
  onNavigateToReader?: (material: Material) => void;
  selectedMaterialId?: string;
}

interface MaterialItem {
  id: string;
  title: string;
  type: 'document' | 'video' | 'assignment';
  author: string;
  downloadCount: number;
  rating: number;
  description: string;
  tags: string[];
}

interface SemesterData {
  id: string;
  title: string;
  isExpanded: boolean;
  materials: MaterialItem[];
}

interface Participant {
  id: string;
  name: string;
  nim: string;
  avatar: string;
  Materi_diupdate: string;
  joinDate: string;
}

interface Grade {
  id: string;
  participantId: string;
  participantName: string;
  assignment: string;
  score: number;
  maxScore: number;
  grade: string;
  submittedDate: string;
  feedback?: string;
}

interface Reviewer {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  reviewCount: number;
}

interface MaterialRating {
  id: string;
  reviewerId: string;
  reviewerName: string;
  materialId: string;
  materialTitle: string;
  rating: number; // 1-5 stars
  comment?: string;
  reviewDate: string;
  helpfulCount: number;
}


export const DetailMateri = ({ material, onBack, onNavigateToReader, selectedMaterialId }: DetailMateriProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<'course' | 'participants' | 'grades' | 'competencies'>('course');
  const materialRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


  // Data semester 1-8 dengan materi yang relevan untuk Teknik Informatika
    const [semesters, setSemesters] = useState<SemesterData[]>([
      {
        id: 'semester-1',
        title: 'Semester 1',
        isExpanded: true,
        materials: [
          {
            id: 'mat-1-1',
            title: 'Pengantar Teknologi Informasi',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 450,
            rating: 4.3,
            description: 'Konsep dasar teknologi informasi dan komputer',
            tags: ['teknologi-informasi', 'dasar', 'komputer']
          },
          {
            id: 'mat-1-2',
            title: 'Matematika Diskrit',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 380,
            rating: 4.1,
            description: 'Logika matematika dan teori himpunan',
            tags: ['matematika', 'logika', 'himpunan']
          },
          {
            id: 'mat-1-3',
            title: 'Algoritma dan Pemrograman Dasar',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 620,
            rating: 4.6,
            description: 'Konsep algoritma dan pemrograman dengan Python',
            tags: ['algoritma', 'python', 'programming']
          },
          {
            id: 'mat-1-4',
            title: 'Sistem Digital',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 290,
            rating: 4.0,
            description: 'Konsep sistem digital dan logika Boolean',
            tags: ['digital', 'boolean', 'logika']
          },
          {
            id: 'mat-1-5',
            title: 'Bahasa Inggris Teknik',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 340,
            rating: 3.9,
            description: 'Bahasa Inggris untuk bidang teknik informatika',
            tags: ['english', 'technical', 'communication']
          }
        ]
      },
      {
        id: 'semester-2',
        title: 'Semester 2',
        isExpanded: false,
        materials: [
          {
            id: 'mat-2-1',
            title: 'Struktur Data',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 580,
            rating: 4.5,
            description: 'Array, linked list, stack, queue, dan tree',
            tags: ['struktur-data', 'array', 'tree']
          },
          {
            id: 'mat-2-2',
            title: 'Pemrograman Berorientasi Objek',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 720,
            rating: 4.7,
            description: 'Konsep OOP dengan Java',
            tags: ['oop', 'java', 'object-oriented']
          },
          {
            id: 'mat-2-3',
            title: 'Basis Data',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 650,
            rating: 4.4,
            description: 'Konsep database dan SQL',
            tags: ['database', 'sql', 'relational']
          },
          {
            id: 'mat-2-4',
            title: 'Statistika dan Probabilitas',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 420,
            rating: 4.2,
            description: 'Konsep statistika untuk informatika',
            tags: ['statistika', 'probabilitas', 'data']
          },
          {
            id: 'mat-2-5',
            title: 'Sistem Operasi',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 510,
            rating: 4.3,
            description: 'Konsep dasar sistem operasi',
            tags: ['os', 'operating-system', 'kernel']
          }
        ]
      },
      {
        id: 'semester-3',
        title: 'Semester 3',
        isExpanded: false,
        materials: [
          {
            id: 'mat-3-1',
            title: 'Algoritma dan Kompleksitas',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 680,
            rating: 4.8,
            description: 'Analisis algoritma dan kompleksitas waktu',
            tags: ['algoritma', 'kompleksitas', 'big-o']
          },
          {
            id: 'mat-3-2',
            title: 'Jaringan Komputer',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 540,
            rating: 4.4,
            description: 'Konsep jaringan dan protokol komunikasi',
            tags: ['network', 'protocol', 'tcp-ip']
          },
          {
            id: 'mat-3-3',
            title: 'Rekayasa Perangkat Lunak',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 590,
            rating: 4.5,
            description: 'Metodologi pengembangan software',
            tags: ['software-engineering', 'sdlc', 'agile']
          },
          {
            id: 'mat-3-4',
            title: 'Arsitektur Komputer',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 460,
            rating: 4.2,
            description: 'Struktur dan organisasi komputer',
            tags: ['architecture', 'cpu', 'memory']
          },
          {
            id: 'mat-3-5',
            title: 'Pemrograman Web',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 750,
            rating: 4.6,
            description: 'HTML, CSS, JavaScript dan framework web',
            tags: ['web', 'html', 'css', 'javascript']
          }
        ]
      },
      {
        id: 'semester-4',
        title: 'Semester 4',
        isExpanded: false,
        materials: [
          {
            id: 'mat-4-1',
            title: 'Kecerdasan Buatan',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 820,
            rating: 4.7,
            description: 'Konsep AI, machine learning, dan neural networks',
            tags: ['ai', 'machine-learning', 'neural-network']
          },
          {
            id: 'mat-4-2',
            title: 'Sistem Basis Data Lanjut',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 480,
            rating: 4.3,
            description: 'NoSQL, distributed database, dan big data',
            tags: ['database', 'nosql', 'big-data']
          },
          {
            id: 'mat-4-3',
            title: 'Keamanan Sistem Informasi',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 630,
            rating: 4.5,
            description: 'Cybersecurity, kriptografi, dan ethical hacking',
            tags: ['security', 'cryptography', 'hacking']
          },
          {
            id: 'mat-4-4',
            title: 'Interaksi Manusia dan Komputer',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 390,
            rating: 4.1,
            description: 'UI/UX design dan usability testing',
            tags: ['hci', 'ui-ux', 'usability']
          },
          {
            id: 'mat-4-5',
            title: 'Pemrograman Mobile',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 710,
            rating: 4.6,
            description: 'Android dan iOS development',
            tags: ['mobile', 'android', 'ios']
          }
        ]
      },
      {
        id: 'semester-5',
        title: 'Semester 5',
        isExpanded: false,
        materials: [
          {
            id: 'mat-5-1',
            title: 'Sistem Terdistribusi',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 520,
            rating: 4.4,
            description: 'Konsep sistem terdistribusi dan cloud computing',
            tags: ['distributed-system', 'cloud', 'microservices']
          },
          {
            id: 'mat-5-2',
            title: 'Data Mining',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 680,
            rating: 4.5,
            description: 'Teknik ekstraksi pola dari big data',
            tags: ['data-mining', 'pattern-recognition', 'analytics']
          },
          {
            id: 'mat-5-3',
            title: 'Grafika Komputer',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 450,
            rating: 4.2,
            description: '2D/3D graphics, rendering, dan animasi',
            tags: ['graphics', '3d', 'rendering']
          },
          {
            id: 'mat-5-4',
            title: 'Manajemen Proyek TI',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 380,
            rating: 4.0,
            description: 'Project management dalam pengembangan software',
            tags: ['project-management', 'scrum', 'kanban']
          },
          {
            id: 'mat-5-5',
            title: 'Pemrograman Paralel',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 340,
            rating: 4.3,
            description: 'Multi-threading dan parallel computing',
            tags: ['parallel', 'threading', 'concurrency']
          }
        ]
      },
      {
        id: 'semester-6',
        title: 'Semester 6',
        isExpanded: false,
        materials: [
          {
            id: 'mat-6-1',
            title: 'Pembelajaran Mesin',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 890,
            rating: 4.8,
            description: 'Deep learning, supervised dan unsupervised learning',
            tags: ['machine-learning', 'deep-learning', 'tensorflow']
          },
          {
            id: 'mat-6-2',
            title: 'Sistem Informasi Enterprise',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 420,
            rating: 4.1,
            description: 'ERP, CRM, dan sistem informasi perusahaan',
            tags: ['enterprise', 'erp', 'crm']
          },
          {
            id: 'mat-6-3',
            title: 'Komputasi Awan',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 650,
            rating: 4.6,
            description: 'AWS, Azure, Google Cloud Platform',
            tags: ['cloud-computing', 'aws', 'azure']
          },
          {
            id: 'mat-6-4',
            title: 'Analisis dan Desain Sistem',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 480,
            rating: 4.3,
            description: 'System analysis, UML, dan design patterns',
            tags: ['system-analysis', 'uml', 'design-patterns']
          },
          {
            id: 'mat-6-5',
            title: 'Internet of Things',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 570,
            rating: 4.4,
            description: 'IoT architecture, sensors, dan embedded systems',
            tags: ['iot', 'sensors', 'embedded']
          }
        ]
      },
      {
        id: 'semester-7',
        title: 'Semester 7',
        isExpanded: false,
        materials: [
          {
            id: 'mat-7-1',
            title: 'Kerja Praktik',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 320,
            rating: 4.2,
            description: 'Panduan dan template laporan kerja praktik',
            tags: ['internship', 'report', 'industry']
          },
          {
            id: 'mat-7-2',
            title: 'Metodologi Penelitian',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 450,
            rating: 4.0,
            description: 'Metode penelitian untuk skripsi',
            tags: ['research', 'methodology', 'thesis']
          },
          {
            id: 'mat-7-3',
            title: 'Teknologi Blockchain',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 680,
            rating: 4.5,
            description: 'Cryptocurrency, smart contracts, dan DeFi',
            tags: ['blockchain', 'cryptocurrency', 'smart-contracts']
          },
          {
            id: 'mat-7-4',
            title: 'Etika Profesi TI',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 280,
            rating: 3.8,
            description: 'Etika dalam pengembangan teknologi',
            tags: ['ethics', 'professional', 'responsibility']
          },
          {
            id: 'mat-7-5',
            title: 'Startup dan Kewirausahaan',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 520,
            rating: 4.3,
            description: 'Business model, funding, dan tech startup',
            tags: ['startup', 'entrepreneurship', 'business']
          }
        ]
      },
      {
        id: 'semester-8',
        title: 'Semester 8',
        isExpanded: false,
        materials: [
          {
            id: 'mat-8-1',
            title: 'Skripsi/Tugas Akhir',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 890,
            rating: 4.7,
            description: 'Template dan panduan penulisan skripsi',
            tags: ['thesis', 'final-project', 'research']
          },
          {
            id: 'mat-8-2',
            title: 'Seminar Proposal',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 340,
            rating: 4.1,
            description: 'Persiapan dan presentasi proposal skripsi',
            tags: ['proposal', 'presentation', 'seminar']
          },
          {
            id: 'mat-8-3',
            title: 'Teknologi Terkini',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 620,
            rating: 4.6,
            description: 'Quantum computing, AR/VR, dan emerging tech',
            tags: ['quantum', 'ar-vr', 'emerging-tech']
          },
          {
            id: 'mat-8-4',
            title: 'Persiapan Karir',
            type: 'document',
            author: 'Sari Dewi Lestari',
            downloadCount: 480,
            rating: 4.2,
            description: 'CV writing, interview skills, dan job hunting',
            tags: ['career', 'interview', 'job-hunting']
          },
          {
            id: 'mat-8-5',
            title: 'Sidang Akhir',
            type: 'document',
            author: 'Ahmad Rizki Pratama',
            downloadCount: 720,
            rating: 4.5,
            description: 'Persiapan dan tips sidang skripsi',
            tags: ['defense', 'presentation', 'graduation']
          }
        ]
      }
    ]);

    const [participants, setParticipants] = useState<Participant[]>([
  {
    id: 'p1',
    name: 'Ahmad Rizki Pratama',
    nim: '1234567890',
    avatar: '',
    Materi_diupdate: 'Sistem operasi',
    joinDate: '2023-09-01',
  },
  {
    id: 'p2',
    name: 'Sari Dewi Lestari',
    nim: '1234567891',
    avatar: '',
    Materi_diupdate: 'Sistem operasi',
    joinDate: '2023-08-15',
  },
  {
    id: 'p3',
    name: 'Budi Santoso',
    nim: '1234567892',
    avatar: '',
    Materi_diupdate: 'Sistem operasi',
    joinDate: '2023-09-01',
  },
  {
    id: 'p4',
    name: 'Dewi Kartika',
    nim: '1234567893',
    avatar: '',
    Materi_diupdate: 'Sistem operasi',
    joinDate: '2023-09-01',
  },
  {
    id: 'p5',
    name: 'Eko Prasetyo',
    nim: '1234567894',
    avatar: '',
    Materi_diupdate: 'Sistem operasi',
    joinDate: '2023-09-10',
  }
]);

  const mockReviewers: Reviewer[] = [
  {
    id: 'r1',
    name: 'Andi Saputra',
    avatar: '',
    joinDate: '2022-06-15',
    reviewCount: 24
  },
  {
    id: 'r2',
    name: 'Dr. Budi Santoso',
    avatar: '',
    joinDate: '2023-03-20',
    reviewCount: 18
  },
  {
    id: 'r3',
    name: 'Citra Dewi',
    avatar: '',
    joinDate: '2023-09-01',
    reviewCount: 15
  },
  {
    id: 'r4',
    name: 'PT Teknologi Maju',
    avatar: '',
    joinDate: '2023-01-10',
    reviewCount: 32
  },
  {
    id: 'r5',
    name: 'Eko Prasetyo',
    avatar: '',
    joinDate: '2024-02-05',
    reviewCount: 8
  }
];

const mockMaterialRatings: MaterialRating[] = [
  {
    id: 'mr1',
    reviewerId: 'r1',
    reviewerName: 'Andi Saputra',
    materialId: 'mat-4-1',
    materialTitle: 'Kecerdasan Buatan',
    rating: 5,
    comment: 'Materi sangat komprehensif dan relevan dengan perkembangan teknologi saat ini. Sangat membantu dalam proyek kerja saya.',
    reviewDate: '2024-05-10',
    helpfulCount: 24
  },
  {
    id: 'mr2',
    reviewerId: 'r2',
    reviewerName: 'Dr. Budi Santoso',
    materialId: 'mat-3-5',
    materialTitle: 'Pemrograman Web',
    rating: 4,
    comment: 'Bagus untuk pemula, namun bisa ditambahkan materi tentang framework modern seperti React atau Vue.',
    reviewDate: '2024-05-12',
    helpfulCount: 18
  },
  {
    id: 'mr3',
    reviewerId: 'r3',
    reviewerName: 'Citra Dewi',
    materialId: 'mat-6-1',
    materialTitle: 'Pembelajaran Mesin',
    rating: 5,
    comment: 'Penjelasan konsep dasar sangat mudah dipahami. Latihan juga sangat membantu.',
    reviewDate: '2024-05-09',
    helpfulCount: 32
  },
  {
    id: 'mr4',
    reviewerId: 'r4',
    reviewerName: 'PT Teknologi Maju',
    materialId: 'mat-8-3',
    materialTitle: 'Teknologi Terkini',
    rating: 4,
    comment: 'Materi sesuai dengan kebutuhan industri saat ini. Rekomendasi untuk mahasiswa yang ingin kerja di bidang R&D.',
    reviewDate: '2024-05-05',
    helpfulCount: 15
  },
  {
    id: 'mr5',
    reviewerId: 'r5',
    reviewerName: 'Eko Prasetyo',
    materialId: 'mat-2-2',
    materialTitle: 'Pemrograman Berorientasi Objek',
    rating: 5,
    comment: 'Sangat membantu untuk memahami konsep dasar pemrograman. Penjelasan sangat jelas.',
    reviewDate: '2024-05-15',
    helpfulCount: 28
  }
];

// Tambahkan fungsi utilitas ini juga di dalam komponen
const getRatingStats = () => {
  const total = mockMaterialRatings.length;
  if (total === 0) return { average: 0, highest: 0, lowest: 0, count: 0 };
  
  const ratings = mockMaterialRatings.map(r => r.rating);
  const average = ratings.reduce((a, b) => a + b, 0) / total;
  const highest = Math.max(...ratings);
  const lowest = Math.min(...ratings);
  
  return { 
    average: parseFloat(average.toFixed(1)), 
    highest, 
    lowest, 
    count: total 
  };
};

const getRatingDistribution = () => {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  mockMaterialRatings.forEach(rating => {
    if (distribution.hasOwnProperty(rating.rating)) {
      distribution[rating.rating]++;
    }
  });
  
  return distribution;
};

  const getTopReviewers = () => {
    return [...mockReviewers]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 5);
  }


  const toggleSemester = (semesterId: string) => {
    setSemesters(prev => 
      prev.map(semester => 
        semester.id === semesterId 
          ? { ...semester, isExpanded: !semester.isExpanded }
          : semester
      )
    );
  };

  const expandAll = () => {
    setSemesters(prev => 
      prev.map(semester => ({ ...semester, isExpanded: true }))
    );
  };

  const collapseAll = () => {
    setSemesters(prev => 
      prev.map(semester => ({ ...semester, isExpanded: false }))
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileTextIcon className="w-4 h-4 text-blue-600" />;
      case 'video': return <FileTextIcon className="w-4 h-4 text-red-600" />;
      case 'assignment': return <BookOpenIcon className="w-4 h-4 text-green-600" />;
      default: return <FileTextIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleMaterialClick = (materialItem: MaterialItem) => {
    // Create a Material object from MaterialItem for navigation
    const materialForReader: Material = {
      id: materialItem.id,
      title: materialItem.title,
      description: materialItem.description,
      content: '', // Will be populated in reader
      mataKuliah: material.mataKuliah,
      semesterId: material.semesterId,
      semester: material.semester,
      programStudiId: material.programStudiId,
      authorId: material.authorId,
      author: material.author,
      tags: materialItem.tags,
      downloadCount: materialItem.downloadCount,
      appreciationCount: 0,
      viewCount: 0,
      comments: [],
      status: 'published',
      aiReviewScore: materialItem.rating,
      difficulty: 'intermediate',
      estimatedReadTime: 25,
      isOpenSource: true,
      license: 'CC-BY',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (onNavigateToReader) {
      onNavigateToReader(materialForReader);
    }
  };

  // Filter materials based on search term
  const filteredSemesters = semesters.map(semester => ({
    ...semester,
    materials: semester.materials.filter(material =>
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }));

  useEffect(() => {
    if (selectedMaterialId) {
      // Cari semester yang mengandung materi ini
      const semesterIdx = semesters.findIndex(sem => sem.materials.some(mat => mat.id === selectedMaterialId));
      if (semesterIdx !== -1) {
        setSemesters(prev => prev.map((sem, idx) => ({ ...sem, isExpanded: idx === semesterIdx })));
        setTimeout(() => {
          const el = materialRefs.current[selectedMaterialId];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }, [selectedMaterialId]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <header className="w-full h-[60px] bg-gradient-to-r from-blueprime to-blue-700 shadow-lg">
        <nav className="flex justify-between items-center h-full px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="w-[25px] lg:w-[30px] h-[25px] lg:h-[30px] bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
              <div className="w-[15px] lg:w-[18px] h-[18px] lg:h-[22px] bg-gradient-to-br from-blueprime to-blue-700 rounded-sm"></div>
            </div>
            <span className="ml-2 font-['Poppins',Helvetica] font-bold text-white text-sm lg:text-base group-hover:text-cream transition-colors duration-300">BukuBersama</span>
          </div>
          
          {/* Right side container for auth buttons and back button */}
          <div className="flex items-center space-x-3">
            {/* Back Button */}
            <div className="flex items-center">
              <Button
                onClick={onBack}
                className="flex items-center px-3 lg:px-4 py-2 bg-cream text-blueprime rounded-lg font-['Poppins',Helvetica] font-medium text-xs lg:text-sm hover:bg-cream/90 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                variant="outline"
              >
                <ArrowLeftIcon className="w-3 lg:w-4 h-3 lg:h-4 mr-1 lg:mr-2" />
                Kembali
              </Button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-[300px] bg-white border-b lg:border-r lg:border-b-0 border-gray-200 flex flex-col shadow-lg">
          {/* Sidebar Header */}
          <div className="p-3 lg:p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Daftar Semester</span>
            <div className="flex space-x-1">
              <Button
                onClick={expandAll}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-300"
              >
                Expand All
              </Button>
              <Button
                onClick={collapseAll}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
              >
                Collapse All
              </Button>
            </div>
          </div>
          
          {/* Search in sidebar */}
          <div className="p-3 lg:p-4 border-b border-gray-200">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari materi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 p-3 lg:p-4 max-h-[300px] lg:max-h-none overflow-y-auto">
            {/* Navigation Tree */}
            <div className="space-y-1 text-sm">
              {filteredSemesters.map((semester) => (
                <div key={semester.id}>
                  <button
                    onClick={() => toggleSemester(semester.id)}
                    className="flex items-center w-full text-left py-2 px-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 rounded text-gray-700 transition-all duration-300 hover:scale-105 font-medium"
                  >
                    <span className="mr-2">
                      {semester.isExpanded ? '▼' : '▶'}
                    </span>
                    <span className="text-sm">{semester.title}</span>
                    <span className="ml-auto text-xs text-gray-500">
                      ({semester.materials.length})
                    </span>
                  </button>
                  {semester.isExpanded && semester.materials.length > 0 && (
                    <div className="ml-6 space-y-1">
                      {semester.materials.map((material) => (
                        <div 
                          key={material.id} 
                          className="flex items-center py-1 px-2 text-xs text-gray-600 hover:bg-gray-50 rounded transition-all duration-300 cursor-pointer hover:text-blueprime"
                          onClick={() => handleMaterialClick(material)}
                        >
                          <span className="mr-2">
                            {getTypeIcon(material.type)}
                          </span>
                          <span className="truncate flex-1">{material.title}</span>
                          <span className="ml-2 text-yellow-500">★{material.rating}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-white">
          {/* Breadcrumb */}
          <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-4 lg:px-6 py-2 lg:py-3 shadow-sm">
            <div className="text-xs lg:text-sm text-gray-500">
              {material.author.universitas} / {material.author.fakultas} / {material.author.programStudi}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-4 lg:p-6">
            {/* Page Title */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-3">
              <div>
                <h1 className="font-['Poppins',Helvetica] font-bold text-gray-800 text-xl lg:text-2xl">
                  {material.author.programStudi}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {material.author.universitas}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button className="px-2 lg:px-3 py-1 text-xs lg:text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-300 hover:scale-105">
                  <DownloadIcon className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                  Download All
                </Button>
                <Button className="px-2 lg:px-3 py-1 text-xs lg:text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-300 hover:scale-105">
                  <EyeIcon className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                  Preview
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-xl lg:text-2xl font-bold text-blueprime">
                  {semesters.reduce((total, sem) => total + sem.materials.length, 0)}
                </div>
                <div className="text-xs lg:text-sm text-gray-600">Total Materi</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-xl lg:text-2xl font-bold text-green-600">8</div>
                <div className="text-xs lg:text-sm text-gray-600">Semester</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-xl lg:text-2xl font-bold text-orange-600">
                  {Math.round(semesters.reduce((total, sem) => 
                    total + sem.materials.reduce((semTotal, mat) => semTotal + mat.rating, 0) / sem.materials.length, 0
                  ) / semesters.length * 10) / 10}
                </div>
                <div className="text-xs lg:text-sm text-gray-600">Rata-rata Rating</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-xl lg:text-2xl font-bold text-purple-600">
                  {semesters.reduce((total, sem) => 
                    total + sem.materials.reduce((semTotal, mat) => semTotal + mat.downloadCount, 0), 0
                  )}
                </div>
                <div className="text-xs lg:text-sm text-gray-600">Total Download</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="bg-white p-3 lg:p-4 rounded-lg shadow-md mb-4 lg:mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs lg:text-sm font-medium text-gray-700">Progress Kurikulum</span>
                <span className="text-xs lg:text-sm text-gray-500">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blueprime to-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Semua semester tersedia dengan materi lengkap
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mb-4 lg:mb-6">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {[
                  { key: 'course', label: 'Materi Kuliah' },
                  { key: 'participants', label: 'Kontributor' },
                  { key: 'grades', label: 'Rating' },
                  { key: 'competencies', label: 'Kompetensi' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'border-blueprime text-blueprime bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content Sections */}
            {/* Course Tab Content */}
            {activeTab === 'course' && (
              <div className="space-y-3 lg:space-y-4">
                {semesters.every(sem => sem.materials.length === 0) ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Materi tidak tersedia</h3>
                    <p className="text-gray-500 mb-6">Belum ada materi untuk prodi/universitas ini</p>
                  </div>
                ) : (
                  semesters.map((semester) => (
                    <div key={semester.id} className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                      {/* Semester Header */}
                      <button
                        onClick={() => toggleSemester(semester.id)}
                        className="w-full flex items-center justify-between p-3 lg:p-4 text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 rounded-t-lg"
                      >
                        <div className="flex items-center">
                          <span className="mr-3 text-gray-600 transition-transform duration-300">
                            {semester.isExpanded ? (
                              <ChevronDownIcon className="w-4 lg:w-5 h-4 lg:h-5" />
                            ) : (
                              <ChevronRightIcon className="w-4 lg:w-5 h-4 lg:h-5" />
                            )}
                          </span>
                          <h3 className="font-['Poppins',Helvetica] font-semibold text-gray-800 text-sm lg:text-lg">
                            {semester.title}
                          </h3>
                          <span className="ml-3 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {semester.materials.length} materi
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg: ★{semester.materials.length > 0 ? 
                            (semester.materials.reduce((sum, mat) => sum + mat.rating, 0) / semester.materials.length).toFixed(1) : 
                            '0.0'
                          }
                        </div>
                      </button>
                          
                      {/* Semester Content */}
                      {semester.isExpanded && (
                        <div className="px-3 lg:px-4 pb-3 lg:pb-4">
                          {semester.isExpanded && semester.materials.length > 0 ? (
                            <div className="space-y-2">
                              {semester.materials.map((material) => (
                                <div
                                  key={material.id}
                                  ref={el => { if (selectedMaterialId) materialRefs.current[material.id] = el; }}
                                  className={`flex items-center p-2 lg:p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md group
                                  ${selectedMaterialId === material.id ? 'ring-2 ring-blueprime bg-blue-100' : ''}`}
                                  onClick={() => handleMaterialClick(material)}
                                >
                                  <div className="mr-2 lg:mr-3">
                                    {getTypeIcon(material.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-['Poppins',Helvetica] font-medium text-xs lg:text-sm text-gray-800 group-hover:text-blueprime transition-colors duration-300 truncate">
                                      {material.title}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                                      {material.description}
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className="text-xs text-gray-500">by {material.author}</span>
                                      <span className="text-xs text-gray-400">•</span>
                                      <span className="text-xs text-gray-500">{material.downloadCount} downloads</span>
                                      <span className="text-xs text-gray-400">•</span>
                                      <span className="text-xs text-yellow-600">★{material.rating}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {material.tags.slice(0, 3).map((tag, index) => (
                                        <span
                                          key={index}
                                          className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full"
                                        >
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1 lg:space-x-2">
                                    <Button className="p-1 bg-transparent hover:bg-blue-100 text-blue-600 transition-all duration-300 hover:scale-110">
                                      <EyeIcon className="w-3 lg:w-4 h-3 lg:h-4" />
                                    </Button>
                                    <Button className="p-1 bg-transparent hover:bg-green-100 text-green-600 transition-all duration-300 hover:scale-110">
                                      <DownloadIcon className="w-3 lg:w-4 h-3 lg:h-4" />
                                    </Button>
                                    <Button className="p-1 bg-transparent hover:bg-purple-100 text-purple-600 transition-all duration-300 hover:scale-110">
                                      <MessageCircleIcon className="w-3 lg:w-4 h-3 lg:h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 lg:py-8">
                              <div className="text-gray-400 text-2xl lg:text-4xl mb-2">📚</div>
                              <p className="text-gray-500 text-xs lg:text-sm italic">
                                Belum ada materi untuk semester ini
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
            {activeTab === 'participants' && (
              <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Update</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materi diupdate</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Update</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {participants.map((participant) => (
                      <tr key={participant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blueprime to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                              {participant.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.nim}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font- text-gray-900">{participant.Materi_diupdate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(participant.joinDate).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
            {/* Grades Tab Content */}
            {activeTab === 'grades' && (
              <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Terbaru</h3>
                <div className="space-y-4">
                  {mockMaterialRatings.map((rating) => (
                    <div key={rating.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blueprime to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {rating.reviewerName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{rating.reviewerName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">{new Date(rating.reviewDate).toLocaleDateString('id-ID')}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-800">Materi: {rating.materialTitle}</div>
                      <p className="text-sm text-gray-600 mt-2">{rating.comment}</p>
                    </div>
                  </div>
                  ))}
                </div>
              </div>                
            )}
          </div>
        </div>
      </div>
    </div>
  );
};