## MODIFIED Requirements

### Requirement: Generación determinista de melodía
El sistema SHALL generar, a partir del conjunto de marcas dibujadas (trazos y puntos) y un conjunto de parámetros musicales, una secuencia de pasos rítmicos donde cada paso contiene una nota (altura, instante de inicio, duración) cuantizada a la escala y tonalidad seleccionadas, o un silencio si no hay ninguna marca dibujada en ese instante.

#### Scenario: Misma entrada, mismo resultado
- **WHEN** se genera una melodía dos veces con el mismo conjunto de marcas y los mismos parámetros musicales
- **THEN** el sistema produce exactamente la misma secuencia de pasos (notas y silencios) en ambas ocasiones

#### Scenario: Notas dentro de la escala
- **WHEN** se genera una melodía con una escala y tonalidad determinadas
- **THEN** todas las notas de la secuencia resultante pertenecen a esa escala y tonalidad

#### Scenario: Duración total según BPM y compases
- **WHEN** se genera una melodía con un BPM y un número de compases determinados
- **THEN** la duración total de la secuencia de pasos (incluyendo silencios) corresponde a esos compases reproducidos a ese tempo

#### Scenario: Silencio en zona sin dibujo
- **WHEN** un paso rítmico no tiene ninguna marca dibujada en su posición temporal
- **THEN** ese paso se representa como un silencio y no genera ningún evento de nota audible ni exportable

#### Scenario: Lienzo completamente vacío
- **WHEN** no se ha dibujado ninguna marca en el lienzo
- **THEN** el sistema no genera ninguna nota (todos los pasos son silencio)

### Requirement: Correspondencia entre trazo y melodía
El sistema SHALL mapear la posición temporal (X) de cada marca dibujada a la posición temporal del paso rítmico correspondiente, y la altura (Y) de la marca a la altura de la nota en ese paso, de forma que marcas con tendencia ascendente en el tiempo produzcan una melodía con tendencia ascendente, y marcas con tendencia descendente produzcan una melodía con tendencia descendente.

#### Scenario: Trazo ascendente
- **WHEN** las marcas dibujadas tienen una tendencia claramente ascendente en el eje Y a lo largo del tiempo
- **THEN** la secuencia de notas generada (ignorando los silencios) tiene una tendencia de altura ascendente equivalente

#### Scenario: Varias marcas en el mismo paso rítmico
- **WHEN** hay más de una marca cuya posición temporal cae dentro del mismo paso rítmico
- **THEN** el sistema combina esas marcas en una única nota para ese paso, de forma determinista
