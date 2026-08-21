## Why

El MVP validó el flujo completo, pero dos limitaciones concretas del prototipo dificultan usarlo de verdad: el lienzo solo acepta un trazo continuo (no se pueden dibujar puntos sueltos, rayas cortas ni dejar silencios, ni borrar solo una parte), y no hay ninguna señal visual de que la música se está reproduciendo mientras suena. Además, ahora existen assets de marca (`meloop-icon.png`, `meloop-banner.png`) que definen una identidad visual que la UI actual no refleja.

## What Changes

- El lienzo pasa de un único trazo conectado a un lienzo de dibujo libre: múltiples trazos independientes, puntos sueltos y rayas cortas en cualquier posición. **BREAKING** (cambia el modelo de datos de la entrada de dibujo).
- Nueva herramienta de borrado parcial: el usuario puede borrar solo la tinta bajo el puntero, sin tener que reiniciar todo el lienzo.
- Los espacios del lienzo sin tinta se interpretan como silencios (ausencia de nota) en lugar de generar siempre una nota en cada paso. **BREAKING** (cambia el comportamiento de generación: ya no todas las divisiones rítmicas suenan).
- Nuevo indicador visual de reproducción: una línea vertical que recorre el lienzo de izquierda a derecha mientras suena la melodía, marcando además las divisiones de compás/tiempo.
- Rediseño visual de toda la UI usando una paleta de colores extraída de `meloop-icon.png` y `meloop-banner.png`, expuesta como tokens de tema reutilizables (para poder ajustar el tema fácilmente más adelante).

## Capabilities

### New Capabilities
(ninguna — los cambios modifican el comportamiento de capacidades existentes; el tema visual se resuelve como tokens de diseño en `design.md`, sin comportamiento nuevo verificable)

### Modified Capabilities
- `canvas-drawing-input`: el lienzo admite múltiples trazos/puntos independientes en lugar de un único trazo conectado, y añade una herramienta de borrado parcial.
- `melody-generation`: los pasos rítmicos sin tinta bajo ellos se convierten en silencio (ausencia de nota) en lugar de generar siempre una nota.
- `melody-playback`: añade un indicador visual (playhead) sincronizado con la reproducción que recorre el lienzo y marca las divisiones de compás/tiempo.

## Impact

- Reescribe el componente de dibujo (`src/features/drawing`) y su modelo de datos (de secuencia de puntos a colección de trazos).
- Modifica la función de cuantización/generación (`src/features/generation`) para producir silencios.
- Añade una capa de visualización de reproducción sincronizada con `Tone.Transport`.
- Introduce un sistema de tokens de tema (colores) derivado de los assets de marca, aplicado a toda la UI existente.
- No afecta a la exportación MIDI salvo por representar silencios como ausencia de evento de nota (ya soportado por el formato).
