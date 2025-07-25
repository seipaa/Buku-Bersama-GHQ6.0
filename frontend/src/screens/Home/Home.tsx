import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { Material, StudyField } from '../../types';
import { mockMaterials, studyFields, getMaterialsBySemester } from '../../data/mockData';
import { 
  SearchIcon, 
  FilterIcon, 
  BookOpenIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  AwardIcon,
  PlusIcon,
  HeartIcon,
  DownloadIcon,
  EyeIcon,
  WalletIcon,
  BookIcon,
  StarIcon
} from 'lucide-react';

interface HomeProps {
  onNavigateToDetail: (material: Material) => void;
  onNavigateToReader: (material: Material) => void;
  onNavigateToUpload: () => void;
  onNavigateToWallet: () => void;
  onNavigateToProfile: () => void;
  onLogout: () => void;
}

export const Home = ({ 
  onNavigateToDetail, 
  onNavigateToReader,
  onNavigateToUpload, 
  onNavigateToWallet,
  onNavigateToProfile,
  onLogout 
}: HomeProps): JSX.Element => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<StudyField | 'All'>('All');
  const [selectedSemester, setSelectedSemester] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState('latest');
  const [activeTab, setActiveTab] = useState<'all' | 'my-materials' | 'by-semester'>('all');

  // Filter materials based on search and filters
  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesField = selectedField === 'All' || selectedField === 'Teknologi Informasi'; // Since our mock data is all TI
    
    const matchesSemester = selectedSemester === 'All' || material.semester === selectedSemester;
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my-materials' && material.authorId === user?.id) ||
                      activeTab === 'by-semester';
    
    return matchesSearch && matchesField && matchesSemester && matchesTab;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-blueprime shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center group cursor-pointer">
              <img
                src="./logo.png"
                alt="BukuBersama Logo"
                className="w-10 h-10 object-contain shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
              />
              <span className="ml-3 font-['Poppins',Helvetica] font-bold text-white text-lg group-hover:text-cream transition-colors duration-300">
                BukuBersama
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <AwardIcon className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-medium">{user?.points || 0} Poin</span>
              </div>
              
              <Button
                onClick={onNavigateToWallet}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300"
                variant="outline"
              >
                <WalletIcon className="w-4 h-4" />
                <span className="hidden md:inline">Wallet</span>
              </Button>
              
              <Button
                onClick={onNavigateToProfile}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300"
                variant="outline"
              >
                <div className="w-6 h-6 bg-cream rounded-full flex items-center justify-center">
                  <span className="text-blueprime text-xs font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden md:inline">{user?.name || 'User'}</span>
              </Button>

              <Button
                onClick={onLogout}
                variant="ghost"
                className="text-white hover:bg-white/10 transition-all duration-300"
              >
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-blueprime text-white py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Selamat datang, {user?.name}! 👋
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Kelola materi kuliah dari 8 semester perkuliahan Anda atau jelajahi materi dari mahasiswa lain
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <BookOpenIcon className="w-8 h-8 mx-auto mb-2 text-cream" />
              <div className="text-2xl font-bold">{mockMaterials.length}</div>
              <div className="text-sm opacity-80">Total Materi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <UsersIcon className="w-8 h-8 mx-auto mb-2 text-cream" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm opacity-80">Kontributor</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <TrendingUpIcon className="w-8 h-8 mx-auto mb-2 text-cream" />
              <div className="text-2xl font-bold">
                {mockMaterials.reduce((sum, m) => sum + m.downloadCount, 0)}
              </div>
              <div className="text-sm opacity-80">Download</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <AwardIcon className="w-8 h-8 mx-auto mb-2 text-cream" />
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm opacity-80">Poin Anda</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              onClick={onNavigateToUpload}
              className="bg-gradient-to-r from-cream to-yellow text-blueprime hover:from-yellow hover:to-cream font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Upload Materi Baru
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari materi, mata kuliah, atau topik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value as StudyField | 'All')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime transition-all duration-300"
              >
                <option value="All">Semua Bidang</option>
                {studyFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime transition-all duration-300"
              >
                <option value="All">Semua Semester</option>
                {[1,2,3,4,5,6,7,8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime transition-all duration-300"
              >
                <option value="latest">Terbaru</option>
                <option value="popular">Terpopuler</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { key: 'all', label: 'Semua Materi', icon: BookOpenIcon },
              { key: 'my-materials', label: 'Materi Saya', icon: UsersIcon },
              { key: 'by-semester', label: 'Per Semester', icon: TrendingUpIcon }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-blueprime text-blueprime bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMaterials.map((material) => (
            <Card
              key={material.id}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-white border border-gray-200 rounded-lg overflow-hidden group"
              onClick={() => onNavigateToDetail(material)}
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

        {/* No results */}
        {sortedMaterials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada materi ditemukan</h3>
            <p className="text-gray-500 mb-6">Coba ubah kata kunci pencarian atau filter</p>
            <Button
              onClick={onNavigateToUpload}
              className="bg-gradient-to-r from-blueprime to-blue-700 text-white hover:from-blue-700 hover:to-blueprime"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Jadilah yang pertama upload materi ini
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};