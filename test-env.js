import "dotenv/config";

console.log({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    OPENAI: !!process.env.OPENAI_API_KEY,
    GEMINI: !!process.env.GEMINI_API_KEY,
    GROQ: !!process.env.GROQ_API_KEY
});
