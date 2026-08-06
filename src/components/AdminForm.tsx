import React, { useState } from 'react';

type Partido = {
  id: number;
  jornada: number;
  local_id: number;
  visitante_id: number;
  goles_local: number;
  goles_visitante: number;
  estado: string;
  local_nombre?: string;
  visitante_nombre?: string;
};

interface Props {
  partidos: Partido[];
}

export const AdminForm: React.FC<Props> = ({ partidos }) => {
  const [partidoId, setPartidoId] = useState('');
  const [golesLocal, setGolesLocal] = useState('');
  const [golesVisitante, setGolesVisitante] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/actualizar-partido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partidoId: parseInt(partidoId),
          golesLocal: parseInt(golesLocal),
          golesVisitante: parseInt(golesVisitante),
        }),
      });

      if (!res.ok) {
        throw new Error('Error al actualizar');
      }

      setMessage('Partido actualizado correctamente.');
      // Optionally reset form
      setPartidoId('');
      setGolesLocal('');
      setGolesVisitante('');
    } catch (err: any) {
      setMessage(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-md">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70">Panel administrativo</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-white">Actualizar Partido</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-200">Partido</label>
          <select
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
            value={partidoId}
            onChange={(e) => setPartidoId(e.target.value)}
            required
          >
            <option value="">Seleccione un partido...</option>
            {partidos.map(p => (
              <option key={p.id} value={p.id}>
                J{p.jornada}: {p.local_nombre || `Equipo ${p.local_id}`} vs {p.visitante_nombre || `Equipo ${p.visitante_id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-zinc-200">Goles Local</label>
            <input
              type="number"
              min="0"
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              value={golesLocal}
              onChange={(e) => setGolesLocal(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-zinc-200">Goles Visitante</label>
            <input
              type="number"
              min="0"
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              value={golesVisitante}
              onChange={(e) => setGolesVisitante(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.28)] transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? 'Actualizando...' : 'Actualizar Marcador'}
        </button>
        {message && <p className="mt-2 text-center text-sm text-emerald-400">{message}</p>}
      </form>
    </div>
  );
};
