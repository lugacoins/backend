const express = require('express');
const authRoutes = require('./routes/authRoutes');
const capitalRoutes = require('./routes/capitalRoutes');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', authRoutes);
app.use('/api', capitalRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

module.exports = app;
