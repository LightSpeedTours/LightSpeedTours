import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
