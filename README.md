# API de Personas - Patrón Strategy

## Descripción general

Proyecto de API REST construida con **Node.js** y **Express** que gestiona una lista de personas en memoria. El núcleo del proyecto aplica el patrón de diseño **Strategy** para seleccionar el criterio de ordenamiento (por nombre o por apellido) sin utilizar estructuras `if/else`.

Las rutas principales son:

- `GET /personas` — Lista todas las personas.
- `GET /personas?ordenarPor=nombre` — Lista las personas ordenadas alfabéticamente por nombre.
- `GET /personas?ordenarPor=apellido` — Lista las personas ordenadas alfabéticamente por apellido.
- `POST /personas` — Agrega una nueva persona al arreglo en memoria.

## Estructura del proyecto

| Archivo | Contenido |
|---|---|
| `index.js` | Código principal: arreglo `bd`, objeto `estrategias`, rutas Express y arranque del servidor. |
| `package.json` | Metadatos del proyecto y dependencias (solo `express`). |
| `package-lock.json` | Versiones exactas de las librerías instaladas. |

## Dependencias

El proyecto instala una sola dependencia externa:

```json
"dependencies": {
  "express": "^5.3.0"
}
```

No se agregan librerías innecesarias; todo el funcionamiento se basa en el propio Node.js y Express.

## Funcionamiento del patrón Strategy

El archivo `index.js` incluye un objeto llamado `estrategias` con tres funciones comparadoras:

- `nombre`: ordena por el nombre de la persona usando `localeCompare`.
- `apellido`: ordena por el apellido de la persona usando `localeCompare`.
- `defecto`: retorna `0`, indicando que no hay reordenamiento (orden original).

La selección de la estrategia se realiza accediendo dinámicamente al objeto:

```javascript
const comparadora = estrategias[criterio] || estrategias.defecto;
```

Esto evita estructuras `if/else` y permite agregar nuevos criterios de ordenamiento simplemente añadiendo una nueva propiedad al objeto `estrategias`.

## Rutas HTTP

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/personas` | Devuelve el arreglo `bd` sin reordenar. |
| `GET` | `/personas?ordenarPor=nombre` | Ordena una copia de `bd` por el comparador `nombre`. |
| `GET` | `/personas?ordenarPor=apellido` | Ordena una copia de `bd` por el comparador `apellido`. |
| `POST` | `/personas` | Recibe un JSON con `nombre` y `apellido`, lo valida y lo agrega a `bd` con código `201`. |

## Validación

- En la ruta `POST /personas` se verifica que el cuerpo contenga ambos campos `nombre` y `apellido`. Si falta alguno, se responde con código `400` y un mensaje de error.
- En las rutas `GET` el parámetro `ordenarPor` seleccionará la estrategia correspondiente; si el parámetro no coincide con ninguna clave conocida, se usará la estrategia `defecto`.

## Ejecución

Para iniciar el servidor:

```bash
node index.js
```

El servidor quedará escuchando en `http://localhost:3000`.

Las peticiones se pueden probar con:

- `curl "http://localhost:3000/personas"`
- `curl "http://localhost:3000/personas?ordenarPor=nombre"`
- `curl -X POST "http://localhost:3000/personas" -H "Content-Type: application/json" -d '{"nombre":"Luis","apellido":"Zapata"}'`

## Restricciones

- No se utilizan bases de datos reales; la información reside en un arreglo en memoria.
- No se permiten clases en el código.
- No se adicionan librerías de terceros além de Express.
- El patrón Strategy se selecciona mediante acceso al objeto, sin estructuras condicionales `if/else`.

## Verificación de sintaxis

El archivo `index.js` ha sido validado con `node -c index.js` y no presenta errores de sintaxis.
