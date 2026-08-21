## Context

El MVP (`draw-to-melody-mvp`, ya archivado) implementó un único trazo continuo (`NormalizedPoint[]`) muestreado en pasos fijos por compás, siempre generando una nota por paso. Ver proposal.md para el porqué de este cambio. Existen ahora dos assets de marca (`meloop-icon.png`, `meloop-banner.png`, en la raíz del repo) que definen la identidad visual a aplicar.

## Goals / Non-Goals

**Goals:**
- Sustituir el modelo de "un solo trazo" por una colección de marcas independientes (trazos y puntos) con borrado parcial.
- Permitir silencios: un paso rítmico sin tinta no debe sonar.
- Playhead visual sincronizado con `Tone.Transport`, con marcas de compás/tiempo.
- Tokens de color reutilizables extraídos de los assets de marca, aplicados a toda la UI existente.

**Non-Goals:**
- No se rediseña el layout general de la app (paneles de dibujo/controles/acciones se mantienen donde están).
- No se implementa aún el escaneo de códigos de barras/QR ni el rack de filtros de audio (fuera de alcance, ver proposal del MVP).
- No se persiste el dibujo entre sesiones.

## Decisions

- **Modelo de datos: `Stroke[]` en vez de `NormalizedPoint[]`**. Cada `Stroke` es `{ id, points: NormalizedPoint[] }`. Un punto suelto (click sin arrastre) se representa como un `Stroke` de un único punto. Esto permite múltiples marcas independientes y es la base necesaria para el borrado parcial (se puede eliminar un `Stroke` completo o recortar sus puntos) y para los silencios (un paso sin ningún punto de ningún `Stroke` cerca de su rango de X = silencio).
- **Herramienta de borrado parcial mediante radio de proximidad**: al arrastrar en modo "Borrar", se eliminan los puntos de cualquier `Stroke` cuya distancia al puntero sea menor que un radio fijo (en píxeles de pantalla, no en coordenadas normalizadas, para que el tamaño del borrador sea consistente visualmente). Si un `Stroke` queda sin puntos, se descarta. Alternativa considerada: borrar por trazo completo (clic sobre un trazo lo elimina entero) — se descarta porque no permite recortar "una raya" parcialmente, que es lo pedido.
- **Silencio por bin temporal**: se mantiene el muestreo en pasos fijos (`STEPS_PER_BAR`, ya existente), pero cada paso ahora es un bin de X con un ancho (`1 / totalSteps`). Un paso es silencio si ningún punto de ninguna marca cae dentro de su bin; si hay uno o más puntos, se usa el promedio de sus Y para cuantizar la nota de ese paso. Alternativa considerada: interpolar Y siempre (comportamiento actual del MVP) — se descarta porque por definición nunca deja huecos, y el usuario pide explícitamente poder dejar silencios.
- **Playhead como capa superpuesta al canvas**, no como parte del propio `<canvas>` de dibujo: un elemento posicionado en la misma zona que avanza vía `requestAnimationFrame`, leyendo `Tone.getTransport().seconds` (o `.progress` si se ancla el loop a la duración total) para calcular su posición X. Las marcas de compás/tiempo son líneas estáticas de fondo calculadas a partir de `bars` y 4 tiempos por compás. Alternativa considerada: redibujar el playhead directamente en el canvas 2D en cada frame — se descarta porque mezclaría el estado de dibujo (trazos del usuario) con el estado de reproducción (playhead), complicando el borrado parcial sobre el mismo canvas.
- **Tema por tokens CSS (custom properties)**, no una librería de estilos. Paleta extraída por muestreo de píxel de los assets de marca:
  - Fondo: `--color-bg: #0a0918`, `--color-surface: #15121f`, `--color-surface-alt: #1e1a2e`, `--color-border: #2c2640`
  - Texto: `--color-text: #f5f3fb`, `--color-text-muted: #a89fc2`
  - Gradiente de acento (5 paradas, de frío a cálido, tal como aparece en el icono): `--accent-1: #8ea2f4` (azul), `--accent-2: #c9a0f0` (violeta), `--accent-3: #f78cbc` (rosa), `--accent-4: #fd9c7c` (coral), `--accent-5: #ffd27a` (ámbar)
  - Acento interactivo primario (botones, foco, playhead): `--color-accent: var(--accent-3)` con estado hover hacia `--accent-2`
  - El gradiente completo (`linear-gradient` de accent-1 a accent-5) se usa para el playhead y para acentos decorativos (p. ej. el trazo dibujado), de forma que "generar un tema" en el futuro sea tan simple como sustituir estas variables.
- **Assets de marca**: `meloop-icon.png` se usa como favicon/logo pequeño; `meloop-banner.png` como fondo decorativo de cabecera (no bloquea la interacción ni reduce el contraste del contenido).

## Risks / Trade-offs

- [El borrado parcial por proximidad puede sentirse impreciso en trazos muy densos] → Elegir un radio de borrador pequeño por defecto y visible (un círculo que sigue al puntero en modo borrar).
- [Cambiar el modelo de datos de dibujo es un cambio incompatible con el MVP anterior] → Aceptado (marcado **BREAKING** en la proposal); no hay persistencia previa que migrar.
- [Sincronizar el playhead con `requestAnimationFrame` puede desincronizarse levemente del audio en pestañas en segundo plano] → Aceptable para un MVP visual; no afecta al audio en sí, solo a la indicación visual.
- [Extraer una paleta de una imagen es subjetivo] → Los valores fueron muestreados directamente de los píxeles de `meloop-icon.png`/`meloop-banner.png` y documentados aquí como tokens fijos, para que cualquier ajuste futuro se haga cambiando estas variables, no repitiendo el muestreo.
