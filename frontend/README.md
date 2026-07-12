# Jelpi

Jelpi es una aplicación web para planificar tareas de forma semanal y adaptativa. Está pensada para ayudarte a visualizar el trabajo del día, asignar prioridades y ajustar la carga según la energía disponible.

## Qué incluye

- Vista semanal con tareas programadas.
- Vista de detalle por día.
- Creación de tareas con prioridad, energía y subtareas.
- Sidebar con filtros, bloques ocupados y seguimiento de progreso.
- Persistencia local en el navegador.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Estructura principal

- src/app/: rutas y páginas.
- src/components/: UI de la app.
- src/lib/: reglas y almacenamiento.
- src/mock/: datos iniciales.

## Organización del trabajo

El proyecto está pensado para crecer en fases:

1. Frontend base y experiencia de uso.
2. Separación de lógica de negocio y servicios.
3. Integración con backend y persistencia remota.

En el futuro conviene mover la lógica de datos a capas más claras como features, services y types para facilitar el trabajo con una API.

## Comandos útiles

```bash
npm run build
npm run lint
```
