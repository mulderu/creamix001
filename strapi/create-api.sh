#!/bin/bash

API_NAME=$1

if [ -z "$API_NAME" ]; then
  echo "❌ Usage: ./create-api.sh <api-name>"
  exit 1
fi

# Generate base API structure
yarn strapi generate api $API_NAME
# yarn strapi generate

# Overwrite schema.json with custom attributes
mkdir -p src/api/$API_NAME/content-types/$API_NAME
cat <<EOF > src/api/$API_NAME/content-types/$API_NAME/schema.json
{
  "collectionName": "${API_NAME}s",
  "info": {
    "singularName": "$API_NAME",
    "pluralName": "${API_NAME}s",
    "displayName": "${API_NAME^}"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "body": {
      "type": "text"
    },
    "detail": {
      "type": "json"
    }
  }
}
EOF

echo "✅ API '$API_NAME' created with custom attributes: title, body, detail(json)"
