# melody-playback Specification

## Purpose
Permite escuchar en el navegador, de forma inmediata, la melodía generada a partir del dibujo, respetando el tempo configurado por el usuario.

## Requirements

### Requirement: Reproducción de la melodía generada
El sistema SHALL reproducir mediante audio en el navegador la secuencia de eventos de nota generada, al BPM configurado por el usuario.

#### Scenario: Reproducir tras generar
- **WHEN** existe una melodía generada y el usuario activa la reproducción
- **THEN** el sistema reproduce las notas en el orden, altura y duración definidos por la secuencia de eventos, a la velocidad correspondiente al BPM configurado

#### Scenario: Detener reproducción
- **WHEN** la melodía se está reproduciendo y el usuario activa la detención
- **THEN** el sistema detiene el sonido de inmediato

### Requirement: Indicación visual de reproducción
El sistema SHALL indicar visualmente que la reproducción está en curso mientras suena la melodía.

#### Scenario: Estado de reproducción visible
- **WHEN** la melodía se está reproduciendo
- **THEN** el control de reproducción refleja visualmente que está activa (por ejemplo, cambiando de "reproducir" a "detener")

### Requirement: Sin melodía generada
El sistema SHALL impedir iniciar la reproducción si todavía no existe una melodía generada.

#### Scenario: Intento de reproducir sin dibujo
- **WHEN** el usuario no ha dibujado ningún trazo o no se ha generado ninguna melodía
- **THEN** el control de reproducción permanece deshabilitado o no produce ningún sonido
