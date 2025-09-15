var days=document.getElementsByClassName("day");
var currentDate=document.getElementById("date");
var degrees=document.getElementsByClassName("degree");
var degreesMin=document.getElementsByClassName("degree-min");
var sun=document.getElementsByClassName("sun");
var city=document.getElementById('city');
var images=document.getElementsByClassName('image')

var withers=[];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// var dayName = days[date.getDay()];
console.log(images[0]);

function getWither(){
    return new Promise(function(resolve, reject){
        var myRequest=new XMLHttpRequest();
        myRequest.open('get','http://api.weatherapi.com/v1/forecast.json?key=cf7cd70e33ae4c57ac6133625251409&q=cairo&days=3');
        myRequest.send();
        myRequest.addEventListener('load',function(){
            withers=JSON.parse(myRequest.response)
            console.log(withers);
            for(var i=0;i<3;i++){
                var date = new Date(withers.forecast.forecastday[i].date);
                days[i].innerHTML=day[date.getDay()]
                degrees[i].innerHTML=withers.forecast.forecastday[i].day.maxtemp_c
                sun[i].innerHTML=withers.forecast.forecastday[i].day.condition.text
                city.innerHTML=withers.location.name
                currentDate.innerHTML=withers.forecast.forecastday[i].date
                images[i].src=withers.forecast.forecastday[i].day.condition.icon
                if(i<2){
                    degreesMin[i].innerHTML=withers.forecast.forecastday[i+1].day.mintemp_c
                }
            }
            resolve();
        })
        myRequest.addEventListener('error',function(){
            reject('stop')
        })
    })
    
}
getWither();

function search(that){
    return new Promise(function(resolve, reject){
        var url='http://api.weatherapi.com/v1/forecast.json?key=cf7cd70e33ae4c57ac6133625251409&q='+that.value+'&days=3'
        var myRequest=new XMLHttpRequest();
        myRequest.open('get',url);
        myRequest.send();
        myRequest.addEventListener('load',function(){
            withers=JSON.parse(myRequest.response)
            console.log(withers);
            for(var i=0;i<3;i++){
                var date = new Date(withers.forecast.forecastday[i].date);
                days[i].innerHTML=day[date.getDay()]
                degrees[i].innerHTML=withers.forecast.forecastday[i].day.maxtemp_c
                if(i<2){
                    degreesMin[i].innerHTML=withers.forecast.forecastday[i+1].day.mintemp_c
                }
                sun[i].innerHTML=withers.forecast.forecastday[i].day.condition.text
                city.innerHTML=withers.location.name
                currentDate.innerHTML=withers.forecast.forecastday[i].date
                images[i].src=withers.forecast.forecastday[i].day.condition.icon
            }
            resolve();
        })
        myRequest.addEventListener('error',function(){
            reject('stop')
        })
    })
    
}

