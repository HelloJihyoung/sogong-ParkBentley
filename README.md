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

## 실행 화면
### 홈 화면
![parkBentley_main](https://user-images.githubusercontent.com/46514182/100977448-57cdea80-3584-11eb-8169-8849fa168ada.png)

### 회원가입
![회원가입](https://user-images.githubusercontent.com/46514182/100978659-0e7e9a80-3586-11eb-9238-3a8532b2fad8.png)

### 로그인
![로그인](https://user-images.githubusercontent.com/46514182/100980972-72569280-3589-11eb-89fd-9311b7cff42f.png)

### 로그인 완료 후 메인 화면
![parkBentley_main](https://user-images.githubusercontent.com/46514182/100979168-cd3aba80-3586-11eb-9c7c-2f54c1c55c84.png)

### 잔액 충전 화면
![잔액충전](https://user-images.githubusercontent.com/46514182/100979663-6e297580-3587-11eb-95c8-351537aa405e.png)

### 입차하기 - 차량 번호 인식
![입차하기-차량번호인식](https://user-images.githubusercontent.com/45346786/100971061-8db9a180-3579-11eb-97ca-32d5ba9da7dd.PNG)

### 입차하기 - 사진 선택
![입차하기-사진업로드](https://user-images.githubusercontent.com/45346786/100971060-8d210b00-3579-11eb-9ea3-3d6c266a3256.PNG)

### 입차하기 - 차량 번호 인식 성공 및 입차 성공
![차량번호인식성공및입차성공](https://user-images.githubusercontent.com/45346786/100971068-8eeace80-3579-11eb-86d3-4a831b80ee81.PNG)

![차량번호인식-터미널](https://user-images.githubusercontent.com/45346786/100971071-8f836500-3579-11eb-86c1-aa28d15527cf.PNG)

![차량번호인식](https://user-images.githubusercontent.com/45346786/100971065-8e523800-3579-11eb-908e-7bad65b6e296.PNG)

### 입차하기 - 차량 번호 인식 실패 시
![차량번호인식실패시](https://user-images.githubusercontent.com/45346786/100971070-8eeace80-3579-11eb-8c67-6203517b07e8.PNG)

### 입차하기 - 차량 번호가 일치하지 않을 때
![입차하기-맞지않는차량번호](https://user-images.githubusercontent.com/45346786/100971058-8c887480-3579-11eb-8025-ce0978e5c222.PNG)

![맞지않는차량번호-터미널](https://user-images.githubusercontent.com/45346786/100971087-93af8280-3579-11eb-9465-469ca04fe78a.PNG)

### 입차하기 - 예약 번호로 직접 입력
![예약번호직접입력](https://user-images.githubusercontent.com/45346786/100971043-898d8400-3579-11eb-8d1e-083669a90c46.PNG)

### 입차하기 - 예약 번호를 통해 입차 성공
![예약번호로 직접입력](https://user-images.githubusercontent.com/45346786/100971040-898d8400-3579-11eb-8b39-a9c696cff84d.PNG)

### 출차하기 - 차량 번호 인식
![출차하기](https://user-images.githubusercontent.com/45346786/100971076-914d2880-3579-11eb-9347-4b9095d3a138.PNG)

### 출차하기 - 초과 이용 시간 없는 경우
![출차하기-초과이용시간없는경우](https://user-images.githubusercontent.com/45346786/100971079-914d2880-3579-11eb-965d-a24f12ca8836.PNG)

### 출차하기 - 초과 이용 시간 있는 경우
![초과금액결제](https://user-images.githubusercontent.com/45346786/100971075-90b49200-3579-11eb-93b7-ada5e07d8c3c.PNG)

![초과결제완료](https://user-images.githubusercontent.com/45346786/100971073-901bfb80-3579-11eb-8325-3fa4d49949b6.PNG)

### 개인 사용 기록 조회 - 입력한 날짜와 이용 여부 상태에 따른 사용 기록 조회
![사용기록조회](https://user-images.githubusercontent.com/46514182/100979765-944f1580-3587-11eb-899d-c60b541d112f.png)

### 개인 사용 기록 조회 - 자세히 보기
![사용기록조회-자세히](https://user-images.githubusercontent.com/45346786/100971090-94481900-3579-11eb-9422-1031a3c5a770.PNG)

### 예약하기 - 날짜 및 시간 선택
![예약하기](https://user-images.githubusercontent.com/45346786/100971053-8b574780-3579-11eb-8a1d-97439277ed8e.PNG)

### 예약하기 - 선택 확인
![예약하기 확인](https://user-images.githubusercontent.com/45346786/100971051-8b574780-3579-11eb-8feb-f03024a38dc6.PNG)

### 예약하기 - 결제 및 안내
![예약 안내](https://user-images.githubusercontent.com/45346786/100971039-88f4ed80-3579-11eb-9bef-bd8c278baa3c.PNG)

### 예약하기 - 예약 완료
![예약완료](https://user-images.githubusercontent.com/45346786/100971049-8abeb100-3579-11eb-9102-e4437cfcdcd5.PNG)

### 예약 변경 - 변경하고 싶은 예약 선택
![예약변경](https://user-images.githubusercontent.com/45346786/100971045-8a261a80-3579-11eb-98d8-a8f82201b5dc.PNG)

![예약변경클릭](https://user-images.githubusercontent.com/45346786/100971047-8abeb100-3579-11eb-86e3-4523747325ae.PNG)

### 예약 변경 - 기존 예약 취소되고 다시 예약하기
![예약 변경 다시 선택](https://user-images.githubusercontent.com/45346786/100971036-87c3c080-3579-11eb-987f-72230b1300ee.PNG)

### 예약 확인 - 최종 예약 내역 확인
![예약확인-예약확인](https://user-images.githubusercontent.com/45346786/100971056-8befde00-3579-11eb-8f11-8fc5c68ec124.PNG)

### 관리자 모드 - 일별 사용량 확인
![일별사용통계](https://user-images.githubusercontent.com/46514182/100978055-31f51580-3585-11eb-8acb-85030553c09b.png)

### 관리자 모드 - 월별 사용 통계 확인
![월별사용통계](https://user-images.githubusercontent.com/46514182/100979482-260a5300-3587-11eb-9cc0-bdb13b84cacc.png)



