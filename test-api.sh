#!/data/data/com.termux/files/usr/bin/bash

curl \
-X POST \
http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '
{
 "provider":"groq",
 "messages":[
   {
    "role":"user",
    "content":"Hello SHAHEEN-YS"
   }
 ]
}
'
