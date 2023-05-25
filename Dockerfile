# Base 이미지로 Node.js를 사용합니다.
FROM node:14 as build-deps


# 작업 디렉토리를 설정합니다.
WORKDIR /usr/app

# Node 버젼 확인
RUN node --version

# Install PM2 globally
RUN npm install --global pm2

# 종속성 파일(package.json, package-lock.json)을 복사하여 종속성을 설치합니다.
COPY package.json package-lock.json ./
RUN npm install
# RUN npm i --force

# 소스 코드를 복사합니다.
COPY . ./

# 리액트 애플리케이션을 빌드합니다.
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node


# Copy config file based on environment
ARG ENV
# COPY ./src/config/config.${ENV}.ts config.ts

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]




# 개발 환경으로 빌드
# docker build --build-arg ENV=dev -t myapp:dev .

# 프로덕션 환경으로 빌드
# docker build --build-arg ENV=prd -t myapp:prd .


# docker build --build-arg ENV=prd --pull --rm -f "Dockerfile" -t helpdeskfereact:latest "." 


