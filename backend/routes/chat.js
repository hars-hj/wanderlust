const express = require("express");
const chatRouter = express.Router();
const passport = require("passport");
const { wrapAsync } = require("../utils/wrapAsync");
const {chatController} = require("../controllers/chat");

chatRouter.post('/chat',wrapAsync(chatController));
module.exports = chatRouter;
