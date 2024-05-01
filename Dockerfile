
FROM node:18-alpine as react_build
#also say 

WORKDIR /app 
COPY package*.json ./
RUN npm install -g npm@10.4.0
RUN npm install --legacy-peer-deps
# COPY . /app/ 
COPY . .
RUN npm run build

#prepare nginx
FROM nginx:1.16.0-alpine
RUN rm -frv /usr/share/nginx/html/*
COPY --from=react_build /app/build /usr/share/nginx/html
# COPY .htaccess /usr/share/nginx/html/.htaccess
# COPY nginx.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf



#fire up nginx
# EXPOSE 8080  