import express from "express";
import path from "path";
const router = express.Router();

const __dirname = path.resolve();

///  ONLY FOR AWS CLOUD   ///
if (process.env.NODE_ENV === "production" && process.env.CLOUD === "AWS") {
  router.use(express.static(path.join(__dirname, "/frontend/build")));

  router.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  router.get("/", (req, res) => {
    res.send("API is running...");
  });
}

export default router;
