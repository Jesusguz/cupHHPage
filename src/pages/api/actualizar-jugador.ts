import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { ensureTournamentSchema } from '../../lib/tournamentSchema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const db = env.DB;
    if (!db) {
      return new Response(JSON.stringify({ error: 'Database not bound' }), { status: 500 });
    }

    await ensureTournamentSchema(db);

    const data = await request.json();
    const jugadorId = Number(data?.jugadorId);
    const goles = Number(data?.goles);
    const intensidadIndex = Number(data?.intensidadIndex ?? 0);

    if (!jugadorId || Number.isNaN(goles) || Number.isNaN(intensidadIndex)) {
      return new Response(JSON.stringify({ error: 'Faltan datos del jugador' }), { status: 400 });
    }

    await db.prepare(`
      UPDATE Jugadores
      SET goles = ?, intensidad_index = ?
      WHERE id = ?
    `).bind(goles, intensidadIndex, jugadorId).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'No se pudo actualizar el jugador' }), { status: 500 });
  }
};
