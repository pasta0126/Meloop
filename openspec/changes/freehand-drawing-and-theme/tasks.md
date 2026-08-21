## 1. Tema visual (tokens de color)

- [x] 1.1 Extraer y documentar la paleta (fondo, superficie, texto, gradiente de 5 acentos) como custom properties CSS
- [x] 1.2 Copiar `meloop-icon.png` y `meloop-banner.png` a `public/` y usarlos como favicon y fondo decorativo de cabecera
- [x] 1.3 Aplicar los tokens de tema a la UI existente (fondo, controles, botones, canvas) sustituyendo los estilos por defecto de Vite

## 2. Modelo de dibujo libre (canvas-drawing-input)

- [x] 2.1 Cambiar el modelo de datos de `NormalizedPoint[]` a `Stroke[]` (`{ id, points }`)
- [x] 2.2 Capturar cada gesto de puntero (arrastre o clic) como un nuevo `Stroke` independiente, sin conectarlo a marcas previas
- [x] 2.3 Redibujar el canvas a partir de la colección completa de `Stroke[]`
- [x] 2.4 Modo "Borrar" (herramienta alternable) que elimina puntos dentro de un radio de proximidad al puntero, descartando trazos que queden vacíos
- [x] 2.5 Mantener la acción "Borrar todo" existente, ahora vaciando la colección de trazos

## 3. Silencios en la generación (melody-generation)

- [x] 3.1 Calcular, para cada paso rítmico, si existe algún punto de algún trazo dentro de su bin temporal
- [x] 3.2 Si no hay puntos en el bin, marcar el paso como silencio (sin evento de nota)
- [x] 3.3 Si hay uno o más puntos, promediar su Y para cuantizar la nota de ese paso
- [x] 3.4 Actualizar el generador determinista para operar sobre `Stroke[]` en lugar de un único trazo

## 4. Playhead sincronizado (melody-playback)

- [x] 4.1 Capa visual superpuesta al canvas que dibuja líneas estáticas de compás/tiempo según `bars`
- [x] 4.2 Línea de reproducción (playhead) que avanza de izquierda a derecha mientras suena, leyendo la posición de `Tone.Transport`
- [x] 4.3 Ocultar el playhead al detener la reproducción

## 5. Verificación

- [x] 5.1 Probar en el navegador: dibujar puntos sueltos y rayas cortas en distintas zonas, confirmar que no se conectan entre sí
- [x] 5.2 Probar el borrado parcial sobre un trazo existente y confirmar que el resto del dibujo no se ve afectado
- [x] 5.3 Probar que un lienzo con huecos genera silencios audibles (no una nota) en esos pasos
- [x] 5.4 Probar que el playhead se mueve en sincronía con el audio y desaparece al detener
- [x] 5.5 Revisar visualmente que la UI usa la nueva paleta de forma consistente
