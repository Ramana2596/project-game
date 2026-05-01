// ==========================================
// File: authRoutes.js
// Purpose: OAuth routes for Google, GitHub, Microsoft with redirects to Vercel frontend
// ==========================================

const express = require("express");
const passport = require("./authFramework"); // ✔ import configured strategies
const router = express.Router();

// --- Google OAuth ---
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }) // ✔ initiate Google OAuth
);

router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }), // ✔ handle failure
  (req, res) => {
    // redirect to Vercel frontend after success
    res.redirect("https://appomgplatform.vercel.app/authHubPage?status=success&userId=" + req.user.id);
  }
);

// --- GitHub OAuth ---
router.get("/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }) // ✔ initiate GitHub OAuth
);

router.get("/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }), // ✔ handle failure
  (req, res) => {
    // redirect to Vercel frontend after success
    res.redirect("https://appomgplatform.vercel.app/authHubPage?status=success&userId=" + req.user.id);
  }
);

// --- Microsoft OAuth ---
router.get("/auth/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] }) // ✔ initiate Microsoft OAuth
);

router.get("/auth/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/auth/failure" }), // ✔ handle failure
  (req, res) => {
    // redirect to Vercel frontend after success
    res.redirect("https://appomgplatform.vercel.app/authHubPage?status=success&userId=" + req.user.id);
  }
);

// --- Common routes ---
router.get("/auth/success", (req, res) => {
  ✘ res.send("Login successful!"); // old plain text response removed
  // ✔ now handled by redirect to frontend
});

router.get("/auth/failure", (req, res) => {
  // ✔ redirect to frontend with failure status
  res.redirect("https://appomgplatform.vercel.app/authHubPage?status=failure");
});

module.exports = router;
