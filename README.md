# parkBentley
>2020 2학기 소공 프로젝트

 ## 사용법
 ### master branch 기준
  ```
  git clone https://github.com/TeamWilliam/parkBentley.git
  cd sogong-db
  node app.js
  chrome 주소창에 localhost:3000/main 입력
 ```
 
 ## DB 설정
 ### 관리자 계정
  ```
INSERT INTO parkbentley.user (ID, PW, Name, Money, Email, CarType, CarNum) VALUES('admin', '1','','0','','','1');
 ```

### 기본 계정
  ```
INSERT INTO parkbentley.user (ID, PW, Name, Money, Email, CarType, CarNum) VALUES('root', '1','','0','','','1');
 ```

 ### npm에 mysql, ejs 확장자 설치
```
npm install mysql
npm install ejs --save
```

 ### moment.js 설치
```
npm install --save moment
npm install --save moment-timezone
```


### mysql에 사용할 DB와 TABLE 생성
```
CREATE DATABASE ParkBentley;

(create_db_table.txt 참고)
```

### DB TABLE
![db_table](https://user-images.githubusercontent.com/55631147/100452848-49537f00-30fd-11eb-9a83-d3fbe50038b4.PNG)


## team William
- 권지형
- 김수희
- 박지호
- 이은영

