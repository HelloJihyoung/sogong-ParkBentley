var express = require('express');
var app = express();
var db_config = require(__dirname + '/index.js');
var conn = db_config.init();
var bodyParser = require('body-parser');
var moment = require('moment');
//var moment = require('moment-timezone');


db_config.connect(conn);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.send('ROOT');
});

var loginMemberID = "root"


/* ------------------------------------메인화면 --------------------------------*/

app.get('/main', function (req, res) {
    var body = req.body;

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("get 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('main.ejs', { list : rows});
            console.log(rows);
        }
    });
});

app.post('/main', function (req, res) {
    var body = req.body;

    console.log("로그아웃 버튼 클릭" + body.logoutID);

    if(body.logoutID) loginMemberID = body.logoutID;

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("post 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('main.ejs', { list : rows});
            console.log(rows);
        }
    });
});

/* -------------------------------------------------------------------------*/


/* ------------------------------------회원가입 --------------------------------*/
app.get('/join', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    console.log("현재 ID : "+userID);

    var sql = 'SELECT * FROM user WHERE ID = ?';

    console.log(sql);
    conn.query(sql, [userID], function(err,result,rows,fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            res.render('join.ejs',{
                results: result,
                list : rows
            });
        }
    });
});

app.post('/joinAf', function (req, res) {
    var body = req.body;
    // console.log(body);
    // var users = { // TABLE user parameter
    //     ID : body.input_id,
    //     PW: body.input_pw,
    //     Name : body.input_name,
    //     Money : 0,
    //     Email: body.input_email,
    //     CarType : body.input_carType,
    //     CarNum : body.input_carNum
    // };
    var id = body.input_id;
    var pw = body.input_pw;
    var name = body.input_name;
    var email = body.input_email;
    var carType = body.input_carType;
    var carNum = body.input_carNum;
    
    console.log(body);

    var sql = 'INSERT INTO user (ID,PW,Name,Money,Email,CarType,CarNum) VALUES(?,?,?,0,?,?,?)';
    var params = [id, pw, name, email, carType, carNum];
    //var sql = "INSERT INTO user VALUES ? "
    console.log(sql);
    conn.query(sql, params, function(err,rows) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
            if(id == "" || id == null || id == undefined) {
                res.send('<script type="text/javascript">alert("아이디를 입력해주세요");window.location="/join";</script>');
            }
            else if(pw == "" || pw == null || pw == undefined) {
                res.send('<script type="text/javascript">alert("비밀번호를 입력해주세요");window.location="/join";</script>');
            }
            else if(carNum == "" || carNum == null || carNum == undefined) {
                res.send('<script type="text/javascript">alert("차 번호를 입력해주세요");window.location="/join";</script>');
            }
        }
        else {
            res.send('<script type="text/javascript">alert("회원가입 완료.로그인하세요");window.location="/login";</script>');
            console.log("data inserted");
        }
    });
});
/* --------------------------------------------------------------------------*/


/* ------------------------------------로그인 --------------------------------*/
app.get('/login', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    console.log("현재 ID : "+userID);

    var sql = 'SELECT * FROM user WHERE ID=?';

    conn.query(sql, [userID], function(err,result,rows,fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            res.render('login.ejs',{
                results: result,
                list : rows
            });
        }
    });
});

app.post('/login', function (req, res) {
    var body = req.body;
    console.log(body);

    var id = body.ID;
    var pw = body.PASSWORD;

    var userID = loginMemberID;

    console.log("입력한 ID : "+id);
    console.log("입력한 PW : "+pw);
    var sql1 = 'SELECT * FROM user WHERE ID=?';
    console.log(sql1);
    conn.query(sql1, [id], function(err,results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        if(!results[0]) {
            res.send('<script type="text/javascript">alert("존재하지 않는 아이디입니다.");window.location="/login";</script>');
        }
        else { 
            console.log("results : " +results);
            console.log(results[0]);
            var memberPW = results[0].PW;
            if (memberPW == pw ) {
                res.send('<script type="text/javascript">alert("로그인되었습니다.");window.location="/main";</script>');
                console.log("로그인 완료");
                console.log(sql1);
                loginMemberID = results[0].ID; // 로그인 된 ID 전역변수에 저장
                console.log("로그인된 아이디 : "+loginMemberID);
            }
            else {
                res.send('<script type="text/javascript">alert("비밀번호가 일치하지 않습니다.");window.location="/login";</script>');
            }
            res.end;
        }
    });
});
/* ---------------------------------------------------------------------------*/


/* -------------------------------------입차하기--------------------------------------*/
app.get('/enterCar', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    console.log("현재 ID : "+userID);

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log(sql);
    
    conn.query(sql, [userID], function(err,result, rows,fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            res.render('enterCar',{
                results: result,
                list : rows
            });
        }
    });
});

app.post('/enterCar', function (req, res) {
    var body = req.body;
    console.log(body);

    var carNum = require('./ocr');
    //console.log(carNumber('C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg'));

    carNum = '152가 3018';

    console.log("carNum : "+carNum);
    var sql1 = 'SELECT * FROM reservation WHERE CarNum = ?';
    console.log(sql1);
    conn.query(sql1, [carNum], function(err,results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        if(!results[0]) {
            res.redirect('/enterCar_ReserNum');
        }
        else { 
            console.log("예약이 되어있습니다. 차단기가 올라갑니다.");
            //res.send('<script type="text/javascript">alert("예약이 되어있습니다. 차단기가 올라갑니다.");window.location="/afterEnterCar";</script>');
            res.redirect('/afterEnterCar');
        }
    });
});
/* ---------------------------------------------------------------------------*/

// 입차 완료
app.get('/afterEnterCar', function (req, res) {
    //var carNumber = require('./ocr.js');
    // console.log(carNumber('C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg'));

    const carNum = '152가 3018';
    // sql = 'SELECT ReservationNum FROM reservation WHERE CarNum = ?';
    // conn.query(sql, [carNum], function(err, results, fields) {
    //     if(err) console.log('query is not excuted. select fail...\n' + err);
    //     else {
    //         console.log("resNum" + results[0].ReservationNum);
    //         resNum = results[0].ReservationNum;
    //     }
    // });
    // var carNum = carNumber('C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg');

    // var sql1 = 'SELECT * FROM Reservation,cartransaction WHERE CarNum=? AND cartransaction.ReservationNum=?';
    // conn.query(sql1, [carNum, resNum], function (err, rows, fields) {
    //     if(err) console.log('query is not excuted. select fail...\n' + err);
    //     else res.render('afterEnterCar.ejs', {list : rows});
    // });

    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    console.log("현재 ID : "+userID);

    var sql1 = 'SELECT * FROM user WHERE ID=?';
    conn.query(sql1, [userID], function(err,results, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        if(!results[0]) { // 값이 없을 때
            console.log("예약 내역이 없습니다.");
            res.render('afterEnterCar.ejs',{
                list : rows
            });
        }
        else { // 차번호 && 예약 완료가 있을 때
            var now = new Date(); 
            var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var todayTime = todayDate.getTime();
            console.log("RESULTS" + results[0].ReservationNum);
            var sql2 = 'SELECT * FROM reservation WHERE ReservationDate = ? AND CarNum = ? AND UseStatus="예약완료"';
            console.log("오늘의 Date : "+ todayDate);
            conn.query(sql2, [todayDate, carNum], function(err,results,rows, fields) {
                if(err) console.log('query is not excuted. select fail...\n' + err);
                if(!results[0]) { // 값이 없을 때
                    console.log("오늘의 예약 내역이 없습니다.");
                    res.render('afterEnterCar.ejs',{
                        results : results,
                        list : rows
                    });
                }
                else { // 예약이 오늘 & 차번호일치 & 예약완료
                    console.log("RESULTS" + results[0].ReservationNum);
                    var ReservationNum = results[0].ReservationNum;
                    var moment = require('moment');
                    require('moment-timezone');
                    moment.tz.setDefault("Asia/Seoul");
                    var R_StartTime = moment().format('HH:MM:SS');
                    console.log("R_StartTime : "+R_StartTime);
                    var sql3 = 'INSERT INTO cartransaction (ReservationNum,R_StartTime) VALUES(?,?)';
                    conn.query(sql3, [ReservationNum,R_StartTime], function (err, rows, results) {
                        if(err) console.log('query is not excuted. select fail...\n' + err);
                        else {
                            res.render('afterEnterCar.ejs',{
                                results: results[0],
                                list : rows
                            });
                            console.log("last : " + results[0].R_StartTime);
                        }
                    });
                    res.render('afterEnterCar.ejs',{
                        results: results[0],
                        list : rows
                    });
                }
            });
        }
    });
});

app.post('/afterEnterCar', function (req, res) {
    var body = req.body;

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("post 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('afterEnterCar.ejs', { list : rows});
            console.log(rows);
        }
    });
});

// 인식이 안되었을 경우 | 예약 테이블에 자동차 번호가 없을 경우
app.get('/enterCar_ReserNum', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    console.log("현재 ID : "+userID);

    var sql = 'SELECT * FROM user WHERE ID = ?';

    console.log(sql);
    
    conn.query(sql, function(err,result,fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            res.render('enterCar_ReserNum',{
                results: result,
                list : rows
            });
        }
    });
});

app.post('/enterCar_ReserNum', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    var resNum = body.reservationNum;
    console.log("resNum : "+resNum);

    var sql = 'SELECT * FROM reservation WHERE ReservationNum=?';
    console.log(sql);
    conn.query(sql, [resNum], function(err,results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        if(!results[0]) {
            res.send('<script type="text/javascript">alert("예약 내역이 없습니다.");window.location="/main";</script>');
        }
        else { 
            console.log("예약이 되어있습니다. 차단기가 올라갑니다.");
            //res.send('<script type="text/javascript">alert("예약이 되어있습니다. 차단기가 올라갑니다.");window.location="/afterEnterCar";</script>');
            res.redirect('/afterEnterCar');
        }
    });
});

/* ---------------------------------잔액 충전하기------------------------------------------*/
app.get('/charge', function (req, res) {

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('charge.ejs', {list : rows});
            console.log(rows);
        }
    });
});


app.post('/charge', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    var addMoney = body.chk_info;
    console.log("현재 로그인 되어 있는 사람 : "+userID);

    var sql = "UPDATE user SET money = money + ?  WHERE ID =?";
    console.log(sql);
    conn.query(sql, [addMoney, userID], function(err,rows, results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        else {
            console.log("잔액 충전 완료.");
            
            res.redirect('/charge');
        }
    });
});
/* ------------------------------------------------------------------------------*/


app.get('/reservationNum', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('reservationNum.ejs', {list : rows});
            console.log(rows);
        }
    });
});


app.get('/transaction1', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('transaction1.ejs', {list : rows});
            console.log(rows);
        }
    });
});



app.get('/adminDay', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('adminDay.ejs', {list : rows});
            console.log(rows);
        }
    });
});


app.get('/afterDepartCar', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('afterDepartCar.ejs', {list : rows});
            console.log(rows);
        }
    });
});

app.post('/afterDepartCar', function (req, res) {
    var body = req.body;

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("post 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('afterDepartCar.ejs', { list : rows});
            console.log(rows);
        }
    });
});

/* ---------------------------------예약 변경하기------------------------------------------*/

app.get('/changeReservation', function (req, res) {
    var body = req.body;

    var userID = loginMemberID;

    console.log("현재 ID : " + userID);

    var sql = 'SELECT * FROM reservation WHERE ID = ?';

    conn.query(sql, [userID], function (err, rows, results) {

        var now = new Date(); 
        var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var todayTime = todayDate.getTime();
        
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('changeReservation.ejs', 
            {list : rows, todayDate:todayDate, todayTime:todayTime});
            //console.log(todayDate);
            //console.log(todayTime);
            //console.log(rows);
        }
    });
});
//     // conn.query(sql1, [userID], function (err, rows) {
//     //     if(err) console.log('query1 is not excuted. select fail...\n' + err);
//     //     if(userID != "root") {
//     //         res.render('changeReservation.ejs',  {rows1 : rows1[0]});
//     //         console.log("rows1 : " + rows1[0]);
//     //         // var sql2 = 'SELECT * FROM reservation WHERE ID=?';
//     //         // conn.query(sql2, [userID], function(err, rows, results) {
//     //         //     if(err) console.log('query2 is not excuted. select fail...\n' + err);
//     //         //     else {
//     //         //         // 현재 시간 가져오기
//     //         //         var now = new Date(); 
//     //         //         var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     //         //         res.render('changeReservation.ejs', {list : rows}, {todayDate : todayDate[0]});
//     //         //     }
//     //         // });
//     //     }
//     //     else { // 로그인이 안되어있는 경우
//     //         // 현재 시간 가져오기
//     //         var now = new Date(); 
//     //         var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     //         //res.render('changeReservation.ejs', {list : rows}, {results : result}, {todayDate : todayDate[0]});
//     //         res.render('changeReservation.ejs', {rows1:rows1[0]});
//     //         console.log("rows1 : " + rows1[0]);
//     //     }
//     // });
// });

app.post('/changeReservation' , function (req, res) {
    var body = req.body;

    console.log("post예약 변경 클릭" + body.breservationNum);

    var userID = loginMemberID;

    if(body.breservationNum) { // 예약 변경 버튼이 눌린 경우에만
        var rmReservationNum = body.breservationNum;
        console.log("삭제할 예약번호 : " + rmReservationNum);
        var sql2 = 'DELETE FROM reservation WHERE ReservationNum = ?';
        console.log(sql2);
        conn.query(sql2, [rmReservationNum], function (err, rows, results) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else {
                res.render('changeReservation.ejs', { list : rows , rmReservationNum : rmReservationNum });
                console.log(rows);
                console.rmReservationNum;
                console.log("삭제 완료");
            }
        });
    }

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("post 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        var now = new Date(); 
        var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var todayTime = todayDate.getTime();

        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('changeReservation.ejs', 
            { list : rows, todayDate:todayDate, todayTime:todayTime});
            console.log(rows);
        }
    });
});

// app.get('/changeReservation/:id/delete', function(req, res){
//     var sql = 'SELECT * FROM reservation'; // 전체 글목록 보여주기
//     var id = req.params.id;
//     conn.query(sql, function(err, rows, fields){
//       var sql = 'SELECT * FROM reservation WHERE id=?'; // 선택한 글 보여주기(id값을 통하여 접근가능)
//       conn.query(sql, [id], function(err, Reservation){
//           if(err){
//             console.log(err);
//             res.status(500).send('Internal Sever Error');
//           } else {
//             if(resrvation.length === 0){// 선택한 글이 없다면 에러를 띄운다
//               console.log('There is no record');
//               res.status(500).send('Internal Sever Error');
//             } else {
//               res.render('delete', {rows:rows, Reservation:Reservation[0]});// delete페이지로 렌더해준다.(글 목록 객체와 삭제할 글을 넘겨줌)
//             }
//           }
//       });
//   });
// });

// app.post('/changeReservation/:id/delete', function (req, res) {
//     var id = req.params.id;
//     var sql = 'DELETE FROM reservation WHERE id = ?'; //DELETE sql문. WHERE를 빠뜨리면 조용히 집에 가야한다.
//     conn.query(sql, [id], function(err, result){
//       if(err) console.log(err);
//       res.redirect('/afterChangeReservation');//데이터를 삭제한 후, 메인페이지로 리다이렉트 해준다.
//     });
// });

app.get('/afterChangeReservation', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('afterChangeReservation.ejs', {list : rows});
            console.log(rows);
        }
    });
});

/* ----------------------------------------------------------------------------------*/

app.get('/departCar', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('departCar.ejs', {list : rows});
            console.log(rows);
        }
    });
});

app.post('/departCar', function (req, res) {
    var body = req.body;

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("post 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('departCar.ejs', { list : rows});
            console.log(rows);
        }
    });
});

app.get('/completeReservation', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('completeReservation.ejs', {list : rows});
            console.log(rows);
        }
    });
});

app.get('/confirmReservation', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('confirmReservation.ejs', {list : rows});
            console.log(rows);
        }
    });
});

app.get('/index', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('index.ejs', {list : rows});
            console.log(rows);
        }
    });
});

app.get('/payExtraFee', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('payExtraFee.ejs', {list : rows});
            console.log(rows);
        }
    });
});

app.get('/reservationPayment', function (req, res) {
    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("현재 ID : " + userID);
    
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('reservationPayment.ejs', {list : rows});
            console.log(rows);
        }
    });
});




/* -----------------------------개인 기록 조회--------------------------------------- */
app.get('/myrecord', function (req, res) {
    var sql = 'SELECT ReservationDate, StartTime, EndTime, ReservationNum, UseStatus FROM Reservation';
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('myrecord.ejs', {list : rows});
    });
});
/* -------------------------------------------------------------------------------------- */

/* ------------------------------------개인기록 상세 조회 --------------------------------*/
app.get(['/checkMyRecord','/checkMyRecord/:ReservationNum'], function (req, res) {
    var sql = 'SELECT ReservationNum FROM Reservation';
    conn.query(sql,function (err, records, fields) {
        var ReservationNum = req.params.ReservationNum; 
        if(ReservationNum){
            var sql = 'SELECT ReservationDate, StartTime, EndTime, ReservationNum, CarNum, Price FROM Reservation WHERE ReservationNum =?';
            conn.query(sql,[ReservationNum],function(err, Reservation, fields){
                if(err) console.log('query is not excuted. select fail...\n' + err);
                else {
                    res.render('checkMyRecord.ejs', {records : records, Reservation:Reservation[0]});
            }
        });
                  
        }else {
            res.render('/checkMyRecord',{records : records, Reservation: undefined})
        }
    });
    
});

/* -------------------------------------------------------------------------------------- */

/* ------------------------------------ 월별 통계량 보기 ------------------------------------ */
app.get('/adminMonth', function (req, res) {
    var sql = 'SELECT ReservationDate FROM Reservation';
    var body = req.body;
    var Year = body.Year;
    var Month = body.Month;
    console.log(Year,Month);
    conn.query(sql, function (err, rows, fields) {
     
        var ReservationDate = rows[0].ReservationDate;
        var sql = 'SELECT Count(ReservationNum) count,ReservationNum FROM Reservation, user WHERE month(?)<=12 AND name=? ';
        if(ReservationDate){
        conn.query(sql,[ReservationDate,loginMemberID],function (err, Reservation, fields) {
            console.log(Reservation);
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else {res.render('adminMonth.ejs', {rows : rows, Reservation : Reservation[0]});
        }
        });
    }else {
        res.render('/adminMonth', {rows : rows, Reservation:undefined})
    }
  
    });
});

/* -------------------------------------------------------------------------------------- */

/* ----------------------------------예약하기------------------------------------- */
app.get('/makeReservation', function (req, res) {
    // var cal = calendar.js;
    // var Month = cal.yy;
    // var Day =body.calday;
    
    // console.log(Month);

    res.render('makeReservation.ejs');
});

/* ----------------------------------calendar 받아오기------------------------------------- */
app.get('/calendar', function (req, res) {
    res.render('calendar.ejs');
});
/* -------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------- */



app.listen(3000, () => console.log('Server is running on port 3000...'));
