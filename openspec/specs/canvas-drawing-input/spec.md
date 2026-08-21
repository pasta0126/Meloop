# canvas-drawing-input Specification

## Purpose
Captura el gesto de dibujo del usuario sobre un lienzo como una secuencia ordenada de puntos que sirve de entrada al motor de generación de melodías.

## Requirements

### Requirement: Captura de trazo en lienzo
El sistema SHALL proporcionar una superficie de dibujo donde el usuario pueda trazar un gesto continuo con el puntero (ratón o táctil).

#### Scenario: Trazo simple
- **WHEN** el usuario presiona y arrastra el puntero sobre el lienzo
- **THEN** el sistema registra la secuencia de posiciones (X, Y) del trazo en el orden en que fueron dibujadas

#### Scenario: Fin del trazo
- **WHEN** el usuario suelta el puntero
- **THEN** el sistema finaliza la captura y deja disponible la secuencia de puntos resultante para su uso por el motor de generación

### Requirement: Normalización del trazo
El sistema SHALL normalizar la secuencia de puntos capturada a un rango 0..1 tanto en el eje temporal (X) como en el eje de altura (Y), independientemente del tamaño en píxeles del lienzo.

#### Scenario: Normalización tras el dibujo
- **WHEN** se ha finalizado un trazo
- **THEN** el sistema produce una secuencia de puntos normalizados donde X representa la posición temporal relativa (0 = inicio, 1 = fin) e Y representa la altura relativa (0 = más grave, 1 = más agudo)

### Requirement: Reiniciar el lienzo
El sistema SHALL permitir al usuario borrar el trazo actual y empezar un nuevo dibujo.

#### Scenario: Borrar dibujo
- **WHEN** el usuario activa la acción de borrar/reiniciar
- **THEN** el lienzo queda vacío y cualquier melodía generada previamente a partir del trazo anterior deja de considerarse válida hasta un nuevo dibujo
