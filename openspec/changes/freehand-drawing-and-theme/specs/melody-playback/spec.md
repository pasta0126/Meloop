## ADDED Requirements

### Requirement: Indicador de reproducción sincronizado (playhead)
El sistema SHALL mostrar, mientras la melodía se reproduce, una línea vertical que recorre el lienzo de dibujo de izquierda a derecha en sincronía con la posición de reproducción, y que marca visualmente las divisiones de compás y tiempo (beat).

#### Scenario: Movimiento sincronizado con la reproducción
- **WHEN** la melodía se está reproduciendo
- **THEN** la posición horizontal de la línea vertical en el lienzo corresponde, en todo momento, al instante de la reproducción dentro del total de compases configurado

#### Scenario: Marcas de compás y tiempo visibles
- **WHEN** la melodía se está reproduciendo o está detenida
- **THEN** el lienzo muestra marcas visuales que indican los límites de cada compás y de cada tiempo (beat) dentro de un compás

#### Scenario: Playhead oculto al detener
- **WHEN** el usuario detiene la reproducción
- **THEN** la línea de reproducción deja de recorrer el lienzo
