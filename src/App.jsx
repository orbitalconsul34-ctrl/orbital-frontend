import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home'; 
import NosotrosPage from './pages/NosotrosPage'; 
import EquipoPage from './pages/EquipoPage';
import NoticiasPage from './pages/NoticiasPage'; 
import NoticiaDetalle from './pages/NoticiaDetalle'; // <--- IMPORTAMOS LA NUEVA PÁGINA DE DETALLE
import ContactoPage from './pages/ContactoPage';
import ReservarCitaPage from './pages/ReservarCitaPage'; 
import ProductosPage from './pages/ProductosPage'; 
import ProductoDetalle from './pages/ProductoDetalle'; 
import InBodyPage from './pages/InBodyPage';
import Footer from './components/Footer'; 

// Componentes del Panel de Administración
import LoginAdmin from './pages/LoginAdmin'; 
import AdminDashboard from './pages/AdminDashboard'; 

// === IMPORTAMOS EL CONTEXTO Y LOS BOTONES ===
import { CartProvider } from './context/CartContext';
import BotonesFlotantes from './components/BotonesFlotantes';

function AppContent() {
  const location = useLocation();
  
  // Verificamos si la ruta actual empieza con "/admin"
  const esRutaAdmin = location.pathname.startsWith('/admin');

  return (
  
    <div className="font-raleway antialiased bg-[#efe8d8] min-h-screen flex flex-col relative">
      
      {/* Si NO es ruta de admin, muestra el Navbar y los botones globales */}
      {!esRutaAdmin && (
        <>
          <Navbar />
          <BotonesFlotantes /> 
        </>
      )}
      
      <main className="flex-grow">
        <Routes>
          {/* --- Rutas Públicas de la Clínica --- */}
          <Route path="/" element={<Home />} />
          <Route path="/inbody" element={<InBodyPage />} /> 
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          
          <Route path="/noticias" element={<NoticiasPage />} /> 
          <Route path="/noticias/:id" element={<NoticiaDetalle />} /> {/* <--- NUEVA RUTA AGREGADA PARA EL DETALLE */}
          
          <Route path="/contacto" element={<ContactoPage />} /> 
          <Route path="/reservar-cita" element={<ReservarCitaPage />} /> 
          <Route path="/productos" element={<ProductosPage />} /> 
          <Route path="/producto/:id" element={<ProductoDetalle />} /> 
          
          {/* --- Rutas del Panel de Administración --- */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      
    </div>
  );
}
 
// Componente Principal envuelto en el CartProvider
function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;