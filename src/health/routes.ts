import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "SHAHEEN-YS Backend",
    timestamp: new Date().toISOString()
  });
});

router.get("/ready", (_req, res) => {
  res.status(200).json({
    ready: true
  });
});

router.get("/live", (_req, res) => {
  res.status(200).json({
    alive: true
  });
});

export default router;
