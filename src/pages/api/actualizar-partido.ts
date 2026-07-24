import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    const { partidoId, golesLocal, golesVisitante } = data;

    if (!partidoId || golesLocal === undefined || golesVisitante === undefined) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), { status: 400 });
    }

    const db = locals.runtime.env.DB;

    // Obtener partido
    const partidoStmt = await db.prepare('SELECT * FROM Partidos WHERE id = ?').bind(partidoId).first();
    if (!partidoStmt) {
      return new Response(JSON.stringify({ error: 'Partido no encontrado' }), { status: 404 });
    }

    const localId = partidoStmt.local_id;
    const visitanteId = partidoStmt.visitante_id;

    // Actualizar partido
    await db.prepare('UPDATE Partidos SET goles_local = ?, goles_visitante = ?, estado = ? WHERE id = ?')
      .bind(golesLocal, golesVisitante, 'finalizado', partidoId)
      .run();

    // Actualizar Equipos stats is complex, para el MVP simplificaremos o asumiremos que se recalcula.
    // Here we'll do a basic update for demo purposes.
    // Calculate stats
    let ptsLocal = 0;
    let ptsVisitante = 0;
    let jgLocal = 0, jeLocal = 0, jpLocal = 0;
    let jgVisitante = 0, jeVisitante = 0, jpVisitante = 0;

    if (golesLocal > golesVisitante) {
      ptsLocal = 3;
      jgLocal = 1;
      jpVisitante = 1;
    } else if (golesLocal < golesVisitante) {
      ptsVisitante = 3;
      jpLocal = 1;
      jgVisitante = 1;
    } else {
      ptsLocal = 1;
      ptsVisitante = 1;
      jeLocal = 1;
      jeVisitante = 1;
    }

    // Update Local
    await db.prepare(`
      UPDATE Equipos
      SET jj = jj + 1, jg = jg + ?, je = je + ?, jp = jp + ?, gf = gf + ?, gc = gc + ?, pts = pts + ?
      WHERE id = ?
    `).bind(jgLocal, jeLocal, jpLocal, golesLocal, golesVisitante, ptsLocal, localId).run();

    // Update Visitante
    await db.prepare(`
      UPDATE Equipos
      SET jj = jj + 1, jg = jg + ?, je = je + ?, jp = jp + ?, gf = gf + ?, gc = gc + ?, pts = pts + ?
      WHERE id = ?
    `).bind(jgVisitante, jeVisitante, jpVisitante, golesVisitante, golesLocal, ptsVisitante, visitanteId).run();


    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
