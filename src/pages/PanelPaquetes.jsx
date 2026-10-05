import React, { useState, useEffect, useRef } from 'react';

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// ====================================

export default function PanelPaquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);

  const initialState = {
    encabezado: '',
    categoria: '',
    titulo: '',
    subtitulo: '',
    precio: '',
    vigencia: '',
    beneficios: '',
    url_imagen: '',
    estado: 'ACTIVO',
    destacado: false
  };

  const [formData, setFormData] = useState(initialState);
  
  // === RUTA DINÁMICA ACTUALIZADA ===
  const API_URL = `${API_BASE_URL}/api/paquetes`;
  // =================================
  
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/cgfzvuli/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'imagines-derma'; 

  useEffect(() => {
    fetchPaquetes();
  }, []);

  const fetchPaquetes = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPaquetes(data);
      }
    } catch (error) {
      console.error('Error al cargar paquetes:', error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: data
      });
      const fileData = await response.json();
      
      setFormData({ ...formData, url_imagen: fileData.secure_url });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) {
      alert("Espera a que termine de subir la imagen");
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const dataToSend = {
        ...formData,
        destacado: formData.destacado ? 1 : 0
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        setFormData(initialState);
        setEditingId(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchPaquetes();
      }
    } catch (error) {
      console.error('Error al guardar el paquete:', error);
    }
  };

  const handleEditar = (paquete) => {
    setFormData({
      encabezado: paquete.encabezado || '',
      categoria: paquete.categoria || '',
      titulo: paquete.titulo || '',
      subtitulo: paquete.subtitulo || '',
      precio: paquete.precio || '',
      vigencia: paquete.vigencia || '',
      beneficios: paquete.beneficios || '',
      url_imagen: paquete.url_imagen || '',
      estado: paquete.estado || 'ACTIVO',
      destacado: paquete.destacado === 1 || paquete.destacado === true
    });
    setEditingId(paquete.id);
  };

  const cancelarEdicion = () => {
    setFormData(initialState);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este paquete/plan?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) fetchPaquetes();
    } catch (error) {
      console.error('Error al eliminar paquete:', error);
    }
  };

  return (
    <div className="animate-fadeIn font-sans text-slate-800">
      
      <div className={`p-6 rounded-2xl shadow-lg mb-8 transition-all duration-300 ${editingId ? 'bg-rose-50 border-2 border-rose-200' : 'bg-white border border-slate-100'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${editingId ? 'text-rose-700' : 'text-slate-800'}`}>
            {editingId ? '✏️ Editando Plan / Paquete' : '✨ Añadir Nuevo Plan'}
          </h2>
          {editingId && (
            <button type="button" onClick={cancelarEdicion} className="text-sm text-slate-500 hover:text-rose-600 font-semibold underline transition-colors">
              Cancelar edición
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Texto sobre la imagen (Encabezado)</label>
            <input 
              type="text" name="encabezado" placeholder="Ej: Tu consulta, con el tiempo y la atención que necesitas." required
              value={formData.encabezado} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Título Principal</label>
            <input 
              type="text" name="titulo" placeholder="Ej: Evaluación Presencial" required
              value={formData.titulo} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm font-bold text-lg"
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Categoría</label>
            <input 
              type="text" name="categoria" placeholder="Ej: PAQUETE DE EVALUACIÓN" required
              value={formData.categoria} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Subtítulo (Debajo del Título)</label>
            <input 
              type="text" name="subtitulo" placeholder="Ej: 1 inicial + 1 reevaluación · presencial" required
              value={formData.subtitulo} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-emerald-700"
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Precio Total (S/)</label>
            <input 
              type="number" step="0.01" name="precio" placeholder="Ej: 279.00" required
              value={formData.precio} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-xl font-bold"
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Vigencia</label>
            <input 
              type="text" name="vigencia" placeholder="Ej: Vigencia 2 meses" required
              value={formData.vigencia} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-slate-500"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Estado</label>
            <select 
              name="estado" value={formData.estado} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-slate-700 font-medium"
            >
              <option value="ACTIVO">✅ Activo</option>
              <option value="INACTIVO">❌ Inactivo</option>
            </select>
          </div>
          
          <div className="md:col-span-3 flex flex-col md:flex-row gap-5 items-center bg-slate-50/50 p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="shrink-0 flex flex-col items-center justify-center">
              {formData.url_imagen ? (
                <img src={formData.url_imagen} alt="Vista previa" className="w-20 h-20 object-cover rounded-lg shadow-md border-2 border-white" />
              ) : (
                <div className="w-20 h-20 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-2">
                  <span className="text-xl mb-1">📷</span>
                  Sin foto
                </div>
              )}
            </div>

            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Subir Imagen del Paquete</label>
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200 transition-colors cursor-pointer"
              />
              {isUploading && <p className="text-sm text-rose-500 mt-2 font-medium animate-pulse">⏳ Subiendo imagen de forma segura...</p>}
            </div>
            
            <label className="flex items-center gap-3 font-bold text-slate-700 cursor-pointer w-full md:w-auto shrink-0 p-4 bg-white border border-slate-200 shadow-sm rounded-xl hover:border-rose-300 transition-all">
              <input 
                type="checkbox" 
                name="destacado" 
                checked={formData.destacado} 
                onChange={handleInputChange}
                className="w-5 h-5 accent-rose-500 cursor-pointer rounded"
              />
              ⭐ Destacar Plan
            </label>
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Beneficios (Presiona "Enter" por cada beneficio para separarlos)</label>
            <textarea 
              name="beneficios" 
              placeholder="Ej:&#10;Ambas consultas en consultorio...&#10;Seguimiento de resultados...&#10;Gráficos de progreso..." 
              required
              value={formData.beneficios} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm resize-none"
              rows="4"
            />
          </div>
          
          <div className="md:col-span-3 pt-2">
            <button 
              type="submit" 
              disabled={isUploading}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 
                ${isUploading ? 'bg-slate-400 cursor-not-allowed' : (editingId ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200')}`}>
              {isUploading ? 'Procesando imagen...' : (editingId ? '💾 Actualizar Plan' : '✨ Guardar Nuevo Plan')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <th className="p-5">Plan / Título</th>
                <th className="p-5 text-center">Precio</th>
                <th className="p-5 text-center">Vigencia</th>
                <th className="p-5 text-center">Estado</th>
                <th className="p-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paquetes.map(paquete => (
                <tr key={paquete.id} className={`hover:bg-slate-50 transition-colors ${paquete.destacado ? 'bg-amber-50/40' : ''}`}>
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      {paquete.url_imagen ? (
                        <img src={paquete.url_imagen} alt="" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400">Sin foto</div>
                      )}
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          {paquete.titulo}
                          {(paquete.destacado === 1 || paquete.destacado === true) && (
                            <span title="Plan Destacado" className="text-amber-500 text-sm">⭐</span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-slate-400 mt-0.5">{paquete.categoria}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center font-bold text-slate-800 text-lg">S/ {Number(paquete.precio).toFixed(2)}</td>
                  <td className="p-5 text-center text-sm font-medium text-slate-600">{paquete.vigencia}</td>
                  <td className="p-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${paquete.estado === 'ACTIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {paquete.estado}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEditar(paquete)} className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-lg hover:bg-indigo-100 hover:shadow-sm font-semibold transition-all text-sm">
                        Editar
                      </button>
                      <button onClick={() => handleEliminar(paquete.id)} className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-lg hover:bg-rose-100 hover:shadow-sm font-semibold transition-all text-sm">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paquetes.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-400 font-medium">
                    <div className="text-4xl mb-3">📄</div>
                    No hay planes registrados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}