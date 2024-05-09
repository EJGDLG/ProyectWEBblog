# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# ProyectWEBblog
# Proyecto Blog

## Descripción del proyecto
El proyecto Blog Accesible es una plataforma de blogging diseñada para ser accesible públicamente a través de una URL. Esto significa que cualquier persona con la dirección del sitio puede visitar y ver el contenido del blog sin necesidad de autenticación, excepto para el área de administración.
## Tecnologías utilizadas
El proyecto blog utiliza las siguientes tecnologías:

- **React.js**: Se eligió React.js por su eficiencia en el manejo del DOM y su facilidad para construir interfaces de usuario interactivas.
- **Node.js**: Se utiliza Node.js para el backend de la aplicación, aprovechando su capacidad para manejar múltiples conexiones de forma asíncrona.
- **Express.js**: Se utiliza Express.js como el framework web para Node.js, proporcionando un enfoque minimalista y flexible para el desarrollo de APIs.
- **MySQL**: Se eligió MySQL como la base de datos relacional para almacenar datos estructurados como usuarios, proyectos y tareas.
- **bcrypt.js**: Se utiliza bcrypt.js para el hash de contraseñas antes de almacenarlas en la base de datos, proporcionando seguridad adicional.
- **Vite**: Se utiliza Vite como el bundler para el frontend, ofreciendo una configuración rápida y un tiempo de compilación optimizado.

## Instrucciones para ejecutar el proyecto localmente
Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del frontend y backend ejecutando `npm install` en la raíz del proyecto.
3. Configura tu base de datos MySQL y asegúrate de tener las credenciales correctas en el archivo de conexión.
4. Ejecuta el servidor backend usando `npm start` en el directorio del backend.
5. Ejecuta el servidor frontend usando `npm run dev` en el directorio del frontend.
6. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.