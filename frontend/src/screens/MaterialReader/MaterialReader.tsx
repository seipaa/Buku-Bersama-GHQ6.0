import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { Material } from '../../types';
import { 
  ArrowLeftIcon,
  BookmarkIcon,
  ShareIcon,
  HeartIcon,
  MessageCircleIcon,
  ZoomInIcon,
  ZoomOutIcon,
  DownloadIcon,
  EyeIcon,
  ThumbsUpIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BotIcon,
  SendIcon,
  XIcon,
  MinimizeIcon,
  MaximizeIcon
} from 'lucide-react';

interface MaterialReaderProps {
  material: Material;
  onBack: () => void;
  onNavigateToProfile: (userId: string) => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const MaterialReader = ({ material, onBack, onNavigateToProfile }: MaterialReaderProps): JSX.Element => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(24); // Mock total pages
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [showAppreciation, setShowAppreciation] = useState(false);
  
  // AI Chatbot states
  const [showAIChat, setShowAIChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Halo! Saya AI Assistant untuk membantu Anda memahami materi "${material.title}". Apa yang ingin Anda tanyakan tentang materi ini?`,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Mock PDF pages content
  const mockPages = Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: i + 1,
    content: `Halaman ${i + 1} - ${material.title}`,
    hasHighlight: Math.random() > 0.7,
  }));

  // Reading time tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update reading progress
  useEffect(() => {
    const progress = (currentPage / totalPages) * 100;
    setReadingProgress(progress);
  }, [currentPage, totalPages]);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 200) return prev + 25;
      if (direction === 'out' && prev > 50) return prev - 25;
      return prev;
    });
  };

  const handleAppreciation = (type: 'like' | 'helpful' | 'excellent') => {
    console.log(`Appreciation: ${type}`);
    setShowAppreciation(false);
    
    if (user && user.id !== material.authorId) {
      console.log(`Awarding points to author for ${type} appreciation`);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsAITyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        `Berdasarkan materi "${material.title}", saya dapat menjelaskan bahwa konsep ini sangat penting dalam pemahaman ${material.mataKuliah}. Apakah ada bagian spesifik yang ingin Anda pahami lebih dalam?`,
        `Pertanyaan yang bagus! Dalam konteks ${material.mataKuliah}, hal ini berkaitan dengan konsep fundamental yang dijelaskan di halaman ${Math.floor(Math.random() * totalPages) + 1}. Mari kita bahas lebih detail.`,
        `Saya melihat Anda sedang membaca halaman ${currentPage}. Bagian ini membahas tentang konsep yang sangat relevan dengan pertanyaan Anda. Apakah Anda ingin saya jelaskan dengan contoh praktis?`,
        `Berdasarkan materi yang sedang Anda baca, saya dapat memberikan penjelasan tambahan dan contoh implementasi. Apakah ada istilah teknis yang perlu saya jelaskan lebih sederhana?`
      ];

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const formatReadingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="text-white hover:bg-gray-700"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              
              <div className="hidden md:block">
                <h1 className="font-semibold text-lg truncate max-w-md">{material.title}</h1>
                <p className="text-sm text-gray-400">{material.mataKuliah}</p>
              </div>
            </div>

            {/* Center - Page Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="ghost"
                className="text-white hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-white"
                  min="1"
                  max={totalPages}
                />
                <span className="text-gray-400">/ {totalPages}</span>
              </div>
              
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="ghost"
                className="text-white hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2">
              {/* Zoom Controls */}
              <div className="hidden md:flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
                <Button
                  onClick={() => handleZoom('out')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-600"
                >
                  <ZoomOutIcon className="w-4 h-4" />
                </Button>
                <span className="text-sm px-2">{zoomLevel}%</span>
                <Button
                  onClick={() => handleZoom('in')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-600"
                >
                  <ZoomInIcon className="w-4 h-4" />
                </Button>
              </div>

              {/* AI Chat Toggle */}
              <Button
                onClick={() => setShowAIChat(!showAIChat)}
                variant="ghost"
                className={`text-white hover:bg-gray-700 ${showAIChat ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              >
                <BotIcon className="w-4 h-4" />
              </Button>

              {/* Action Buttons */}
              <Button
                onClick={() => setIsBookmarked(!isBookmarked)}
                variant="ghost"
                className={`text-white hover:bg-gray-700 ${isBookmarked ? 'text-yellow-400' : ''}`}
              >
                <BookmarkIcon className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => setShowAppreciation(true)}
                variant="ghost"
                className="text-white hover:bg-gray-700"
              >
                <HeartIcon className={`w-4 h-4 ${isLiked ? 'text-red-400 fill-current' : ''}`} />
              </Button>
              
              <Button
                onClick={() => setShowComments(!showComments)}
                variant="ghost"
                className="text-white hover:bg-gray-700"
              >
                <MessageCircleIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Reading Progress Bar */}
          <div className="mt-2">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center p-4">
          {/* PDF Viewer */}
          <Card className="w-full max-w-4xl bg-white shadow-2xl">
            <CardContent className="p-0">
              <div 
                className="min-h-[800px] bg-white flex items-center justify-center relative overflow-hidden"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center top' }}
              >
                {/* Mock PDF Page */}
                <div className="w-full h-full p-8 text-gray-800">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {material.title} - Halaman {currentPage}
                    </h2>
                    <div className="w-full h-px bg-gray-300 mb-4"></div>
                  </div>
                  
                  {/* Mock content */}
                  <div className="space-y-4 text-justify leading-relaxed">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    
                    {mockPages[currentPage - 1]?.hasHighlight && (
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
                        <p className="text-gray-800 font-medium">
                          Poin Penting: Konsep ini sangat fundamental dalam memahami materi selanjutnya.
                        </p>
                      </div>
                    )}
                    
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                      veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>

                    {/* Sample content based on material type */}
                    {material.mataKuliah.includes('Algoritma') && (
                      <div className="bg-blue-50 p-4 rounded-lg my-4">
                        <h3 className="font-semibold text-blue-800 mb-2">Contoh Algoritma:</h3>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`}
                        </pre>
                      </div>
                    )}
                  </div>
                  
                  {/* Page number */}
                  <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
                    Halaman {currentPage} dari {totalPages}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reading Stats */}
          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <EyeIcon className="w-4 h-4" />
              <span>Waktu baca: {formatReadingTime(readingTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookmarkIcon className="w-4 h-4" />
              <span>Progress: {Math.round(readingProgress)}%</span>
            </div>
          </div>
        </div>

        {/* Sidebar - Comments */}
        {showComments && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto max-h-screen">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Komentar & Diskusi</h3>
              <div className="text-sm text-gray-400">
                {material.comments?.length || 0} komentar
              </div>
            </div>

            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                placeholder="Tulis komentar atau pertanyaan..."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                rows={3}
              />
              <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white">
                Kirim Komentar
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {/* Mock comments */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                    A
                  </div>
                  <span className="text-sm font-medium">Ahmad</span>
                  <span className="text-xs text-gray-400">2 jam lalu</span>
                </div>
                <p className="text-sm text-gray-300">
                  Penjelasan tentang algoritma sorting sangat jelas! Terima kasih sudah berbagi.
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <ThumbsUpIcon className="w-3 h-3 mr-1" />
                    5
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    Balas
                  </Button>
                </div>
              </div>

              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">
                    S
                  </div>
                  <span className="text-sm font-medium">Sari</span>
                  <span className="text-xs text-gray-400">1 hari lalu</span>
                </div>
                <p className="text-sm text-gray-300">
                  Ada contoh implementasi dalam bahasa Python tidak?
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <ThumbsUpIcon className="w-3 h-3 mr-1" />
                    2
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    Balas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Chatbot */}
      {showAIChat && (
        <div className={`fixed right-4 bottom-4 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
          isChatMinimized ? 'w-80 h-16' : 'w-80 h-96'
        }`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <BotIcon className="w-5 h-5" />
              <span className="font-medium">AI Assistant</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                onClick={() => setIsChatMinimized(!isChatMinimized)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                {isChatMinimized ? <MaximizeIcon className="w-4 h-4" /> : <MinimizeIcon className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => setShowAIChat(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {!isChatMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-3 h-64 overflow-y-auto bg-gray-50">
                <div className="space-y-3">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                      }`}>
                        <p>{message.content}</p>
                        <div className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isAITyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 text-gray-800 rounded-lg rounded-bl-none p-2 text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Tanya tentang materi ini..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    disabled={isAITyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isAITyping}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 disabled:opacity-50"
                  >
                    <SendIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  AI akan membantu menjelaskan materi berdasarkan halaman yang sedang Anda baca
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Appreciation Modal */}
      {showAppreciation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Berikan Apresiasi
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Apresiasi Anda akan memberikan poin kepada penulis
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => handleAppreciation('like')}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <ThumbsUpIcon className="w-4 h-4" />
                  <span>Suka (+5 poin)</span>
                </Button>
                
                <Button
                  onClick={() => handleAppreciation('helpful')}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>Sangat Membantu (+10 poin)</span>
                </Button>
                
                <Button
                  onClick={() => handleAppreciation('excellent')}
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <StarIcon className="w-4 h-4" />
                  <span>Luar Biasa (+20 poin)</span>
                </Button>
              </div>
              
              <Button
                onClick={() => setShowAppreciation(false)}
                variant="ghost"
                className="w-full mt-4 text-gray-600 hover:text-gray-800"
              >
                Batal
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="ghost"
            className="text-white hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              {currentPage} / {totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowAIChat(!showAIChat)}
                variant="ghost"
                className={`text-white hover:bg-gray-700 ${showAIChat ? 'bg-blue-600' : ''}`}
              >
                <BotIcon className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsBookmarked(!isBookmarked)}
                variant="ghost"
                className={`text-white hover:bg-gray-700 ${isBookmarked ? 'text-yellow-400' : ''}`}
              >
                <BookmarkIcon className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setShowAppreciation(true)}
                variant="ghost"
                className="text-white hover:bg-gray-700"
              >
                <HeartIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
            className="text-white hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};