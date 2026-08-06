type D1Database = import('@cloudflare/workers-types').D1Database;

type TableColumn = {
  name: string;
};

async function getTableColumns(db: D1Database, tableName: string) {
  const { results } = await db.prepare(`PRAGMA table_info(${tableName})`).all<TableColumn>();
  return new Set((results || []).map((column) => column.name));
}

export async function ensureTournamentSchema(db: D1Database) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS Reconocimientos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jornada INTEGER NOT NULL,
      jugador_id INTEGER NOT NULL,
      categoria TEXT NOT NULL,
      titulo TEXT,
      descripcion TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(jugador_id) REFERENCES Jugadores(id)
    )
  `).run();

  const equipoColumns = await getTableColumns(db, 'Equipos');
  if (!equipoColumns.has('capitan_nombre')) {
    await db.prepare('ALTER TABLE Equipos ADD COLUMN capitan_nombre TEXT').run();
  }
  if (!equipoColumns.has('telefono')) {
    await db.prepare('ALTER TABLE Equipos ADD COLUMN telefono TEXT').run();
  }

  const jugadorColumns = await getTableColumns(db, 'Jugadores');
  if (!jugadorColumns.has('numero')) {
    await db.prepare('ALTER TABLE Jugadores ADD COLUMN numero INTEGER').run();
  }
  if (!jugadorColumns.has('foto_url')) {
    await db.prepare('ALTER TABLE Jugadores ADD COLUMN foto_url TEXT').run();
  }
  if (!jugadorColumns.has('es_capitan')) {
    await db.prepare('ALTER TABLE Jugadores ADD COLUMN es_capitan INTEGER DEFAULT 0').run();
  }
}
