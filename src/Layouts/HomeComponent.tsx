import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBarComponent';
import { motion } from 'framer-motion';
import { Calendar, Music, Palette } from 'lucide-react';

const HomeComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/registrar-evento');
  };

  return (
    <Navbar>
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6 text-center text-indigo-700"
        >
          Bienvenido a EventApp
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center text-gray-600 mb-12"
        >
          Tu puerta de entrada a experiencias y conexiones inolvidables
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, title: "Eventos Diversos", description: "Desde charlas tecnológicas hasta exposiciones de arte" },
            { icon: Music, title: "Comunidad Vibrante", description: "Conéctate con personas afines" },
            { icon: Palette, title: "Libertad Creativa", description: "Da vida a tus ideas únicas" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <item.icon className="mx-auto mb-4 text-indigo-500" size={40} />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-700 mb-4">
            ¿Listo para explorar o crear tu próximo evento?
          </p>
          <button 
            onClick={handleNavigate}
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Registrar Evento
          </button>
        </motion.div>
      </div>
    </Navbar>
  );
};

export default HomeComponent;