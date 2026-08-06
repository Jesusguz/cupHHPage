DROP TABLE IF EXISTS Equipos;
CREATE TABLE Equipos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  logo_url TEXT,
  capitan_nombre TEXT,
  telefono TEXT,
  jj INTEGER DEFAULT 0,
  jg INTEGER DEFAULT 0,
  je INTEGER DEFAULT 0,
  jp INTEGER DEFAULT 0,
  gf INTEGER DEFAULT 0,
  gc INTEGER DEFAULT 0,
  pts INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS Jugadores;
CREATE TABLE Jugadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  equipo_id INTEGER,
  nombre TEXT NOT NULL,
  posicion TEXT NOT NULL,
  numero INTEGER,
  foto_url TEXT,
  es_capitan INTEGER DEFAULT 0,
  goles INTEGER DEFAULT 0,
  goles_recibidos INTEGER DEFAULT 0,
  intensidad_index INTEGER DEFAULT 0,
  FOREIGN KEY(equipo_id) REFERENCES Equipos(id)
);

DROP TABLE IF EXISTS Partidos;
CREATE TABLE Partidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jornada INTEGER NOT NULL,
  local_id INTEGER,
  visitante_id INTEGER,
  goles_local INTEGER DEFAULT 0,
  goles_visitante INTEGER DEFAULT 0,
  fecha DATETIME,
  estado TEXT DEFAULT 'pendiente'
);

DROP TABLE IF EXISTS Reconocimientos;
CREATE TABLE Reconocimientos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jornada INTEGER NOT NULL,
  jugador_id INTEGER NOT NULL,
  categoria TEXT NOT NULL,
  titulo TEXT,
  descripcion TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(jugador_id) REFERENCES Jugadores(id)
);
