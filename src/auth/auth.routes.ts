import {
Router
}
from "express";


import {

registerController,
loginController,
refreshController,
logoutController,
logoutAllController

}
from "./auth.controller.js";



const router=Router();



router.post(
"/register",
registerController
);



router.post(
"/login",
loginController
);



router.post(
"/refresh",
refreshController
);



router.post(
"/logout",
logoutController
);



router.post(
"/logout-all",
logoutAllController
);



export default router;
