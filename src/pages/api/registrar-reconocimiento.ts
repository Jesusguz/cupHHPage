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
    const jornada = Number(data?.jornada);
    const jugadorId = Number(data?.jugadorId);
    const categoria = data?.categoria?.trim();
    const titulo = data?.titulo?.trim() || null;
    const descripcion = data?.descripcion?.trim() || null;

    if (!jornada || !jugadorId || !categoria) {
      return new Response(JSON.stringify({ error: 'Faltan datos del reconocimiento' }), { status: 400 });
    }

    await db.prepare(`
      INSERT INTO Reconocimientos (jornada, jugador_id, categoria, titulo, descripcion)
      VALUES (?, ?, ?, ?, ?)
    `).bind(jornada, jugadorId, categoria, titulo, descripcion).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'No se pudo registrar el reconocimiento' }), { status: 500 });
  }
};
