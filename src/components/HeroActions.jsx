import React, { useState } from 'react';
import RegistroEquipoModal from './RegistroEquipoModal.jsx';

export default function HeroActions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500 px-7 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
      >
        Registrar Equipo
      </button>

      <a
        href="https://maps.app.goo.gl/mwxo84PCRQA9GX2p9"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
      >
        Ver ubicación
      </a>

      <RegistroEquipoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
