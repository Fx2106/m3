# M3 — Pokédex React

## Funcionamiento básico

La aplicación es una Pokédex desarrollada con React que utiliza la API pública PokéAPI para mostrar los primeros 151 Pokémon.

Para utilizarla:

1. Instalar las dependencias con `npm install`.
2. Ejecutar el proyecto con `npm run dev`.
3. Abrir en el navegador la dirección que proporciona Vite.

La aplicación permite:
- Consultar los primeros 151 Pokémon.
- Buscar Pokémon por nombre o número.
- Filtrar Pokémon por tipo.
- Consultar información como su imagen, altura, peso y ataque.

## Uso de IA

He utilizado ChatGPT como herramienta principal de apoyo durante el desarrollo de esta misión.

La mayor parte del proyecto se ha realizado con ayuda de la IA, incluyendo la estructura de carpetas, la creación de componentes React, las peticiones a PokéAPI, la gestión de estados y los estilos CSS.

También he utilizado ChatGPT para resolver dudas y entender cómo funcionan conceptos como `useState`, `useEffect`, las props y las peticiones asíncronas.

Mi trabajo ha consistido en integrar el código generado, organizar los archivos y adaptar el proyecto a la estructura de la misión.

## Autopsia

### 1. Promise.allSettled() en lugar de Promise.all()

Para cargar los detalles de los Pokémon se utiliza `Promise.allSettled()` en grupos de 20 peticiones.

Una alternativa habría sido utilizar `Promise.all()`, pero esta última falla como conjunto cuando una de las peticiones es rechazada.

He elegido `Promise.allSettled()` porque permite conservar las peticiones que han terminado correctamente aunque alguna haya fallado. Así, un error individual no impide mostrar el resto de los Pokémon.

### 2. Componentes reutilizables en lugar de un único componente

La aplicación está dividida en componentes como `SearchBar`, `TypeFilter`, `PokemonCard` y `PokemonList`.

Una alternativa habría sido escribir toda la interfaz dentro de `App.jsx`. Sin embargo, dividirla permite separar responsabilidades, reutilizar partes del código y facilitar su mantenimiento.

Además, se utiliza `useState` para gestionar los datos y actualizar automáticamente la interfaz cuando cambia la información.