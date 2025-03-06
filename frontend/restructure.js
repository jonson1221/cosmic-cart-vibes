
/*
 * This is a utility script to help reorganize the project.
 * 
 * To use:
 * 1. Copy all source files to frontend/ except backend/ related files
 * 2. Make sure backend/ contains all backend files
 * 3. Update imports and paths accordingly
 * 
 * Instructions:
 * - Move all frontend files to the frontend/ directory
 * - Make sure backend files are in the backend/ directory
 * - Update frontend/.env and backend/.env with proper configuration
 */

console.log(`
Project Structure Guide:

frontend/
  ├── public/
  ├── src/
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts
  └── .env  <-- Configure API URL here

backend/
  ├── config/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── server.js
  ├── package.json
  └── .env  <-- Configure MongoDB and JWT secret here

Don't forget to:
1. Update MongoDB connection string in backend/.env
2. Set a secure JWT_SECRET in backend/.env
3. Point VITE_API_URL in frontend/.env to your backend API
`);
