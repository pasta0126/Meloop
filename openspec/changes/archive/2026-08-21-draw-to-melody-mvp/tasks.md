## 1. Setup del proyecto

- [x] 1.1 Scaffolding de app Vite + React + TypeScript en la raíz del repo
- [x] 1.2 Añadir dependencias: `tone`, `@tonejs/midi`, `tonal`
- [x] 1.3 Configurar estructura básica de carpetas (input de dibujo, generación, reproducción, exportación, controles)

## 2. Entrada de dibujo (canvas-drawing-input)

- [x] 2.1 Componente de lienzo que capture un trazo mediante Pointer Events
- [x] 2.2 Registrar la secuencia de puntos (X, Y) durante el trazo
- [x] 2.3 Normalizar la secuencia capturada a rango 0..1 en ambos ejes
- [x] 2.4 Acción para borrar/reiniciar el lienzo e invalidar la melodía generada previa

## 3. Controles musicales y generación (melody-generation)

- [x] 3.1 Panel de controles: escala, tonalidad, octava, BPM, número de compases (con valores por defecto)
- [x] 3.2 Función de cuantización: mapear puntos normalizados a notas de la escala/tonalidad elegida usando `tonal`
- [x] 3.3 Función de generación rítmica: distribuir las notas en el tiempo según BPM y número de compases
- [x] 3.4 Componer ambas funciones en un generador determinista trazo+parámetros → secuencia de eventos de nota
- [x] 3.5 Regenerar automáticamente al cambiar cualquier parámetro musical (sin perder el trazo dibujado)

## 4. Reproducción (melody-playback)

- [x] 4.1 Integrar Tone.js Transport/Synth para reproducir la secuencia de eventos de nota generada
- [x] 4.2 Control de reproducir/detener con estado visual sincronizado
- [x] 4.3 Deshabilitar la reproducción cuando no exista melodía generada

## 5. Exportación MIDI (midi-export)

- [x] 5.1 Construir un archivo MIDI a partir de la secuencia de eventos de nota con `@tonejs/midi`, incluyendo el BPM
- [x] 5.2 Disparar la descarga del archivo .mid desde el navegador
- [x] 5.3 Deshabilitar la exportación cuando no exista melodía generada

## 6. Empaquetado y despliegue

- [x] 6.1 Dockerfile multi-stage: build de la app Vite + imagen final con servidor estático ligero
- [x] 6.2 Verificar build y arranque del contenedor en local
- [x] 6.3 Documentar (README o similar) el comando de build/run de la imagen para el despliegue posterior en la Raspberry Pi vía SSH
