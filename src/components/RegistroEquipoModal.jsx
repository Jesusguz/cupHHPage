import React, { useEffect, useState } from 'react';

export default function RegistroEquipoModal({ isOpen, onClose }) {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [nombreCapitan, setNombreCapitan] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setNombreEquipo('');
    setNombreCapitan('');
    setTelefono('');
    setLoading(false);
  };

  const handleClose = () => {
    if (loading) return;
    resetForm();
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      nombreEquipo: nombreEquipo.trim(),
      nombreCapitan: nombreCapitan.trim(),
      telefono: telefono.trim(),
    };

    console.log('Registro de equipo:', payload);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1000);
    });

    resetForm();
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registro-equipo-title"
    >
      <div
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-zinc-100 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400/80">
            Registro oficial
          </p>
          <h2
            id="registro-equipo-title"
            className="text-3xl font-black tracking-tight text-white"
          >
            Inscribe a tu equipo
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Completa los datos del capitán para iniciar el proceso de registro del torneo.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Nombre del Equipo</span>
            <input
              type="text"
              value={nombreEquipo}
              onChange={(event) => setNombreEquipo(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. Deportivo Zaragoza"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Nombre del Capitán</span>
            <input
              type="text"
              value={nombreCapitan}
              onChange={(event) => setNombreCapitan(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
              placeholder="Nombre completo"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">Número de Teléfono</span>
            <input
              type="tel"
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. 667 123 4567"
              required
            />
          </label>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
