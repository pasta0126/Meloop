## MODIFIED Requirements

### Requirement: Captura de trazo en lienzo
El sistema SHALL proporcionar una superficie de dibujo libre donde el usuario pueda crear múltiples trazos y puntos independientes con el puntero (ratón o táctil), sin que estén conectados entre sí.

#### Scenario: Trazo simple
- **WHEN** el usuario presiona y arrastra el puntero sobre el lienzo
- **THEN** el sistema registra la secuencia de posiciones (X, Y) de ese trazo como una marca independiente, en el orden en que fueron dibujadas

#### Scenario: Punto suelto
- **WHEN** el usuario presiona y suelta el puntero sobre el lienzo sin arrastrarlo (o con un desplazamiento mínimo)
- **THEN** el sistema registra un punto suelto en esa posición como una marca independiente

#### Scenario: Varias marcas independientes
- **WHEN** el usuario dibuja varios trazos o puntos en distintos momentos, en cualquier posición del lienzo
- **THEN** el sistema conserva todas las marcas dibujadas hasta ese momento, sin conectarlas entre sí ni con marcas anteriores

#### Scenario: Fin del trazo
- **WHEN** el usuario suelta el puntero tras dibujar un trazo o punto
- **THEN** el sistema finaliza la captura de esa marca y la deja disponible, junto con el resto de marcas existentes, para su uso por el motor de generación

### Requirement: Normalización del trazo
El sistema SHALL normalizar la posición de cada marca dibujada (trazo o punto) a un rango 0..1 tanto en el eje temporal (X) como en el eje de altura (Y), independientemente del tamaño en píxeles del lienzo.

#### Scenario: Normalización tras el dibujo
- **WHEN** se ha finalizado una marca (trazo o punto)
- **THEN** el sistema produce las posiciones normalizadas de esa marca, donde X representa la posición temporal relativa (0 = inicio, 1 = fin) e Y representa la altura relativa (0 = más grave, 1 = más agudo)

### Requirement: Reiniciar el lienzo
El sistema SHALL permitir al usuario borrar todas las marcas dibujadas y empezar un nuevo dibujo, así como borrar únicamente la tinta situada bajo el puntero sin afectar al resto del dibujo.

#### Scenario: Borrar dibujo
- **WHEN** el usuario activa la acción de borrar todo
- **THEN** el lienzo queda vacío y cualquier melodía generada previamente a partir de las marcas anteriores deja de considerarse válida hasta un nuevo dibujo

#### Scenario: Borrado parcial
- **WHEN** el usuario activa la herramienta de borrado y arrastra el puntero sobre una zona del lienzo que contiene marcas
- **THEN** el sistema elimina únicamente los puntos de las marcas situados bajo el recorrido del puntero, conservando el resto del dibujo intacto

#### Scenario: Borrado parcial sin marcas bajo el puntero
- **WHEN** el usuario usa la herramienta de borrado sobre una zona del lienzo sin ninguna marca
- **THEN** el dibujo existente permanece sin cambios
