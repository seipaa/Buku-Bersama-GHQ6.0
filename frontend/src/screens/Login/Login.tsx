import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon } from 'lucide-react';

interface LoginProps {
  onNavigateToHome: () => void;
  onBack: () => void;
  onNavigateToRegister: () => void;
}

export const Login = ({ onNavigateToHome, onBack, onNavigateToRegister }: LoginProps): JSX.Element => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        onNavigateToHome();
      } else {
        setError('Username atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center mb-4">
            <img
              src="./logo.png"
              alt="BukuBersama Logo"
              className="w-12 h-12 object-contain shadow-lg"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-blueprime mb-2">
            Masuk ke BukuBersama
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Masuk sebagai mahasiswa untuk mengelola materi kuliah
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent transition-all duration-300"
                  placeholder="ahmadrizki atau saridewi"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Demo: gunakan "ahmadrizki" atau "saridewi" sebagai username
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime focus:border-transparent transition-all duration-300"
                  placeholder="password123"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Demo: gunakan "password123" sebagai password
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blueprime to-blue-700 hover:from-blue-700 hover:to-blueprime text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <button className="text-blueprime hover:underline text-sm transition-colors">
              Lupa password?
            </button>
            
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <button 
                onClick={onNavigateToRegister}
                className="text-blueprime hover:underline font-medium"
              >
                Daftar di sini
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