import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import app from './app';

const PORT = process.env.PORT || 8000;
// import { db } from './apps/config/db.config';
// // Connect to the database
// db();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});