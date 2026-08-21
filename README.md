# Meloop

Generá pequeñas melodías dibujando un patrón. Ver `openspec/changes/draw-to-melody-mvp/proposal.md` para el detalle del MVP.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Docker

```bash
docker build -t meloop .
docker run -d --name meloop -p 8080:80 meloop
```

La app queda disponible en `http://localhost:8080`.

### Despliegue en la Raspberry Pi (void-server)

```bash
rsync -az --exclude node_modules --exclude .git --exclude dist -e ssh ./ void-server:~/meloop/
ssh void-server 'cd ~/meloop && docker build -t meloop . && docker rm -f meloop 2>/dev/null; docker run -d --name meloop --restart unless-stopped -p 8080:80 meloop'
```
