# LightSpeedTours

## FRONT | REACT | ARC: SCREAM
### Estructura del proyecto

### /src
####   /features
- **Módulo: orders**
  - `/components`
    - `OrderCard.tsx`: Componente para mostrar los detalles de un pedido.
    - `OrderList.tsx`: Componente para listar múltiples pedidos.
  - `/hooks`
    - `useOrder.ts`: Hook personalizado para la lógica relacionada con pedidos.
  - `/services`
    - `ordersService.ts`: Servicio para interactuar con APIs relacionadas con pedidos.
  - `/store`
    - `ordersSlice.ts`: Estado global de pedidos gestionado con Redux o similar.
  - `/utils`
    - `orderHelpers.ts`: Funciones utilitarias específicas del módulo de pedidos.
- **Módulo: users**
  - Similar al módulo `orders`, pero relacionado con la funcionalidad de usuarios.

---

### /shared
- `/components`
  - `Button.tsx`: Componente reutilizable de botón.
  - `Modal.tsx`: Componente reutilizable de modal.
- `/styles`
  - `global.css`: Estilos globales de la aplicación.
- `/utils`
  - `dateFormatter.ts`: Función para formatear fechas.
- `/assets`
  - `logo.png`: Logotipo de la aplicación.

---

### /pages
- `/orders`
  - `OrdersPage.tsx`: Página principal para gestionar pedidos.
- `/users`
  - `UsersPage.tsx`: Página principal para gestionar usuarios.
- Otros módulos seguirían una estructura similar.

---

### /app
- `routes.tsx`: Configuración de las rutas principales de la aplicación.
- `store.ts`: Configuración del estado global (por ejemplo, con Redux).
- `providers.tsx`: Configuración de providers globales (tema, idioma, etc.).
- `main.tsx`: Punto de entrada principal de la aplicación.

## BACK | TYPESCRIPT | ARC: MVC
### Estructura del Proyecto

### /src
#### /controllers
- **Descripción**: Manejan las solicitudes HTTP, delegan la lógica a los servicios y devuelven las respuestas al cliente.
  - `userController.ts`: Controlador para operaciones relacionadas con usuarios.
  - `orderController.ts`: Controlador para operaciones relacionadas con órdenes.

---

### /services
- **Descripción**: Contienen la lógica de negocio y actúan como intermediarios entre los controladores y los modelos.
  - `userService.ts`: Lógica relacionada con los usuarios.
  - `orderService.ts`: Lógica relacionada con las órdenes.

---

### /models
- **Descripción**: Definen la estructura de los datos y se encargan de interactuar con la base de datos.
  - `userModel.ts`: Modelo que representa a los usuarios en la base de datos.
  - `orderModel.ts`: Modelo que representa a las órdenes en la base de datos.

---

### /routes
- **Descripción**: Definen los endpoints de la API y conectan cada ruta con su controlador correspondiente.
  - `userRoutes.ts`: Rutas relacionadas con los usuarios.
  - `orderRoutes.ts`: Rutas relacionadas con las órdenes.

---

### /middlewares
- **Descripción**: Contienen funciones intermedias que se ejecutan antes o después de los controladores.
  - `authMiddleware.ts`: Middleware para autenticación de usuarios.
  - `validationMiddleware.ts`: Middleware para validación de datos de entrada.

---

### /views
- **Descripción**: Formatean los datos para las respuestas que se enviarán al cliente.
  - `userView.ts`: Formatea los datos de los usuarios.
  - `orderView.ts`: Formatea los datos de las órdenes.

---

### /config
- **Descripción**: Archivos de configuración para la aplicación, como la conexión a la base de datos o variables de entorno.
  - `db.ts`: Configuración y conexión a la base de datos.
  - `env.ts`: Manejo de variables de entorno.

---

### /utils
- **Descripción**: Funciones reutilizables y herramientas generales.
  - `logger.ts`: Herramienta para registrar logs en la aplicación.
  - `formatter.ts`: Funciones para formatear datos.

---

### /interfaces
- **Descripción**: Definen los tipos e interfaces utilizados en la aplicación.
  - `User.ts`: Interfaz que define la estructura de un usuario.
  - `Order.ts`: Interfaz que define la estructura de una orden.

### /types
- **Descripción**: Define tipos globales para TypeScript.
  - `global.d.ts`: Declaraciones globales para el proyecto.

---

### Archivos principales
- **`app.ts`**: Configuración principal de la aplicación (middlewares, rutas, etc.).
- **`server.ts`**: Punto de entrada del servidor. Se encarga de iniciar la aplicación.

---





### Lista de responsabilidades
- Valen: Hospedajes, tours
- Camilo: Registro, Inicio de sesion, landing page
- Sebas: Reserva de tours, reserva hospedajes
- Tomás: Gestion de reservas, perfil de usuario 
- Kev: Reseñas, Carrito


Objetivo del Sprint 29 de Enero:
Tener listo
- Valen: Hospedajes
- Camilo: Landing page
- Sebas: Reserva de tours
- Tomás: Gestion de reservas
- Kev: Reseñas

NOS REUNIMOS EL 29 DE ENERO PARA VER LOS AVANCES

