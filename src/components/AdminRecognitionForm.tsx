import React, { useState } from 'react';

type Jugador = {
  id: number;
  nombre: string;
  equipo_nombre?: string;
};

interface Props {
  jugadores: Jugador[];
}

export const AdminRecognitionForm: React.FC<Props> = ({ jugadores }) => {
  const [jornada, setJornada] = useState('1');
  const [jugadorId, setJugadorId] = useState('');
  const [categoria, setCategoria] = useState('MVP');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/registrar-reconocimiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jornada: parseInt(jornada, 10),
          jugadorId: parseInt(jugadorId, 10),
          categoria,
          titulo,
          descripcion,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo guardar el reconocimiento');
      }

      setMessage('Reconocimiento guardado correctamente.');
      setTitulo('');
      setDescripcion('');
      setJugadorId('');
    } catch (error: any) {
      setMessage(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-md">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70">Panel de figuras</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-white">Asignar reconocimiento</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Jornada</span>
            <input
              type="number"
              min="1"
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              value={jornada}
              onChange={(event) => setJornada(event.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Categoría</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="MVP">MVP</option>
              <option value="Goleador">Goleador</option>
              <option value="Figura">Figura</option>
              <option value="Guante">Guante</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-200">Jugador</span>
          <select
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
            value={jugadorId}
            onChange={(event) => setJugadorId(event.target.value)}
            required
          >
            <option value="">Selecciona un jugador...</option>
            {jugadores.map((jugador) => (
              <option key={jugador.id} value={jugador.id}>
                {jugador.nombre} - {jugador.equipo_nombre || 'Sin equipo'}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-200">Título</span>
          <input
            type="text"
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
            placeholder="Ej. Jugador más valioso"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-200">Descripción</span>
          <textarea
            className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
            placeholder="Resume por qué destacó en la jornada"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.28)] transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar reconocimiento'}
        </button>

        {message && <p className="text-sm text-emerald-400">{message}</p>}
      </form>
    </div>
  );
};
