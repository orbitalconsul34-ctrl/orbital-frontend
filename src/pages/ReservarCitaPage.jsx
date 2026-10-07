import React, { useState, useEffect } from 'react';
import TablaComparativa from '../components/TablaComparativa';
import Footer from '../components/Footer';

// ---------- Configuración ----------
const API = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api`;
const CULQI_PK = import.meta.env.VITE_CULQI_PUBLIC_KEY; // llave PÚBLICA (pk_test_... / pk_live_...)
const PASOS = ['Especialista', 'Fecha y hora', 'Tus datos', 'Pago'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS_SEM = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Cada estado del día tiene su propio aspecto
const ESTILO_DIA = {
  disponible: 'bg-os-beige text-os-dark font-bold hover:bg-os-taupe/70 cursor-pointer',
  pocos: 'bg-amber-100 text-amber-800 font-bold hover:bg-amber-200 cursor-pointer',
  lleno: 'text-os-gray-taupe/60 line-through cursor-not-allowed',
  cerrado: 'text-os-gray-taupe/40 cursor-default',
};
const BTN = 'rounded-xl bg-os-dark text-os-beige font-bold px-7 py-3.5 text-sm hover:bg-os-accent transition disabled:bg-os-light/50 disabled:text-white/80 disabled:cursor-not-allowed';
const BTN_2 = 'rounded-xl border border-os-light px-7 py-3.5 text-sm font-bold text-os-dark hover:bg-os-beige transition';

// ---------- Utilidades ----------
const pad = (n) => String(n).padStart(2, '0');
const hora12 = (h) => { const [H, M] = h.split(':').map(Number); return `${pad(H % 12 || 12)}:${pad(M)} ${H >= 12 ? 'PM' : 'AM'}`; };
const fmtFecha = (f) => new Date(`${f}T12:00:00`).toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });
const soles = (n) => `S/ ${Number(n).toFixed(2).replace(/\.00$/, '')}`;

const call = async (ruta, opciones) => {
  const r = await fetch(`${API}${ruta}`, opciones);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || 'Ocurrió un error. Intenta de nuevo.');
  return data;
};
const post = (ruta, body) => call(ruta, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

// Carga el script del Custom Checkout de Culqi solo cuando hace falta
const cargarCulqi = () => new Promise((ok, fail) => {
  if (window.CulqiCheckout) return ok();
  const s = document.createElement('script');
  s.src = 'https://js.culqi.com/checkout-js';
  s.onload = ok;
  s.onerror = () => fail(new Error('No pudimos cargar el pago. Revisa tu conexión e intenta de nuevo.'));
  document.body.appendChild(s);
});

// ---------- Piezas pequeñas (fuera del componente para no perder el foco al escribir) ----------
const Foto = ({ d, size = 'w-16 h-16' }) =>
  d.foto_url
    ? <img src={d.foto_url} alt={d.nombres} className={`${size} rounded-xl object-cover shrink-0`} />
    : <div className={`${size} rounded-xl bg-os-taupe/50 text-os-dark grid place-items-center text-xl font-semibold shrink-0`}>{d.nombres[0]}</div>;

const Titulo = ({ children, sub }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-semibold text-os-dark">{children}</h2>
    {sub && <p className="text-sm text-os-ink-soft mt-1.5">{sub}</p>}
  </div>
);

const Campo = ({ label, className = '', ...props }) => (
  <label className={`block ${className}`}>
    <span className="block text-sm font-semibold text-os-dark mb-1.5">{label}</span>
    <input {...props} className="w-full rounded-xl border border-os-light/60 bg-os-beige/40 px-4 py-3 text-sm outline-none focus:border-os-dark focus:ring-2 focus:ring-os-dark/15 transition" />
  </label>
);

const Fila = ({ label, valor, pendiente }) => (
  <div className="flex justify-between gap-4 text-sm">
    <dt className="text-os-light">{label}</dt>
    <dd className={`text-right first-letter:uppercase ${pendiente ? 'text-os-light italic' : 'font-semibold'}`}>{valor}</dd>
  </div>
);

const Pasos = ({ paso, onClick }) => (
  <ol className="flex items-center max-w-3xl mx-auto mb-8">
    {PASOS.map((nombre, i) => {
      const n = i + 1;
      const hecho = paso > n;
      const activo = paso === n;
      return (
        <li key={nombre} className="flex-1 flex items-center last:flex-none">
          <button disabled={!hecho} onClick={() => onClick(n)} className="flex items-center gap-2 disabled:cursor-default">
            <span className={`w-8 h-8 rounded-full grid place-items-center text-sm font-bold transition ${activo ? 'bg-os-dark text-os-beige' : hecho ? 'bg-os-accent text-white' : 'bg-white text-os-gray-taupe border border-os-light/50'}`}>
              {hecho ? '✓' : n}
            </span>
            <span className={`hidden sm:block text-sm font-semibold ${activo ? 'text-os-dark' : 'text-os-gray-taupe'}`}>{nombre}</span>
          </button>
          {n < PASOS.length && <span className={`flex-1 h-px mx-3 ${hecho ? 'bg-os-accent' : 'bg-os-light/40'}`} />}
        </li>
      );
    })}
  </ol>
);

// ---------- Página ----------
export default function ReservarCitaPage() {
  const hoy = new Date();
  const mesActual = hoy.getFullYear() * 12 + hoy.getMonth();

  const [paso, setPaso] = useState(1);
  const [doctores, setDoctores] = useState([]);
  const [cargandoDocs, setCargandoDocs] = useState(true);
  const [especialidad, setEspecialidad] = useState('Todas');
  
  const [doctor, setDoctor] = useState(null);
  const [modalidad, setModalidad] = useState('PRESENCIAL');
  
  const [mes, setMes] = useState({ y: hoy.getFullYear(), m: hoy.getMonth() });
  const [disp, setDisp] = useState(null);
  const [cargandoDisp, setCargandoDisp] = useState(false);
  const [refresco, setRefresco] = useState(0);
  const [dia, setDia] = useState(null);
  const [hora, setHora] = useState(null);
  const [reserva, setReserva] = useState(null); // { id, token, finMs }
  const [segundos, setSegundos] = useState(null);
  const [form, setForm] = useState({ dni: '', nombre_completo: '', telefono: '', correo: '', motivo: '', acepta: false });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);

  const mesKey = `${mes.y}-${pad(mes.m + 1)}`;

  // Doctores
  useEffect(() => {
    call('/doctores/publicos')
      .then(setDoctores)
      .catch(() => setError('No pudimos cargar los especialistas. Recarga la página.'))
      .finally(() => setCargandoDocs(false));
  }, []);

  // Disponibilidad del doctor en el mes visible
  useEffect(() => {
    if (!doctor) return;
    let cancelado = false;
    setCargandoDisp(true);
    call(`/citas/disponibilidad/${doctor.id}?mes=${mesKey}`)
      .then((d) => !cancelado && setDisp(d))
      .catch((e) => !cancelado && setError(e.message))
      .finally(() => !cancelado && setCargandoDisp(false));
    return () => { cancelado = true; };
  }, [doctor, mesKey, refresco]);

  // Cuenta regresiva calculada con la hora fin que dio el servidor
  useEffect(() => {
    if (!reserva) { setSegundos(null); return; }
    const tick = () => setSegundos(Math.max(0, Math.round((reserva.finMs - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [reserva]);

  // ---------- Acciones ----------
  const liberar = () => {
    if (!reserva) return;
    post(`/citas/${reserva.id}/liberar`, { token: reserva.token }).catch(() => {});
    setReserva(null);
  };

  const elegirDoctor = (d) => {
    liberar();
    setDoctor(d); setDisp(null); setDia(null); setHora(null); setError(''); setPaso(2);
  };

  const irAPaso = (n) => {
    if (n < 3) { liberar(); setHora(null); setRefresco((x) => x + 1); }
    setError(''); setPaso(n);
  };

  const cambiarMes = (delta) => {
    const t = mes.y * 12 + mes.m + delta;
    setMes({ y: Math.floor(t / 12), m: t % 12 });
    setDia(null); setHora(null);
  };

  const reservarHorario = async () => {
    setEnviando(true); setError('');
    try {
      const r = await post('/citas/reservar', { id_doctor: doctor.id, fecha: dia, hora, modalidad });
      setReserva({ id: r.id, token: r.token, finMs: Date.now() + r.segundos_restantes * 1000 });
      setPaso(3);
    } catch (e) {
      setError(e.message); setHora(null); setRefresco((x) => x + 1);
    } finally { setEnviando(false); }
  };

  // El checkout nos da un token; el backend hace el cobro real con la llave secreta
  const cobrar = async (culqiToken) => {
    setEnviando(true); setError('');
    try {
      await post(`/citas/${reserva.id}/pagar`, {
        token: reserva.token,
        culqi_token: culqiToken,
        dni: form.dni,
        nombre_completo: form.nombre_completo,
        telefono: form.telefono,
        correo: form.correo,
        motivo: form.motivo,
      });
      setListo(true);
    } catch (e) { setError(e.message); }
    finally { setEnviando(false); }
  };

  const pagar = async () => {
    setError('');
    if (!CULQI_PK) { setError('Falta configurar VITE_CULQI_PUBLIC_KEY en el frontend.'); return; }
    try { await cargarCulqi(); } catch (e) { setError(e.message); return; }

    const precioACobrar = modalidad === 'VIRTUAL' ? doctor.precio_virtual : doctor.precio;

    const checkout = new window.CulqiCheckout(CULQI_PK, {
      settings: { title: 'Orbital Salud', currency: 'PEN', amount: Math.round(Number(precioACobrar) * 100) },
      client: { email: form.correo },
      options: {
        lang: 'es',
        installments: false,
        modal: true,
        paymentMethods: { tarjeta: true, yape: true, billetera: false, bancaMovil: false, agente: false, cuotealo: false },
        paymentMethodsSort: ['tarjeta', 'yape'],
      },
      appearance: {
        theme: 'default',
        hiddenCulqiLogo: false,
        buttonCardPayText: `Pagar ${soles(precioACobrar)}`,
        defaultStyle: {
          bannerColor: '#2E4B34',
          buttonBackground: '#2E4B34',
          menuColor: '#2E4B34',
          linksColor: '#256B3C',
          buttonTextColor: '#F2EFE6',
          priceColor: '#2E4B34',
        },
      },
    });
    checkout.culqi = () => {
      if (checkout.token) {
        checkout.close();
        cobrar(checkout.token.id);
      } else if (checkout.error) {
        console.log('Culqi:', checkout.error); // el propio checkout muestra el mensaje al paciente
      }
    };
    checkout.open();
  };

  const setCampo = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const datosOk = /^\d{8}$/.test(form.dni) && form.nombre_completo.trim().length > 3     && form.telefono.replace(/\D/g, '').length >= 9 && /^\S+@\S+\.\S+$/.test(form.correo) && form.acepta;

  // ---------- Datos derivados ----------
  const especialidades = ['Todas', ...new Set(doctores.map((d) => d.especialidad).filter(Boolean))];
  const lista = doctores.filter((d) => especialidad === 'Todas' || d.especialidad === especialidad);
  const primerDia = new Date(mes.y, mes.m, 1).getDay();
  const nDias = new Date(mes.y, mes.m + 1, 0).getDate();
  const celdas = [...Array(primerDia).fill(null), ...Array.from({ length: nDias }, (_, i) => i + 1)];
  const horas = (dia && disp?.dias?.[dia]?.horas) || [];
  const libres = horas.filter((h) => h.libre).length;
  const mmss = segundos != null ? `${pad(Math.floor(segundos / 60))}:${pad(segundos % 60)}` : '';

  return (
    <div className="min-h-screen bg-os-beige text-os-ink flex flex-col">
      <main className="flex-grow px-4 pt-16 pb-10">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-os-dark tracking-tight mb-4">Reserva tu cita</h1>
          <p className="text-os-ink-soft max-w-xl mx-auto leading-relaxed">
            Elige a tu especialista y un horario libre. Lo separamos para ti mientras haces tu pago con tarjeta o Yape.
          </p>
        </header>

        {!listo && <Pasos paso={paso} onClick={irAPaso} />}

        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1fr_340px] items-start">
          {/* ===== Columna principal ===== */}
          <section className="bg-white rounded-[2rem] border border-os-light/30 shadow-xl shadow-os-dark/10 p-6 md:p-10">
            {error && (
              <div role="alert" className="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
            )}

            {listo ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-os-accent text-white grid place-items-center text-3xl mb-5">✓</div>
                <h2 className="text-3xl font-semibold text-os-dark mb-3">Tu cita está confirmada</h2>
                <p className="text-os-ink-soft max-w-md mx-auto mb-8 leading-relaxed">
                  Recibimos tu pago. Te esperamos con {doctor.nombres} el {fmtFecha(dia)} a las {hora12(hora)}.
                </p>
                <button className={BTN} onClick={() => window.location.reload()}>Reservar otra cita</button>
              </div>
            ) : (
              <>
                {/* ----- Paso 1: especialista ----- */}
                {paso === 1 && (
                  <>
                    <Titulo sub="Filtra por especialidad y elige con quién quieres atenderte.">¿Con quién te quieres atender?</Titulo>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {especialidades.map((e) => (
                        <button key={e} onClick={() => setEspecialidad(e)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${especialidad === e ? 'bg-os-dark text-os-beige border-os-dark' : 'bg-white text-os-dark border-os-light/60 hover:border-os-dark'}`}>
                          {e}
                        </button>
                      ))}
                    </div>
                    {cargandoDocs && <p className="text-sm text-os-ink-soft">Cargando especialistas…</p>}
                    {!cargandoDocs && lista.length === 0 && <p className="text-sm text-os-ink-soft">Aún no hay especialistas disponibles en esta categoría.</p>}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {lista.map((d) => (
                        <div key={d.id} className="flex flex-col gap-4 text-left rounded-2xl border border-os-light/50 p-4 hover:border-os-dark hover:shadow-md transition">
                          <div className="flex gap-4">
                            <Foto d={d} />
                            <span className="min-w-0">
                              <span className="block font-serif font-semibold text-os-dark leading-snug">{d.nombres}</span>
                              <span className="block text-xs text-os-ink-soft mt-1 line-clamp-2">{d.titulo || d.especialidad}</span>
                            </span>
                          </div>
                          
                          {/* Selector de Modalidad */}
                          <div className="mt-2 flex gap-2">
                            <div 
                              onClick={(e) => { e.stopPropagation(); setModalidad('PRESENCIAL'); elegirDoctor(d); }}
                              className="flex-1 text-center bg-os-beige/50 border border-os-light hover:border-os-dark rounded-xl p-2 cursor-pointer transition"
                            >
                              <span className="block text-[10px] font-bold text-os-ink-soft uppercase tracking-wider mb-0.5">Consultorio</span>
                              <span className="block text-sm font-bold text-os-dark">{soles(d.precio)}</span>
                            </div>
                            
                            <div 
                              onClick={(e) => { e.stopPropagation(); setModalidad('VIRTUAL'); elegirDoctor(d); }}
                              className="flex-1 text-center bg-purple-50/50 border border-purple-200 hover:border-purple-400 rounded-xl p-2 cursor-pointer transition"
                            >
                              <span className="block text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-0.5">Videollamada</span>
                              <span className="block text-sm font-bold text-purple-900">{soles(d.precio_virtual)}</span>
                            </div>
                          </div>
                          <span className="block text-xs text-os-ink-soft text-center mt-1">Duración: {d.duracion_min} min</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* ----- Paso 2: fecha y hora ----- */}
                {paso === 2 && doctor && (
                  <>
                    <Titulo sub="Los días en verde tienen cupos; en ámbar quedan pocos.">Elige día y hora</Titulo>

                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => cambiarMes(-1)} disabled={mes.y * 12 + mes.m <= mesActual} aria-label="Mes anterior"
                        className="w-9 h-9 rounded-full border border-os-light/60 text-os-medium hover:bg-os-beige disabled:opacity-30 disabled:cursor-not-allowed">‹</button>
                      <h3 className="text-lg font-semibold text-os-dark">{MESES[mes.m]} {mes.y}</h3>
                      <button onClick={() => cambiarMes(1)} disabled={mes.y * 12 + mes.m >= mesActual + 3} aria-label="Mes siguiente"
                        className="w-9 h-9 rounded-full border border-os-light/60 text-os-medium hover:bg-os-beige disabled:opacity-30 disabled:cursor-not-allowed">›</button>
                    </div>

                    <div className="grid grid-cols-7 text-center mb-2">
                      {DIAS_SEM.map((d) => <div key={d} className="text-xs font-semibold text-os-medium">{d}</div>)}
                    </div>
                    <div className={`grid grid-cols-7 gap-y-2 transition-opacity ${cargandoDisp ? 'opacity-40' : ''}`}>
                      {celdas.map((d, i) => {
                        if (!d) return <div key={`v${i}`} />;
                        const f = `${mesKey}-${pad(d)}`;
                        const estado = disp?.dias?.[f]?.estado || 'cerrado';
                        const activo = estado === 'disponible' || estado === 'pocos';
                        return (
                          <button key={f} disabled={!activo} onClick={() => { setDia(f); setHora(null); }}
                            className={`w-full max-w-[52px] aspect-square mx-auto rounded-full text-sm transition ${dia === f ? 'bg-os-dark text-white font-bold shadow-md' : ESTILO_DIA[estado]}`}>
                            {d}
                          </button>
                        );
                      })}
                    </div>

                    <ul className="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-xs text-os-ink-soft">
                      <li className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-os-accent" />Con cupos</li>
                      <li className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-amber-400" />Quedan pocos</li>
                      <li className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-os-gray-taupe/50" />Lleno o sin atención</li>
                    </ul>

                    {dia && (
                      <div className="mt-8 pt-6 border-t border-os-beige">
                        <div className="flex items-baseline justify-between mb-4">
                          <h4 className="font-serif font-semibold text-os-dark first-letter:uppercase">{fmtFecha(dia)}</h4>
                          <span className="text-xs text-os-ink-soft">{libres} {libres === 1 ? 'cupo libre' : 'cupos libres'}</span>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-3">
                          {horas.map((h) => (
                            <button key={h.hora} disabled={!h.libre} onClick={() => setHora(h.hora)}
                              className={`py-2.5 rounded-xl text-sm font-semibold border transition ${hora === h.hora ? 'bg-os-dark text-white border-os-dark' : h.libre ? 'border-os-light/70 text-os-dark hover:border-os-dark' : 'border-transparent bg-os-plomo text-os-gray-taupe/60 line-through cursor-not-allowed'}`}>
                              {hora12(h.hora)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <button className={BTN_2} onClick={() => irAPaso(1)}>Cambiar especialista</button>
                      <button className={BTN} disabled={!hora || enviando} onClick={reservarHorario}>
                        {enviando ? 'Separando horario…' : 'Separar este horario'}
                      </button>
                    </div>
                  </>
                )}

                {/* ----- Paso 3: datos ----- */}
                {paso === 3 && (
                  <>
                    <Titulo sub="Los usamos solo para gestionar tu cita.">Tus datos</Titulo>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Campo label="DNI" inputMode="numeric" maxLength={8} value={form.dni}
                        onChange={(e) => setForm({ ...form, dni: e.target.value.replace(/\D/g, '') })} />
                      <Campo label="Celular o WhatsApp" inputMode="tel" value={form.telefono} onChange={setCampo('telefono')} />
                      <Campo label="Nombre completo" className="sm:col-span-2" value={form.nombre_completo} onChange={setCampo('nombre_completo')} />
                      <Campo label="Correo electrónico" type="email" className="sm:col-span-2" value={form.correo} onChange={setCampo('correo')} />
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-semibold text-os-dark mb-1.5">Motivo de la consulta <span className="font-normal text-os-ink-soft">(opcional)</span></span>
                        <textarea rows={3} maxLength={250} value={form.motivo} onChange={setCampo('motivo')}
                          className="w-full rounded-xl border border-os-light/60 bg-os-beige/40 px-4 py-3 text-sm outline-none focus:border-os-dark focus:ring-2 focus:ring-os-dark/15 transition" />
                      </label>
                    </div>
                    <label className="flex gap-3 items-start mt-5 text-sm text-os-ink-soft leading-relaxed cursor-pointer">
                      <input type="checkbox" checked={form.acepta} onChange={(e) => setForm({ ...form, acepta: e.target.checked })} className="mt-1 accent-os-dark" />
                      Acepto el tratamiento de mis datos personales y de salud para gestionar mi cita (Ley N.° 29733).
                    </label>
                    <div className="flex justify-between mt-8">
                      <button className={BTN_2} onClick={() => irAPaso(2)}>Cambiar horario</button>
                      <button className={BTN} disabled={!datosOk} onClick={() => { setError(''); setPaso(4); }}>Continuar al pago</button>
                    </div>
                  </>
                )}

                {/* ----- Paso 4: pago con Culqi ----- */}
                {paso === 4 && (
                  <>
                    <Titulo sub="Pagas con tarjeta de crédito, débito o Yape.">Confirma y paga</Titulo>
                    <div className="rounded-2xl bg-os-beige/60 border border-os-light/40 p-6 mb-6">
                      <p className="text-sm text-os-ink-soft">Consulta con {doctor.nombres}</p>
                      <p className="text-sm text-os-ink-soft first-letter:uppercase">{fmtFecha(dia)} · {hora12(hora)}</p>
                      <p className="font-serif text-4xl font-semibold text-os-dark mt-3">{soles(modalidad === 'VIRTUAL' ? doctor.precio_virtual : doctor.precio)}</p>
                    </div>
                    <p className="text-sm text-os-ink-soft leading-relaxed mb-6">
                      El pago lo procesa Culqi en una ventana segura: nosotros nunca vemos los datos de tu tarjeta.
                    </p>
                    {segundos === 0 && (
                      <p className="mb-6 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        Terminó el tiempo de reserva. Puedes intentar pagar: si el horario sigue libre, lo confirmamos.
                      </p>
                    )}
                    <div className="flex justify-between">
                      <button className={BTN_2} onClick={() => irAPaso(3)}>Volver a mis datos</button>
                      <button className={BTN} disabled={enviando} onClick={pagar}>
                        {enviando ? 'Procesando pago…' : `Pagar ${soles(modalidad === 'VIRTUAL' ? doctor.precio_virtual : doctor.precio)}`}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </section>

          {/* ===== Resumen siempre visible ===== */}
          <aside className="bg-os-dark text-os-beige rounded-[2rem] p-8 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-os-taupe mb-5">Resumen de tu cita</h2>
            {doctor ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <Foto d={doctor} size="w-14 h-14" />
                  <div className="min-w-0">
                    <p className="font-serif font-semibold leading-snug">{doctor.nombres}</p>
                    <p className="text-xs text-os-light mt-0.5">{doctor.especialidad}</p>
                  </div>
                </div>
                <dl className="space-y-3">
                  <Fila label="Fecha" valor={dia ? fmtFecha(dia) : 'Por elegir'} pendiente={!dia} />
                  <Fila label="Hora" valor={hora ? hora12(hora) : 'Por elegir'} pendiente={!hora} />
                  <Fila label="Duración" valor={`${doctor.duracion_min} min`} />
                </dl>
              </>
            ) : (
              <p className="text-sm text-os-light leading-relaxed">Aquí verás el resumen cuando elijas a tu especialista.</p>
            )}

            {reserva && segundos !== null && !listo && (
              <div className={`mt-6 rounded-2xl p-4 text-center ${segundos === 0 ? 'bg-red-400/20' : 'bg-white/10'}`}>
                <p className="text-xs text-os-taupe">{segundos > 0 ? 'Tu horario está separado por' : 'Se terminó el tiempo de reserva'}</p>
                {segundos > 0 && (
                  <p className={`font-serif text-3xl font-semibold tabular-nums mt-1 ${segundos <= 60 ? 'text-amber-300' : ''}`}>{mmss}</p>
                )}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/15">
              <p className="text-xs text-os-light mb-1">Monto de la consulta</p>
              <p className="font-serif text-4xl font-semibold">
                {doctor ? soles(modalidad === 'VIRTUAL' ? doctor.precio_virtual : doctor.precio) : '—'}
              </p>
              {doctor && (
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${modalidad === 'VIRTUAL' ? 'bg-purple-100 text-purple-700' : 'bg-os-beige text-os-dark'}`}>
                  Modalidad: {modalidad}
                </span>
              )}
            </div>
          </aside>
        </div>
      </main> 
      <Footer />
    </div>
  );
}