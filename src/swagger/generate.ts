import { writeFileSync } from "fs";

import { openApiSpec } from "./openapi.js";

writeFileSync(

"openapi.json",

JSON.stringify(

openApiSpec,

null,

2

)

);

console.log(

"OpenAPI generated."

);
