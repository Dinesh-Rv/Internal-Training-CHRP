import express from 'express';
import categoryRoutes from './routes/categoryRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import logger from './utils/logger';

const app = express();
app.use(express.json());

// Winston logger middleware
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Product Management System API');
});

export default app;

