#!/bin/bash

source ../../.env

# echo $APP_ADM_TOKEN

#
# echo "Authorization: Bearer ${APP_ADM_TOKEN}"
echo ""
RESP=$(curl -s -X GET http://localhost:1337/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer "${APP_ADM_TOKEN})

echo $RESP
echo ""
echo "---"
echo $RESP | jq -r '.data'
echo "---"
echo $RESP | jq -r '.meta'
echo "---"
echo ""
