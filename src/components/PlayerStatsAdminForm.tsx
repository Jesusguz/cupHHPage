import React, { useState } from 'react';

type Jugador = {
  id: number;
  nombre: string;
  equipo_nombre?: string;
  goles: number;
  intensidad_index: number;
};

interface Props {
  jugadores: Jugador[];
}

export const PlayerStatsAdminForm: React.FC<Props> = ({ jugadores }) => {
  const [jugadorId, setJugadorId] = useState('');
  const [goles, setGoles] = useState('0');
  const [intensidadIndex, setIntensidadIndex] = useState('0');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePlayerChange = (value: string) => {
    setJugadorId(value);
    const jugador = jugadores.find((item) => item.id === parseInt(value, 10));
    if (jugador) {
      setGoles(String(jugador.goles || 0));
      setIntensidadIndex(String(jugador.intensidad_index || 0));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/actualizar-jugador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jugadorId: parseInt(jugadorId, 10),
          goles: parseInt(goles, 10),
          intensidadIndex: parseInt(intensidadIndex, 10),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo actualizar el jugador');
      }

      setMessage('Rendimiento del jugador actualizado.');
    } catch (error: any) {
      setMessage(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-md">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70">Panel de rendimiento</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-white">Actualizar goles y valor</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-200">Jugador</span>
          <select
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
            value={jugadorId}
            onChange={(event) => handlePlayerChange(event.target.value)}
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

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Goles</span>
            <input
              type="number"
              min="0"
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              value={goles}
              onChange={(event) => setGoles(event.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Valor / intensidad</span>
            <input
              type="number"
              min="0"
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              value={intensidadIndex}
              onChange={(event) => setIntensidadIndex(event.target.value)}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.28)] transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar rendimiento'}
        </button>

        {message && <p className="text-sm text-emerald-400">{message}</p>}
      </form>
    </div>
  );
};
