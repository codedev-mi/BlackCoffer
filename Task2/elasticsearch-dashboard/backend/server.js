const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dashboardRoutes = require('./routes/dashboard');
const { checkConnection, seedDocuments } = require('./elasticsearch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Sales Analytics Dashboard Backend API using Elasticsearch',
    endpoints: [
      '/api/dashboard/summary',
      '/api/dashboard/sales-over-time',
      '/api/dashboard/categories',
      '/api/dashboard/regions',
      '/api/dashboard/statuses',
      '/api/dashboard/orders',
      '/api/dashboard/health'
    ]
  });
});

async function startServer() {
  await checkConnection();
  await seedDocuments(); // Seed on server startup

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Sales Analytics Backend running on http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

startServer();
