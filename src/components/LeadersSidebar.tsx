import React from 'react';

type Jugador = {
  id: number;
  equipo_id: number;
  nombre: string;
  posicion: string;
  goles: number;
  goles_recibidos: number;
  intensidad_index: number;
  equipo_nombre?: string;
};

interface Props {
  jugadores: Jugador[];
}

export const LeadersSidebar: React.FC<Props> = ({ jugadores }) => {
  const porteros = [...jugadores]
    .filter(j => j.posicion === 'Portero')
    .sort((a, b) => a.goles_recibidos - b.goles_recibidos)
    .slice(0, 3);

  const goleadores = [...jugadores]
    .sort((a, b) => b.goles - a.goles)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div className="card p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-emerald-500">El Guante Esmeralda</h3>
        <p className="text-sm text-gray-400 mb-4">Mejor Portero (Menos goles recibidos)</p>
        <div className="flex flex-col gap-3">
          {porteros.map((p, i) => (
            <div key={p.id} className="flex justify-between items-center border-b border-gray-700/50 pb-2 last:border-0">
              <div>
                <span className="font-bold mr-2 text-emerald-400">{i + 1}.</span>
                <span className="font-semibold">{p.nombre}</span>
                <div className="text-xs text-gray-400">{p.equipo_nombre || 'Sin equipo'}</div>
              </div>
              <div className="text-xl font-bold">{p.goles_recibidos} <span className="text-xs font-normal text-gray-400">GC</span></div>
            </div>
          ))}
          {porteros.length === 0 && <p className="text-sm text-gray-500">Sin datos.</p>}
        </div>
      </div>

      <div className="card p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-emerald-500">Goleador</h3>
        <p className="text-sm text-gray-400 mb-4">Top 3 Goleadores</p>
        <div className="flex flex-col gap-3">
          {goleadores.map((g, i) => (
            <div key={g.id} className="flex justify-between items-center border-b border-gray-700/50 pb-2 last:border-0">
              <div>
                <span className="font-bold mr-2 text-emerald-400">{i + 1}.</span>
                <span className="font-semibold">{g.nombre}</span>
                <div className="text-xs text-gray-400">{g.equipo_nombre || 'Sin equipo'}</div>
              </div>
              <div className="text-xl font-bold">{g.goles} <span className="text-xs font-normal text-gray-400">G</span></div>
            </div>
          ))}
          {goleadores.length === 0 && <p className="text-sm text-gray-500">Sin datos.</p>}
        </div>
      </div>

      <div className="card p-4 rounded-lg shadow-lg bg-gradient-to-br from-emerald-900/40 to-transparent border-emerald-900/50">
        <h3 className="text-xl font-bold mb-2 text-emerald-500">El Motor del Equipo</h3>
        <p className="text-sm mb-2 italic">Mención Honorífica</p>
        <p className="text-sm text-gray-400">Jugador con mayor índice de intensidad (Próximamente)</p>
      </div>
    </div>
  );
};
