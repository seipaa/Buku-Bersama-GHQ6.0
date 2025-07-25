import {
  AwardIcon, BookOpenIcon, ChevronRightIcon, DownloadIcon,
  EyeIcon, HeartIcon, SearchIcon, StarIcon, TrendingUpIcon,
  UsersIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { mockMaterials, studyFields } from '../../data/mockData';
import { Material, StudyField } from '../../types';

interface LandingPageProps {
  onNavigateToDetail?: (material: Material) => void;
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
}

export const LandingPage = ({
  onNavigateToDetail,
  onNavigateToLogin,
  onNavigateToRegister,
}: LandingPageProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<StudyField | 'All'>('All');
  const [sortBy, setSortBy] = useState('latest');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Navigation items with scroll functionality
  const navItems = [
    { label: 'Beranda', href: '#hero', action: () => scrollToSection('hero') },
    { label: 'Tentang', href: '#about', action: () => scrollToSection('about') },
    { label: 'Materi', href: '#materials', action: () => scrollToSection('materials') },
  ];

  // Filter materials based on search and field
  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Get the program to check field
    const matchesField = selectedField === 'All' || selectedField === 'Teknologi Informasi'; // Since our mock data is all TI
    
    return matchesSearch && matchesField;
  });

  // Sort materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.downloadCount - a.downloadCount;
      case 'rating':
        return (b.aiReviewScore || 0) - (a.aiReviewScore || 0);
      default:
        return 0;
    }
  });

  const handleMaterialClick = (material: Material) => {
    if (onNavigateToDetail) {
      onNavigateToDetail(material);
    }
  };

  return (
    <div className="bg-white w-full">
        {/* Hero Section */}
        <header id="hero" className="w-full min-h-screen bg-gradient-to-br from-blueprime via-blue-600 to-blue-800 relative overflow-hidden">
          {/* Background illustration */}
          <div className="absolute right-[5%] lg:right-[10%] top-0 w-[300px] lg:w-[500px] h-full flex items-center justify-center animate-pulse">
            <div className="relative">
              <img
                src="./book-dashboard.png"
                alt="Book Dashboard"
                className="w-[250px] lg:w-[400px] h-auto object-contain transform translate-y-20 drop-shadow-2xl"
              />

              {/* Stars decoration */}
              <div className="absolute w-3 h-3 bg-yellow-300 rounded-full top-[60px] left-[40px] animate-bounce shadow-lg"></div>
              <div className="absolute w-2 h-2 bg-yellow-200 rounded-full top-[140px] left-[200px] lg:left-[350px] animate-ping shadow-lg"></div>
              <div className="absolute w-2.5 h-2.5 bg-yellow-400 rounded-full top-[80px] left-[220px] lg:left-[380px] animate-pulse shadow-lg"></div>
              <div className="absolute w-2 h-2 bg-yellow-300 rounded-full top-[200px] left-[30px] animate-bounce delay-300 shadow-lg"></div>
              <div className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full top-[120px] left-[20px] animate-ping delay-500 shadow-lg"></div>
              <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-[180px] left-[200px] lg:left-[370px] animate-pulse delay-700 shadow-lg"></div>
            </div>
          </div>

          {/* Floating particles background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 lg:px-6 transition-all duration-300 ${
            isScrolled ? 'bg-blueprime/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
          }`}>
            {/* Logo */}
            <div className="flex items-center group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-[30px] lg:w-[35px] h-[30px] lg:h-[35px] bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="w-[16px] lg:w-[20px] h-[20px] lg:h-[25px] bg-gradient-to-br from-blueprime to-blue-700 rounded-sm"></div>
              </div>
              <span className="ml-2 font-['Poppins',Helvetica] font-bold text-white text-base lg:text-lg group-hover:text-cream transition-colors duration-300">
                BukuBersama
              </span>
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-8 lg:space-x-[64px]">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={item.action}
                    className="font-['Poppins',Helvetica] font-medium text-white text-sm hover:text-cream transition-all duration-300 hover:scale-105 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cream transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <div className="flex space-x-2 lg:space-x-3">
              <Button
                onClick={onNavigateToLogin}
                className="w-[80px] lg:w-[100px] h-8 lg:h-10 bg-cream rounded-lg font-['Poppins',Helvetica] font-medium text-blueprime text-xs lg:text-sm hover:bg-cream/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                variant="outline"
              >
                Masuk
              </Button>
              <Button
                onClick={onNavigateToRegister}
                className="w-[80px] lg:w-[100px] h-8 lg:h-10 rounded-lg border border-cream bg-transparent font-['Poppins',Helvetica] font-medium text-cream text-xs lg:text-sm hover:bg-cream hover:text-blueprime transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                variant="outline"
              >
                Daftar
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="absolute w-full max-w-[600px] top-1/2 left-4 lg:left-[10%] transform -translate-y-1/2 z-10 animate-fade-in px-4">
            <h1 className="font-['Poppins',Helvetica] text-white text-2xl lg:text-[42px] leading-tight mb-4 lg:mb-6 drop-shadow-lg">
              <span className="font-bold">BukuBersama</span>
              <span className="font-medium"> untuk semua !!</span>
            </h1>
            <p className="w-full max-w-[500px] font-['Poppins',Helvetica] font-normal text-white text-sm lg:text-lg mb-6 lg:mb-8 leading-relaxed drop-shadow-md">
              Akses materi kuliah dari mahasiswa seluruh Indonesia secara gratis. 
              Temukan resume, catatan, dan materi pembelajaran berkualitas.
            </p>

            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection('materials')}
              className="w-[140px] lg:w-[160px] h-10 lg:h-12 bg-gradient-to-r from-cream to-yellow rounded-lg font-['Poppins',Helvetica] font-medium text-blueprime text-xs lg:text-sm hover:from-yellow hover:to-cream transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              variant="outline"
            >
              Jelajahi
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* About Section */}
        <section id="about" className="py-16 lg:py-[120px] relative bg-gradient-to-b from-white to-gray-50">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[120px] max-w-7xl mx-auto px-4 lg:px-6">
            {/* Image Section */}
            <div className="relative w-[300px] lg:w-[400px] h-[225px] lg:h-[300px] group">
              <div className="absolute w-[150px] lg:w-[200px] h-[120px] lg:h-[160px] top-0 right-0 rounded-[20px] border-4 border-blueprime bg-gradient-to-br from-white to-blue-50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"></div>
              <div className="absolute w-[150px] lg:w-[200px] h-[120px] lg:h-[160px] bottom-0 left-0 rounded-[20px] border-4 border-blueprime bg-gradient-to-br from-white to-blue-50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"></div>
              <img
                className="absolute w-[210px] lg:w-[280px] h-[150px] lg:h-[200px] top-[37px] lg:top-[50px] left-[45px] lg:left-[60px] object-contain rounded-[15px] shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
                alt="Students studying"
                src="./book-dashboard.png"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col max-w-[500px] text-center lg:text-left">
              <h2 className="font-['Poppins',Helvetica] text-blueprime text-2xl lg:text-4xl mb-6 lg:mb-8 animate-fade-in">
                <span className="font-medium">Tentang</span>
                <span className="font-bold"> BukuBersama</span>
              </h2>
              <Separator className="w-[150px] lg:w-[200px] h-[2px] mb-6 lg:mb-8 bg-gradient-to-r from-blueprime to-blue-400 animate-fade-in mx-auto lg:mx-0" />
              <p className="font-['Poppins',Helvetica] font-normal text-blueprime text-base lg:text-lg leading-relaxed animate-fade-in">
                Platform edukasi yang memungkinkan mahasiswa berbagi materi kuliah 
                dari 8 semester perkuliahan mereka. Setiap semester memiliki 5 materi 
                utama yang dapat diakses oleh masyarakat umum secara gratis.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 lg:py-[80px] bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <BookOpenIcon className="w-8 h-8 mx-auto mb-2 text-blueprime" />
                <div className="text-2xl font-bold text-gray-800">{mockMaterials.length}</div>
                <div className="text-sm text-gray-600">Total Materi</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <UsersIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-800">2</div>
                <div className="text-sm text-gray-600">Kontributor</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <TrendingUpIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-gray-800">
                  {mockMaterials.reduce((sum, m) => sum + m.downloadCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Download</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <AwardIcon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-800">8</div>
                <div className="text-sm text-gray-600">Semester</div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section id="materials" className="py-16 lg:py-[100px] bg-gradient-to-b from-white to-gray-50">
          <div className="text-center mb-12 lg:mb-[80px]">
            <div className="inline-block bg-gradient-to-r from-cream to-yellow px-6 lg:px-8 py-3 lg:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="font-['Poppins',Helvetica] font-bold text-blueprime text-2xl lg:text-4xl drop-shadow-sm">
                Materi Kuliah Tersedia
              </h2>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-7xl mx-auto mb-6 lg:mb-8 px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-lg shadow-lg border border-gray-200">
              <select 
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value as StudyField | 'All')}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-blueprime transition-all duration-300 hover:border-blueprime"
              >
                <option value="All">Semua Bidang</option>
                {studyFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari materi kuliah..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-blueprime transition-all duration-300 hover:border-blueprime"
                />
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-blueprime transition-all duration-300 hover:border-blueprime"
              >
                <option value="latest">Terbaru</option>
                <option value="popular">Terpopuler</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-white border border-gray-200 rounded-lg overflow-hidden group"
                  onClick={() => handleMaterialClick(material)}
                >
                  <CardContent className="p-0">
                    {/* Card Header */}
                    <div className="h-32 bg-gradient-to-br from-blueprime to-blue-700 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-xs font-medium">Semester {material.semester}</span>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center space-x-1">
                        <div className="bg-yellow-400 rounded-full p-1">
                          <span className="text-xs font-bold text-gray-800">★</span>
                        </div>
                        <span className="text-white text-xs font-medium">{material.aiReviewScore}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blueprime transition-colors duration-300">
                          {material.title}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {material.description}
                      </p>

                      <div className="text-xs text-gray-500 mb-3">
                        <div className="font-medium">{material.mataKuliah}</div>
                        <div>{material.author.universitas}</div>
                        <div>{material.author.programStudi}</div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {material.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {material.isOpenSource && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Open Source
                          </span>
                        )}
                      </div>

                      {/* Author and Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <div className="w-5 h-5 bg-blueprime rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {material.author.name.charAt(0)}
                            </span>
                          </div>
                          <span>{material.author.name}</span>
                          {material.author.isVerified && (
                            <span className="text-blue-500">✓</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <EyeIcon className="w-3 h-3" />
                            <span>{material.viewCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DownloadIcon className="w-3 h-3" />
                            <span>{material.downloadCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <HeartIcon className="w-3 h-3" />
                            <span>{material.appreciationCount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <span className="bg-gray-100 px-2 py-1 rounded-full capitalize">
                              {material.difficulty}
                            </span>
                            <span>{material.estimatedReadTime} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-3 h-3 text-yellow-500" />
                            <span>{material.aiReviewScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* No results message */}
            {sortedMaterials.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada materi ditemukan</h3>
                <p className="text-gray-500 mb-6">Coba ubah kata kunci pencarian atau filter</p>
              </div>
            )}
          </div>
        </section>
    </div>
  );
};