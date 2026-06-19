const express = require("express");
const {
  saveMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", saveMessage);
router.get("/", getMessages);
router.delete("/:id", deleteMessage);

module.exports = router;
