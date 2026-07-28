import {
    AIProvider,
    AIMessage
} from "../../types/provider.js";


export class MockProvider implements AIProvider {


    async chat(
        messages: AIMessage[]
    ): Promise<string> {

        return "Hello from SHAHEEN-YS Mock AI";


    }



    async stream(
        messages: AIMessage[],
        onToken:(token:string)=>void
    ): Promise<void> {


        const response =
            "Hello from SHAHEEN-YS Mock AI Streaming";


        const tokens =
            response.split(" ");



        for(const token of tokens){


            await new Promise(
                resolve =>
                setTimeout(
                    resolve,
                    300
                )
            );


            onToken(
                token + " "
            );


        }


    }


}
