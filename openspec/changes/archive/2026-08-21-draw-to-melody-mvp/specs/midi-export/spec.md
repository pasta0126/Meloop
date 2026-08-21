## Purpose

Permite al usuario descargar la melodía generada como un archivo MIDI estándar, para poder seguir trabajando con ella en un DAW u otra herramienta.

## ADDED Requirements

### Requirement: Exportar melodía como archivo MIDI
El sistema SHALL permitir al usuario descargar la secuencia de eventos de nota generada como un archivo MIDI (.mid) estándar.

#### Scenario: Descarga tras generar melodía
- **WHEN** existe una melodía generada y el usuario activa la exportación
- **THEN** el sistema genera un archivo MIDI válido que contiene las notas, alturas, duraciones e instantes de inicio de la secuencia, y el navegador inicia su descarga

#### Scenario: Tempo reflejado en el archivo
- **WHEN** se exporta una melodía generada con un BPM determinado
- **THEN** el archivo MIDI resultante codifica ese mismo BPM, de forma que al reproducirlo en otra herramienta suene al tempo esperado

### Requirement: Exportación sin melodía generada
El sistema SHALL impedir la exportación si todavía no existe una melodía generada.

#### Scenario: Intento de exportar sin dibujo
- **WHEN** el usuario no ha dibujado ningún trazo o no se ha generado ninguna melodía
- **THEN** el control de exportación permanece deshabilitado
