

import {
z
} from "zod";


export const chatSchema =
z.object({

message:
z.string()
.min(1)
.max(10000),


title:
z.string()
.max(100)
.optional(),


language:
z.enum([
"AR",
"EN"
])
.optional(),


provider:
z.enum([
"OPENAI",
"GEMINI",
"CLAUDE",
"GROQ"
])
.optional()


});


