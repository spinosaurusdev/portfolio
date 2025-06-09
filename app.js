//Script para mostrar el clima actual del usuario
// Función para obtener la ubicación del usuario
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getClima, handleError);
  } else {
    document.getElementById("clima").textContent =
      "Geolocation is not supported by this browser.";
  }
}

// Función para manejar errores de geolocalización
function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("clima").textContent =
        "The user denied the geolocation request.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("clima").textContent =
        "Location information is not available.";
      break;
    case error.TIMEOUT:
      document.getElementById("clima").textContent =
        "The request to obtain the user's location has expired.";
      break;
    default:
      document.getElementById("clima").textContent =
        "An unknown error occurred.";
      break;
  }
}

// Función para obtener el clima utilizando una API de clima
function getClima(position) {
  const latitud = position.coords.latitude;
  const longitud = position.coords.longitude;

  // URL de la API de OpenWeatherMap
  const apiKey = "67f3ae8696b4ba77c0bf3d29d1e02d52";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric&lang=en`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const city = data.name;

      // Mostrar el clima en el elemento <p>
      document.getElementById(
        "clima"
      ).textContent = `In ${city}, the climate is ${description} with a temperature of ${temperature}°C.`;
    })
    .catch((error) => {
      console.error("Error getting weather:", error);
      document.getElementById("clima").textContent = "Could not get weather.";
    });
}

// Llamada a la función para obtener la ubicación cuando se carga la página
document.addEventListener("DOMContentLoaded", getLocation);

//Script para mostrar la fecha y hora actual
// Función para mostrar la fecha y hora actual
function showDateTime() {
  const now = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  document.getElementById("date").innerHTML = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(now);
}
setInterval(showDateTime, 1000);

//Llamada a la accion para email me.
function showTime() {
  let time = new Date();
  let options = {
    hour: "numeric",
    minute: "numeric",
  };
  let hour = new Intl.DateTimeFormat("en-US", options).format(time);

  document.getElementById(
    "time"
  ).textContent = `It's only ${hour}, good time for you to send me a  ¡`;
}
setInterval(showTime, 1000);

//Script para el efecto de sombra dinámica en el título principal
// Seleccionar el elemento
const shadow = document.querySelector(".main__title__h1");

// Función para calcular la posición relativa del mouse respecto al centro del elemento
function updateShadow(event) {
  // Obtener las dimensiones y posición del elemento
  const rect = shadow.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calcular la diferencia entre la posición del mouse y el centro del elemento
  const deltaX = event.clientX - centerX;
  const deltaY = event.clientY - centerY;

  // Escalar los valores para que la sombra no sea demasiado grande
  const shadowX = deltaX * 0.05; // Multiplicador para suavizar el movimiento
  const shadowY = deltaY * 0.05;

  // Aplicar la sombra dinámica
  shadow.style.textShadow = `${shadowX}px ${shadowY}px 7px var(--background)`;
}

// Agregar el evento de movimiento del mouse
document.addEventListener("mousemove", updateShadow);

//Script para el cambio de modo claro a oscuro
// Seleccionamos el botón y el elemento <html>
const themeToggle = document.getElementById("theme-toggle");
const rootElement = document.documentElement;

// Función para alternar el tema
function toggleTheme() {
  const currentTheme = rootElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    // Cambiar a modo claro
    rootElement.setAttribute("data-theme", "light");
  } else {
    // Cambiar a modo oscuro
    rootElement.setAttribute("data-theme", "dark");
  }
}

// Agregamos un evento al botón
themeToggle.addEventListener("click", toggleTheme);

// Verificamos si hay un tema guardado en localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  rootElement.setAttribute("data-theme", savedTheme);
}

// Guardamos el tema seleccionado en localStorage
themeToggle.addEventListener("click", () => {
  const currentTheme = rootElement.getAttribute("data-theme");
  localStorage.setItem("theme", currentTheme);
});
