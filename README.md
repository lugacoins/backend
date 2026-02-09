# LUGACOINS Backend

Backend listo para producción basado en **Express + Prisma + PostgreSQL** con autenticación JWT, manejo de pagos y seguridad básica.

## ✅ Requisitos
- Node.js 18+
- PostgreSQL 14+

## 🚀 Cómo correr el backend

```bash
npm install
cp .env.example .env
npm run prisma:generate
# Crear la base con tu proveedor o Docker
npm run prisma:migrate
npm run dev
```

> Para producción usar `npm start`.

## 🔐 Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor |
| `DATABASE_URL` | URL de conexión a PostgreSQL |
| `JWT_SECRET` | Secreto para firmar JWT |
| `CORS_ORIGIN` | Orígenes permitidos (separados por coma) |
| `PAYPAL_MODE` | `sandbox` o `live` |
| `PAYPAL_CLIENT_ID` | Credencial PayPal |
| `PAYPAL_CLIENT_SECRET` | Credencial PayPal |
| `STRIPE_SECRET_KEY` | Secret key de Stripe |

## 📌 Endpoints disponibles

### Salud
- `GET /health`

### Autenticación
- `POST /api/auth/register`
- `POST /api/auth/login`

### Usuario
- `GET /api/users/me` (JWT)

### Pagos
- `POST /api/payments/paypal/orders` (JWT)
- `POST /api/payments/paypal/orders/:orderId/capture` (JWT)
- `POST /api/payments/stripe/payment-intents` (JWT)

## 🧱 Estructura del proyecto
```
src/
  config/
  controllers/
  middlewares/
  routes/
  services/
  utils/
```

## 📦 Notas de producción
- JWT real con expiración y verificación.
- Persistencia real en PostgreSQL con Prisma.
- Rate-limit, Helmet y validaciones con Zod.

## Próximos pasos para despliegue (cPanel / VPS)
1. Crear la base de datos PostgreSQL y usuario en el panel/VPS.
2. Configurar variables de entorno reales en `.env`.
3. Ejecutar `npm run prisma:migrate` en el servidor.
4. Usar un process manager como PM2 para mantener el proceso.
5. Configurar Nginx/Apache como reverse proxy y habilitar HTTPS.
6. Cambiar `PAYPAL_MODE=live` y usar claves reales.
7. Asegurar backups y monitoreo.
