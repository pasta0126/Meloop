# melody-generation Specification

## Purpose
Convierte la entrada de dibujo normalizada y los parámetros musicales elegidos por el usuario en una secuencia determinista de eventos de nota que representan la melodía.

## Requirements

### Requirement: Selección de parámetros musicales
El sistema SHALL permitir al usuario configurar, antes de generar la melodía, los siguientes parámetros: escala musical, tonalidad, octava base, BPM y número de compases.

#### Scenario: Valores por defecto
- **WHEN** el usuario abre la aplicación por primera vez
- **THEN** el sistema muestra valores por defecto razonables para escala, tonalidad, octava, BPM y compases, de forma que se pueda generar una melodía sin configuración adicional

#### Scenario: Cambio de parámetro
- **WHEN** el usuario modifica cualquiera de los parámetros musicales
- **THEN** el sistema conserva el trazo dibujado y queda listo para regenerar la melodía con los nuevos parámetros

### Requirement: Generación determinista de melodía
El sistema SHALL generar, a partir de un trazo dibujado y un conjunto de parámetros musicales, una secuencia de eventos de nota (altura, instante de inicio, duración) cuantizada a la escala y tonalidad seleccionadas.

#### Scenario: Misma entrada, mismo resultado
- **WHEN** se genera una melodía dos veces con el mismo trazo y los mismos parámetros musicales
- **THEN** el sistema produce exactamente la misma secuencia de eventos de nota en ambas ocasiones

#### Scenario: Notas dentro de la escala
- **WHEN** se genera una melodía con una escala y tonalidad determinadas
- **THEN** todas las notas de la secuencia resultante pertenecen a esa escala y tonalidad

#### Scenario: Duración total según BPM y compases
- **WHEN** se genera una melodía con un BPM y un número de compases determinados
- **THEN** la duración total de la secuencia de eventos de nota corresponde a esos compases reproducidos a ese tempo

### Requirement: Correspondencia entre trazo y melodía
El sistema SHALL mapear la posición temporal (X) del trazo a la posición temporal de las notas, y la altura (Y) del trazo a la altura de las notas, de forma que un trazo ascendente produzca una melodía con tendencia ascendente y un trazo descendente produzca una melodía con tendencia descendente.

#### Scenario: Trazo ascendente
- **WHEN** el trazo dibujado tiene una tendencia claramente ascendente en el eje Y a lo largo del tiempo
- **THEN** la secuencia de notas generada tiene una tendencia de altura ascendente equivalente
