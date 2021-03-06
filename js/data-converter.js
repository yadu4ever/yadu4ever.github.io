// Declaring variables
dataList = {
    'B': 0,
    'b': 0,
   'KB': 1,
   'kb': 1,
   'MB': 2,
   'mb': 2,
   'GB': 3,
   'gb': 3,
   'TB': 4,
   'tb': 4,
   'PB': 5,
   'pb': 5
};
dataArr=[];
var string_from_url = getJsonFromUrl();
document.querySelector('input[name="input_str"]').value = string_from_url.convert;
convertFromString(string_from_url.convert);

// Functions
function convertFromString(input_qry_str) {
   dataArr=[];
   if (typeof(input_qry_str) == "undefined" || input_qry_str == "" ) return;
   var rawArr = input_qry_str.split(/[\s,+]/);

   for (var i = 0; i < rawArr.length; i++) {
       if (isEmpty(rawArr[i])) {
           // Do something
       } else {
           // Do something
           dataArr.push(rawArr[i]);
       }
   }

   extractStringAndNumber( dataArr );

   var bytes = getBytes(dataArr);
   var result = convertFromBytes( bytes, dataArr[dataArr.length -1]);

   // Now setting Data to input output
   document.querySelector('#output').innerHTML = dataArr[0] + ' ' + dataArr[1]+ ' = ' + result +' '+ dataArr[3];
   for ( var str in dataList ) {
       document.querySelector('#output' + dataList[str]).innerHTML = convertFromBytes( bytes, str );
   }
}

function getJsonFromUrl() {
   var query = location.search.substr(1);
   var result = {};
   query.split("&").forEach(function(part) {
       var item = part.split("=");
       result[item[0]] = decodeURIComponent(item[1]);
   });
   return result;
}

function isEmpty(str) {
   return (str.length === 0 || !str.trim());
}

function extractStringAndNumber(arr) {
   var str = arr[0];
   var sourceType;
   var sourceDigit;
   if(str.match(/\D/)) {
       sourceType = str.substring( str.length - 2 ) || '';
       sourceType = sourceType.replace(/\d+/g,'') || '';
       sourceDigit = str.replace(/\D+/g,'') || 0;
       arr.unshift(sourceDigit);
       arr[1] = sourceType;
   }
}

function getBytes(arr){
   var data = parseInt(arr[0],10);
   for( i=0; i < dataList[arr[1]]; i++ ) {
       data *= 1024;
   }
   return data;
}

function convertFromBytes(data, str){
   for( i=0; i < dataList[str]; i++ ) {
       data /= 1024;
   }
   return data;
}
