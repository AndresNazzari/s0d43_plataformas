# PLATAFORMAS DE DESARROLLO DE APLICACIONES
# Proyecto: Aplicación para e-commerce

## Datos del proyecto

Documento online con descripcion del proyecto: https://docs.google.com/document/d/1Jm4nxAaJk9iV_G3E1USBrd-wcwGp6C35jp1Ygq4cDgg/edit?usp=sharing
Link Repositorio: https://github.com/AndresNazzari/s0d43_plataformas
Curso: S0D43 - ACN4AV
4° Cuatrimestre, 2024
Profesor: Fernando Gonzalo Gaitan
Alumnos: Barraza, David – Nazzari, Andrés


# Descripción del Proyecto: E-commerce con React y NextUI
Este proyecto es una aplicación de comercio electrónico (e-commerce) desarrollada con React y la librería de UI NextUI. Está diseñada para proporcionar una experiencia moderna y fluida a los usuarios, con funcionalidades avanzadas tanto para clientes como para administradores.

## Principales Características:
### Visualización de Productos:

- Todos los productos están disponibles para exploración en la página principal.
- Los usuarios pueden aplicar filtros por categorías para encontrar productos específicos de manera rápida.
Detalle del Producto:
- Cada producto cuenta con una página de detalle que incluye información como descripción, precio y opciones de compra.
Gestión de Usuarios:

### Registro y Login:
- El acceso está restringido mediante un sistema de autenticación con formulario de login y registro.
- Los datos del usuario se almacenan en el Local Storage para manejar la persistencia de sesión.

#### Roles de Usuario:
- Solo los usuarios con roles de User o Admin pueden realizar compras.

## Carrito de Compras:
- El carrito solo es accesible para usuarios registrados y logueados.

#### Funcionalidades del carrito:
- Agregar productos.
- Eliminar productos individuales.
- Vaciar el carrito por completo.
- Finalización de compra mediante un formulario de Checkout.

## Panel de Administración (disponible solo para Administradores):

### Gestión de Usuarios:
- Agregar, modificar y eliminar usuarios registrados en el sistema.
### Gestión de Productos:
- Administrar el catálogo de productos con las mismas funcionalidades: agregar, modificar o eliminar.

### Estado Global y Contexto:

- Se utiliza Context API para manejar el estado global de la aplicación, como el carrito, la sesión de usuario y las preferencias.
- Esto asegura una experiencia de usuario consistente sin necesidad de prop drilling.

### Interfaz de Usuario:

- NextUI ofrece un diseño atractivo, minimalista y completamente responsive.
- El uso de componentes predefinidos y personalizables garantiza una apariencia profesional y una experiencia amigable.

### Flujo de la Aplicación:
- Un usuario llega a la aplicación, navega por los productos y puede filtrar por categorías.
- Si no está logueado, se le redirige al formulario de login/registro cuando intenta interactuar con el carrito.
- Un usuario registrado puede agregar productos al carrito y completar el proceso de compra en el formulario de checkout.
- Los administradores tienen acceso adicional a un panel de control donde pueden gestionar usuarios y productos.

## Tecnologías Utilizadas:
- React: Framework principal para el desarrollo del frontend.
- NextUI: Librería de componentes UI para un diseño moderno y responsive.
- Context API: Gestión del estado global.
- Local Storage: Persistencia de datos como sesión de usuario y estado del carrito.
- Protected Routes: Si no esta logueado redirige al home.
- 
Este proyecto combina las mejores prácticas de desarrollo con una interfaz moderna y capacidades avanzadas para ofrecer una experiencia robusta tanto para usuarios finales como para administradores.