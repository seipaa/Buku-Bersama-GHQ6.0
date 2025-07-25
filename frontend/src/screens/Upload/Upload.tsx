import React, { useState, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { 
  UploadIcon, 
  FileTextIcon, 
  ImageIcon, 
  VideoIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  SparklesIcon,
  TagIcon,
  BookOpenIcon,
  GraduationCapIcon,
  CalendarIcon,
  StarIcon,
  ArrowLeftIcon
} from 'lucide-react';

interface UploadProps {
  onBack: () => void;
  onNavigateToHome: () => void;
}

export const Upload = ({ onBack, onNavigateToHome }: UploadProps): JSX.Element => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mataKuliah: '',
    semester: 1,
    tags: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    license: 'CC-BY' as 'CC0' | 'CC-BY' | 'CC-BY-SA' | 'MIT',
    isOpenSource: true,
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiReview, setAiReview] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAIReview = {
      score: 4.2,
      summary: "Materi yang komprehensif dengan penjelasan yang jelas dan terstruktur.",
      strengths: [
        "Penjelasan konsep yang mudah dipahami",
        "Contoh kode yang relevan dan praktis",
        "Struktur materi yang logis",
        "Referensi yang kredibel"
      ],
      improvements: [
        "Tambahkan lebih banyak diagram visual",
        "Sertakan latihan praktik",
        "Perbaiki beberapa typo minor"
      ],
      tags: ["algoritma", "programming", "data-structure", "beginner-friendly"],
      difficulty: "intermediate",
      estimatedReadTime: 25,
      pointsEarned: 50
    };
    
    setAiReview(mockAIReview);
    setIsAnalyzing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (uploadedFiles.length === 0) {
        alert('Silakan upload minimal satu file');
        return;
      }
      setCurrentStep(2);
      await simulateAIAnalysis();
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Simulate successful upload
    setTimeout(() => {
      setIsUploading(false);
      setCurrentStep(3);
    }, 1000);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('image')) return <ImageIcon className="w-5 h-5 text-blue-500" />;
    if (file.type.includes('video')) return <VideoIcon className="w-5 h-5 text-red-500" />;
    return <FileTextIcon className="w-5 h-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white shadow-2xl">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Berhasil! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Materi Anda telah berhasil diupload dan dianalisis oleh AI. 
              Anda mendapat <span className="font-bold text-green-600">{aiReview?.pointsEarned} poin</span>!
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Ringkasan AI Review:</h3>
              <div className="flex items-center justify-center mb-3">
                <StarIcon className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-lg font-bold text-gray-800">{aiReview?.score}/5.0</span>
              </div>
              <p className="text-gray-700 text-sm">{aiReview?.summary}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onNavigateToHome}
                className="flex-1 bg-gradient-to-r from-blueprime to-blue-700 text-white hover:from-blue-700 hover:to-blueprime"
              >
                Lihat di Beranda
              </Button>
              <Button
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    title: '',
                    description: '',
                    mataKuliah: '',
                    semester: 1,
                    tags: '',
                    difficulty: 'beginner',
                    license: 'CC-BY',
                    isOpenSource: true,
                  });
                  setUploadedFiles([]);
                  setAiReview(null);
                }}
                variant="outline"
                className="flex-1 border-blueprime text-blueprime hover:bg-blueprime hover:text-white"
              >
                Upload Lagi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blueprime to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={onBack}
                className="mr-4 bg-white/10 hover:bg-white/20 text-white border-white/20"
                variant="outline"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <h1 className="text-xl font-bold text-white">Upload Materi</h1>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
              <span className="text-white text-sm">Poin Anda:</span>
              <span className="text-yellow-300 font-bold">{user?.points || 0}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step 
                    ? 'bg-blueprime text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blueprime' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-8">
            <span className={`text-sm ${currentStep >= 1 ? 'text-blueprime font-medium' : 'text-gray-500'}`}>
              Upload File
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-blueprime font-medium' : 'text-gray-500'}`}>
              AI Review
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-blueprime font-medium' : 'text-gray-500'}`}>
              Selesai
            </span>
          </div>
        </div>

        {currentStep === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UploadIcon className="w-5 h-5 mr-2 text-blueprime" />
                  Upload File Materi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blueprime hover:bg-blue-50 transition-all duration-300"
                >
                  <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Klik untuk upload file atau drag & drop</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX, PPT, PPTX (Max 50MB)</p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-gray-700">File yang diupload:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          {getFileIcon(file)}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeFile(index)}
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadata Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpenIcon className="w-5 h-5 mr-2 text-blueprime" />
                  Informasi Materi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Materi *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                      placeholder="Contoh: Algoritma Sorting dan Searching"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mata Kuliah *
                    </label>
                    <input
                      type="text"
                      name="mataKuliah"
                      value={formData.mataKuliah}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                      placeholder="Contoh: Algoritma dan Struktur Data"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester *
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                      required
                    >
                      {[1,2,3,4,5,6,7,8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tingkat Kesulitan
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                    >
                      <option value="beginner">Pemula</option>
                      <option value="intermediate">Menengah</option>
                      <option value="advanced">Lanjutan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi Materi *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                    placeholder="Jelaskan isi materi, topik yang dibahas, dan manfaatnya..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                    placeholder="algoritma, programming, data structure, sorting"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lisensi Open Source
                  </label>
                  <select
                    name="license"
                    value={formData.license}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                  >
                    <option value="CC-BY">Creative Commons Attribution (CC-BY)</option>
                    <option value="CC-BY-SA">Creative Commons Attribution-ShareAlike (CC-BY-SA)</option>
                    <option value="CC0">Creative Commons Zero (CC0)</option>
                    <option value="MIT">MIT License</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isOpenSource"
                    checked={formData.isOpenSource}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    Saya setuju untuk membuat materi ini open source dan dapat diakses oleh semua orang
                  </label>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blueprime to-blue-700 text-white py-3 text-lg font-medium hover:from-blue-700 hover:to-blueprime transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Lanjutkan ke AI Review
            </Button>
          </form>
        )}

        {currentStep === 2 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-blueprime" />
                AI Review & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-blueprime border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Menganalisis Materi...</h3>
                  <p className="text-gray-600">AI sedang menganalisis kualitas dan konten materi Anda</p>
                </div>
              ) : aiReview && (
                <div className="space-y-6">
                  {/* AI Score */}
                  <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <div className="flex items-center justify-center mb-3">
                      <StarIcon className="w-8 h-8 text-yellow-500 mr-2" />
                      <span className="text-3xl font-bold text-gray-800">{aiReview.score}/5.0</span>
                    </div>
                    <p className="text-gray-700 font-medium">Skor Kualitas AI</p>
                    <p className="text-sm text-gray-600 mt-2">{aiReview.summary}</p>
                  </div>

                  {/* Points Earned */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{aiReview.pointsEarned} Poin</div>
                        <div className="text-sm text-gray-600">Poin yang akan Anda dapatkan</div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Kelebihan
                      </h4>
                      <ul className="space-y-2">
                        {aiReview.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-600 mb-3 flex items-center">
                        <AlertCircleIcon className="w-4 h-4 mr-2" />
                        Saran Perbaikan
                      </h4>
                      <ul className="space-y-2">
                        {aiReview.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800">Tingkat Kesulitan</div>
                      <div className="text-sm text-gray-600 capitalize">{aiReview.difficulty}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800">Estimasi Baca</div>
                      <div className="text-sm text-gray-600">{aiReview.estimatedReadTime} menit</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800">Tags AI</div>
                      <div className="text-xs text-gray-600">{aiReview.tags.slice(0, 2).join(', ')}</div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Kembali Edit
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isUploading}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                    >
                      {isUploading ? 'Mengupload...' : 'Publish Materi'}
                    </Button>
                  </div>

                  {isUploading && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress Upload</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blueprime to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};