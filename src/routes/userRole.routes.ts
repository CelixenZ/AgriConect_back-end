import { Router } from "express";
import { assignRole } from "../controllers/userRole.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: UserRole
 *     description: Assign roles to users
 */

/**
 * @swagger
 * /api/user-role:
 *   post:
 *     summary: Assign role to a user
 *     tags: [UserRole]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "673f1c85a2f3a322f8a1b243"
 *               role_id:
 *                 type: string
 *                 example: "673f1dac0ab42311c1110123"
 *     responses:
 *       201:
 *         description: Role assigned successfully
 */
router.post("/user-role", assignRole);

export default router;
