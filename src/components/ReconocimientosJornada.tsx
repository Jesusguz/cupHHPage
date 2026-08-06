import React from 'react';

type Reconocimiento = {
  id?: number;
  jornada: number;
  categoria: string;
  titulo?: string | null;
  descripcion?: string | null;
  jugador_nombre: string;
  equipo_nombre?: string | null;
  foto_url?: string | null;
  numero?: number | null;
  goles?: number;
  intensidad_index?: number;
};

interface Props {
  reconocimientos: Reconocimiento[];
}

export const ReconocimientosJornada: React.FC<Props> = ({ reconocimientos }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">Destacados</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Figuras y reconocimientos</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-zinc-400">
          Aquí viven los momentos que hacen historia: MVP, goleadores, jugadores clave y protagonistas de cada jornada.
        </p>
      </div>

      {reconocimientos.length === 0 ? (
        <div className="rounded-[2rem] border border-white/8 bg-black/20 p-6 text-sm leading-7 text-zinc-400">
          Los reconocimientos aparecerán aquí conforme se registren goles, figuras y MVP por jornada.
        </div>
      ) : (
      <div className="grid gap-6 lg:grid-cols-3">
        {reconocimientos.map((reconocimiento) => (
          <article
            key={`${reconocimiento.categoria}-${reconocimiento.jornada}-${reconocimiento.jugador_nombre}`}
            className="overflow-hidden rounded-[2rem] border border-white/8 bg-zinc-900/40 p-6 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
                Jornada {reconocimiento.jornada}
              </span>
              <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">{reconocimiento.categoria}</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {reconocimiento.foto_url ? (
                <img
                  src={reconocimiento.foto_url}
                  alt={reconocimiento.jugador_nombre}
                  className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-emerald-950/40 text-sm font-black uppercase tracking-[0.2em] text-emerald-200 ring-1 ring-white/10">
                  #{reconocimiento.numero || '--'}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  {reconocimiento.titulo || reconocimiento.jugador_nombre}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{reconocimiento.jugador_nombre}</p>
                <p className="text-sm text-zinc-500">{reconocimiento.equipo_nombre || 'Sin equipo'}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-300">
              {reconocimiento.descripcion || 'Reconocimiento especial al desempeño más destacado de la jornada.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-zinc-200">
                {reconocimiento.goles || 0} goles
              </span>
              <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-zinc-200">
                Valor {reconocimiento.intensidad_index || 0}
              </span>
            </div>
          </article>
        ))}
      </div>
      )}
    </div>
  );
};
