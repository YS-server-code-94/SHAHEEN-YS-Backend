export interface ChatRequest {

message:string;

conversationId?:string;

provider?:string;

model?:string;

language?:string;

}


export interface ChatResponse {

conversationId:string;

message:string;

createdAt:Date;

}
