import React, { useState } from 'react';
import ImageModal from './ImageModal';

import s1 from '../img/s1.png';
import s2 from '../img/s2.png';
import s3 from '../img/s3.png';

interface HelpPageProps {
  onBack: () => void;
  isDark: boolean;
}

const HelpPage: React.FC<HelpPageProps> = ({ onBack, isDark }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`min-h-screen py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <button
          onClick={onBack}
          className={`mb-8 px-6 py-2 rounded-full transition-colors ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
          }`}
        >
          ← Volver a la página principal
        </button>

        <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Cómo usar GIE
        </h1>

        <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Aquí te mostramos cómo utilizar la herramienta GIE para proteger tus archivos de forma sencilla.
        </p>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src={s1} 
                alt="Paso 1: Interfaz principal" 
                className="rounded-lg shadow-lg w-full cursor-pointer"
                onClick={() => handleImageClick(s1)}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                1. Interfaz Principal
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Al abrir GIE, verás una interfaz limpia y fácil de usar. Aquí puedes arrastrar y soltar los archivos que deseas encriptar o desencriptar.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src={s2} 
                alt="Paso 2: Configuración de encriptación" 
                className="rounded-lg shadow-lg w-full cursor-pointer"
                onClick={() => handleImageClick(s2)}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                2. Configuración de Encriptación
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Una vez que hayas arrastrado tus archivos, podrás configurar las opciones de encriptación, como la contraseña, el nivel de seguridad y el canal.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src={s3} 
                alt="Paso 3: Archivos encriptados" 
                className="rounded-lg shadow-lg w-full cursor-pointer"
                onClick={() => handleImageClick(s3)}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                3. Archivos Encriptados
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Después de configurar y aplicar la encriptación, tus archivos estarán protegidos y listos para ser guardados o compartidos de forma segura.
              </p>
            </div>
          </div>
        </div>
      </div>
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
};

export default HelpPage;
