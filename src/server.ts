import "dotenv/config";

import app from "./app.js";


const PORT =
    Number(process.env.PORT) || 3000;


const NODE_ENV =
    process.env.NODE_ENV || "development";


app.listen(PORT, () => {

    console.log(
        `SHAHEEN-YS Backend running on port ${PORT}`
    );

    console.log(
        `Environment: ${NODE_ENV}`
    );

});
