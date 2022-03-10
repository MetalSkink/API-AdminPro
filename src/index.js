import express from "express";
import cors from "cors";
import { dbConnection } from './db/config'
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import { createRoles } from "./helpers/initialSetup";
require('dotenv').config();

//Crear el servidor de express
const app = express();
createRoles();

//conexion a la database
dbConnection();

//CORS
app.use(cors());

// Directorio publico
// app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json());


//Rutas
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

// ----------------------- //

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});