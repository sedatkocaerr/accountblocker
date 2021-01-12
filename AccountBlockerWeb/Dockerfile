#her docker imajı bir başka imajdan miras almak zorundadır.
#bizde burada npm in gerekliliği olan node'un dockerHub daki imajından miras aldık.
FROM node:12.16.0

#spa projelerinde testleri çalıştırmamız için chrome'a ihtiyacımız var
#node imajı aslında linux imajından miras almışdurumda onun için linux koşturduğumuz komutları burada da koşturabiliriz.

#çalışma klasörünün /app olarak belirtiyoruz.
#bu komut bizim için bu imaj çalıştığında oluşacak container içinde /app adında bir klasör oluşturacak.
WORKDIR /app

#burada projemiz içinde node_modules'ü container içindeki /app klasörüne mapliyoruz.
ENV PATH /app/node_modules/.bin:$PATH

#projemizdeki package.json dosyasını container içine kopyalıyoruz.
COPY package.json /app/package.json

#package.json içerisindeki paketlerin container'a yüklüyoruz.
RUN npm install

#container'a angular/cli ı general olarak kuruyoruz.
RUN npm install -g @angular/cli@10.0.8 --unsafe

#proje dosyalarını container içine kopyalıyoruz. --.dockerignore dakiler hariç
COPY . /app

#container içerisinde projemizi serve ediyoruz.
CMD ng serve --host 0.0.0.0