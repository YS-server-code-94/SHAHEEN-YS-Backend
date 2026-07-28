import { prisma } from "../../database/prisma.js";


export async function createAuditLog(data:{

userId?:string;

action:string;

ipAddress?:string;

userAgent?:string;

metadata?:any;

}){


return prisma.auditLog.create({

data:{

userId:data.userId,

action:data.action,

ipAddress:data.ipAddress,

userAgent:data.userAgent,

metadata:data.metadata

}

});


}
