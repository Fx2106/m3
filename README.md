# M3 — Pokédex React

## Funcionamiento básico

Aplicación desarrollada con React que consulta la API pública PokéAPI y muestra los primeros 151 Pokémon.

Para ejecutarla en local:

1. Instalar las dependencias con `npm install`.
2. Iniciar el servidor con `npm run dev`.
3. Abrir en el navegador la dirección que muestra Vite.

Funciones principales:

- Consultar los primeros 151 Pokémon y sus datos.
- Buscar Pokémon por nombre o número.
- Filtrar Pokémon por tipo.
- Añadir y quitar Pokémon de favoritos.
- Guardar los favoritos en `localStorage` para conservarlos al cerrar y volver a abrir la página.
- Volver a intentar la carga si se produce un error.
- Mostrar avisos cuando alguna petición individual falla sin perder los resultados que sí se han cargado.

## Uso de IA

He utilizado ChatGPT como herramienta principal durante prácticamente todo el desarrollo de esta misión.

La mayor parte del código se ha generado con ayuda de IA, incluyendo la estructura del proyecto, los componentes de React, las peticiones a PokéAPI, los estilos CSS, la gestión de estados y los hooks personalizados.

También he utilizado ChatGPT para entender los errores de la evaluación anterior y mejorar el proyecto añadiendo funcionalidades como los favoritos, la cancelación de peticiones y un sistema de reintentos.

### Ejemplos de prompts utilizados

1. «Ayúdame a crear una Pokédex con React y Vite, separada en componentes reutilizables, que consuma PokéAPI y permita buscar Pokémon y filtrar por tipo».

2. «Revisa los puntos débiles de mi evaluación de React y ayúdame a extraer la carga a un hook personalizado, gestionar los reintentos, cancelar peticiones y añadir favoritos con localStorage».

He integrado las propuestas en el proyecto y revisado cómo se relacionan los componentes, los hooks y el servicio de API.

Para comprobar el resultado, ejecuto la aplicación con `npm run dev` y reviso la carga de Pokémon, la búsqueda, los filtros, los favoritos y la persistencia de estos al recargar la página. También es necesario comprobar el funcionamiento del botón de reintento y los posibles errores de conexión.

## Autopsia

### 1. Promise.allSettled() en lugar de Promise.all()

Para obtener los detalles de los Pokémon, las peticiones se realizan en grupos de 20 y se gestionan mediante `Promise.allSettled()`.

Una alternativa habría sido utilizar `Promise.all()`, pero la descarté porque si una de las peticiones falla, rechaza el conjunto completo de promesas.

Con `Promise.allSettled()` puedo conservar los Pokémon cuyas peticiones han funcionado aunque otras hayan fallado. Además, puedo contar los errores individuales y mostrar un aviso al usuario.

He elegido esta solución para evitar que un fallo puntual impida mostrar el resto de los resultados.

### 2. Hooks personalizados y separación de responsabilidades

He separado la lógica de carga de Pokémon en un hook personalizado llamado `usePokemon` y la gestión de favoritos en otro llamado `useFavorites`.

Una alternativa habría sido mantener toda la lógica dentro de `App.jsx`, pero eso habría hecho que el componente principal tuviera demasiadas responsabilidades.

He elegido esta organización porque permite separar la lógica de los datos de la interfaz y facilita el mantenimiento del proyecto.

Además, `usePokemon` utiliza `AbortController` para cancelar las peticiones cuando el efecto se limpia, evitando mantener solicitudes que ya no son necesarias.