import {
AIAdapter,
AIProviderName
} from "./ai.types.js";


import {
createProvider
} from "./provider.factory.js";



export function getAIProvider(
provider: AIProviderName = "OPENAI"
): AIAdapter {


return createProvider(provider);


}
