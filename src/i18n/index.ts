import i18next from "i18next";
import Backend from "i18next-fs-backend";


let initialized = false;


export async function initI18n(){

    if(initialized){
        return;
    }


    await i18next
    .use(Backend)
    .init({

        fallbackLng:"en",

        preload:[
            "ar",
            "en"
        ],


        backend:{

            loadPath:
            "./src/locales/{{lng}}/common.json"

        },


        interpolation:{

            escapeValue:false

        }

    });


    initialized=true;

}



export default i18next;
