
addEventListener('load', function(e) {
document.querySelector('#test').innerHTML = 'StringParse';
});
//alert('hello');
StringParse = document.querySelector('#input').innerHTML;
var string = StringParse;
arr = string.split(/([^\"]\S*|\".+?\")\s*/);
function isEmpty(str) {
return (str.length === 0 || !str.trim());
}
newArr = [];
for (var i = 0; i < arr.length; i++) {
if (isEmpty(arr[i])) {
console.log("Empty" + arr[i] );
} else {
console.log("Non-Empty" + arr[i] );
newArr.push(arr[i]);
}
}
function extractStringAndNumber(arr) {
var str = arr[0];
var sourceType;
var sourceDigit
if(str.match(/\D/)) {
sourceType = str.substring( str.length - 2 ) || '';
sourceType = sourceType.replace(/\d+/g,'') || '';
sourceDigit = str.replace(/\D+/g,'') || 0;
arr.unshift(sourceDigit);
arr[1] = sourceType;
}
}
dataList = { 'B':0,
'KB':1,
'MB':2,
'GB':3,
'TB':4,
'PB':5
};
extractStringAndNumber(newArr);
function getBytes(arr){
var result;
var data = parseInt(arr[0],10);
//alert(arr[1]);
switch(arr[1]) {
case 'B':
result = parseInt(arr[0],10);
//alert("Hellooooo Byte in Byte" + result );
break;
case 'KB':
for( i=0; i<dataList[arr[10]]; i++ ) {
data*=1024;
}
result = parseInt(arr[0],10)*1024;
//alert("Hellooooo KB in Byte" + result );
break;
case 'MB':
result = parseInt(arr[0],10)*1024*1024;
//alert("Hellooooo MB in Byte" + result );
break;
case 'GB':
result = parseInt(arr[0],10)*1024*1024*1024;
//alert("Hellooooo GB in Byte" + result );
break;
case 'TB':
result = parseInt(arr[0],10)*1024*1024*1024*1024;
//alert("Hellooooo TB in Byte" + result );
break;
default:
console.log("Error");
}
return data;
}
function getByteOnly(arr){
var data = parseInt(arr[0],10);
for( i=0; i<dataList[arr[1]]; i++ ) {
data*=1024;
}
return data;
}
var resultBytes = getByteOnly(newArr);
function convertFromBytes(Bytes, arr){
var data = Bytes;
for( i=0; i<dataList[arr[3]]; i++ ) {
data/=1024;
}
return data;
}
//var resultBytes = getBytes(newArr);
alert('reultBytes' + resultBytes);
function convertFromByte(Bytes, arr){
var result;
switch(arr[3]) {
case 'B':
result = parseInt(Bytes,10);
//alert("Hellooooo Byte in Byte" + result );
break;
case 'KB':
result = parseInt(Bytes,10)/1024;
//alert("Hellooooo Byte in KB" + result );
break;
case 'MB':
result = parseInt(Bytes,10)/(1024*1024);
//alert("Byte in MB" + result );
break;
case 'GB':
result = parseInt(Bytes,10)/(1024*1024*1024);
//alert("Byte in GB" + result );
break;
case 'TB':
result = parseInt(Bytes,10)/(1024*1024*1024*1024);
//alert("Byte in TB" + result );
break;
default:
console.log("Error");
}
return result;
}
//var res2=convertFromByte(resultBytes,newArr);
var res2=convertFromBytes(resultBytes,newArr);
document.querySelector('#output').innerHTML = newArr[0] + ' ' + newArr[1]+ ' = ' + res2 +' '+ newArr[3];
//alert("Final output " + res2);
//var str1 = getConversionString(newArr);
function setOtherParameters(Bytes){
for (
}
alert("Completed");
