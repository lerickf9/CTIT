require("dotenv").config();

const http = require("http");
const { Pool } = require("pg");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// ---- Verificar conexión al iniciar ----
pool.query("SELECT 1")
  .then(() => console.log("✅ Conexión a PostgreSQL OK"))
  .catch(err => console.error("❌ Error conectando a Postgres:", err.message));

// ---- Helpers ----
function sendJson(res, status, data) {
  const body = JSON.stringify(data);

  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  res.end(body);
}

function sendNoContent(res, status = 204) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end();
}

async function readBodyJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        if (!data) return resolve({});
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error("JSON inválido"));
      }
    });
  });
}

// ---- Servidor HTTP ----
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") return sendNoContent(res, 204);

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // =========================
    // GET /posts  -> listar todos
    // =========================
    if (req.method === "GET" && path === "/posts") {
      const result = await pool.query(
        `SELECT id, nombre, descripcion 
         FROM posts 
         ORDER BY id DESC`
      );

      const posts = result.rows.map(r => ({
        id: r.id,
        Nombre: r.nombre,
        Descripcion: r.descripcion,
      }));

      return sendJson(res, 200, posts);
    }

    // =========================
    // POST /posts -> crear post
    // =========================
    if (req.method === "POST" && path === "/posts") {
      const body = await readBodyJson(req);

      const Nombre = (body.Nombre ?? "").toString().trim();
      const Descripcion = (body.Descripcion ?? "").toString().trim();

      if (!Nombre || !Descripcion) {
        return sendJson(res, 400, {
          message: "Nombre y Descripcion son obligatorios",
        });
      }

      const result = await pool.query(
        `INSERT INTO posts (nombre, descripcion)
         VALUES ($1, $2)
         RETURNING id, nombre, descripcion`,
        [Nombre, Descripcion]
      );

      const row = result.rows[0];

      return sendJson(res, 201, {
        id: row.id,
        Nombre: row.nombre,
        Descripcion: row.descripcion,
      });
    }

    // =========================
    // DELETE /posts/:id
    // =========================
    const matchDelete = path.match(/^\/posts\/(\d+)$/);

    if (req.method === "DELETE" && matchDelete) {
      const id = Number(matchDelete[1]);

      const result = await pool.query(
        `DELETE FROM posts 
         WHERE id = $1 
         RETURNING id, nombre, descripcion`,
        [id]
      );

      if (result.rowCount === 0) {
        return sendJson(res, 404, { message: "Post no encontrado" });
      }

      const row = result.rows[0];

      return sendJson(res, 200, {
        id: row.id,
        Nombre: row.nombre,
        Descripcion: row.descripcion,
      });
    }

    // Ruta no encontrada
    return sendJson(res, 404, { message: "Ruta no encontrada" });

  } catch (err) {
    console.error("Error:", err);
    return sendJson(res, 500, { message: err.message || "Error interno" });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 API lista en http://localhost:${PORT}`);
});
