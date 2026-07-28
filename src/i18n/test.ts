import i18next from "./index.js";


export function translate(
key:string,
language:string="en"
){

return i18next.t(
key,
{
lng:language
}
);

}
