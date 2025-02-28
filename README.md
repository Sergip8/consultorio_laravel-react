# Gestión de Consultorio Médico

Este proyecto es una aplicación web para la gestión de un consultorio médico, desarrollada con **Laravel** (backend), **React** (frontend) y **MySQL** (base de datos). La aplicación permite administrar usuarios, médicos, pacientes, consultorios y citas médicas de manera eficiente.

## Características

- **Autenticación de usuarios** con opciones de inicio de sesión tradicional y autenticación social (Google y Facebook).
- **Gestión de usuarios**: creación, edición y eliminación de pacientes, médicos y administradores.
- **Administración de citas**: agendamiento, modificación y cancelación de citas médicas.
- **Panel de pacientes**: permite la consulta de citas y la actualización de datos personales.
- **Panel de médicos**: permite la asignación de tratamientos a pacientes.
- **Gestión de consultorios**: creación y edición de consultorios médicos disponibles.
- **Agenda médica**: visualización del horario disponible de los médicos.

## Tecnologías utilizadas

- **Backend:** Laravel
- **Frontend:** React.js
- **Base de datos:** MySQL
- **Autenticación:** Laravel Sanctum y autenticación social (Google y Facebook)
- **Despliegue:** Docker (opcional)

## Instalación y configuración

### Prerrequisitos

- PHP >= 8.0
- Composer
- Node.js y npm
- MySQL
- Laravel y React.js instalados en el entorno de desarrollo

### Pasos de instalación

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Configurar el backend (Laravel)**
   ```sh
   cd consultorio_laravel-react
   cp .env.example .env
   composer install
   php artisan key:generate
   ```
   - Configura las credenciales de la base de datos en el archivo `.env`.

3. **Migrar la base de datos**
   ```sh
   php artisan migrate --seed
   ```

4. **Ejecutar el servidor de Laravel**
   ```sh
   php artisan serve
   ```

5. **Configurar el frontend (React)**
   ```sh
   cd react-basic
   npm install
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000` (frontend) y `http://localhost:8000` (API backend).

## 📖 Documentación

Para más detalles sobre la funcionalidad de la aplicación, consulta el **manual de usuario** incluido en el repositorio.


## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).