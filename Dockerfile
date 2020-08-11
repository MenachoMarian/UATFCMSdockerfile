FROM node:4.8.6

ADD . /opt/app

WORKDIR /opt/app/bundle/programs/server
RUN npm install

WORKDIR /opt/app/bundle

#ENV MONGO_URL=mongodb://tuusuario:tupassword@127.0.0.1:27017/cms
ENV MONGO_URL=mongodb://user:password@192.168.100.8:27018/cms
#ENV MONGO_URL=mongodb://propietario:cms@127.0.0.1:27017/cms
#ENV MONGO_URL=mongodb://readwriter:cms@127.0.0.1:27017/cms
ENV ROOT_URL=http://localhost:3000
ENV PORT 3000
EXPOSE 3000

CMD ["node","./main.js"]


