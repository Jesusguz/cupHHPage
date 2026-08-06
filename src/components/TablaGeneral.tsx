import React from 'react';

type Equipo = {
  id: number;
  nombre: string;
  logo_url: string | null;
  jj: number;
  jg: number;
  je: number;
  jp: number;
  gf: number;
  gc: number;
  pts: number;
};

interface Props {
  equipos: Equipo[];
}

export const TablaGeneral: React.FC<Props> = ({ equipos }) => {
  const sortedEquipos = [...equipos].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    return (b.gf - b.gc) - (a.gf - a.gc);
  });

  return (
    <div className="overflow-x-auto rounded-[1.6rem] border border-white/8 bg-transparent p-4 text-zinc-100 shadow-none">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/70">Clasificación</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Tabla General</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300">
          {sortedEquipos.length} equipos
        </div>
      </div>

      <table className="w-full min-w-[720px] text-sm text-left">
        <thead className="bg-white/[0.03] text-xs uppercase text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Equipo</th>
            <th className="px-2 py-3 font-medium text-center !text-center">PTS</th>
            <th className="px-2 py-3 font-medium text-center !text-center">JJ</th>
            <th className="px-2 py-3 font-medium text-center !text-center">JG</th>
            <th className="px-2 py-3 font-medium text-center !text-center">JE</th>
            <th className="px-2 py-3 font-medium text-center !text-center">JP</th>
            <th className="px-2 py-3 font-medium text-center !text-center">GF</th>
            <th className="px-2 py-3 font-medium text-center !text-center">GC</th>
            <th className="px-2 py-3 font-medium text-center !text-center">DIF</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/6">
          {sortedEquipos.map((equipo, index) => (
            <tr key={equipo.id} className="transition-colors hover:bg-white/[0.03]">
              <td className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/5 text-xs font-bold text-emerald-300">
                    {index + 1}
                  </span>
                  <span className="tracking-wide text-white">{equipo.nombre}</span>
                </div>
              </td>
              <td className="px-2 py-4 text-center !text-center font-bold text-emerald-400">{equipo.pts}</td>
              <td className="px-2 py-4 text-center !text-center text-zinc-300">{equipo.jj}</td>
              <td className="px-2 py-4 text-center !text-center text-zinc-300">{equipo.jg}</td>
              <td className="px-2 py-4 text-center !text-center text-zinc-300">{equipo.je}</td>
              <td className="px-2 py-4 text-center !text-center text-zinc-300">{equipo.jp}</td>
              <td className="px-2 py-4 text-center !text-center text-zinc-300">{equipo.gf}</td>
              <td className="px-2 py-4 text-center !text-center text-zinc-300">{equipo.gc}</td>
              <td className="px-2 py-4 text-center !text-center font-medium text-white">{equipo.gf - equipo.gc}</td>
            </tr>
          ))}
          {sortedEquipos.length === 0 && (
            <tr>
              <td colSpan={9} className="py-10 text-center text-zinc-500">No hay equipos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
