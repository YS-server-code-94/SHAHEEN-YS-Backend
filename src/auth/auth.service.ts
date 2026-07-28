import bcrypt from "bcryptjs";

import { prisma } from "../database/prisma.js";

import {
  createAccessToken,
  createRefreshToken
} from "./jwt.js";


const REFRESH_EXPIRE_DAYS = 30;


function refreshExpirationDate(){

  const date = new Date();

  date.setDate(
    date.getDate() + REFRESH_EXPIRE_DAYS
  );

  return date;
}



export async function register(
  email:string,
  password:string,
  gender?: "MALE" | "FEMALE"
){

  const existingUser =
    await prisma.user.findUnique({
      where:{
        email
      }
    });


  if(existingUser){

    throw new Error(
      "User already exists"
    );

  }


  const hashedPassword =
    await bcrypt.hash(
      password,
      12
    );


  const user =
    await prisma.user.create({

      data:{
        email,
        password:hashedPassword,
        gender
      }

    });



  const accessToken =
    createAccessToken({

      id:user.id,
      email:user.email

    });



  const refreshToken =
    createRefreshToken({

      id:user.id

    });



  await prisma.refreshToken.create({

    data:{

      token:refreshToken,

      userId:user.id,

      expiresAt:
        refreshExpirationDate()

    }

  });



  return {

    accessToken,

    refreshToken

  };

}




export async function login(
  email:string,
  password:string
){

  const user =
    await prisma.user.findUnique({

      where:{
        email
      }

    });



  if(!user){

    throw new Error(
      "Invalid credentials"
    );

  }



  const validPassword =
    await bcrypt.compare(
      password,
      user.password
    );



  if(!validPassword){

    throw new Error(
      "Invalid credentials"
    );

  }



  const accessToken =
    createAccessToken({

      id:user.id,

      email:user.email

    });



  const refreshToken =
    createRefreshToken({

      id:user.id

    });



  await prisma.refreshToken.create({

    data:{

      token:refreshToken,

      userId:user.id,

      expiresAt:
        refreshExpirationDate()

    }

  });



  return {

    accessToken,

    refreshToken

  };

}
