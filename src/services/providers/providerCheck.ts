export function requireApiKey(
    key:string | undefined,
    provider:string
){

    if(!key){

        throw new Error(
            `${provider} API key missing`
        );

    }


    return key;

}
