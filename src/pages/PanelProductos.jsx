import { useState, useEffect, useRef } from 'react';

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// ====================================

export default function PanelProductos() {
  const [productos, setProductos] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);

  const initialState = {
    nombre: '', 
    marca: '', 
    especialidad: '', 
    precio: '', 
    precio_antes: '', 
    stock: '',
    indicacion: '', 
    presentacion: '',
    descripcion: '', 
    beneficios: '',
    url_imagen_cloudinary: '', 
    estado: 'ACTIVO'
  };

  const [formData, setFormData] = useState(initialState);
  
  // === RUTA DINÁMICA ===
  const API_URL = `${API_BASE_URL}/api/productos`;
  // =====================

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/cgfzvuli/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'imagines-derma';

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularDescuento = (precioActual, precioAnterior) => {
    const actual = parseFloat(precioActual);
    const antes = parseFloat(precioAnterior);
    if (!isNaN(actual) && !isNaN(antes) && antes > actual && antes > 0) {
      const porcentaje = ((antes - actual) / antes) * 100;
      return Math.round(porcentaje);
    }
    return 0;
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
      
      setFormData({ ...formData, url_imagen_cloudinary: fileData.secure_url });
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
        fetchProductos();
      }
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  const handleEditar = (producto) => {
    setFormData({
      nombre: producto.nombre || '',
      marca: producto.marca || '',
      especialidad: producto.especialidad || '',
      precio: producto.precio || '',
      precio_antes: producto.precio_antes || '',
      stock: producto.stock !== null ? producto.stock : '',
      indicacion: producto.indicacion || '',
      presentacion: producto.presentacion || '',
      descripcion: producto.descripcion || '',
      beneficios: producto.beneficios || '',
      url_imagen_cloudinary: producto.url_imagen_cloudinary || '',
      estado: producto.estado || 'ACTIVO'
    });
    setEditingId(producto.id);
  };

  const cancelarEdicion = () => {
    setFormData(initialState);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        fetchProductos();
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const descuentoActual = calcularDescuento(formData.precio, formData.precio_antes);

  return (
    <div className="animate-fadeIn font-sans text-slate-800">
      
      <div className={`p-6 rounded-2xl shadow-lg mb-8 transition-all duration-300 ${editingId ? 'bg-rose-50 border-2 border-rose-200' : 'bg-white border border-slate-100'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${editingId ? 'text-rose-700' : 'text-slate-800'}`}>
            {editingId ? '✏️ Editando Producto' : '✨ Añadir Nuevo Producto'}
          </h2>
          {editingId && (
            <button type="button" onClick={cancelarEdicion} className="text-sm text-slate-500 hover:text-rose-600 font-semibold underline transition-colors">
              Cancelar edición
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Nombre del Producto</label>
            <input 
              type="text" name="nombre" placeholder="Ej: MetaSlim Berb" required
              value={formData.nombre} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm font-bold text-lg"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Marca / Subtítulo</label>
            <input 
              type="text" name="marca" placeholder="Ej: BERBERINA 500MG" required
              value={formData.marca} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-emerald-700"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Especialidad</label>
            <input 
              type="text" name="especialidad" placeholder="Ej: Endocrinología" required
              value={formData.especialidad} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm"
            />
          </div>
          
          <div className="md:col-span-1 relative">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Precio Actual (S/)</label>
            <input 
              type="number" step="0.01" name="precio" placeholder="Ej: 150.00" required
              value={formData.precio} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm text-xl font-bold"
            />
          </div>
          
          <div className="md:col-span-1 relative">
            <div className="flex justify-between items-end mb-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Precio Antes (Opcional)</label>
              {descuentoActual > 0 && (
                <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full animate-pulse">
                  -{descuentoActual}% OFF
                </span>
              )}
            </div>
            <input 
              type="number" step="0.01" name="precio_antes" placeholder="Ej: 200.00" 
              value={formData.precio_antes} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-slate-50 outline-none transition-all shadow-sm text-slate-500 line-through"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Stock (Unidades)</label>
            <input 
              type="number" name="stock" placeholder="Ej: 20" required
              value={formData.stock} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Indicación (Etiqueta)</label>
            <input 
              type="text" name="indicacion" placeholder="Ej: Bajo indicación médica (Opcional)"
              value={formData.indicacion} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Presentación</label>
            <input 
              type="text" name="presentacion" placeholder="Ej: Frasco con 60 cápsulas" required
              value={formData.presentacion} onChange={handleInputChange}
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Estado</label>
            <select 
              name="estado" value={formData.estado} onChange={handleInputChange} 
              className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full md:w-1/3 bg-white outline-none transition-all shadow-sm text-slate-700 font-medium"
            >
              <option value="ACTIVO">✅ Activo</option>
              <option value="INACTIVO">❌ Inactivo</option>
            </select>
          </div>

          <div className="md:col-span-3 flex flex-col md:flex-row gap-5 items-center bg-slate-50/50 p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="shrink-0 flex flex-col items-center justify-center">
              {formData.url_imagen_cloudinary ? (
                <img src={formData.url_imagen_cloudinary} alt="Vista previa" className="w-20 h-20 object-cover rounded-lg shadow-md border-2 border-white" />
              ) : (
                <div className="w-20 h-20 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-2">
                  <span className="text-xl mb-1">📦</span>
                  Sin foto
                </div>
              )}
            </div>

            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Subir Imagen del Producto</label>
              <input 
                type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200 transition-colors cursor-pointer"
              />
              {isUploading && <p className="text-sm text-rose-500 mt-2 font-medium animate-pulse">⏳ Subiendo imagen a la nube...</p>}
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Descripción Breve</label>
              <textarea 
                name="descripcion" placeholder="Fórmula magistral orientada..." required
                value={formData.descripcion} onChange={handleInputChange}
                className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm resize-none h-28"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Beneficios (Presiona 'Enter' para separarlos)</label>
              <textarea 
                name="beneficios" placeholder="Ej:&#10;Mejora la sensibilidad a la insulina&#10;Apoya el control del colesterol..." required
                value={formData.beneficios} onChange={handleInputChange}
                className="border-slate-200 focus:border-rose-400 focus:ring-rose-400 border p-3 rounded-xl w-full bg-white outline-none transition-all shadow-sm resize-none h-28"
              />
            </div>
          </div>
          
          <div className="md:col-span-3 pt-2">
            <button 
              type="submit" disabled={isUploading}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 
                ${isUploading ? 'bg-slate-400 cursor-not-allowed' : (editingId ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200')}`}>
              {isUploading ? 'Procesando imagen...' : (editingId ? '💾 Actualizar Producto' : '✨ Guardar Nuevo Producto')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <th className="p-5">Producto / Marca</th>
                <th className="p-5">Especialidad</th>
                <th className="p-5 text-center">Precio</th>
                <th className="p-5 text-center">Stock</th>
                <th className="p-5 text-center">Indicación</th>
                <th className="p-5 text-center">Estado</th>
                <th className="p-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {productos.map(prod => {
                const descuentoProd = calcularDescuento(prod.precio, prod.precio_antes);
                return (
                  <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        {prod.url_imagen_cloudinary ? (
                          <img src={prod.url_imagen_cloudinary} alt={prod.nombre} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-medium">Sin foto</div>
                        )}
                        <div>
                          <div className="font-bold text-slate-800">{prod.nombre}</div>
                          <div className="text-xs font-semibold text-emerald-600 mt-0.5">{prod.marca}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 font-bold text-indigo-600 text-sm">
                      {prod.especialidad}
                    </td>
                    <td className="p-5 text-center">
                      <div className="font-bold text-slate-800 text-lg">S/ {Number(prod.precio).toFixed(2)}</div>
                      {prod.precio_antes && (
                        <div className="flex items-center justify-center gap-1.5 mt-0.5">
                          <span className="text-xs text-slate-400 line-through">S/ {Number(prod.precio_antes).toFixed(2)}</span>
                          {descuentoProd > 0 && (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                              -{descuentoProd}%
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-5 text-center">
                      <span className={`font-bold ${prod.stock <= 5 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {prod.stock}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      {prod.indicacion ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                          {prod.indicacion}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${prod.estado === 'ACTIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {prod.estado}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleEditar(prod)} className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-lg hover:bg-indigo-100 hover:shadow-sm font-semibold transition-all text-sm">
                          Editar
                        </button>
                        <button onClick={() => handleEliminar(prod.id)} className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-lg hover:bg-rose-100 hover:shadow-sm font-semibold transition-all text-sm">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {productos.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-slate-400 font-medium">
                    <div className="text-4xl mb-3">📦</div>
                    No hay productos registrados aún.
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