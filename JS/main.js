let contact = document.querySelector('.contact');
let locationInput = document.querySelector('.location-input');
let finalRes = {};


contact.addEventListener('click',function(){
    window.open('./contact.html','_self');
    document.querySelector('.homeSec').classList.remove('active');
    document.querySelector('.contact').classList.add('active');

});


locationInput.addEventListener('input', function(){
    (async function () {
        let res= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a56c5bfb45844331bb6143906242206&q=${locationInput.value}&days=3`);
        finalRes =await res.json();
        displayAllInputs()
    })();
    
});

function getMonthName() {
    let myDate=(finalRes.forecast.forecastday[0].date);

    switch(myDate.split('-')[1]) {
        case '01':
          month="January";
          break;
        case '02':
          month="February";
          break;
        case '03':
          month="March";
          break;
        case '04':
          month="April";
          break;
        case '05':
          month="May";
          break;
        case '06':
          month="June";
          break;
        case '07':
          month="July";
          break;
        case '08':
          month="August";
          break;
        case '09':
          month="September";
          break;
        case '10':
          month="October";
          break;
        case '11':
          month="November";
          break;
        case '12':
          month="December";
          break;
        default:
          month="Invalid month";
      }
      //console.log(month);
}

let day1;
let day2;
let day3;

function getDay1Name() {
  let date = new Date(finalRes.forecast.forecastday[0].date);
  day1 = date.toLocaleString('en-us', {weekday: 'long'});
    //console.log(day1);
}
function getDay2Name() {
  let date = new Date(finalRes.forecast.forecastday[1].date);
  day2 = date.toLocaleString('en-us', {weekday: 'long'});
    //console.log(day2);
}
function getDay3Name() {
  let date = new Date(finalRes.forecast.forecastday[2].date);
  day3 = date.toLocaleString('en-us', {weekday: 'long'});
    //console.log(day3);
}

function displayAllInputs(){
    
  let myDate=(finalRes.forecast.forecastday[0].date);

  getMonthName();

  getDay1Name();
  getDay2Name();
  getDay3Name()

  cartona = `
                <div class="col-lg-4 col-md-5 col-sm-12 me-md-3 me-sm-0 me-lg-0 bg-gray1 top-left-radius ">
              <div class="header d-flex justify-content-between">
                <div class="day">${day1}</div>
                <div class="date">${myDate.split('-')[2]}${month}</div>
              </div>
              <div class="content1 content">
                <div class="location">${finalRes.location.name}</div>
                <div class="degree">
                  <div class="num-of-degree d-flex"> 
                    ${finalRes.current.temp_c}
                    <sup>o</sup>
                    C
                  </div>
                  <div class="icon mb-5">
                    <img class="w-25" src="${'https:'+finalRes.current.condition.icon}" alt="${finalRes.current.condition.text}">
                  </div>      
                </div>
                <div class="weather-desc">${finalRes.current.condition.text}</div>
                <span>
                  <img src="imgs/icon-umberella.png" alt="umberella-image">
                  20%
                </span>
                <span>
                  <img src="imgs/icon-wind.png" alt="wind-image">
                  18km/h
                </span>
                <span>
                  <img src="imgs/icon-compass.png" alt="compass-image">
                  East
                </span>
              </div>

              
            </div>

            
            <div class="col-lg-4 col-md-5 col-sm-12 mt-sm-3 mt-md-0 bg-gray2  ">
              <div class="header text-center">
                <div class="day">${day2}</div>
              </div>
              <div class="content text-center">
                <div class="icon">
                  <img class="w-15 " src="${'https:'+finalRes.forecast.forecastday[1].day.condition.icon}" alt="${finalRes.forecast.forecastday[1].day.condition.text}">
                </div> 

                <div class="degree2 d-flex justify-content-center align-items-center">
                  <div class="num-of-degree2 d-flex"> 
                    ${finalRes.forecast.forecastday[1].day.maxtemp_c}
                    <sup>o</sup>
                    C
                  </div>     
                </div>
                <small>
                ${finalRes.forecast.forecastday[1].day.mintemp_c}
                  <sup class="top">o</sup>
                </small>
                <div class="weather-desc">${finalRes.forecast.forecastday[1].day.condition.text}</div>


              </div>
            </div>
            
            <div class="col-lg-4 col-md-5 col-sm-12  mt-sm-3 mt-md-3 mt-lg-0 bg-gray1 top-right-radius ">
              <div class="header text-center">
                <div class="day">${day3}</div>
              </div>
              <div class="content text-center">
                <div class="icon">
                  <img class="w-15 " src="${'https:'+finalRes.forecast.forecastday[2].day.condition.icon}" alt="${finalRes.forecast.forecastday[2].day.condition.text}">
                </div> 

                <div class="degree2 d-flex justify-content-center align-items-center">
                  <div class="num-of-degree2 d-flex"> 
                  ${finalRes.forecast.forecastday[2].day.maxtemp_c}
                    <sup>o</sup>
                    C
                  </div>     
                </div>
                <small>
                ${finalRes.forecast.forecastday[2].day.mintemp_c}
                  <sup class="top">o</sup>
                </small>
                <div class="weather-desc">${finalRes.forecast.forecastday[2].day.condition.text}</div>


              </div>
            </div>
    `
  document.querySelector('.row').innerHTML= cartona;
};


let getIpp={};
let getLocationRes ={};

function getIp() {
  (async function(){
    let getIpArr = await fetch('https://api.ipify.org?format=json')
    getIpp =await getIpArr.json();
    //console.log(getIpp.ip);
    getLocationFun();

  })()

};       

getIp();

function getLocationFun() {

  (async function(){
    let getLocationArr = await fetch(`https://apiip.net/api/check?ip=${getIpp.ip}&accessKey=43d51fa7-14d1-4866-b5a8-99d34fbde73c`)
    getLocationRes =await getLocationArr.json();
  
    //console.log(getLocationRes);

    let res= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a56c5bfb45844331bb6143906242206&q=${getLocationRes.capital}&days=3`);
    finalRes =await res.json();
    displayAllInputs()
  
  })();
};



