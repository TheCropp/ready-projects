// DOM Elements
const time = document.querySelector('.time'),
  datetime = document.querySelector ('.datetime'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city');

var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
var monthes = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
// Options
const showAmPm = false;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    day = days[today.getDay()];
    number = today.getDate();
    month = monthes[today.getMonth()];

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}
   ${showAmPm ? amPm : ''}`;
  datetime.innerHTML = `${day}<span>, </span>${number}<span> </span>${month}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoons
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// Run
showTime();
setBgGreet();
getName();
getFocus();

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=17c232abf3123bd0fdbe8874b705857d&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}
getWeather()