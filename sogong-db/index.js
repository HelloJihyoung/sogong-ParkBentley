var mysql = require('mysql');
// 데이터베이스 연결
var db_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'ParkBentley',
    insecureAuth: true,
    multipleStatements: true // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다.
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}