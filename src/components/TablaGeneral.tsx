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
    <div className="card overflow-x-auto rounded-lg p-4 shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-emerald-500">Tabla General</h2>
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-black/20">
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
        <tbody className="divide-y divide-gray-700/50">
          {sortedEquipos.map((equipo, index) => (
            <tr key={equipo.id} className="hover:bg-black/10 transition-colors">
              <td className="px-4 py-3 font-semibold flex items-center gap-2">
                <span className="text-gray-400 w-4">{index + 1}</span>
                {equipo.nombre}
              </td>
              <td className="px-2 py-3 font-bold text-emerald-500 text-center !text-center">{equipo.pts}</td>
              <td className="px-2 py-3 text-center !text-center">{equipo.jj}</td>
              <td className="px-2 py-3 text-center !text-center">{equipo.jg}</td>
              <td className="px-2 py-3 text-center !text-center">{equipo.je}</td>
              <td className="px-2 py-3 text-center !text-center">{equipo.jp}</td>
              <td className="px-2 py-3 text-center !text-center">{equipo.gf}</td>
              <td className="px-2 py-3 text-center !text-center">{equipo.gc}</td>
              <td className="px-2 py-3 text-center !text-center font-medium">{equipo.gf - equipo.gc}</td>
            </tr>
          ))}
          {sortedEquipos.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center py-4 text-gray-500">No hay equipos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
