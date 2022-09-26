"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /test:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 */
router.get('/', (req, res) => {
    // const books = req.app.db.get("books");
    // res.send(books);
    res.json({
        he: 'hog',
    });
});
exports.default = router;
