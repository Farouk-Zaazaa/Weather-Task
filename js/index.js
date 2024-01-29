// search var 
let inputSearch = document.getElementsByClassName("input-search")

// today weather var 
let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayNumber");
let todayMonth= document.getElementById("todayMonth");
let todayLocation= document.getElementById("todayLocation");
let todayTemp= document.getElementById("todayTemp");
let todayImg= document.getElementById("todayImg");
let todayText= document.getElementById("todayText");
let todayHumidity= document.getElementById("todayHumidity");
let todayWind= document.getElementById("todayWind");
let todayWindDirection= document.getElementById("todayWindDirection");

// next day weather var 
let nextDay= document.getElementsByClassName("nextDay");
let nextImg=document.getElementsByClassName("nextImg");
let nextMaxTemp= document.getElementsByClassName("nextMaxTemp");
let nextMinTemp= document.getElementsByClassName("nextMinTemp");
let nextTempCondition= document.getElementsByClassName("nextTempCondition");

//today Date var
let date= new Date()
dayNumber= date.getDate()
dayName= date.toLocaleDateString("en-US",{weekday:"long"})
monthName= date.toLocaleDateString("en-US",{month:"long"})

// search var 
let searchInput = document.getElementById("search")

// ===========================================================================

// Fetch API data
async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2702dce10d5e4ff49a4211223242901&q=${cityName}&days=7`)
    let weatherData = await weatherResponse.json()
    return weatherData
}

// display today's data
function displayTodayData(data){
    todayName.innerHTML = dayName
    todayNumber.innerHTML = dayNumber
    todayMonth.innerHTML =monthName
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayImg.setAttribute("src",data.current.condition.icon)
    todayText.innerHTML = data.current.condition.text
    todayHumidity.innerHTML = data.current.humidity+"%"
    todayWind.innerHTML = data.current.wind_kph+"km/hr"
    todayWindDirection.innerHTML = data.current.wind_dir
}

function displayNextData(data){
    let forecastData = data.forecast.forecastday
    for(let i = 0 ; i<2 ; i++){
        let nextDate = new Date(forecastData[i+1].date)
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextTempCondition[i].innerHTML = forecastData[i+1].day.condition.text
        nextImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
    }
}

async function startApp(city="cairo"){
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}

startApp()

searchInput.addEventListener("keyup",function(){
    startApp(searchInput.value)
})