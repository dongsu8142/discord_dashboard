FROM node:14.15.1
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
ENV PATH="/home/node/app/node_modules/ffmpeg-static/bin/linux/x64:${PATH}"
CMD [ "npm", "run", "start" ]