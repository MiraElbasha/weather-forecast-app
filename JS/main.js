// DOM selections – plug your API data into these

let searchInput = document.getElementById("searchInput");

let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayNumber");
let todayMonth = document.getElementById("todayMonth");
let city = document.getElementById("city");
let todayTemp = document.getElementById("todayTemp");
let todayIcon = document.getElementById("todayIcon");
let todayCondition = document.getElementById("todayCondition");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDir = document.getElementById("windDir");

let nextDayName = document.getElementsByClassName("nextDayName");
let nextDayIcon = document.getElementsByClassName("nextDayIcon");
let maxTemp = document.getElementsByClassName("maxTemp");
let minTemp = document.getElementsByClassName("minTemp");
let nextDayCondition = document.getElementsByClassName("nextDayCondition");



//featch API data from weather forcast api docs
async function GetWeatherData(city){
  let weatherRes = await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ed7704a14a94434a7384830262402&q=${city}&days=7`);
  let weatherData = await weatherRes.json();
  return weatherData;
  
}
GetWeatherData();



//display data for current day
function DisplayCurrentDay(data){
  //new object of date class
  let currentDate = new Date(); 
  //use class date methods to get month and weekday names
  todayName.innerHTML = currentDate.toLocaleDateString("en-US" ,  {weekday:'long'})
  todayMonth.innerHTML = currentDate.toLocaleDateString("en-US" ,  {month:'long'})
  todayNumber.innerHTML = currentDate.getDate();
  //remove static text and add the value of the property name in object location
  city.innerHTML = data.location.name;
  //remove static text and add the value of the property tem_c in object current
  todayTemp.innerHTML = data.current.temp_c;
  todayIcon.setAttribute("src", "https:" + data.current.condition.icon);
  todayCondition.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity+ "%";
  wind.innerHTML =  data.current.wind_kph+"k/h";
  windDir.innerHTML = data.current.wind_dir;

}


//display data for next day
function DisplayNextDay(data)
{
  //easier and shorter accessability to reach the 7 days data faster
  let forcastData = data.forecast.forecastday;

  //here we used for loop becuase the next days is a node list collection contain days not one day as the current day
for(let i =0 ; i <2; i++){
   let NexDate = new Date(forcastData[i + 1].date);
  // i + 1 --> becuase i need data of the next day not the current day
  maxTemp[i].innerHTML = forcastData[i + 1].day.maxtemp_c + "C";
  minTemp[i].innerHTML = forcastData[i + 1].day.mintemp_c + "C";
  nextDayIcon[i].setAttribute("src" , "https:" + forcastData[i + 1].day.condition.icon);
  nextDayCondition[i].innerHTML = forcastData[i + 1].day.condition.text;
  nextDayName[i].innerHTML =  NexDate.toLocaleDateString("en-US" ,  {weekday:'long'})
}    
}


searchInput.addEventListener("input" , function(){
  //whilee calling the start() app function pass the search input value as a parameter to it
  SatrtApp(searchInput.value)
})


//startApp() function has a parameter = city name in api URL = search input value --> defualt value "cairo"
async function SatrtApp(city = 'cairo'){
  //assigned the upcoming data from api to A variable to be us4ed in all display functions
  let weatherData = await GetWeatherData(city);

  if(!weatherData.error){
    DisplayCurrentDay(weatherData);
    DisplayNextDay(weatherData); 
  }
}

SatrtApp();