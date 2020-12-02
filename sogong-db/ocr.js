var Tesseract = require('tesseract.js')
var request = require('request');
var fs = require('fs');

//var myImage = 'C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg'


var filename = 'C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg'
var ocr;
// var promise1 = new Promise(function(resolve,reject) {
//     Tesseract.recognize(filename, 'kor')
//     //.progress(function  (p) { console.log('progress', p)  })
//     .catch(err => console.error(err))
//     .then(function(result, res){ 
//         //Text = result.data.text
//         Text = result.data.text.toString();
//         //console.log(result.data.text);
//         console.log("Text : " + Text);
//         ocr = resolve(Text);
//         //res.send('<script type="text/javascript">alert("인식된 글자 : "+Text);</script>');
//         return Text;
//     });
// });

// promise1.then((value) => {
//     console.log("value값은 " +value);
//     ocr = value;
//     console.log("저장된 ocr value : "+ocr);
// });

var Text = ''
var ocr = function(filename) {
    Text = filename;
    Tesseract.recognize(filename, 'kor')
    //.progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function(result){ 
        Text = result.data.text;
        Text = result.data.text.toString();
        console.log(result.data.text);
        console.log("Text :" + Text);
        console.log("Text"+Text);
        return Text;
    })
}
//carNumber(filename);

// var carNum = ocr(filename);
// console.log("carNum은 "+carNum);


module.exports = ocr
// npm install node-openalpr
// tesseract image5.jpg output -l kor


