#!/bin/bash

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

TOKEN=$(./login_1.sh $email $pwd | tail -1)

echo $TOKEN

# echo "Authorization: Bearer ${APP_ADM_TOKEN}"
echo ""
RESP=$(curl -s -X GET http://localhost:2337/api/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer "${TOKEN})

echo $RESP
echo ""
echo "---"
echo $RESP | jq -r '.documentId'
echo "---"
echo ""
