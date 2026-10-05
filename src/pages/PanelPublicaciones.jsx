import { useState, useEffect, useRef } from 'react';

export default function PanelPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);

  const initialState = {
    titulo: '',
    contenido_texto: '',
    tipo_publicacion: 'ARTICULO', 
    url_media: '',
    estado: 'ACTIVO'
  };

  const [formData, setFormData] = useState(initialState);
  const API_URL = 'http://localhost:3000/api/publicaciones';

  // Credenciales de Cloudinary
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/cgfzvuli/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'imagines-derma';

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const fetchPublicaciones = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPublicaciones(data);
      }
    } catch (error) {
      console.error('Error al cargar publicaciones:', error);
    }
  };

  // LOGICA MEJORADA: Limpia la media si cambias de Tipo de Publicación
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'tipo_publicacion') {
      setFormData({ ...formData, [name]: value, url_media: '' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setFormData({ ...formData, [name]: value });
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
      
      setFormData({ ...formData, url_media: fileData.secure_url });
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

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData(initialState);
        setEditingId(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchPublicaciones();
      }
    } catch (error) {
      console.error('Error al guardar la publicación:', error);
    }
  };

  const handleEditar = (pub) => {
    setFormData({
      titulo: pub.titulo,
      contenido_texto: pub.contenido_texto || '',
      tipo_publicacion: pub.tipo_publicacion,
      url_media: pub.url_media || '',
      estado: pub.estado
    });
    setEditingId(pub.id);
  };

  const cancelarEdicion = () => {
    setFormData(initialState);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta publicación?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) fetchPublicaciones();
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
    }
  };

  const isVideoUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  return (
    <div className="animate-fadeIn font-sans text-slate-800">
      
      <div className={`p-6 rounded-2xl shadow-lg mb-8 transition-all duration-300 ${editingId ? 'bg-rose-50 border-2 border-rose-200' : 'bg-white border border-slate-100'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${editingId ? 'text-rose-700' : 'text-slate-800'}`}>
            {editingId ? '✏️ Editando Publicación' : '✨ Añadir Nueva Publicación'}
          </h2>
          {editingId && (
            <button type="button" onClick={cancelarEdicion} className="text-sm text-slate-500 hover:text-rose-600 font-semibold underline transition-colors">
              Cancelar edición
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input 
            type="text" name="titulo" placeholder="Título de la publicación (Atrapante y claro)" required
            value={formData.titulo} onChange={handleInputChange}
            className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full md:col-span-2 bg-white outline-none transition-all shadow-sm font-medium"
          />
          
          <select 
            name="tipo_publicacion" value={formData.tipo_publicacion} onChange={handleInputChange}
            className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-slate-700 font-bold"
          >
            <option value="ARTICULO">📝 Artículo / Blog</option>
            <option value="VIDEO">▶️ Video</option>
          </select>

          <select 
            name="estado" value={formData.estado} onChange={handleInputChange}
            className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-slate-700 font-bold"
          >
            <option value="ACTIVO">✅ Activo (Visible)</option>
            <option value="OCULTO">👁️‍🗨️ Oculto (Borrador)</option>
          </select>

          {/* ÁREA DINÁMICA DE MEDIA */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-5 items-center bg-slate-50/50 p-5 rounded-xl border border-slate-200 shadow-sm transition-all">
            
            <div className="shrink-0 flex flex-col items-center justify-center">
              {formData.url_media ? (
                formData.tipo_publicacion === 'VIDEO' || isVideoUrl(formData.url_media) ? (
                  <div className="w-24 h-24 bg-slate-900 rounded-xl border-2 border-white flex flex-col items-center justify-center text-rose-500 shadow-md">
                    <span className="text-4xl">▶</span>
                  </div>
                ) : (
                  <img src={formData.url_media} alt="Vista previa" className="w-24 h-24 object-cover rounded-xl shadow-md border-2 border-white" />
                )
              ) : (
                <div className="w-24 h-24 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-2">
                  <span className="text-2xl mb-1">{formData.tipo_publicacion === 'VIDEO' ? '🎥' : '🖼️'}</span>
                  Sin {formData.tipo_publicacion === 'VIDEO' ? 'video' : 'foto'}
                </div>
              )}
            </div>

            <div className="flex-1 w-full">
              {/* Se muestra SOLO si es ARTÍCULO */}
              {formData.tipo_publicacion === 'ARTICULO' && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subir Imagen de Portada</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200 transition-colors cursor-pointer"
                  />
                  {isUploading && <p className="text-sm text-rose-500 mt-2 font-medium animate-pulse">⏳ Subiendo imagen a la nube...</p>}
                </div>
              )}

              {/* Se muestra SOLO si es VIDEO */}
              {formData.tipo_publicacion === 'VIDEO' && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Enlace del Video (YouTube)</label>
                  <input 
                    type="text" name="url_media" placeholder="Ej. https://www.youtube.com/watch?v=..."
                    value={formData.url_media} onChange={handleInputChange}
                    className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-sm"
                  />
                </div>
              )}
            </div>
          </div>
          
          <textarea 
            name="contenido_texto" placeholder="Escribe el contenido del artículo o la descripción del video aquí..."
            value={formData.contenido_texto} onChange={handleInputChange}
            className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-4 rounded-xl w-full md:col-span-2 bg-white outline-none transition-all shadow-sm resize-none"
            rows="6"
          />
          
          <div className="md:col-span-2 pt-2">
            <button 
              type="submit" 
              disabled={isUploading}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 
                ${isUploading ? 'bg-slate-400 cursor-not-allowed' : (editingId ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200')}`}>
              {isUploading ? 'Procesando media...' : (editingId ? '💾 Actualizar Publicación' : '✨ Publicar Ahora')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <th className="p-5">Publicación</th>
                <th className="p-5 text-center">Tipo</th>
                <th className="p-5 text-center">Fecha</th>
                <th className="p-5 text-center">Estado</th>
                <th className="p-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {publicaciones.map(pub => (
                <tr key={pub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      {pub.url_media ? (
                         pub.tipo_publicacion === 'VIDEO' || isVideoUrl(pub.url_media) ? (
                          <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-200 flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                            ▶
                          </div>
                         ) : (
                          <img src={pub.url_media} alt="" className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm shrink-0" />
                         )
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-medium shrink-0">Sin media</div>
                      )}
                      
                      <div className="font-bold text-slate-800 line-clamp-2 max-w-sm" title={pub.titulo}>
                        {pub.titulo}
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${pub.tipo_publicacion === 'VIDEO' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
                      {pub.tipo_publicacion === 'VIDEO' ? '▶️ VIDEO' : '📝 ARTÍCULO'}
                    </span>
                  </td>
                  <td className="p-5 text-center text-sm font-medium text-slate-500">
                    {new Date(pub.fecha_publicacion).toLocaleDateString()}
                  </td>
                  <td className="p-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${pub.estado === 'ACTIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {pub.estado}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEditar(pub)} className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-lg hover:bg-indigo-100 hover:shadow-sm font-semibold transition-all text-sm">
                        Editar
                      </button>
                      <button onClick={() => handleEliminar(pub.id)} className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-lg hover:bg-rose-100 hover:shadow-sm font-semibold transition-all text-sm">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {publicaciones.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-400 font-medium">
                    <div className="text-4xl mb-3">📰</div>
                    No hay publicaciones registradas aún.
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