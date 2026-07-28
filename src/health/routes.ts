import {Router} from "express";

const router=Router();


router.get("/",(req,res)=>{

res.json({

status:"ok",
service:"SHAHEEN-YS Backend",
timestamp:new Date()

});

});


export default router;
