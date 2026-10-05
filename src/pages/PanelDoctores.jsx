import React, { useState, useEffect, useRef } from 'react';

// Días de la semana
const DIAS_SEMANA = [
  { id: 1, label: 'Lunes' }, { id: 2, label: 'Martes' }, { id: 3, label: 'Miércoles' },
  { id: 4, label: 'Jueves' }, { id: 5, label: 'Viernes' }, { id: 6, label: 'Sábado' }, { id: 0, label: 'Domingo' }
];

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// ====================================

export default function PanelDoctores() {
  const [doctores, setDoctores] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [showForm, setShowForm] = useState(false);
  const [showModalTurnos, setShowModalTurnos] = useState(false);
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
  
  const [horariosSemanales, setHorariosSemanales] = useState({});
  const [diasBloqueados, setDiasBloqueados] = useState([]);
  const [nuevaFechaBloqueada, setNuevaFechaBloqueada] = useState('');

  // === ESTADOS PARA CITAS EN FILA EXPANDIBLE ===
  const [todasLasCitas, setTodasLasCitas] = useState([]);
  const [doctorExpandido, setDoctorExpandido] = useState(null);
  const [citaEditando, setCitaEditando] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');
  
  const fileInputRef = useRef(null);

  const initialState = {
    nombres: '', especialidad: '', titulo: '', correo_corporativo: '',
    foto_url: '', precio: '', duracion_min: '20', google_calendar_id: '', activo: true,
    formacion: [], 
    cursos: [],    
    experiencia: [] 
  };

  const [formData, setFormData] = useState(initialState);
  
  const API_URL = `${API_BASE_URL}/api/doctores`;
  const API_CITAS = `${API_BASE_URL}/api/citas`;
  
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/cgfzvuli/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'imagines-derma'; 

  useEffect(() => { 
    fetchDoctores(); 
    fetchAllCitas(); // Carga las citas al iniciar
  }, []);

  const fetchDoctores = async () => {
    try {
      const response = await fetch(API_URL, { headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }});
      if (response.ok) setDoctores(await response.json());
    } catch (error) { console.error('Error:', error); }
  };

  const fetchAllCitas = async () => {
    try {
      // Traemos todas las citas aprobadas para tenerlas listas
      const response = await fetch(`${API_CITAS}?estado=APROBADO`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }});
      if (response.ok) setTodasLasCitas(await response.json());
    } catch (error) { console.error('Error fetching citas:', error); }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const addFormacion = () => setFormData({ ...formData, formacion: [...formData.formacion, { institucion: '', grado: '', periodo: '', logo_url: '' }] });
  const updateFormacion = (index, campo, valor) => {
    const nueva = [...formData.formacion];
    nueva[index][campo] = valor;
    setFormData({ ...formData, formacion: nueva });
  };
  const removeFormacion = (index) => {
    const nueva = [...formData.formacion];
    nueva.splice(index, 1);
    setFormData({ ...formData, formacion: nueva });
  };

  const handleLogoUniversidadUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: data });
      const fileData = await res.json();
      updateFormacion(index, 'logo_url', fileData.secure_url);
    } catch (error) { alert('Error al subir el logo'); } 
    finally { setIsUploading(false); }
  };

  const addCurso = () => setFormData({ ...formData, cursos: [...formData.cursos, ''] });
  const updateCurso = (index, valor) => {
    const nuevos = [...formData.cursos];
    nuevos[index] = valor;
    setFormData({ ...formData, cursos: nuevos });
  };
  const removeCurso = (index) => {
    const nuevos = [...formData.cursos];
    nuevos.splice(index, 1);
    setFormData({ ...formData, cursos: nuevos });
  };

  const addExperiencia = () => setFormData({ ...formData, experiencia: [...formData.experiencia, ''] });
  const updateExperiencia = (index, valor) => {
    const nueva = [...formData.experiencia];
    nueva[index] = valor;
    setFormData({ ...formData, experiencia: nueva });
  };
  const removeExperiencia = (index) => {
    const nueva = [...formData.experiencia];
    nueva.splice(index, 1);
    setFormData({ ...formData, experiencia: nueva });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: data });
      const fileData = await res.json();
      setFormData({ ...formData, foto_url: fileData.secure_url });
    } catch (error) { alert('Error al subir la imagen'); } 
    finally { setIsUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return alert("Espera a que suban las imágenes");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        body: JSON.stringify({ ...formData, activo: formData.activo ? 1 : 0 })
      });
      if (res.ok) {
        cancelarEdicion();
        fetchDoctores();
      }
    } catch (error) { console.error(error); }
  };

  const handleEditar = (doc) => {
    setFormData({ 
      ...doc, 
      activo: doc.activo === 1,
      formacion: doc.formacion || [],
      cursos: doc.cursos || [],
      experiencia: doc.experiencia || []
    });
    setEditingId(doc.id);
    setShowForm(true);
  };

  const cancelarEdicion = () => {
    setFormData(initialState);
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const abrirModalTurnos = async (doc) => {
    setDoctorSeleccionado(doc);
    try {
      const res = await fetch(`${API_URL}/${doc.id}/turnos`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }});
      if (res.ok) {
        const data = await res.json();
        const base = data.horarios_base && data.horarios_base !== 'null' ? JSON.parse(data.horarios_base) : {};
        const bloqueados = data.dias_bloqueados && data.dias_bloqueados !== 'null' ? JSON.parse(data.dias_bloqueados) : [];
        setHorariosSemanales(base);
        setDiasBloqueados(bloqueados);
      }
    } catch (error) { console.error(error); }
    setShowModalTurnos(true);
  };

  const agregarRangoHorario = (diaId) => {
    const actual = horariosSemanales[diaId] || [];
    setHorariosSemanales({ ...horariosSemanales, [diaId]: [...actual, { inicio: "09:00", fin: "13:00" }] });
  };
  const eliminarRangoHorario = (diaId, index) => {
    const actual = [...horariosSemanales[diaId]];
    actual.splice(index, 1);
    const nuevo = { ...horariosSemanales, [diaId]: actual };
    if (actual.length === 0) delete nuevo[diaId]; 
    setHorariosSemanales(nuevo);
  };
  const actualizarRangoHorario = (diaId, index, campo, valor) => {
    const actual = [...horariosSemanales[diaId]];
    actual[index][campo] = valor;
    setHorariosSemanales({ ...horariosSemanales, [diaId]: actual });
  };
  const agregarDiaBloqueado = () => {
    if (nuevaFechaBloqueada && !diasBloqueados.includes(nuevaFechaBloqueada)) {
      setDiasBloqueados([...diasBloqueados, nuevaFechaBloqueada]);
      setNuevaFechaBloqueada('');
    }
  };

  const guardarTurnos = async () => {
    try {
      const res = await fetch(`${API_URL}/${doctorSeleccionado.id}/turnos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        body: JSON.stringify({ horarios_base: JSON.stringify(horariosSemanales), dias_bloqueados: JSON.stringify(diasBloqueados) })
      });
      if (res.ok) {
        alert("¡Horarios configurados!");
        setShowModalTurnos(false);
      }
    } catch (error) { alert("Error al guardar"); }
  };

  // === LÓGICA DE FILA EXPANDIBLE ===
  const toggleCitasDoctor = (id) => {
    if (doctorExpandido === id) {
      setDoctorExpandido(null);
      setCitaEditando(null); // Limpia edición si se cierra
    } else {
      setDoctorExpandido(id);
    }
  };

  const iniciarEdicionCita = (cita) => {
    setCitaEditando(cita.id);
    setNuevaFecha(cita.fecha);
    setNuevaHora(cita.hora);
  };

  const guardarReprogramacion = async (idCita) => {
    try {
      const res = await fetch(`${API_CITAS}/${idCita}/reprogramar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        body: JSON.stringify({ fecha: nuevaFecha, hora: nuevaHora })
      });
      if (res.ok) {
        alert('Cita reprogramada con éxito.');
        setCitaEditando(null);
        fetchAllCitas(); // Refresca las citas de todos tras reprogramar
      } else {
        alert('Hubo un error al reprogramar.');
      }
    } catch (error) { console.error(error); }
  };

  return (
    <div className="animate-fadeIn font-sans text-slate-800">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">👨‍⚕️ Staff Médico</h2>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all">
            + Agregar Doctor
          </button>
        )}
      </div>

      {showForm && (
        <div className={`p-6 rounded-2xl shadow-lg mb-8 transition-all duration-300 ${editingId ? 'bg-sky-50 border-2 border-sky-200' : 'bg-white border border-slate-100'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${editingId ? 'text-sky-700' : 'text-slate-800'}`}>
              {editingId ? '✏ Editando Doctor y Currículum' : '✨ Nuevo Doctor'}
            </h2>
            <button type="button" onClick={cancelarEdicion} className="text-sm text-slate-500 hover:text-rose-600 font-semibold underline">Cancelar</button>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-4 bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <h3 className="md:col-span-3 font-bold text-slate-700 border-b pb-2 mb-2">1. Datos Principales</h3>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Nombres y Apellidos</label>
                <input type="text" name="nombres" required value={formData.nombres} onChange={handleInputChange} className="border p-2.5 rounded-lg w-full outline-none focus:border-sky-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Especialidad Principal</label>
                <input type="text" name="especialidad" required value={formData.especialidad} onChange={handleInputChange} className="border p-2.5 rounded-lg w-full outline-none focus:border-sky-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Correo Corporativo</label>
                <input type="email" name="correo_corporativo" value={formData.correo_corporativo} onChange={handleInputChange} className="border p-2.5 rounded-lg w-full outline-none focus:border-sky-400" placeholder="Público" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-500 mb-1">Subtítulo Descriptivo</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} className="border p-2.5 rounded-lg w-full outline-none focus:border-sky-400 text-emerald-700 font-medium" placeholder="Ej: Médica Endocrinóloga..." />
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <h3 className="md:col-span-3 font-bold text-slate-700 border-b pb-2 mb-2">2. Reservas y Fotografía</h3>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Precio Consulta (S/)</label>
                <input type="number" step="0.01" name="precio" required value={formData.precio} onChange={handleInputChange} className="border p-2.5 rounded-lg w-full outline-none focus:border-sky-400 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Duración Cita (Min)</label>
                <input type="number" name="duracion_min" required value={formData.duracion_min} onChange={handleInputChange} className="border p-2.5 rounded-lg w-full outline-none focus:border-sky-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Google Calendar ID</label>
                <input type="email" name="google_calendar_id" value={formData.google_calendar_id} onChange={handleInputChange} className="border p-2.5 rounded-lg w-full outline-none focus:border-sky-400" placeholder="Privado" />
              </div>

              <div className="md:col-span-3 flex flex-col md:flex-row gap-5 items-center bg-white p-4 rounded-xl border border-slate-200 mt-2">
                {formData.foto_url ? (
                  <img src={formData.foto_url} alt="Vista" className="w-16 h-16 object-cover rounded-2xl shadow-sm" />
                ) : (
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-xs text-slate-400 text-center leading-tight p-2">Sin foto</div>
                )}
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subir Foto Principal</label>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer" />
                </div>
                <label className="flex items-center gap-2 font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border cursor-pointer shrink-0">
                  <input type="checkbox" name="activo" checked={formData.activo} onChange={handleInputChange} className="w-5 h-5 accent-emerald-500" /> Visible en Web
                </label>
              </div>
            </div>

            <div className="md:col-span-4 bg-amber-50/50 p-5 rounded-xl border border-amber-200 grid grid-cols-1 gap-6">
              <h3 className="font-bold text-amber-800 border-b border-amber-200 pb-2">3. Currículum y Perfil Público</h3>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-bold text-slate-700">🎓 Formación Académica</label>
                  <button type="button" onClick={addFormacion} className="text-xs bg-amber-200 text-amber-800 px-3 py-1 rounded-lg font-bold hover:bg-amber-300 transition-colors">+ Añadir Estudio</button>
                </div>
                <div className="space-y-4">
                  {formData.formacion.map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 items-start bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                      <div className="shrink-0 flex flex-col items-center w-full md:w-24">
                        {item.logo_url ? (
                          <img src={item.logo_url} alt="Logo U" className="w-12 h-12 object-contain bg-slate-50 border rounded-lg p-1" />
                        ) : (
                          <div className="w-12 h-12 bg-slate-100 border border-dashed rounded-lg flex items-center justify-center text-[10px] text-slate-400 text-center">Sin Logo</div>
                        )}
                        <label className="mt-2 text-[10px] bg-sky-100 text-sky-700 px-2 py-1 rounded cursor-pointer hover:bg-sky-200 font-bold text-center w-full">
                          Subir Logo
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleLogoUniversidadUpload(e, idx)} />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow w-full">
                        <input type="text" placeholder="Institución" value={item.institucion} onChange={(e) => updateFormacion(idx, 'institucion', e.target.value)} className="border p-2 rounded-lg text-sm w-full outline-none focus:border-amber-400" />
                        <input type="text" placeholder="Grado/Título" value={item.grado} onChange={(e) => updateFormacion(idx, 'grado', e.target.value)} className="border p-2 rounded-lg text-sm w-full outline-none focus:border-amber-400" />
                        <input type="text" placeholder="Periodo" value={item.periodo} onChange={(e) => updateFormacion(idx, 'periodo', e.target.value)} className="border p-2 rounded-lg text-sm w-full md:col-span-2 outline-none focus:border-amber-400" />
                      </div>
                      <button type="button" onClick={() => removeFormacion(idx)} className="text-red-400 hover:text-red-600 px-2 font-bold text-xl ml-auto">×</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-bold text-slate-700">📜 Cursos y Certificaciones</label>
                    <button type="button" onClick={addCurso} className="text-xs bg-amber-200 text-amber-800 px-3 py-1 rounded-lg font-bold hover:bg-amber-300 transition-colors">+ Añadir</button>
                  </div>
                  <div className="space-y-2">
                    {formData.cursos.map((curso, idx) => (
                      <div key={idx} className="flex gap-2 bg-white p-2 rounded-lg border border-amber-100">
                        <input type="text" placeholder="Ej: Certificación SCOPE..." value={curso} onChange={(e) => updateCurso(idx, e.target.value)} className="flex-grow outline-none text-sm px-2" />
                        <button type="button" onClick={() => removeCurso(idx)} className="text-red-400 hover:text-red-600 px-2 font-bold">×</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-bold text-slate-700">💼 Experiencia Laboral</label>
                    <button type="button" onClick={addExperiencia} className="text-xs bg-amber-200 text-amber-800 px-3 py-1 rounded-lg font-bold hover:bg-amber-300 transition-colors">+ Añadir</button>
                  </div>
                  <div className="space-y-2">
                    {formData.experiencia.map((exp, idx) => (
                      <div key={idx} className="flex gap-2 bg-white p-2 rounded-lg border border-amber-100">
                        <input type="text" placeholder="Ej: Médica Endocrinóloga..." value={exp} onChange={(e) => updateExperiencia(idx, e.target.value)} className="flex-grow outline-none text-sm px-2" />
                        <button type="button" onClick={() => removeExperiencia(idx)} className="text-red-400 hover:text-red-600 px-2 font-bold">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 pt-2">
              <button type="submit" disabled={isUploading} className="w-full text-white font-bold py-4 rounded-xl shadow-md bg-sky-600 hover:bg-sky-700 text-lg transition-transform hover:-translate-y-1">
                {isUploading ? 'Procesando imágenes...' : '💾 Guardar Ficha Completa del Doctor'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLA PRINCIPAL DE DOCTORES */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="p-4">Doctor y Título</th>
                <th className="p-4">Especialidad</th>
                <th className="p-4">Consulta</th>
                <th className="p-4 text-center">Gestión y Herramientas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctores.map(doc => {
                // Filtramos las citas que pertenecen a este doctor específico
                const citasDelDoctor = todasLasCitas.filter(c => c.doctor === doc.nombres);
                const isExpanded = doctorExpandido === doc.id;

                return (
                  <React.Fragment key={doc.id}>
                    {/* FILA PRINCIPAL DEL DOCTOR */}
                    <tr className={`transition-colors ${isExpanded ? 'bg-purple-50/30' : 'hover:bg-slate-50'}`}>
                      <td className="p-4 flex items-center gap-4">
                        {doc.foto_url ? (
                          <img src={doc.foto_url} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-200" />
                        )}
                        <div>
                          <div className="font-bold text-slate-800 flex items-center gap-2">
                            {doc.nombres}
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${doc.activo === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {doc.activo === 1 ? 'ACTIVO' : 'INACTIVO'}
                            </span>
                          </div>
                          <div className="text-[11px] text-emerald-700 font-medium max-w-xs truncate" title={doc.titulo}>{doc.titulo || 'Sin título descriptivo'}</div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600">{doc.especialidad}</td>
                      <td className="p-4 font-bold text-slate-700">
                        S/ {doc.precio} <span className="text-xs text-slate-400 font-normal block">{doc.duracion_min} min</span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEditar(doc)} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200">Editar</button>
                          <button onClick={() => abrirModalTurnos(doc)} className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-200">🕒 Turnos</button>
                          <button 
                            onClick={() => toggleCitasDoctor(doc.id)} 
                            className={`${isExpanded ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} px-3 py-1.5 rounded-lg text-xs font-bold transition-colors`}
                          >
                            {isExpanded ? 'Ocultar Citas' : `Ver Citas (${citasDelDoctor.length})`}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* FILA EXPANDIBLE DE CITAS */}
                    {isExpanded && (
                      <tr>
                        <td colSpan="4" className="p-0 border-b-2 border-purple-200 bg-purple-50/30">
                          <div className="p-6 animate-fadeIn">
                            <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                              📅 Citas Activas de {doc.nombres}
                            </h4>
                            
                            {citasDelDoctor.length === 0 ? (
                              <p className="text-slate-500 text-sm bg-white p-4 rounded-lg border border-dashed border-slate-300 text-center">
                                Este doctor no tiene citas aprobadas actualmente.
                              </p>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {citasDelDoctor.map(cita => (
                                  <div key={cita.id} className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm relative">
                                    <div className="font-bold text-slate-800">{cita.paciente}</div>
                                    <div className="text-xs text-slate-500 mb-3">{cita.telefono || 'Sin celular'}</div>
                                    
                                    <div className="text-sm font-bold text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg mb-3 inline-block">
                                      {cita.fecha} — {cita.hora}
                                    </div>

                                    {citaEditando === cita.id ? (
                                      <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-slate-100">
                                        <div className="flex gap-2">
                                          <input type="date" min={new Date().toISOString().split('T')[0]} value={nuevaFecha} onChange={(e)=>setNuevaFecha(e.target.value)} className="border p-1.5 rounded text-xs outline-none w-full" />
                                          <input type="time" value={nuevaHora} onChange={(e)=>setNuevaHora(e.target.value)} className="border p-1.5 rounded text-xs outline-none w-full" />
                                        </div>
                                        <div className="flex gap-2 w-full mt-1">
                                          <button onClick={() => guardarReprogramacion(cita.id)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1.5 rounded text-xs w-1/2 font-bold transition-colors">Guardar</button>
                                          <button onClick={() => setCitaEditando(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1.5 rounded text-xs w-1/2 font-bold transition-colors">Cancelar</button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="mt-2 pt-3 border-t border-slate-100 text-right">
                                        <button onClick={() => iniciarEdicionCita(cita)} className="text-xs font-bold text-purple-600 hover:text-purple-800 underline">
                                          Reprogramar Cita
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Turnos se mantiene intacto */}
      {showModalTurnos && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
              <div>
                <h3 className="font-bold text-xl text-slate-800">🕒 Horarios de {doctorSeleccionado?.nombres}</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1">El sistema genera automáticamente el calendario de meses futuros.</p>
              </div>
              <button onClick={() => setShowModalTurnos(false)} className="bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">&times;</button>
            </div>
            
            <div className="p-6">
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2">1. Base Semanal (Días Regulares de Atención)</h4>
              <div className="space-y-4">
                {DIAS_SEMANA.map(dia => {
                  const rangos = horariosSemanales[dia.id] || [];
                  const activo = rangos.length > 0;
                  
                  return (
                    <div key={dia.id} className={`p-4 rounded-xl border transition-colors ${activo ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="flex items-center gap-3 font-bold text-slate-700 cursor-pointer">
                          <input type="checkbox" checked={activo} onChange={() => activo ? setHorariosSemanales({...horariosSemanales, [dia.id]: []}) : agregarRangoHorario(dia.id)} className="w-5 h-5 accent-emerald-600" />
                          {dia.label}
                        </label>
                        {activo && <button onClick={() => agregarRangoHorario(dia.id)} className="text-xs text-emerald-600 font-bold hover:underline">+ Añadir otro bloque</button>}
                      </div>
                      {activo && (
                        <div className="mt-3 space-y-2 pl-8">
                          {rangos.map((rango, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <span className="text-sm text-slate-500">De</span>
                              <input type="time" value={rango.inicio} onChange={(e) => actualizarRangoHorario(dia.id, idx, 'inicio', e.target.value)} className="border rounded-lg px-2 py-1 text-sm outline-none focus:border-emerald-400" />
                              <span className="text-sm text-slate-500">A</span>
                              <input type="time" value={rango.fin} onChange={(e) => actualizarRangoHorario(dia.id, idx, 'fin', e.target.value)} className="border rounded-lg px-2 py-1 text-sm outline-none focus:border-emerald-400" />
                              <button onClick={() => eliminarRangoHorario(dia.id, idx)} className="text-red-400 hover:text-red-600 ml-2" title="Eliminar bloque">🗑️</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <h4 className="font-bold text-slate-700 mt-8 mb-4 border-b pb-2">2. Fechas Excepcionales Bloqueadas (Vacaciones, Feriados)</h4>
              <div className="flex items-center gap-3 mb-4">
                <input type="date" value={nuevaFechaBloqueada} onChange={(e) => setNuevaFechaBloqueada(e.target.value)} className="border rounded-lg p-2 outline-none focus:border-emerald-400" />
                <button onClick={agregarDiaBloqueado} className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700">Bloquear Día</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {diasBloqueados.map((fecha, idx) => (
                  <span key={idx} className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 font-medium border border-rose-200">
                    {fecha}
                    <button onClick={() => setDiasBloqueados(diasBloqueados.filter(f => f !== fecha))} className="font-bold text-rose-500 hover:text-rose-800">x</button>
                  </span>
                ))}
                {diasBloqueados.length === 0 && <span className="text-sm text-slate-400 italic">No hay fechas bloqueadas.</span>}
              </div>
            </div>

            <div className="sticky bottom-0 p-5 border-t bg-white flex justify-end gap-3 z-10">
              <button onClick={() => setShowModalTurnos(false)} className="px-5 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors">Cerrar</button>
              <button onClick={guardarTurnos} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-md">💾 Guardar Horarios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}