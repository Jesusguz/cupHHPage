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
    <div className="card p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-emerald-500">Actualizar Partido (Admin)</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Partido</label>
          <select
            className="w-full bg-black/20 border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none"
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
            <label className="block text-sm font-medium mb-1">Goles Local</label>
            <input
              type="number"
              min="0"
              className="w-full bg-black/20 border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none"
              value={golesLocal}
              onChange={(e) => setGolesLocal(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Goles Visitante</label>
            <input
              type="number"
              min="0"
              className="w-full bg-black/20 border border-gray-700 rounded p-2 focus:border-emerald-500 focus:outline-none"
              value={golesVisitante}
              onChange={(e) => setGolesVisitante(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Actualizando...' : 'Actualizar Marcador'}
        </button>
        {message && <p className="text-sm mt-2 text-center text-emerald-400">{message}</p>}
      </form>
    </div>
  );
};
