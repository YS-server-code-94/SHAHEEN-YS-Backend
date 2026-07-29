#!/bin/bash

set -e

FILE="src/chat/chat.service.ts"

if [ ! -f "$FILE" ]; then
  echo "❌ الملف غير موجود: $FILE"
  exit 1
fi

echo "🔧 تحديث Chat Service..."

python3 <<'PY'
from pathlib import Path

file = Path("src/chat/chat.service.ts")

content = file.read_text()

old = '''const aiResponse =
      await aiGateway.chat({
        messages:[
          {
            role:"user",
            content:                                                input.message

          }

        ]

      });'''

new = '''const aiResponse =
      await aiGateway.chat({

        provider:
          input.provider ?? "OPENAI",

        messages:[
          {
            role:"user",
            content:
              input.message
          }
        ]

      });'''

if old not in content:
    print("⚠️ لم يتم العثور على الجزء القديم.")
    print("قد يكون الملف معدل مسبقاً.")
    exit(0)

content = content.replace(old, new)

file.write_text(content)

print("✅ تم تحديث Chat Service بنجاح")
PY


echo "🔍 فحص النتيجة..."

grep -A15 "aiGateway.chat" src/chat/chat.service.ts || true


echo ""
echo "🚀 تشغيل TypeScript Build..."

npm run build

echo ""
echo "✅ انتهى الإصلاح بنجاح"
