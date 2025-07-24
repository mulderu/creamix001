#!/bin/bash

# ex: ./convert_series.sh <input_dir> <output_dir>
# ex: ./convert_series.sh ./dicom_series ./images

INPUT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$INPUT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "❌ usage: $0 <input_dir> <output_dir>"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

INDEX=1

for dcm_file in "$INPUT_DIR"/*.dcm; do
  if [ -f "$dcm_file" ]; then
    OUTPUT_FILE=$(printf "%s/image_%04d.png" "$OUTPUT_DIR" "$INDEX")
    
    dcmj2pnm +on +Wm +Fa "$dcm_file" "$OUTPUT_FILE"
    
    if [ $? -eq 0 ]; then
      echo "converted: $dcm_file → $OUTPUT_FILE"
    else
      echo "fail: $dcm_file"
    fi

    INDEX=$((INDEX + 1))
  fi
done