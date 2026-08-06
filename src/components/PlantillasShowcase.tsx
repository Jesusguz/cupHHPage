import React from 'react';

type Equipo = {
  id: number;
  nombre: string;
  capitan_nombre?: string | null;
  telefono?: string | null;
};

type Jugador = {
  id: number;
  equipo_id: number;
  nombre: string;
  posicion: string;
  numero?: number | null;
  goles: number;
  intensidad_index: number;
  foto_url?: string | null;
  es_capitan?: number | boolean | null;
};

interface Props {
  equipos: Equipo[];
  jugadores: Jugador[];
}

function getInitials(nombre: string) {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export const PlantillasShowcase: React.FC<Props> = ({ equipos, jugadores }) => {
  const jugadoresPorEquipo = new Map<number, Jugador[]>();

  for (const jugador of jugadores) {
    const equipoJugadores = jugadoresPorEquipo.get(jugador.equipo_id) || [];
    equipoJugadores.push(jugador);
    jugadoresPorEquipo.set(jugador.equipo_id, equipoJugadores);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">Plantillas</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Conoce a cada equipo</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-zinc-400">
          Explora el roster, dorsales y rendimiento base de cada jugador. Estas fichas convierten la copa en una experiencia más humana, visible y memorable.
        </p>
      </div>

      {equipos.length === 0 ? (
        <div className="rounded-[2rem] border border-white/8 bg-black/20 p-6 text-sm leading-7 text-zinc-400">
          Aún no hay equipos suficientes para mostrar plantillas. Registra el primero y convierte esta sección en el roster oficial del torneo.
        </div>
      ) : (
      <div className="grid gap-6 xl:grid-cols-2">
        {equipos.map((equipo) => {
          const plantilla = jugadoresPorEquipo.get(equipo.id) || [];

          return (
            <section
              key={equipo.id}
              className="rounded-[2rem] border border-white/8 bg-zinc-900/40 p-6 backdrop-blur-md"
            >
              <div className="flex flex-col gap-3 border-b border-white/8 pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">Equipo</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white">{equipo.nombre}</h3>
                </div>
                <div className="space-y-1 text-sm text-zinc-400">
                  <p><span className="text-zinc-300">Capitán:</span> {equipo.capitan_nombre || 'Por definir'}</p>
                  <p><span className="text-zinc-300">Contacto:</span> {equipo.telefono || 'No disponible'}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {plantilla.length > 0 ? plantilla.map((jugador) => (
                  <article
                    key={jugador.id}
                    className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex items-start gap-4">
                      {jugador.foto_url ? (
                        <img
                          src={jugador.foto_url}
                          alt={jugador.nombre}
                          className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-emerald-950/40 text-xl font-black text-emerald-200 ring-1 ring-white/10">
                          {getInitials(jugador.nombre)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="truncate text-base font-bold text-white">{jugador.nombre}</h4>
                          {Boolean(jugador.es_capitan) && (
                            <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                              Capitán
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">{jugador.posicion}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-zinc-200">
                            #{jugador.numero || '--'}
                          </span>
                          <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-zinc-200">
                            {jugador.goles} goles
                          </span>
                          <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-zinc-200">
                            Valor {jugador.intensidad_index}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                )) : (
                  <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5 text-sm text-zinc-500 sm:col-span-2">
                    Este equipo aún no registra jugadores.
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
      )}
    </div>
  );
};
