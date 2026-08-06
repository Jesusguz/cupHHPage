import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { ensureTournamentSchema } from '../../lib/tournamentSchema';

type JugadorPayload = {
  nombre: string;
  posicion: string;
  numero: number | null;
  foto_url?: string | null;
  es_capitan?: boolean;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const db = env.DB;
    if (!db) {
      return new Response(JSON.stringify({ error: 'Database not bound' }), { status: 500 });
    }

    await ensureTournamentSchema(db);

    const data = await request.json();
    const nombreEquipo = data?.nombreEquipo?.trim();
    const nombreCapitan = data?.nombreCapitan?.trim();
    const telefono = data?.telefono?.trim();
    const jugadores = Array.isArray(data?.jugadores) ? data.jugadores as JugadorPayload[] : [];

    if (!nombreEquipo || !nombreCapitan || !telefono) {
      return new Response(JSON.stringify({ error: 'Faltan datos del equipo' }), { status: 400 });
    }

    if (jugadores.length === 0) {
      return new Response(JSON.stringify({ error: 'Agrega al menos un jugador' }), { status: 400 });
    }

    const duplicateTeam = await db.prepare('SELECT id FROM Equipos WHERE lower(nombre) = lower(?)').bind(nombreEquipo).first();
    if (duplicateTeam) {
      return new Response(JSON.stringify({ error: 'Ya existe un equipo con ese nombre' }), { status: 409 });
    }

    const teamResult = await db.prepare(`
      INSERT INTO Equipos (nombre, capitan_nombre, telefono)
      VALUES (?, ?, ?)
    `).bind(nombreEquipo, nombreCapitan, telefono).run();

    const equipoId = teamResult.meta.last_row_id;

    for (const jugador of jugadores) {
      const nombre = jugador?.nombre?.trim();
      const posicion = jugador?.posicion?.trim() || 'Jugador';
      const fotoUrl = jugador?.foto_url || null;
      const numero = Number.isFinite(jugador?.numero) ? jugador.numero : null;

      if (!nombre) continue;

      await db.prepare(`
        INSERT INTO Jugadores (equipo_id, nombre, posicion, numero, foto_url, es_capitan)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        equipoId,
        nombre,
        posicion,
        numero,
        fotoUrl,
        jugador?.es_capitan ? 1 : 0,
      ).run();
    }

    return new Response(JSON.stringify({ success: true, equipoId }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'No se pudo registrar el equipo' }), { status: 500 });
  }
};
