# 使用官方Node.js基础映像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖项
RUN npm install pnpm -g
RUN pnpm install

# 复制应用程序源代码
COPY . .

# RUN apk update && apk add python3
RUN npx prisma generate
# 构建和导出静态应用程序
RUN npm run build
# RUN npm run export

CMD npm run start

# 将80端口暴露给外部访问
EXPOSE 3000
