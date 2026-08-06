import React, { useState } from 'react';
import RegistroEquipoModal from './RegistroEquipoModal.jsx';

export default function HeroActions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500 px-7 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
      >
        Registrar Equipo
      </button>

      <RegistroEquipoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
