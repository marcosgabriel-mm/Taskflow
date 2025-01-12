import app from './src/app.js';
import Database from './src/config/db.js';

Database.init();
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});