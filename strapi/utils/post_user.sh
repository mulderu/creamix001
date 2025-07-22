#!/bin/bash

source ../../.env

# echo $APP_ADM_TOKEN

if [ $# -eq 3 ]; then 
  echo "name=$1"
  echo "email=$2"
  echo "pwd=$3"
else
  echo "$#"
  echo "args : name email pwd"
  exit 1
fi

name=$1
email=$2
pwd=$3

json_payload=$(jq -n --arg name "$name" --arg email "${email}" --arg pwd "${pwd}" '{
  username: $name,
  email: $email,
  password: $pwd
}')

echo $json_payload

#
# echo "Authorization: Bearer ${APP_ADM_TOKEN}"
echo ""
RESP=$(curl -s -X POST http://localhost:2337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer "${APP_ADM_TOKEN} \
  -d "$json_payload")

echo $RESP
echo ""
echo "---"
echo $RESP | jq -r '.data'
echo "---"
echo ""
