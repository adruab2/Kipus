# Kipus - Gestión de Talleres y Eventos Culturales

Avance 02 - Curso de Desarrollo de Aplicaciones Móviles  
Framework: React Native con Expo (SDK 57)

---

## 1. Descripción del Proyecto

Kipus es una aplicación móvil desarrollada con React Native y Expo para la gestión y difusión de talleres y eventos culturales. 

La aplicación cuenta con dos tipos de acceso:
- **Administrador:** Puede registrar, editar y eliminar talleres del catálogo, además de gestionar las cuentas de usuario registradas en el sistema.
- **Usuario:** Puede explorar el catálogo de talleres disponibles, consultar la información y registrarse o cancelar su inscripción en los talleres de su interés.

---

## 2. Estructura del Proyecto

El proyecto está organizado en una arquitectura modular:

```text
Kipus-main/
├── src/
│   ├── components/                  # Componentes reutilizables
│   │   ├── BotonAccion.js           # Componente de botón con variantes de estilo
│   │   └── TarjetaEvento.js         # Tarjeta de presentación de cada taller
│   ├── context/
│   │   └── EventoContext.js         # Estado global y persistencia con AsyncStorage
│   ├── hooks/
│   │   └── useLibroRecomendado.js   # Custom Hook para consultar la API de Open Library
│   └── screens/                     # Pantallas de la aplicación
│       ├── PantallaLogin.js         # Inicio de sesión
│       ├── PantallaRegistro.js      # Registro de nuevos usuarios
│       ├── PantallaInicio.js        # Catálogo general de talleres
│       ├── PantallaInscripciones.js # Talleres inscritos por el usuario
│       ├── PantallaPerfil.js        # Perfil y resumen de actividad
│       ├── PantallaDetalleEvento.js # Vista detallada del taller y lecturas recomendadas
│       ├── PantallaCrearEvento.js   # Formulario para registrar un nuevo taller
│       ├── PantallaEditarEvento.js  # Formulario para editar información del taller
│       └── PantallaGestionUsuarios.js # Gestión de usuarios para administradores
├── App.js                           # Configuración de navegación (Tabs + Stack)
├── app.json                         # Configuración de Expo
├── package.json                     # Dependencias del proyecto
└── README.md                        # Documentación
```

---

## 3. Tecnologías y Librerías

- **React Native** (0.86.3) y **Expo SDK** (~57.0.21)
- **React Navigation v7:**
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **Persistencia local:** `@react-native-async-storage/async-storage`
- **Consumo de API:** Fetch API hacia Open Library (`https://openlibrary.org`)

---

## 4. Instalación y Ejecución

### Prerrequisitos
- Node.js (v18 o superior)
- npm
- Expo Go en dispositivo móvil o navegador web

### Pasos para iniciar

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npx expo start
   ```

3. Abrir la aplicación:
   - **En el móvil:** Escanear el código QR con la app Expo Go (Android) o la cámara (iOS).
   - **En la web:** Presionar la tecla `w` en la consola.
   - **En emulador:** Presionar la tecla `a` para Android o `i` para iOS.

---

## 5. Cuentas de Acceso

El sistema incluye cuentas iniciales para probar los diferentes roles:

| Rol | Correo | Contraseña | Funcionalidad |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@kipus.com` | `123` | Gestión de talleres (crear, editar, eliminar) y administración de usuarios. |
| **Usuario** | `usuario@kipus.com` | `123` | Exploración de talleres e inscripción a eventos. |

También es posible crear nuevas cuentas desde la pantalla de registro.

---

## 6. Consumo de API Externa

En los formularios de creación y edición de talleres se integra la API pública de **Open Library**:
- **Endpoint:** `https://openlibrary.org/search.json?q={categoria}&limit=10`
- **Funcionamiento:** Mediante el hook `useLibroRecomendado`, se realiza una búsqueda de libros según la categoría del evento para sugerir automáticamente lecturas relacionadas.
- **Manejo de estados:** Se gestiona el estado de carga (`cargandoApi`) y posibles fallos de red (`errorApi`), mostrando mensajes informativos al usuario.
