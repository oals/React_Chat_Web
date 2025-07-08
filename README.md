# 💻 ChatX
<img src="https://github.com/user-attachments/assets/48f4665b-2a0e-4bc7-a3b3-e3ce0f681b18" alt="appIcon" width="300"/>



## 📝 소개

**ChatX**는 사용자 간의 1:1 랜덤 매칭과 그룹 채팅 기능을 제공하는 채팅 웹사이트입니다. <br>
실시간 소통 중심의 구조로, 누구나 쉽고 빠르게 다양한 사람들과 대화를 나눌 수 있도록 설계되었습니다.

---
## 🚀 주요 기능

> 💬 **1:1 랜덤 매칭 시스템**: **Kafka**를 이용해 유저 간 실시간 매칭을 구현했고, **STOMP 프로토콜로 WebSocket 기반의 1:1 채팅을 처리합니다.**   <br><br>
> 👥 **그룹 채팅 시스템**: **Redis**를 통해 실시간 접속 유저 수를 계산하고, **STOMP 프로토콜로 WebSocket 기반의 그룹 채팅을 처리합니다.** <br><br>
> 🔗 **파이어베이스**: **Firebase** 를 사용하여 Google 소셜 로그인 기능을 제공합니다. <br><br>
> 🗃️ **채팅 아카이브**: **MongoDB**를 통해 저장 하고 싶은 채팅 내역을 저장합니다. <br><br>
> 🛡️ **공통 인증 모듈**: Firebase 인증을 기반으로, **서명된 HttpOnly 쿠키**를 활용한 **커스텀 인증 시스템**을 구현했습니다.

---
## 🛠️ 사용 기술 

> **프로그래밍 언어**: Java 17 <br><br>
> **프론트엔드**: React  <br><br>
> **백엔드**: Spring Boot 3.3.12<br><br>
> **데이터베이스**: MariaDb, MongoDb  <br><br>
> **캐싱**: Redis  <br><br>
> **인증**: Http Only Cookie  <br><br>
> **매칭**: Kafka  <br><br>
> **채팅**: Stomp   <br><br>
> **클라우드 & 배포**: EC2 Instance  <br><br>
> **CI/CD**: Jenkins, docker  <br><br>
---


## 📂 Jenkins

<details>
<summary>🔧 파이프라인</summary>

    pipeline {
    agent any

    stages {
      stage('소스 가져오기') {
        steps {
          dir('React_Chat_Web_Match') {
            git url: 'https://github.com/oals/React_Chat_Web_Match.git', branch: 'main'
          }
          dir('React_Chat_Web') {
            git url: 'https://github.com/oals/React_Chat_Web.git', branch: 'main'
          }
          dir('React_Chat_Web_Api') {
            git url: 'https://github.com/oals/React_Chat_Web_Api.git', branch: 'main'
          }
        }
      }

      stage('디렉터리 준비') {
        steps {
          sh '''
            mkdir -p React_Chat_Web_Api/src/main/resources
            mkdir -p React_Chat_Web_Api/src/main/java/com/example/chatx_api/config
            mkdir -p React_Chat_Web_Match/src/main/resources
            mkdir -p React_Chat_Web_Match/src/main/java/com/example/chatx_Match/config
            mkdir -p React_Chat_Web
          '''
        }
      }

      stage('설정파일 주입') {
        steps {
          configFileProvider([
            configFile(fileId: '3c0f5168-c19c-4004-949e-9a8ff207a673', targetLocation: 'React_Chat_Web_Api/src/main/resources/application.properties'),
            configFile(fileId: 'a0f2f41d-1d2b-41b9-914b-d4a03b3931ab', targetLocation: 'React_Chat_Web_Match/src/main/resources/application.properties'),
            configFile(fileId: '720829c5-1a34-474d-8264-301d4238857a', targetLocation: 'React_Chat_Web/'),
            configFile(fileId: '1c682af0-2d0d-4cc7-8260-16b2dabc9df0', targetLocation: 'React_Chat_Web/src/firebase/firebaseConfig.js'),
            configFile(fileId: '7883f8cb-55c1-4d34-bff8-c2a70ac59102', targetLocation: 'React_Chat_Web_Api/src/main/resources/chatx-9aa7f-580b59cdfe26.json'),
            configFile(fileId: '126c3157-baf3-44a2-93a2-1fbda427be45', targetLocation: 'React_Chat_Web_Api/src/main/java/com/example/chatx_api/config/RedisConfig.java'),
            configFile(fileId: '589fd470-9710-4cdc-873f-447b795ee60e', targetLocation: 'React_Chat_Web_Api/src/main/java/com/example/chatx_api/config/WebSocketConfig.java'),
            configFile(fileId: '1d558992-435f-4bbc-b681-d139e72de11a', targetLocation: 'React_Chat_Web_Match/src/main/java/com/example/chatx_Match/config/WebSocketConfig.java'),
            configFile(fileId: '5909d03f-e29a-4813-b726-cbf058693398', targetLocation: 'docker-compose.yml'),
            configFile(fileId: '241e448b-5099-4388-9e2a-c03b599134ab', targetLocation: 'temp-docker/Dockerfile')
          ]) {
            echo "✅ 설정파일이 성공적으로 주입되었습니다"
          }
        }
      }
    
      stage('Spring Boot 빌드') {
        steps {
          dir('React_Chat_Web_Api') {
            sh '''
               chmod +x ./gradlew
              ./gradlew build -x test --daemon --build-cache --scan
            '''
            }
           dir('React_Chat_Web_Match') {
            sh '''
               chmod +x ./gradlew
              ./gradlew build -x test --daemon --build-cache --scan
            '''
            }
        }
      }
    
      stage('이미지 빌드') {
        steps {
          sh 'docker-compose build'  
        }
      }

      stage('컨테이너 실행') {
        steps {
          sh 'docker-compose up -d' 
        }
      }
     }
    } 

  
</details>


<details>
<summary>🔧 Config Provider</summary>


   <img src="https://github.com/user-attachments/assets/c016cb4e-c6c9-4af1-ad64-c7b4197713ed" width="800"/>



</details>

---

## 📂 Docker

<details>
<summary>🔧 Docker Container</summary>


   <img src="https://github.com/user-attachments/assets/a0318837-6152-4548-ae83-fe3214f25d06" width="1200"/>



</details>


<details>
<summary>🔧 Docker Compose</summary>


    version: "3.8"

    services:
      zookeeper:
        image: wurstmeister/zookeeper
        container_name: zookeeper
        ports:
          - "2181:2181"

      kafka:
        image: wurstmeister/kafka
        container_name: kafka
        ports:
          - "9092:9092"
        environment:
          KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
          KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
          KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092
        depends_on:
          - zookeeper
        healthcheck:
          test: ["CMD", "nc", "-z", "localhost", "9092"]
          interval: 10s
          timeout: 5s
          retries: 10
       
      kafka-ui:
        image: provectuslabs/kafka-ui
        container_name: kafka-ui
        ports:
          - "8083:8080"
        environment:
          - KAFKA_CLUSTERS_0_NAME=local
          - KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=kafka:9092
          - KAFKA_CLUSTERS_0_ZOOKEEPER=zookeeper:2181
        depends_on:
          - kafka  

      mariadb:
        image: mariadb:10.6
        container_name: chatx-mariadb
        restart: always
        ports:
          - "3306:3306"
        volumes:
          - mariadb_data:/var/lib/mysql
        environment:
          - MARIADB_ROOT_PASSWORD=fsociety
        healthcheck:
          test: ["CMD-SHELL", "mysql -uroot -pfsociety -e 'SELECT 1' || exit 1"]
          interval: 10s
          timeout: 5s
          retries: 5
          start_period: 30s

      redis:
        image: redis:7
        container_name: chatx-redis
        ports:
          - "6379:6379"
        volumes:
          - redis_data:/data
        healthcheck:
          test: ["CMD", "redis-cli", "ping"]
          interval: 10s
          timeout: 20s
          retries: 5
          start_period: 30s

      mongo:
        image: mongo:6
        container_name: chatx-mongo
        restart: always
        ports:
          - "27017:27017"
        volumes:
          - mongo_data:/data/db
        healthcheck:
          test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping')"]
          interval: 10s
          timeout: 5s
          retries: 5
          start_period: 30s
      
      chatx-app:
        build:
          context: ./temp-docker
          dockerfile: Dockerfile
        container_name: chatx-app
        ports:
          - "8081:8080"
        depends_on:
          kafka:
            condition: service_healthy
          redis:
            condition: service_healthy
        environment:
          - NODE_ENV=production 

      chatx-match:
        build:
          context: ./React_Chat_Web_Match
          dockerfile: Dockerfile
        container_name: chatx-match
        ports:
          - "8084:8080"
        depends_on:
          kafka:
            condition: service_healthy
          mariadb:
            condition: service_healthy
        environment:
           - MATCH_TOPIC=match_events

      chatx-api:
        build:
          context: ./React_Chat_Web_Api
          dockerfile: Dockerfile
        container_name: chatx-api
        ports:
          - "8082:8080"
        depends_on:
          - mariadb
          - redis
          - mongo
        environment:
          - API_PORT=8080
      
      chatx-web:
        build:
          context: ./React_Chat_Web
          dockerfile: Dockerfile
        container_name: chatx-web
        ports:
          - "3000:80"
        depends_on:
          - chatx-api
          - chatx-match

     volumes:
       jenkins_data:
       mariadb_data:
       redis_data:
       mongo_data:



</details>


---

## 📂 Redis

<details>
<summary>🔧 Redis </summary>


   <img src="https://github.com/user-attachments/assets/4231d36b-7554-467b-8d00-c0ed2db167bb" width="900"/>
   
   <br>
   <br>

   > **groupChatRoomId::groupChatRoomTopic** – 그룹 채팅방 참가자 수 실시간 처리 <br> 

   > **groupChatRoomTopic**을 통해 토픽 별 그룹 채팅방 페이징 조회에 사용


</details>


## 📂 Mongo

<details>
<summary>🔧 Mongo </summary>


   <img src="https://github.com/user-attachments/assets/2fe9a14c-3416-4ecd-82f4-33b8e6cec02f" width="900"/>

   > 1:1 채팅이 종료된 후 대화 내용 저장을 원할 시 MongoDb에 JSON 구조로 저장 > **채팅 아카이브** 화면에서 확인 가능

</details>


---
## 📂 Nginx

<details>
<summary>🔧 ngnix.conf</summary>


     server {
      listen 80;
      server_name _;

      location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri /index.html;
      }

      location /api/ {
        proxy_pass http://chatx-api:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
      }

     location /api/match/ {
       proxy_pass http://chatx-match:8080;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }

    location /api/ws/ {
       proxy_pass http://chatx-api:8080/ws/;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }

    location /api/match/ws/ {
       proxy_pass http://chatx-match:8080/ws/;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
    }
  


</details>

---


## 📱 목차

> 🏠 **[홈](#홈)**  <br><br>
> 🔐 **[로그인](#로그인)**  <br><br>
> 💬 **[랜덤 채팅](#랜덤-채팅)**  <br><br>
> 👥 **[그룹 채팅](#그룹-채팅)**  <br><br>
> 🗃️ **[채팅 아카이브](#채팅-아카이브)**  <br><br>

---

### 홈
| 홈 상단 | 홈 하단 |
|---------|---------|
| <img src="https://github.com/user-attachments/assets/afbe227e-ecd8-4dd5-9b82-6fcf8caed583" width="600"/> | <img src="https://github.com/user-attachments/assets/ef248654-089f-4224-bf23-8059c6b7b550" width="600"/> | 



#### ✅ 홈 설명
- 사이트 전반의 주요 기능을 안내하는 네비게이션 메뉴를 소개합니다.

---

### 로그인
<br>

| 로그인 |
|---------|
| <img src="https://github.com/user-attachments/assets/9bb60a7b-d2e7-4a7e-8479-30b09811b179" width="400"/> | 

<br>

#### ✅ 인증 흐름 설명

![저장된쿠키](https://github.com/user-attachments/assets/bd8dda39-7dad-40a9-852e-3b7305488b5c)

### 1. Firebase 로그인 완료
- 클라이언트에서 Firebase를 통해 Google 소셜 로그인 후, 발급받은 토큰을 서버에 전달합니다.

### 2. 멤버 식별자 조회 또는 생성
- 서버는 Firebase 토큰을 검증한 뒤, **이메일을 기준으로 내부 DB에서 유저 정보를 조회**합니다.  
- 해당 이메일이 존재하지 않을 경우, **신규 사용자 정보를 DB에 저장**한 후 `memberId`를 생성합니다.

### 3. 서명된 쿠키 발급
- 조회 또는 생성된 `memberId`를 **secretKey로 HmacSHA256 방식으로 서명**합니다.  
- 서명된 값은 **HttpOnly 쿠키**로 클라이언트에 전달되며, 이후 요청에서 인증 수단으로 사용됩니다.

### 4. API 요청 시 인증 처리
- 클라이언트는 API 호출 시 **쿠키를 함께 전송**합니다.  
- 공통 인증 모듈(`auth_common`)의 **인터셉터**가 요청에 포함된 쿠키에서 서명값을 추출하고, **유효성 검증**을 수행합니다.  
- 서명이 유효한 경우, 해당 `memberId`를 컨트롤러에 주입 가능한 **인증된 사용자 식별자**로 변환합니다.

---

## 🔧 공통 인증 모듈 (`auth_common`)

- 서명 검증 및 사용자 인증 처리를 담당하는 **공통 모듈**입니다.  
- **인터셉터**와 **Argument Resolver**를 통해 인증 처리를 자동화합니다.
- 서비스 코드에서는 별도 인증 로직 없이 `@AuthenticatedMemberId` 어노테이션을 통해 인증 정보를 간편하게 주입받을 수 있습니다.

![인증모듈](https://github.com/user-attachments/assets/bbd9a398-252d-424a-ade9-05b10b784a89)

📦 **auth_common 저장소:**  
👉 [https://github.com/oals/React_Chat_Web_Comn_Auth](https://github.com/oals/React_Chat_Web_Comn_Auth)


---

### 랜덤 채팅
<br>

| 매칭 | 
|---------|
| <img src="https://github.com/user-attachments/assets/f80ac43d-b264-4d11-801a-682f06885cdf" width="900"/> |


#### ✅ 매칭 설명
- Apache Kafka를 활용해 사용자 간 1:1 랜덤 매칭 기능 구현

---
<br>

| 채팅 | 
|---------|
| <img src="https://github.com/user-attachments/assets/450223ed-0a8e-4839-b761-8dd22f923d88" width="900"/> |


#### ✅ 채팅 설명
- STOMP를 사용해 사용자 간의 실시간 채팅 기능 구현
- 'q'를 입력 했을 시 채팅이 종료 되도록 구현

---
<br>

| 리매칭 | 
|---------|
| <img src="https://github.com/user-attachments/assets/7cbbea6f-0598-4501-99b7-f6f242abe6a1" width="900"/> |


#### ✅ 리매칭 설명
- 매칭이 끝난 후 사용자는 리매칭 버튼을 눌러 바로 다음 매칭을 진행 가능

---
<br>

| 매칭 취소 | 
|---------|
| <img src="https://github.com/user-attachments/assets/b52368d9-09d8-4f5b-a6ab-7d0474cf28e5" width="900"/> |


#### ✅ 매칭 취소 설명
- 매칭 대기열에 저장된 사용자 정보를 삭제함으로써 매칭 취소 구현

---

### 그룹 채팅
<br>

| 목록 | 
|---------|
| <img src="https://github.com/user-attachments/assets/fbf94cc5-ee03-40f2-b646-a579041828a5" width="900"/> |


#### ✅ 목록 설명
- 카테고리별로 조회 가능하며, 채팅방 이름으로 검색할 수 있어 사용자가 원하는 채팅방을 손쉽게 찾을 수 있도록 구성
- Redis DB를 활용하여 각 채팅방의 참가자 수를 실시간으로 관리함으로써 유저 경험 향상

---
<br>


| 생성 | 
|---------|
| <img src="https://github.com/user-attachments/assets/78c7770a-5a33-45d4-b5c3-aab6da0e5f27" width="900"/> |


#### ✅ 채팅방 생성 설명
- 사용자가 목적에 맞는 그룹 채팅방을 간편하게 생성할 수 있도록 구현

---
<br>

|  채팅 | 
|---------|
| <img src="https://github.com/user-attachments/assets/2a478034-b9b5-41d4-8095-9ba506951eb9" width="900"/> |


#### ✅ 채팅 설명
- STOMP를 통해 실시간 그룹 채팅 기능 구현
- 사용자의 입장 및 퇴장 이벤트 처리


---

### 채팅 아카이브

<br>

|  저장 | 
|---------|
| <img src="https://github.com/user-attachments/assets/60bf5009-a2e7-457c-b2fe-ee424e7b3506" width="900"/> |


#### ✅ 저장 설명
- 채팅 종료 후 대화 내용을 MongoDB에 JSON 형식으로 저장 가능
- 저장된 아카이브는 채팅 아카이브 페이지에서 확인 가능

---

<br>

|  목록 | 
|---------|
| <img src="https://github.com/user-attachments/assets/c827d6de-1f1d-478a-b328-e9224ad8c674" width="900"/> |


#### ✅ 목록 설명
- 저장된 채팅 아카이브를 즐겨찾기, 삭제 가능


---
<br>




























