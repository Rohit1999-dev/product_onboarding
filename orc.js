var tesseract = require('node-tesseract-ocr');		// tesseract is library is used for extracted text from image

var AWS = require('aws-sdk');			// AWS is used for comprehend for data analysis
var express = require('express');	// express is framework for use of node js web Application
var app = express();

					// Here is Api-Endpoint for data extracted from images.
app.get("/path",(req, res)=>{
  const config={
    lan:"eng",
    oem:1,
    psm:3
}
  			// Here is my amazon accesskey for uses of AWS.
AWS.config.update({
    accessKeyId: "AKIAJX5MFR26KWUJF65A",
    secretAccessKey: "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",
    region: 'us-east-1'
  });
				// Here I required comprehend for accesible amazon key.

  var comprehend = new AWS.Comprehend();

									// Here I required images of path from files
tesseract.recognize("/home/rohit/Desktop/orc/product_onboarding/visiting-cards/card1.JPG",config)
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
        var da_ta = (Data.ResultList[0]);	// Here Analysis of data from Data for image.
        var k = da_ta.Entities
        for (var i of k){
          var data = i["Text"]
          console.log(data)  

        }
      }         
    });
});
})
	 // Here is my Localhost runnning on this Port

app.listen(5080,()=>{
	console.log('your app is listening')
})  
