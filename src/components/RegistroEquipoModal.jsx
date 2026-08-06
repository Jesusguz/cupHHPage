import React, { useEffect, useState } from 'react';

const POSICIONES = ['Portero', 'Defensa', 'Medio', 'Delantero'];

function createJugador() {
  return {
    nombre: '',
    posicion: 'Delantero',
    numero: '',
    foto_url: '',
    es_capitan: false,
  };
}

export default function RegistroEquipoModal({ isOpen, onClose }) {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [nombreCapitan, setNombreCapitan] = useState('');
  const [telefono, setTelefono] = useState('');
  const [jugadores, setJugadores] = useState([
    { ...createJugador(), es_capitan: true },
    createJugador(),
    createJugador(),
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setNombreEquipo('');
    setNombreCapitan('');
    setTelefono('');
    setJugadores([
      { ...createJugador(), es_capitan: true },
      createJugador(),
      createJugador(),
    ]);
    setLoading(false);
    setMessage('');
  };

  const handleClose = () => {
    if (loading) return;
    resetForm();
    onClose?.();
  };

  const updateJugador = (index, field, value) => {
    setJugadores((current) => current.map((jugador, jugadorIndex) => {
      if (jugadorIndex !== index) return jugador;
      return { ...jugador, [field]: value };
    }));
  };

  const setCapitan = (index) => {
    setJugadores((current) => current.map((jugador, jugadorIndex) => ({
      ...jugador,
      es_capitan: jugadorIndex === index,
    })));
  };

  const addJugador = () => {
    setJugadores((current) => [...current, createJugador()]);
  };

  const removeJugador = (index) => {
    setJugadores((current) => {
      const next = current.filter((_, jugadorIndex) => jugadorIndex !== index);
      if (next.length === 0) {
        return [{ ...createJugador(), es_capitan: true }];
      }
      if (!next.some((jugador) => jugador.es_capitan)) {
        next[0].es_capitan = true;
      }
      return [...next];
    });
  };

  const handlePhotoChange = (index, file) => {
    if (!file) return;
    if (file.size > 1_500_000) {
      setMessage('La foto del jugador debe pesar menos de 1.5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateJugador(index, 'foto_url', reader.result?.toString() || '');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const jugadoresValidos = jugadores
      .map((jugador) => ({
        ...jugador,
        nombre: jugador.nombre.trim(),
        numero: jugador.numero === '' ? null : parseInt(jugador.numero, 10),
      }))
      .filter((jugador) => jugador.nombre);

    if (jugadoresValidos.length === 0) {
      setLoading(false);
      setMessage('Agrega al menos un jugador para registrar el equipo.');
      return;
    }

    const payload = {
      nombreEquipo: nombreEquipo.trim(),
      nombreCapitan: nombreCapitan.trim(),
      telefono: telefono.trim(),
      jugadores: jugadoresValidos,
    };

    try {
      const response = await fetch('/api/registro-equipo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'No se pudo registrar el equipo');
      }

      setMessage('Equipo y plantilla registrados correctamente.');

      window.setTimeout(() => {
        resetForm();
        onClose?.();
        window.location.reload();
      }, 900);
    } catch (error) {
      setMessage(error.message || 'No se pudo completar el registro.');
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registro-equipo-title"
    >
      <div
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-zinc-100 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.18),transparent_38%)]"></div>
        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <div className="relative mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400/80">
            Registro oficial
          </p>
          <h2
            id="registro-equipo-title"
            className="text-3xl font-black tracking-tight text-white"
          >
            Inscribe a tu equipo
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Completa los datos del capitán, registra dorsales y arma la plantilla oficial con foto opcional para mostrar las fichas de tus jugadores.
          </p>
        </div>

        <form className="relative space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Nombre del Equipo</span>
            <input
              type="text"
              value={nombreEquipo}
              onChange={(event) => setNombreEquipo(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. Deportivo Zaragoza"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Nombre del Capitán</span>
            <input
              type="text"
              value={nombreCapitan}
              onChange={(event) => setNombreCapitan(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
              placeholder="Nombre completo"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Número de Teléfono</span>
            <input
              type="tel"
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. 667 123 4567"
              required
            />
          </label>

          <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                  Plantilla
                </p>
                <h3 className="mt-2 text-xl font-black tracking-tight text-white">
                  Jugadores registrados
                </h3>
              </div>
              <button
                type="button"
                onClick={addJugador}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Agregar jugador
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {jugadores.map((jugador, index) => (
                <div
                  key={`jugador-${index}`}
                  className="rounded-[1.5rem] border border-white/8 bg-zinc-950/50 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">Jugador {index + 1}</p>
                      <p className="text-xs text-zinc-500">Alta de plantilla y ficha pública</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCapitan(index)}
                        className={`rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                          jugador.es_capitan
                            ? 'border border-emerald-400/25 bg-emerald-500/12 text-emerald-200'
                            : 'border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        {jugador.es_capitan ? 'Capitán oficial' : 'Marcar capitán'}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeJugador(index)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300 transition hover:border-white/20 hover:bg-white/10"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-zinc-200">Nombre del jugador</span>
                      <input
                        type="text"
                        value={jugador.nombre}
                        onChange={(event) => updateJugador(index, 'nombre', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Nombre completo"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-zinc-200">Posición</span>
                      <select
                        value={jugador.posicion}
                        onChange={(event) => updateJugador(index, 'posicion', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
                      >
                        {POSICIONES.map((posicion) => (
                          <option key={posicion} value={posicion}>
                            {posicion}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-zinc-200">Número / dorsal</span>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={jugador.numero}
                        onChange={(event) => updateJugador(index, 'numero', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Ej. 10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-zinc-200">Foto del jugador</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handlePhotoChange(index, event.target.files?.[0])}
                        className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-zinc-300 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-500 file:px-3 file:py-2 file:text-xs file:font-bold file:text-black"
                      />
                    </label>
                  </div>

                  {jugador.foto_url && (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 p-3">
                      <img
                        src={jugador.foto_url}
                        alt={`Vista previa de ${jugador.nombre || 'jugador'}`}
                        className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10"
                      />
                      <p className="text-sm text-zinc-400">Vista previa lista para la ficha pública del jugador.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Registrando plantilla...' : 'Registrar'}
            </button>
          </div>

          {message && (
            <p className={`text-sm ${message.includes('correctamente') ? 'text-emerald-400' : 'text-amber-300'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
