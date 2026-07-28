

import {
AIProviderName
} from "../ai/ai.types.js";


export interface ChatInput {

userId:string;

message:string;

title?:string;

language?:
"AR"|
"EN";


gender?:
"MALE"|
"FEMALE";


conversationId?:string;


provider?:AIProviderName;


stream?:boolean;


}


