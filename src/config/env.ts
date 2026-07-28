import dotenv from "dotenv";


dotenv.config();



function required(
    key:string
):string {


    const value =
        process.env[key];


    if(!value){

        throw new Error(
            `Missing environment variable: ${key}`
        );

    }


    return value;

}



export const env = {


    PORT:
        Number(
            process.env.PORT ?? 3000
        ),



    NODE_ENV:
        process.env.NODE_ENV ?? "development",



    AI:{


        OPENAI_API_KEY:
            process.env.OPENAI_API_KEY,


        GEMINI_API_KEY:
            process.env.GEMINI_API_KEY,


        GROQ_API_KEY:
            process.env.GROQ_API_KEY,


        ANTHROPIC_API_KEY:
            process.env.ANTHROPIC_API_KEY

    },



    AUTH:{


        JWT_SECRET:
            required("JWT_SECRET"),


        JWT_REFRESH_SECRET:
            required("JWT_REFRESH_SECRET")

    }

};
