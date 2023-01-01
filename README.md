# Binar Final Project kelompok 5 (GoTravel)
Repository ini ditujukan untuk kolaborasi membuat Backend Final Project. Repository ini menggunakan Service Repository Pattern, yang artinya di dalam repository ini terdapat modul model, controller, service, dan repository.

## ***Anggota kelompok*** <br/>

1. Ronny Febrian Saputra
2. Romi Ariyono Hariyadi
3. Sastra Harapan Gulo

## ***Running on localhost*** <br/>
Untuk menjalankan secara local, ubah pengaturan pada file .env dan pada folder config dengan nama file database.js setelah itu jalankan perintah di bawah ini.
```
npm install
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

## ***Unit Test*** <br/>
Untuk menjalankan test jalankan menggunakan perintah di bawah ini
```
npm test
```

## ***superadmin*** <br/>
```
username: superAdmin
Password: superadmin
```

## Website
- ***Access Website*** <br/>
[Access to website](https://gotravel-ilms4lrona-as.a.run.app)


## End-point open-api
- ***Access open api '/api-docs'*** <br/>
[Access to open-api](https://gotravel-ilms4lrona-as.a.run.app/api-docs)
