#!/bin/bash

source ../../.env

if [ $# -eq 2 ]; then 
  echo "email=$1"
  echo "password=$2"
else
  echo "$#"
  echo "args : email password"
  exit 1
fi

email=$1
pwd=$2

json_payload=$(jq -n --arg identifier "${email}" --arg password "${pwd}" '{
  identifier: $identifier,
  password: $password
}')

echo $json_payload

#
# echo "Authorization: Bearer ${APP_ADM_TOKEN}"
echo ""
RESP=$(curl -s -X POST http://localhost:2337/api/auth/local \
  -H "Content-Type: application/json" \
  -d "$json_payload")

echo $RESP
echo ""
echo "---"
TOKEN=$(echo $RESP | jq -r '.jwt')
echo "TOKEN: " $TOKEN
USER=$(echo $RESP | jq -r '.user')
echo "USER: " $USER
echo "---"
echo ""
echo $TOKEN

