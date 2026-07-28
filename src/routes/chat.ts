import {
Router
} from "express";


import {
chat
} from "../controllers/chat.js";


import {
authMiddleware
} from "../auth/auth.middleware.js";



const router = Router();



router.post(
"/chat",
authMiddleware,
chat
);



export default router;
