###################
# 로컬 development 단계
###################

# 베이스 이미지
FROM node:20-alpine AS development

# app 디렉토리 생성
WORKDIR /usr/src/app

# 종속성을 가장 먼저 카피하는 이유?
# 코드가 변경될 때마다 npm i를 다시 실행하는 것을 방지합니다.
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

# 종속성 설치
RUN yarn install

#소스 번들링
COPY . .

# root 유저가 아닌 이미지의 node user 사용
USER node

# RUN npm run start:dev
# CMD [ "ts-node","main.ts", "echo","🚀 server is running 🚀"]


###################
# production 단계를 위한 build 단계
###################


FROM node:20-alpine AS build
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

# npm run build를 실행하기 위해서 nest cli에 접근가능해야 합니다.
# nest cli는 dev 종속성입니다.
# 앞서 development 빌드에서 npm ci를 실행하여 모든 종속성을 설치했기 때문에
# development 이미지에서 build 이미지로 node_modules 디렉토리를 카피 할 수 있습니다.
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# production 번들을 생성할 build 커맨드 실행
RUN yarn build


# 노드 환경 변수 설정
ENV NODE_ENV production


# npm ci를 실행하여 존재하는 node_modeuls 디렉토리 제거
# --omit=development를 전달하여 production 종속성만 설치되도록 합니다.
# node_modules 디렉토리가 가능한한 최적화되도록 합니다.
RUN yarn ci --omit=development && yarn cache clean --force

USER node

###################
# PRODUCTION 단계
###################


FROM node:20-alpine AS production
# build 이미지로부터 production  이미지에 번들된 코드를 카피합니다.
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# production build를 사용하여 서버를 시작합니다.
CMD ["node", "dist/main.js"]