export interface AIMessage {
    role: "user" | "assistant" | "system";
    content: string;
}


export interface AIProvider {

    chat(
        messages: AIMessage[]
    ): Promise<string>;


    stream(
        messages: AIMessage[],
        onToken:(token:string)=>void
    ):Promise<void>;

}

