import express from "express";
import catFactsController from "./controllers/catFacts";

const router = express.Router();

router.get("/cat-facts", catFactsController);

router.use("*", (req, res) => res.status(404).json({ message: "not found" }));

export default router;
