import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  UserIcon, 
  MailIcon, 
  LockIcon, 
  EyeIcon, 
  EyeOffIcon,
  GraduationCapIcon,
  BookOpenIcon,
  BuildingIcon,
  CalendarIcon,
  HashIcon,
  CheckCircleIcon
} from 'lucide-react';

interface RegisterProps {
  onBack: () => void;
  onNavigateToLogin: () => void;
}

export const Register = ({ onBack, onNavigateToLogin }: RegisterProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    nim: '',
    password: '',
    confirmPassword: '',
    fakultas: '',
    programStudi: '',
    universitas: '',
    angkatan: '',
    semester: 1,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validasi
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }

    try {
      // Simulasi pendaftaran
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pendaftaran Berhasil! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Akun Anda telah berhasil didaftarkan. Silakan tunggu verifikasi dari admin 
              sebelum dapat melakukan login.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-700">
                <strong>Catatan:</strong> Proses verifikasi biasanya memakan waktu 1-2 hari kerja. 
                Anda akan mendapat notifikasi melalui email setelah akun diverifikasi.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={onNavigateToLogin}
                className="w-full bg-gradient-to-r from-blueprime to-blue-700 text-white hover:from-blue-700 hover:to-blueprime"
              >
                Ke Halaman Login
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full border-blueprime text-blueprime hover:bg-blueprime hover:text-white"
              >
                Kembali ke Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blueprime via-blue-600 to-blue-800 flex items-center justify-center p-4">
      {/* Background decoration */}
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

      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-0 relative z-10 max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blueprime to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-blueprime mb-2">
            Daftar ke BukuBersama
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Daftar sebagai mahasiswa untuk berbagi materi kuliah
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />
                Informasi Pribadi
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                    placeholder="Ahmad Rizki Pratama"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                    placeholder="ahmadrizki"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <div className="relative mt-1">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                      placeholder="ahmad@ui.ac.id"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">NIM *</label>
                  <div className="relative mt-1">
                    <HashIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="nim"
                      value={formData.nim}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                      placeholder="2106123456"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <GraduationCapIcon className="w-4 h-4 mr-2" />
                Informasi Akademik
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Universitas *</label>
                  <div className="relative mt-1">
                    <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="universitas"
                      value={formData.universitas}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                      placeholder="Universitas Indonesia"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Fakultas *</label>
                  <input
                    type="text"
                    name="fakultas"
                    value={formData.fakultas}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                    placeholder="Fakultas Ilmu Komputer"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Program Studi *</label>
                  <div className="relative mt-1">
                    <BookOpenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="programStudi"
                      value={formData.programStudi}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                      placeholder="Teknik Informatika"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Angkatan *</label>
                  <div className="relative mt-1">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="angkatan"
                      value={formData.angkatan}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                      placeholder="2021"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Semester Saat Ini *</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                    required
                  >
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <LockIcon className="w-4 h-4 mr-2" />
                Keamanan Akun
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Password *</label>
                  <div className="relative mt-1">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                      placeholder="Minimal 6 karakter"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Konfirmasi Password *</label>
                  <div className="relative mt-1">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent"
                      placeholder="Ulangi password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blueprime to-blue-700 hover:from-blue-700 hover:to-blueprime text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <button 
                onClick={onNavigateToLogin}
                className="text-blueprime hover:underline font-medium"
              >
                Masuk di sini
              </button>
            </p>
            
            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-gray-600 hover:text-blueprime transition-colors"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};