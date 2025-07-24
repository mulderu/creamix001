# updated

- client : http://192.168.1.80:3000/
- strapi : http://192.168.1.80:2337/admin/

## user

- user 001
- user1.mulder@gmail.com / user1234!
- role : Authenticated

- get: http://192.168.1.80:2337/api/users/me

```json
{
    "id": 1,
    "documentId": "rsunjx3k2u03affdhi2g6cri",
    "username": "user1",
    "email": "user1@user.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "createdAt": "2025-07-22T06:01:20.723Z",
    "updatedAt": "2025-07-24T06:03:43.499Z",
    "publishedAt": "2025-07-24T06:03:43.442Z",
    "is_admin": true
}
```

## db : postgres
- POSTGRES_IMAGE=postgres:15

## cases

```json
{
            "archived": 0,
            "case_id": "3d911c94-2c80-11f0-8c75-0242ac140005",
            "excluded": 0,
            "institution_name": "Vatech Company Limited",
            "manufacturer": "Vatech Company Limited",
            "manufacturer_model_name": "PHT-75CHS",
            "modality": "CT",
            "patient_birth_date": "19550918",
            "patient_id": "121311",
            "patient_name": "?????",
            "patient_sex": "M",
            "res_x": 535,
            "res_y": 535,
            "res_z": 502,
            "series_description": "",
            "series_instance_uid": "1.2.410.200028.1085000105.20250509102737.33",
            "series_number": "33",
            "series_timestamp": "Fri, 09 May 2025 10:27:37 GMT",
            "source": "upload",
            "study_description": "",
            "study_id": "19550918",
            "study_instance_uid": "1.2.410.200028.1085000105.20250509102449",
            "study_timestamp": "Fri, 09 May 2025 10:27:37 GMT",
            "tasks_finished_count": 1,
            "tasks_new_count": 0,
            "tasks_processing_count": 0,
            "tasks_total_count": 1,
            "uploaded_timestamp": "Fri, 09 May 2025 02:49:49 GMT",
            "user_id": "b756593c-f4a8-11ef-af7d-0242ac120005"
        }
```

## command

```

(base) ╭─phenomx@mbp-m1-mulder ~/work
╰─$ ./dcmdumpex.sh /Users/phenomx/Downloads/1.cream_dental/10cases/51de6be0-fc7d-11ee-afc1-0242ac180005/0018.dcm

╰─$ cat dcmdumpex.sh
#!/bin/bash

dcmdump  \
  +P "0002,0003" \
  +P "0002,0012" \
  +P "0008,0008" \
  +P "0008,0012" \
  +P "0008,0013" \
  +P "0008,0018" \
  +P "0008,0020" \
  +P "0008,0021" \
  +P "0008,0022" \
  +P "0008,0023" \
  +P "0008,0030" \
  +P "0008,0031" \
  +P "0008,0032" \
  +P "0008,0033" \
  +P "0008,0060" \
  +P "0008,1090" \
  +P "0008,0100" \
  +P "0008,0102" \
  +P "0010,0010" \
  +P "0010,0020" \
  +P "0010,0030" \
  +P "0010,0040" \
  +P "0010,1010" \
  +P "0018,0015" \
  +P "0018,0050" \
  +P "0018,0060" \
  +P "0018,1000" \
  +P "0018,1020" \
  +P "0018,1110" \
  +P "0018,1111" \
  +P "0018,1150" \
  +P "0018,1151" \
  +P "0018,115e" \
  +P "0018,5100" \
  +P "0018,8151" \
  +P "0020,000d" \
  +P "0020,000e" \
  +P "0020,0010" \
  +P "0020,0011" \
  +P "0020,0012" \
  +P "0020,0013" \
  +P "0020,0032" \
  +P "0020,0037" \
  +P "0020,0052" \
  +P "0020,1041" \
  +P "0028,0002" \
  +P "0028,0004" \
  +P "0028,0010" \
  +P "0028,0011" \
  +P "0028,0030" \
  +P "0028,0100" \
  +P "0028,0101" \
  +P "0028,0102" \
  +P "0028,0103" \
  +P "0028,1050" \
  +P "0028,1051" \
  $1 | iconv -f euc-kr -t utf-8 | awk '{print $1 "---" $3 "===" $7}'
  
```

### dcm 2 png

```bash
#!/bin/bash

# 사용법: ./convert_series.sh <input_dir> <output_dir>
# 예: ./convert_series.sh ./dicom_series ./images

INPUT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$INPUT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "❌ 사용법: $0 <input_dir> <output_dir>"
  exit 1
fi

# 출력 디렉토리 없으면 생성
mkdir -p "$OUTPUT_DIR"

# 파일 인덱스용 카운터
INDEX=1

# 디렉토리 내 DICOM 파일 반복 처리
for dcm_file in "$INPUT_DIR"/*.dcm; do
  if [ -f "$dcm_file" ]; then
    OUTPUT_FILE=$(printf "%s/image_%04d.png" "$OUTPUT_DIR" "$INDEX")
    
    # DICOM → PNG 변환
    dcmj2pnm +on +Wm +Fa "$dcm_file" "$OUTPUT_FILE"
    
    if [ $? -eq 0 ]; then
      echo "✅ 변환 완료: $dcm_file → $OUTPUT_FILE"
    else
      echo "⚠️ 변환 실패: $dcm_file"
    fi

    INDEX=$((INDEX + 1))
  fi
done
```

## 1

- add layouts
- add middleware
- add fetch api
- add store
  - npx nuxi@latest module add pinia

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
