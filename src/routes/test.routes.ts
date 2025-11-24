import { Router } from "express";
const router = Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test API
 *     description: Returns a test message.
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/test", (req, res) => {
  res.json({ message: "Test API working" });
});

export default router;
