# 📌 CTIT — Challenge React + Redux + Node + PostgreSQL

Este repositorio contiene una aplicación web completa desarrollada como parte del challenge técnico para **CTIT**.
El objetivo principal es demostrar manejo de **arquitectura frontend con Redux**, integración con **API en Node.js** y persistencia en **PostgreSQL**, siguiendo buenas prácticas y un flujo de datos claro.

---

## 🚀 Descripción del proyecto

La aplicación implementa un **CRUD de Posts**, donde cada post contiene:

* **Nombre**
* **Descripción**

Características clave del sistema:

* Frontend desarrollado en **React + Redux (Redux Toolkit) con Vite**
* Backend en **Node.js puro (sin Express)** con servidor HTTP nativo
* Base de datos **PostgreSQL**
* Regla de evaluación cumplida:
  👉 **La lista completa de posts (`GET /posts`) se consume solo UNA vez al cargar la vista.**
  El filtro por nombre es **local en Redux**, sin nuevas llamadas al backend.

---

## 🧱 Arquitectura general

```
CTIT/
│
├── backend/        # API Node.js + PostgreSQL
│   └── index.js
│
├── frontend/       # React + Redux + Vite
│   └── src/
│
└── README.md       # Este archivo
```

---

## 🛠️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* **Node.js 20 LTS (recomendado)**
* **PostgreSQL**
* **Git**

---

## 🗄️ Paso 1 — Configurar la Base de Datos (PostgreSQL)

1. Abre **pgAdmin** y conéctate a tu servidor local (`localhost`).
2. Crea una base de datos llamada:

```
tcit_posts
```

3. Abre el *Query Tool* y ejecuta:

```sql
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ⚙️ Paso 2 — Configurar el Backend

### 1) Ubícate en la carpeta:

```bash
cd backend
```

### 2) Instala dependencias:

```bash
npm install
```

### 3) Crea un archivo `.env` con tus credenciales de PostgreSQL:

```env
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=*****
PGDATABASE=****
PORT=3000
```

> ⚠️ Este archivo **no se sube a GitHub** (está en `.gitignore`).

### 4) Levanta el servidor:

```bash
node index.js
```

Si todo está correcto, deberías ver:

```
✅ Conexión a PostgreSQL OK  
🚀 API lista en http://localhost:3000
```

Puedes probar en el navegador:

```
http://localhost:3000/posts
```

Debería devolver:

```json
[]
```

---

## 🎨 Paso 3 — Ejecutar el Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abre en tu navegador:

```
http://localhost:5173
```

---

## ✅ Funcionalidades implementadas

Desde la interfaz puedes:

* ➕ **Crear posts** (Nombre + Descripción)
* 🔍 **Filtrar por Nombre** (sin llamadas al backend)
* 📋 **Listar posts desde PostgreSQL**
* 🗑️ **Eliminar posts**
* 📡 Ver en la pestaña *Network* que:

  * Solo hay **UNA llamada GET al cargar la página**

---

## 🧠 Decisiones técnicas importantes

* Se usó **Redux Toolkit** para gestionar el estado global.
* La lista de posts se guarda en Redux y el filtro se aplica localmente.
* La API fue construida con **Node nativo (`http`)** para demostrar comprensión de servidores sin frameworks.
* Se respetó la regla del challenge:
  👉 **No se re-consume `/posts` al crear, filtrar o eliminar.**

---


## 👤 Autor

**Erick Fuentes**
Desarrollador en formación — enfoque en Backend y Arquitectura de Software
📍 Chile

---

## 🙏 Agradecimientos

Este proyecto fue desarrollado con dedicación y aprendizaje iterativo, priorizando claridad de arquitectura, buenas prácticas y alineación con los criterios del challenge.

Si tienes dudas sobre la implementación, estaré feliz de explicarlas durante la revisión técnica.
