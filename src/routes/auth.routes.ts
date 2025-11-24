// router swagger

import { Router } from "express";
import { register } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Authorization
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: MyStrongPassword123
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               address:
 *                 type: string
 *                 example: Phnom Penh, Cambodia
 *              
 *     responses:
 *       201:
 *         description: User registered successfully

 */

router.post("/auth/register", register);

export default router;
