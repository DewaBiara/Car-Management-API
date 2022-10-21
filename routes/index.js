import express from "express";
import { getUsers, Register, updateUsers, Login, Logout, whoAmI, RegisterAdmin } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getCars,getCarById, createCars, updateCars, deleteCars } from "../controllers/Cars.js"
import fs from 'fs';
import yaml from 'js-yaml';
const swaggerDocument = yaml.load(fs.readFileSync("OpenAPI.yaml", "utf8"));
import swaggerUI from "swagger-ui-express";

const router = express.Router();
const prefix = "/v1/api/";

router.use(prefix + "api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.post(prefix + 'register', Register);
router.put(prefix + 'user/:id', verifyToken, updateUsers)
router.post(prefix + 'login', Login);
router.delete(prefix +'logout', verifyToken, Logout);

router.get(prefix + 'token', refreshToken);
router.get(prefix + 'whoami', verifyToken, whoAmI);

// endpoint untuk tambah admin yang bisa hanya superadmin
router.post(prefix + 'registrasi-admin', verifyToken, RegisterAdmin);

router.get(prefix + 'users', verifyToken, getUsers);

router.get(prefix + 'cars', verifyToken, getCars);
router.get(prefix + 'car/:id', verifyToken, getCarById);
router.post(prefix +'car', verifyToken, createCars);
router.put(prefix + 'car/:id', verifyToken, updateCars);
router.delete(prefix +'car/:id', verifyToken, deleteCars);

export default router;