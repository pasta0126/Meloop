## Context

El repo está vacío salvo README/LICENSE (ver proposal.md - Why). No hay stack técnico previo que respetar, así que este change introduce el primero. El objetivo declarado por el usuario es tener algo tangible cuanto antes, así que las decisiones priorizan simplicidad y bajo acoplamiento sobre flexibilidad futura (escaneo de códigos, filtros de audio, mutación quedan fuera, ver proposal.md).

El despliegue final será en una Raspberry Pi ("void server"), accesible por SSH, usando Docker.

## Goals / Non-Goals

**Goals:**
- Un flujo funcional de extremo a extremo: dibujar → generar → escuchar → exportar MIDI.
- Una arquitectura de app cliente simple, sin backend, fácil de empaquetar en un contenedor Docker para servir como archivos estáticos.
- Elegir librerías que no haya que sustituir cuando se añadan las siguientes capacidades (escaneo de códigos, filtros de audio).

**Non-Goals:**
- No se diseña aquí el modelo de "modificador" de código de barras ni la cadena de filtros/efectos (quedan para un change posterior).
- No se implementa persistencia de patrones ni URLs compartibles.
- No se automatiza en este change el despliegue real en la Raspberry Pi (build de la imagen, docker-compose, pipeline de CI/CD); solo se deja preparada la app para ser containerizada.

## Decisions

- **Vite + React + TypeScript** como app cliente. Alternativa considerada: vanilla JS/Canvas sin framework. Se descarta porque los paneles de controles (escala, BPM, futuros filtros) se benefician de un modelo de componentes, y React tiene mejor soporte de librerías de audio/MIDI de terceros.
- **Tone.js** como motor de audio. Alternativa: Web Audio API directa. Se descarta la API directa porque Tone.js ya resuelve scheduling sincronizado a BPM y, en changes futuros, provee la cadena de efectos/filtros sin reescribir esa capa.
- **`tonal`** para teoría musical (escalas, tonalidades, mapeo de notas). Alternativa: lógica de escalas hecha a mano. Se descarta por ser propenso a errores y no aportar valor diferencial.
- **`@tonejs/midi`** para la exportación MIDI. Se elige por pertenecer al mismo ecosistema que Tone.js y trabajar directamente sobre estructuras de notas compatibles.
- **Canvas nativo (HTML5 Canvas API)** para la captura de dibujo, sin librería de trazado adicional. Es suficiente para capturar una secuencia de puntos (X, Y) de un gesto simple.
- **Generación determinista**: la melodía se deriva únicamente del trazo normalizado + parámetros musicales, sin aleatoriedad, para que "misma entrada, mismo resultado" (ver spec de `melody-generation`) sea trivial de cumplir y para dejar espacio a un futuro modelo de mutación basado en semillas.
- **Despliegue vía Docker**: la app se sirve como build estático (sin SSR ni backend), lo que permite una imagen Docker mínima (build multi-stage: build de Vite + servidor estático ligero) desplegable en la Raspberry Pi vía SSH. El diseño concreto de esa imagen y su despliegue se resuelve como tarea de este change (ver tasks.md), pero la ejecución real del despliegue en el servidor remoto no se realiza como parte de esta fase de planificación.

## Risks / Trade-offs

- [Captura de dibujo con eventos de puntero puede variar entre dispositivos táctiles y ratón] → Normalizar la entrada usando Pointer Events (no Mouse/Touch Events por separado) para unificar el comportamiento.
- [Tone.js requiere interacción del usuario para iniciar el audio (política de autoplay de los navegadores)] → El primer "reproducir" ya es un gesto del usuario, así que se resuelve de forma natural sin lógica adicional.
- [Empaquetar en Docker una SPA sin backend puede ser "overkill" para el MVP] → Se acepta el trade-off porque el destino final (Raspberry Pi vía SSH) ya está decidido; conviene dejar la imagen lista desde este primer change en vez de migrar más tarde.

## Open Questions

- Detalles concretos del despliegue en la Raspberry Pi (nombre/IP del "void server", estructura de docker-compose si existieran otros servicios, dominio o puerto expuesto) se resolverán al ejecutar la tarea de despliegue, no cambian el enfoque ni las specs de este change.
