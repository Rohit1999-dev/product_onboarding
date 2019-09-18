var tesseract = require('node-tesseract-ocr');
var AWS = require('aws-sdk');
var express = require('express');
var app = express();


app.get("/path",(req, res)=>{
  const config={
    lan:"eng",
    oem:1,
    psm:3
}
AWS.config.update({
    accessKeyId: "AKIAJX5MFR26KWUJF65A",
    secretAccessKey: "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",
    region: 'us-east-1'
  });
  var comprehend = new AWS.Comprehend();

tesseract.recognize("/home/rohit/Desktop/orc/visiting-cards/card3.JPG",config)
.then((Data)=>{
    var params = {
        LanguageCode: 'en',
        TextList: [Data]
      };
    comprehend.batchDetectEntities(params, function (err, Data) {
      if (err) {
        console.log(err, err.stack); 
      }
      else { 
        var da_ta = (Data.ResultList[0]);
        var k = da_ta.Entities
        for (var i of k){
          var data = i["Text"]
          console.log(data)  

        }
      }         
    });
});
})

app.listen(5080,()=>{
	console.log('your app is listening')
})  
