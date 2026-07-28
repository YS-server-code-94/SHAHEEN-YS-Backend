import {
Router
}
from "express";


import {
authMiddleware
}
from "../auth/auth.middleware.js";


import {
chatRateLimiter
}
from "../middleware/rateLimit.js";


import {
chatController
}
from "./chat.controller.js";



const router =
Router();



router.use(authMiddleware);


router.use(chatRateLimiter);



router.post(
"/",
chatController
);



export default router;
