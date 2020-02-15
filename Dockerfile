
FROM teracy/angular-cli

RUN mkdir -p /opt/ola-incentives-next

COPY package.json /opt/ola-incentives-next

WORKDIR /opt/ola-incentives-next

RUN npm cache clear --force

RUN npm install

RUN ln -snf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime

EXPOSE 22002

COPY . /opt/ola-incentives-next

RUN npm run build

CMD [ "node", "server/server.js"]
