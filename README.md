# Jelpi

Jelpi es una aplicación web de planificación personal para organizar tareas en una vista semanal y adaptarlas a la energía del usuario. La idea es combinar una agenda visual con reglas simples de prioridad, esfuerzo y estado de progreso para ayudar a decidir qué hacer en cada día.

## Qué hace la app

- Muestra una vista semanal con días y tareas programadas.
- Permite crear tareas con título, duración, prioridad, energía y subtareas.
- Ofrece una vista de detalle por día para revisar el trabajo planificado.
- Incluye un panel lateral con bloques ocupados, filtros y una visión rápida del progreso.
- Guarda las tareas en el navegador mediante localStorage para que persistan entre recargas.

## Stack técnico

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## Estructura del proyecto

- src/app/: páginas y rutas de la aplicación.
- src/components/: componentes de interfaz como la semana, el día, el sidebar y los formularios.
- src/lib/: lógica compartida de tareas, reglas de ordenación y almacenamiento local.
- src/mock/: datos de ejemplo y bloques de disponibilidad.

## Organización del trabajo

Para que el proyecto sea escalable, conviene trabajar en fases:

1. Fase 1: base del producto
   - definir el modelo de tareas y la lógica de planificación,
   - mantener la UI simple y funcional,
   - usar almacenamiento local mientras no haya backend.

2. Fase 2: preparar la arquitectura para backend
   - separar la lógica de negocio de la UI,
   - aislar los servicios de datos,
   - definir contratos claros para tareas, bloques ocupados y filtros.

3. Fase 3: integración con backend
   - crear una API para tareas y configuración de usuario,
   - añadir autenticación si se necesita sincronización entre dispositivos,
   - mover la persistencia de localStorage a una base de datos.

## Estructura futura recomendada

Cuando llegue el backend, tendría sentido reorganizar el proyecto en capas como:

- src/features/: funcionalidades concretas como tareas, calendario o energía.
- src/services/: comunicación con la API.
- src/store/: estado global de la aplicación.
- src/types/: modelos compartidos entre frontend y backend.

## Cómo arrancarla

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Luego abre http://localhost:3000.

## Comandos útiles

```bash
npm run build
npm run lint
```

## Puntos clave para entender el código

- WeekView es el punto central de la vista semanal.
- TaskForm maneja la creación de nuevas tareas.
- taskRules define tipos, colores, ordenación y compatibilidad energética.
- store se encarga de cargar y guardar tareas en localStorage.

## Estado actual

El proyecto está en una fase inicial y está orientado a la experiencia de planificación diaria y semanal. La implementación actual usa datos de ejemplo y un flujo simple de creación y visualización de tareas.
