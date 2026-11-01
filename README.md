# M3 — Pokédex React

## Funcionamiento básico


Aplicación desarrollada con React que consulta PokéAPI y muestra los primeros 151 Pokémon. Permite buscar por nombre o número, filtrar por tipo y guardar Pokémon favoritos.

Para ejecutarla en local:

1. Instalar dependencias con `npm install`.
2. Iniciar el servidor con `npm run dev`.
3. Abrir en el navegador la dirección que muestra Vite.

Funciones principales:
- Consultar los primeros 151 Pokémon y sus datos.
- Buscar por nombre o número (también admite números con ceros iniciales, por ejemplo `#025`).
- Filtrar por tipo.
- Añadir y quitar Pokémon de favoritos.
- Mantener los favoritos guardados en `localStorage` al cerrar y volver a abrir la página.
- Volver a intentar la carga si falla la conexión.
- Mostrar un aviso cuando alguna petición individual falla, sin descartar los Pokémon que sí se han cargado.

## Uso de IA

He utilizado ChatGPT como herramienta principal durante prácticamente todo el desarrollo. La IA me ha ayudado a plantear la estructura del proyecto, generar y revisar componentes de React, conectar la aplicación con PokéAPI, preparar los estilos y mejorar la gestión de estados y peticiones.

También he utilizado ChatGPT para entender la evaluación y proponer mejoras concretas: extraer la carga de datos a un hook personalizado, añadir cancelación de peticiones y crear un sistema de favoritos persistentes.

Ejemplos representativos de las peticiones realizadas:

1. «Ayúdame a crear una Pokédex con React y Vite, separada en componentes reutilizables, que consuma PokéAPI y permita buscar Pokémon y filtrar por tipo».
2. «Revisa los puntos débiles de mi evaluación de React y ayúdame a extraer la carga a un hook, gestionar los reintentos, cancelar peticiones y añadir favoritos con localStorage».

He integrado las propuestas en el repositorio y revisado cómo se conectan los componentes, los hooks y el servicio de API. Para la comprobación funcional final ejecuto `npm run dev` y pruebo la carga, la búsqueda, el filtro por tipo, los favoritos, la persistencia al recargar y el botón de reintento. La mayor parte del código se ha generado con ayuda de IA; mi intervención ha consistido en dirigir los cambios, integrarlos y revisar el resultado.

## Autopsia

### 1. Promise.allSettled() en lugar de Promise.all()

Para obtener los detalles de los Pokémon, las peticiones se realizan en grupos de 20 y se gestionan con `Promise.allSettled()`.

La alternativa era utilizar `Promise.all()`. La descarté porque, si una de las peticiones falla, `Promise.all()` rechaza el conjunto completo. Con `Promise.allSettled()` puedo conservar los Pokémon cuyas peticiones han funcionado y contar los fallos individuales para informar al usuario.

### 2. Hook personalizado y cancelación con AbortController

La carga y transformación de los datos está separada de la interfaz en el hook `usePokemon`. Además, el hook utiliza `AbortController` para cancelar las peticiones cuando el efecto se limpia, por ejemplo, al desmontarse el componente o al iniciar un nuevo intento.

La alternativa era mantener toda la lógica dentro de `App.jsx` y utilizar una bandera para ignorar los resultados después del desmontaje. He elegido el hook porque separa responsabilidades y permite reutilizar la lógica; la cancelación real evita mantener peticiones innecesarias. Para los favoritos he creado otro hook, `useFavorites`, que encapsula la lectura y escritura en `localStorage`.
