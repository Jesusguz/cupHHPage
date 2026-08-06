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
      <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-md">
        <h3 className="mb-2 text-xl font-black tracking-tight text-emerald-400">El Guante Esmeralda</h3>
        <p className="mb-4 text-sm text-zinc-400">Mejor Portero (Menos goles recibidos)</p>
        <div className="flex flex-col gap-3">
          {porteros.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-white/6 bg-black/20 p-3 last:border-white/6">
              <div>
                <span className="mr-2 font-bold text-emerald-400">{i + 1}.</span>
                <span className="font-semibold text-white">{p.nombre}</span>
                <div className="text-xs text-zinc-400">{p.equipo_nombre || 'Sin equipo'}</div>
              </div>
              <div className="text-xl font-bold text-white">{p.goles_recibidos} <span className="text-xs font-normal text-zinc-400">GC</span></div>
            </div>
          ))}
          {porteros.length === 0 && <p className="text-sm text-zinc-500">Sin datos.</p>}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-md">
        <h3 className="mb-2 text-xl font-black tracking-tight text-emerald-400">Goleador</h3>
        <p className="mb-4 text-sm text-zinc-400">Top 3 Goleadores</p>
        <div className="flex flex-col gap-3">
          {goleadores.map((g, i) => (
            <div key={g.id} className="flex items-center justify-between rounded-2xl border border-white/6 bg-black/20 p-3 last:border-white/6">
              <div>
                <span className="mr-2 font-bold text-emerald-400">{i + 1}.</span>
                <span className="font-semibold text-white">{g.nombre}</span>
                <div className="text-xs text-zinc-400">{g.equipo_nombre || 'Sin equipo'}</div>
              </div>
              <div className="text-xl font-bold text-white">{g.goles} <span className="text-xs font-normal text-zinc-400">G</span></div>
            </div>
          ))}
          {goleadores.length === 0 && <p className="text-sm text-zinc-500">Sin datos.</p>}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-emerald-500/18 bg-gradient-to-br from-emerald-500/12 via-emerald-950/20 to-transparent p-5 backdrop-blur-md">
        <h3 className="mb-2 text-xl font-black tracking-tight text-emerald-300">El Motor del Equipo</h3>
        <p className="mb-2 text-sm italic text-white">Mención Honorífica</p>
        <p className="text-sm text-zinc-300">Jugador con mayor índice de intensidad (Próximamente)</p>
      </div>
    </div>
  );
};
