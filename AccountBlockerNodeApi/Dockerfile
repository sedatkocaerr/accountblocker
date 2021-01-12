FROM node:10-alpine 
# Uygulamamızın bulunacağı klasörü oluştur
RUN mkdir -p /var/www/app

# Komutlarımızın çalıştırılacağı dizini seç
WORKDIR /var/www/app

# package.json dosyamızı çalışma dizinine kopyala
COPY package.json /var/www/app

# Bağımlılıkları kur
RUN npm install

# Tüm proje dosyalarını docker image'ına kopyala
COPY . /var/www/app

# Uygulamanın çalışacağı port
EXPOSE 3000

# Projeyi ayağa kaldıracak komutu çalıştır
CMD ["nodemon", "app.js"]  