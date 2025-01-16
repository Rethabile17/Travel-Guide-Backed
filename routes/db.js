const express = require("express");
const router = express.Router();
const { addUserFavorite , getUserFavorite} = require("../controllers/db");

router.post("/addFavorite", addUserFavorite);
router.get("/getUserFavorite/:userId", getUserFavorite);

module.exports = router;
