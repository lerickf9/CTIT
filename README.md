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
* Backend en **Node.js ** con servidor HTTP nativo
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

## ✅ Funcionalidades implementadas

Desde la interfaz puedes:

* ➕ **Crear posts** (Nombre + Descripción)
* 🔍 **Filtrar por Nombre** (sin llamadas al backend)
* 📋 **Listar posts desde PostgreSQL**
* 🗑️ **Eliminar posts**

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
Desarrollador Junior — enfoque en Backend y Arquitectura de Software

---

## 🙏 Agradecimientos

Este proyecto fue desarrollado con dedicación y aprendizaje iterativo, priorizando claridad de arquitectura, buenas prácticas y alineación con los criterios del challenge.

Si tienes dudas sobre la implementación, estaré feliz de explicarlas durante la revisión técnica.
