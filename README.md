# Esmae API - Backend

Bienvenido al repositorio del backend de la tienda de espejos **Esmae**, desarrollado con el stack MERN (MongoDB, Express, React, Node.js).

Este backend permite la gestión de productos, usuarios, roles, autenticación y subida de imágenes.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticación
- Multer para subir imágenes
- Helmet, CORS, Compression para seguridad y rendimiento
- dotenv para variables de entorno

---

## Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/tuusuario/esmae-backend.git
cd esmae-backend
```

2. Instalá dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con el siguiente contenido:

```env
PORT=5000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/esmae
JWT_SECRET=tu_clave_secreta
```

4. Ejecutá el servidor en modo desarrollo:

```bash
npm run dev
```

---

## Endpoints principales

### Autenticación

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión



### Productos

- `GET /api/products` - Listado de productos con:

  - paginación: `?page=1&limit=10`
  - búsqueda: `?search=moderno`
  - filtro por categoría: `?category=decorativos`
  - filtro por precio: `?minPrice=15000&maxPrice=30000`

- `GET /api/products/:id` - Obtener un producto por ID

- `POST /api/products` - Crear producto (solo admin, requiere token)

- `PUT /api/products/:id` - Actualizar producto (solo admin, requiere token)

- `DELETE /api/products/:id` - Eliminar producto (solo admin, requiere token)

Las rutas protegidas requieren token JWT enviado en el header:

```
Authorization: Bearer tu_token
```

---

## Subida de imágenes

Se realiza mediante `multipart/form-data` usando el campo `image`. El archivo se almacena en la carpeta `/uploads` local y se expone vía `http://localhost:5000/uploads/archivo.jpg`

---

## Estructura del proyecto

```
/esmae-backend
├── config/
│   └── db.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── .env
├── server.js
```

---

## Seguridad y rendimiento

- `helmet` protege cabeceras HTTP
- `cors` configurado para permitir el frontend
- `compression` reduce el tamaño de las respuestas
- `errorHandler` middleware para manejar errores globales

---

## Documentación Swagger

- Swagger UI disponible en: `http://localhost:5000/api/docs`
- Agregá anotaciones en tus rutas para documentarlas.

Ejemplo de anotación Swagger para un endpoint:

```js
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para buscar por nombre o descripción
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de productos
 */
```

---

## Por hacer&#x20;

- Documentación Swagger extendida
- Tests automáticos
- Deploy a Railway / Render

---

## Autor

Desarrollado por [Nicolás Paz](https://github.com/nicopazz)

---

## Licencia

Este proyecto está licenciado bajo MIT.
