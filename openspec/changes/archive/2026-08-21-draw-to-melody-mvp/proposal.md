## Why

Meloop no tiene todavía ningún flujo funcional: solo existe el concepto. Para validar la idea central del proyecto ("dibuja un patrón, escucha una melodía") hace falta un primer recorte tangible y usable en el navegador, sin depender de las piezas más complejas (escaneo de códigos de barras, cadena de filtros de audio) que aún no tienen un diseño decidido.

## What Changes

- Nueva app web (Vite + React + TypeScript) como punto de entrada del proyecto.
- Panel de dibujo en canvas: el usuario traza una línea/gesto que se captura como una secuencia de puntos (X = tiempo, Y = altura).
- Controles de generación: escala, tonalidad, octava, BPM y número de compases.
- Motor de generación de melodía: normaliza los puntos dibujados, los cuantiza a la escala/tonalidad elegida y produce una secuencia de eventos de nota (pitch, tiempo de inicio, duración).
- Reproducción en el navegador de la melodía generada (Tone.js), sincronizada con los controles de BPM/compases.
- Exportación de la melodía generada como archivo MIDI descargable.
- Fuera de alcance en este change (se abordará en changes posteriores): escaneo de códigos de barras/QR como modificador, rack de filtros/efectos de sonido, mutación/randomización, exportación WAV.

## Capabilities

### New Capabilities
- `canvas-drawing-input`: captura de un gesto de dibujo en un canvas como una secuencia de puntos (tiempo, altura) que sirve de entrada al motor de generación.
- `melody-generation`: transforma la entrada de dibujo y los parámetros musicales (escala, tonalidad, octava, BPM, compases) en una secuencia de eventos de nota determinista.
- `melody-playback`: reproduce en el navegador la secuencia de eventos de nota generada, respetando el BPM configurado.
- `midi-export`: exporta la secuencia de eventos de nota generada como un archivo MIDI estándar descargable.

### Modified Capabilities
(ninguna — no existen specs previas en el proyecto)

## Impact

- Introduce el primer código fuente del repo: estructura de app Vite/React/TypeScript.
- Nuevas dependencias: `react`, `vite`, `tone`, `@tonejs/midi`, `tonal`.
- No afecta a ningún sistema existente (el repo está vacío salvo README/LICENSE).
