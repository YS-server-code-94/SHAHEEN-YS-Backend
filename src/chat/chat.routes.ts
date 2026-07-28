import { Router } from "express";

import {
 sendChat,
 chatHistory

} from "./chat.controller.js";


import {
 authMiddleware

} from "../auth/auth.middleware.js";



const router = Router();



router.post(

 "/",

 authMiddleware,

 sendChat

);



router.get(

 "/history",

 authMiddleware,

 chatHistory

);



export default router;
