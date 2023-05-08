FROM node:19.6.0-slim
ARG BUILD_PROD
ENV NODE_ENV=${BUILD_PROD:+production}
ENV NODE_ENV=${NODE_ENV:-develop}
ENV APP_DIR=/scrape
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR ${APP_DIR}
COPY . .
RUN apt-get update -qy && apt-get install -yq wget gnupg && \
  npx browserslist@latest --update-db && \
  npm ci --no-progress && \
  rm -rf ${APP_DIR}/.env && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  # fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  apt-get update -yq && \
  apt-get install -y google-chrome-stable \
    --no-install-recommends && \
  rm -rf /var/lib/apt/lists/* && \
  chown -R node:node ${APP_DIR}
EXPOSE 3000
USER node
CMD ["node", "./src/index.js"]
