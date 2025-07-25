import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeftIcon,
  WalletIcon,
  TrendingUpIcon,
  DownloadIcon,
  UploadIcon,
  GiftIcon,
  CreditCardIcon,
  HistoryIcon,
  CoinsIcon,
  StarIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react';

interface WalletProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  type: 'earned' | 'spent' | 'converted';
  amount: number;
  reason: string;
  date: Date;
  resumeTitle?: string;
}

export const Wallet = ({ onBack }: WalletProps): JSX.Element => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'convert'>('overview');
  const [convertAmount, setConvertAmount] = useState(100);

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'earned',
      amount: 50,
      reason: 'Upload materi baru',
      date: new Date('2024-01-20'),
      resumeTitle: 'Algoritma dan Struktur Data'
    },
    {
      id: '2',
      type: 'earned',
      amount: 20,
      reason: 'Apresiasi dari pengguna',
      date: new Date('2024-01-19'),
      resumeTitle: 'Database Management System'
    },
    {
      id: '3',
      type: 'earned',
      amount: 15,
      reason: 'Bonus AI Review Score tinggi',
      date: new Date('2024-01-18'),
      resumeTitle: 'Machine Learning Fundamentals'
    },
    {
      id: '4',
      type: 'converted',
      amount: -100,
      reason: 'Konversi ke saldo e-wallet',
      date: new Date('2024-01-15')
    },
    {
      id: '5',
      type: 'earned',
      amount: 30,
      reason: 'Materi mencapai 100 download',
      date: new Date('2024-01-14'),
      resumeTitle: 'Algoritma dan Struktur Data'
    }
  ];

  const totalEarned = transactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalConverted = Math.abs(transactions
    .filter(t => t.type === 'converted')
    .reduce((sum, t) => sum + t.amount, 0));

  const conversionRate = 100; // 100 poin = Rp 10,000
  const conversionValue = 10000;

  const handleConvert = () => {
    if (convertAmount <= (user?.points || 0) && convertAmount >= 100) {
      // Mock conversion logic
      alert(`Berhasil mengkonversi ${convertAmount} poin menjadi Rp ${(convertAmount / conversionRate * conversionValue).toLocaleString('id-ID')}`);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned': return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
      case 'spent': return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
      case 'converted': return <CreditCardIcon className="w-4 h-4 text-blue-500" />;
      default: return <CoinsIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'text-green-600';
      case 'spent': return 'text-red-600';
      case 'converted': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-blueprime shadow-lg">
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
              <h1 className="text-xl font-bold text-white">Wallet & Poin</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Points Balance */}
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Total Poin</p>
                  <p className="text-3xl font-bold">{user?.points || 0}</p>
                </div>
                <CoinsIcon className="w-12 h-12 text-yellow-200" />
              </div>
              <div className="mt-4 flex items-center text-yellow-100 text-sm">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+{totalEarned} bulan ini</span>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Balance */}
          <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Saldo E-Wallet</p>
                  <p className="text-3xl font-bold">Rp {(user?.walletBalance || 0).toLocaleString('id-ID')}</p>
                </div>
                <WalletIcon className="w-12 h-12 text-green-200" />
              </div>
              <div className="mt-4 flex items-center text-green-100 text-sm">
                <CreditCardIcon className="w-4 h-4 mr-1" />
                <span>Siap digunakan</span>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Stats */}
          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Konversi</p>
                  <p className="text-3xl font-bold">{totalConverted}</p>
                  <p className="text-blue-100 text-xs">poin dikonversi</p>
                </div>
                <GiftIcon className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { key: 'overview', label: 'Ringkasan', icon: TrendingUpIcon },
              { key: 'transactions', label: 'Riwayat Transaksi', icon: HistoryIcon },
              { key: 'convert', label: 'Konversi Poin', icon: CreditCardIcon }
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Earning Sources */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-2 text-yellow-500" />
                  Sumber Poin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <UploadIcon className="w-6 h-6 text-green-600" />
                      <span className="text-2xl font-bold text-green-700">50</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">Upload Materi</p>
                    <p className="text-xs text-green-500">Per upload berkualitas</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <DownloadIcon className="w-6 h-6 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-700">5</span>
                    </div>
                    <p className="text-sm text-blue-600 font-medium">Per 10 Download</p>
                    <p className="text-xs text-blue-500">Materi Anda diunduh</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <StarIcon className="w-6 h-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-700">10-20</span>
                    </div>
                    <p className="text-sm text-purple-600 font-medium">Apresiasi</p>
                    <p className="text-xs text-purple-500">Dari pengguna lain</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <GiftIcon className="w-6 h-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-700">15</span>
                    </div>
                    <p className="text-sm text-orange-600 font-medium">Bonus AI</p>
                    <p className="text-xs text-orange-500">Score tinggi (4.5+)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-blueprime" />
                  Statistik Bulanan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{totalEarned}</div>
                    <div className="text-sm text-gray-600">Poin Diperoleh</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                    <div className="text-sm text-gray-600">Materi Diupload</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1.2K</div>
                    <div className="text-sm text-gray-600">Total Download</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'transactions' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Riwayat Transaksi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium text-gray-800">{transaction.reason}</p>
                        {transaction.resumeTitle && (
                          <p className="text-sm text-gray-600">{transaction.resumeTitle}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          {transaction.date.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} poin
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'convert' && (
          <div className="space-y-6">
            {/* Conversion Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCardIcon className="w-5 h-5 mr-2 text-blueprime" />
                  Konversi Poin ke E-Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Nilai Tukar</h3>
                    <div className="text-3xl font-bold text-blueprime mb-2">
                      {conversionRate} Poin = Rp {conversionValue.toLocaleString('id-ID')}
                    </div>
                    <p className="text-sm text-gray-600">Minimum konversi: 100 poin</p>
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Poin yang Akan Dikonversi
                    </label>
                    <input
                      type="number"
                      value={convertAmount}
                      onChange={(e) => setConvertAmount(parseInt(e.target.value) || 0)}
                      min="100"
                      max={user?.points || 0}
                      step="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueprime"
                    />
                    <div className="mt-2 flex justify-between text-sm text-gray-600">
                      <span>Minimum: 100 poin</span>
                      <span>Tersedia: {user?.points || 0} poin</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Akan diterima:</span>
                      <span className="text-xl font-bold text-green-600">
                        Rp {(convertAmount / conversionRate * conversionValue).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleConvert}
                    disabled={convertAmount < 100 || convertAmount > (user?.points || 0)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Konversi Sekarang
                  </Button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Proses konversi membutuhkan waktu 1-3 hari kerja
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Supported E-Wallets */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>E-Wallet yang Didukung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['GoPay', 'OVO', 'DANA', 'ShopeePay'].map((wallet) => (
                    <div key={wallet} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-700">{wallet}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};