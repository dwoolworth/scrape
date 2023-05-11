FROM node:19.6.0-slim
ARG BUILD_PROD
ENV NODE_ENV=${BUILD_PROD:+production}
ENV NODE_ENV=${NODE_ENV:-develop}
ENV APP_DIR=/scrape
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR ${APP_DIR}
COPY . .
RUN apt-get update -qy && \
    apt-get install -yq wget gnupg && \
    mkdir -p /etc/sysctl.d && \
    echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/00-local-userns.conf && \
    npx browserslist@latest --update-db && \
    npm ci --no-progress && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update -yq && \
    apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends && \
    rm -rf ${APP_DIR}/.env /var/lib/apt/lists/* && \
    chown -R node:node ${APP_DIR}
USER node
CMD ["node", "./src/index.js"]
