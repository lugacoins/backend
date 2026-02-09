# LUGACOINS Backend

Backend API REST para LUGACOINS con arquitectura modular, lista para escalar e integrar proveedores de pago y bots de trading en el futuro.

## 🧭 Estructura

```
src/
  app.js
  server.js
  config/
  controllers/
  middleware/
  routes/
  services/
  integrations/
    paypal/
    stripe/
    bots/
```

## ✅ Requisitos

- Node.js 18+

## ⚙️ Configuración

1. Copia el archivo de entorno:

```bash
cp .env.example .env
```

2. Ajusta las variables:

- `PORT`: puerto del servidor.
- `JWT_SECRET`: clave para firmar tokens.
- `ADMIN_USER` / `ADMIN_PASSWORD`: credenciales de acceso.
- `INITIAL_CAPITAL`: capital inicial en modo test.

## 🚀 Ejecutar

```bash
npm install
npm run dev
```

## 🔐 Autenticación

Login simple con usuario/clave y JWT.

**POST** `/api/login`

```json
{
  "username": "admin",
  "password": "change-me"
}
```

Respuesta:

```json
{
  "token": "<jwt>",
  "tokenType": "Bearer"
}
```

## 💰 Endpoints (modo test)

> Todos requieren `Authorization: Bearer <token>`.

- **GET** `/api/capital`
- **POST** `/api/funds/deposit`
- **POST** `/api/funds/withdraw`

Ejemplo de depósito:

```json
{
  "amount": 250
}
```

## 🔌 Integraciones futuras (estructura)

- PayPal: `src/integrations/paypal`
- Stripe: `src/integrations/stripe`
- Bots de trading: `src/integrations/bots`

## 🧪 Health Check

- **GET** `/health`

## 🧱 Nota sobre persistencia

El capital se mantiene en memoria para modo test. En producción debe moverse a base de datos.
