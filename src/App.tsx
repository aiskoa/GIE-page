import { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Download, 
  Monitor, 
  Star, 
  ArrowRight,
  Menu,
  X,
  FileText,
  Image,
  Zap,
  Eye,
  Users,
  Sun,
  Moon,
  Terminal
} from 'lucide-react';
import HelpPage from './components/HelpPage'; // Importa el nuevo componente
import ImageModal from './components/ImageModal'; // Importa el nuevo componente

import logo from './img/logo.png';
import s1 from './img/s1.png';
import s3 from './img/s3.png';

// Matrix Animation Component
const MatrixRain = ({ isDark }: { isDark: boolean }) => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; y: number; speed: number; chars: string }>>([]);

  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newDrops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 1,
      chars: Array.from({ length: 10 }, () => characters[Math.floor(Math.random() * characters.length)]).join('')
    }));
    setDrops(newDrops);

    const interval = setInterval(() => {
      setDrops(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > 100 ? -10 : drop.y + drop.speed,
        chars: Array.from({ length: 10 }, () => characters[Math.floor(Math.random() * characters.length)]).join('')
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-90 blur-sm">
      {drops.map(drop => (
        <div
          key={drop.id}
          className={`absolute text-xs font-mono ${isDark ? 'text-green-400' : 'text-blue-600'} whitespace-nowrap`}
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            transform: 'translateY(-50%)',
            textShadow: isDark ? '0 0 10px #00ff00' : '0 0 10px #0066ff'
          }}
        >
          {drop.chars}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [showHelpPage, setShowHelpPage] = useState(false); // Nuevo estado para la página de ayuda
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para la imagen seleccionada en el modal

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleShowHelpPage = () => {
    setShowHelpPage(true);
    setIsMenuOpen(false); // Cierra el menú móvil si está abierto
  };

  const handleHideHelpPage = () => {
    setShowHelpPage(false);
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (showHelpPage) {
    return <HelpPage onBack={handleHideHelpPage} isDark={isDark} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? isDark 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800' 
            : 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-white to-black">
                <img src={logo} alt="Logo"/>
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>AISKOA</span>
            </div>
            
            <nav className="items-center hidden space-x-8 md:flex">
              <a href="#features" className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>Features</a>
              <button onClick={handleShowHelpPage} className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>How it works</button>
              <a href="#download" className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>Download</a>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
              >
                Get GIE
              </button>
            </nav>

            <button 
              className={`md:hidden ${isDark ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className={`block ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}>Features</a>
              <button onClick={handleShowHelpPage} className={`block ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}>How it works</button>
              <a href="#download" className={`block ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}>Download</a>
              <button
                onClick={toggleTheme}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button className="w-full px-6 py-2 text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700">
                Get Encrypto
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className={`relative pt-24 pb-20 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900' 
          : 'bg-gradient-to-br from-slate-50 to-blue-50'
      }`}>
        <MatrixRain isDark={isDark} />
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className="text-3xl text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">GIE</span>
                  <br />
                  Protect your files with AES-256
                </h1>
                <p className={`text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Protect your sensitive files and folders with <strong> Anti-Quantum Military-Grade AES-256 Encryption.</strong>
                  <br />
                  Simple drag-and-drop interface makes security accessible to <strong> everyone.</strong>
                </p>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="flex items-center justify-center px-8 py-4 space-x-2 text-white transition-all transform bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105">
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Free Download</span>
                </button>
                <button onClick={handleShowHelpPage} className={`border-2 px-8 py-4 rounded-full transition-all flex items-center justify-center space-x-2 ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400' 
                    : 'border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600'
                }`}>
                  <span>Watch Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className={`flex items-center space-x-6 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>1M+ Downloads</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`relative rounded-3xl p-8 shadow-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-700' 
                  : 'bg-gradient-to-br from-gray-900 to-gray-700'
              }`}>
                <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>GIE</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center ${
                      isDark 
                        ? 'border-blue-400 bg-blue-900/20' 
                        : 'border-blue-300 bg-blue-50'
                    }`}>
                      <Lock className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Drop files here to encrypt</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg flex items-center space-x-2 ${
                        isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                      }`}>
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Document.pdf</span>
                      </div>
                      <div className={`p-3 rounded-lg flex items-center space-x-2 ${
                        isDark ? 'bg-green-900/30' : 'bg-green-50'
                      }`}>
                        <Image className="w-5 h-5 text-green-600" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Photo.jpg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute px-4 py-2 text-gray-900 bg-yellow-400 rounded-full shadow-lg -bottom-4 -left-4">
                <span className="text-sm font-semibold">♛ AES-256 Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="mb-16 text-center">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why choose GIE?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Built with security and simplicity in mind, GIE provides enterprise-grade protection 
              with a user experience anyone can master.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className={`group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 hover:from-blue-900/50 hover:to-cyan-900/50' 
                : 'bg-gradient-to-br from-blue-50 to-cyan-50'
            }`}>
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform bg-blue-600 rounded-2xl group-hover:scale-110">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Anti-Quantum & Military-Grade Security</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              AES-256 encryption ensures that your files are protected with the same security standards used by governments and businesses, 
              following NIST standards and protecting your data for the <strong>FUTURE</strong>.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 hover:from-green-900/50 hover:to-emerald-900/50' 
                : 'bg-gradient-to-br from-green-50 to-emerald-50'
            }`}>
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform bg-green-600 rounded-2xl group-hover:scale-110">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Lightning Fast</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Optimized algorithms ensure rapid encryption and decryption, even for large files. No waiting, just secure.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 hover:from-purple-900/50 hover:to-pink-900/50' 
                : 'bg-gradient-to-br from-purple-50 to-pink-50'
            }`}>
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform bg-purple-600 rounded-2xl group-hover:scale-110">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Preview Protection</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Add custom password hints to help you remember your password without compromising security.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 hover:from-orange-900/50 hover:to-red-900/50' 
                : 'bg-gradient-to-br from-orange-50 to-red-50'
            }`}>
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform bg-orange-600 rounded-2xl group-hover:scale-110">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Cross-Platform</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Works seamlessly across macOS, Windows, and Linux. Encrypted files can be shared and opened on any supported device.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-teal-900/30 to-cyan-900/30 hover:from-teal-900/50 hover:to-cyan-900/50' 
                : 'bg-gradient-to-br from-teal-50 to-cyan-50'
            }`}>
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform bg-teal-600 rounded-2xl group-hover:scale-110">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Any File Type</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Encrypt documents, photos, videos, archives - any file type. Maintains original quality and metadata protection.
              </p>
            </div>

            <div className={`group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-indigo-900/30 to-blue-900/30 hover:from-indigo-900/50 hover:to-blue-900/50' 
                : 'bg-gradient-to-br from-indigo-50 to-blue-50'
            }`}>
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform bg-indigo-600 rounded-2xl group-hover:scale-110">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Share Securely</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Share encrypted files via email, cloud storage, or any method. Only recipients with the password can access content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800 to-blue-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          {/* New image section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <div className="md:w-1/2 flex justify-end">
              <img 
                src={s3} 
                alt="Screenshot 3" 
                className="rounded-lg shadow-lg max-w-full h-auto cursor-pointer"
                style={{ maxWidth: '400px' }}
                onClick={() => handleImageClick(s3)}
              />
            </div>
            <div className="md:w-1/2 flex justify-start">
              <img 
                src={s1} 
                alt="Screenshot 1" 
                className="rounded-lg shadow-lg max-w-full h-auto cursor-pointer"
                style={{ maxWidth: '400px' }}
                onClick={() => handleImageClick(s1)}
              />
            </div>
          </div>
          {/* End new image section */}

          <div className="mb-16 text-center">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Encryption made simple
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Three simple steps to secure your most important files. No technical expertise required.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 transition-transform bg-blue-600 rounded-full group-hover:scale-110">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <div className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -top-2 -right-2">
                  <span className="font-bold text-blue-600">1</span>
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Drop Your Files</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Simply drag and drop any file into GIE. Supports all file types from documents to videos.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 transition-transform bg-green-600 rounded-full group-hover:scale-110">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <div className="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -top-2 -right-2">
                  <span className="font-bold text-green-600">2</span>
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Set Password</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Create a strong password and optional hint. Your files are encrypted with unbreakable AES-256.  <span className="italic font-semibold">
                  (Additionally you can add a channel and 
                  encryption level for more security.)
                </span>
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 transition-transform bg-purple-600 rounded-full group-hover:scale-110">
                  <Download className="w-12 h-12 text-white" />
                </div>
                <div className="absolute flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full -top-2 -right-2">
                  <span className="font-bold text-purple-600">3</span>
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Share Safely</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Save or share your encrypted files anywhere. Only those with the password can access the content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="mb-16 text-center">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Get GIE today
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Download GIE for free and start protecting your files with military-grade encryption in minutes.
            </p>
          </div>

          <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-3">
            <div className={`p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600' 
                : 'bg-gradient-to-br from-gray-50 to-gray-100'
            }`}>
              <Monitor className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>macOS</h3>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Requires macOS 10.12 or later
              </p>
              <button className={`w-full py-3 rounded-full transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                Download for Mac
              </button>
            </div>

            <div className={`p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 ring-2 ring-blue-200 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/50 hover:from-blue-900/70 hover:to-blue-800/70' 
                : 'bg-gradient-to-br from-blue-50 to-blue-100'
            }`}>
              <Monitor className="w-16 h-16 mx-auto mb-6 text-blue-600" />
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Windows</h3>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Requires Windows 10 or later
              </p>
              <button className="w-full py-3 text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700">
                Download for Windows
              </button>
              <span className="inline-block px-2 py-1 mt-2 text-xs text-blue-600 bg-blue-100 rounded-full">
                Most Popular
              </span>
            </div>

            <div className={`p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 hover:from-green-900/50 hover:to-green-800/50' 
                : 'bg-gradient-to-br from-green-50 to-green-100'
            }`}>
              <Terminal className="w-16 h-16 mx-auto mb-6 text-green-600" />
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Linux</h3>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Ubuntu 18.04+ / Debian 10+
              </p>
              <button className="w-full py-3 text-white transition-colors bg-green-600 rounded-full hover:bg-green-700">
                Download for Ubuntu
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Trusted by millions of users worldwide
            </p>
            <div className={`flex items-center justify-center space-x-8 opacity-60 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <div className="text-2xl font-bold">Noctifera</div>
              <div className="text-2xl font-bold">Wired</div>
              <div className="text-2xl font-bold">TechRadar</div>
              <div className="text-2xl font-bold">PCMag</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-900'} text-white`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="col-span-1">
              <div className="flex items-center mb-6 space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-white to-black">
                  <img src="./src/img/logo.png" alt="Logo"/>
                </div>
                <span className="text-xl font-bold">AISKOA</span>
              </div>
              <p className="mb-6 text-gray-400">
                Creating software that makes technology more human.
              </p>
              <div className="flex space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                }`}>
                  <span className="text-sm">f</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                }`}>
                  <span className="text-sm">t</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                }`}>
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Updates</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">System Requirements</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">About</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Go to Portfolio</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">About Me</a></li>
                <li><a href="#" className="text-gray-400 transition-colors hover:text-white">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className={`border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center ${
            isDark ? 'border-gray-700' : 'border-gray-800'
          }`}>
            <p className="text-sm text-gray-400">
              © 2025 AISKOA. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 md:mt-0">
              <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {selectedImage && (
        <ImageModal 
          src={selectedImage} 
          alt="Imagen ampliada" 
          onClose={handleCloseModal} 
          isDark={isDark}
        />
      )}
    </div>
  );
}

export default App;