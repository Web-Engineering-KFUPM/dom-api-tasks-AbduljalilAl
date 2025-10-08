/*
=======================================
📘 JavaScript & Web APIs Lab
All tasks in one file (script.js)
=======================================
*/

/*  
=======================================
TODO1: Welcome Board
---------------------------------------
When the page loads, display a welcome message 
inside the <p> element with id="t1-msg".

✅ Task:
- Select the element with id "t1-msg".
- Change its text to "Hello, World!".

💡 Hint:
document.getElementById("t1-msg").innerHTML = "Hello, World!";
*/
 document.addEventListener("DOMContentLoaded", () => {
    const welMsg = document.getElementById("t1-msg");
    welMsg.textContent = "👋 Hello, welcome to City Life!";

/*  
=======================================
TODO2: Interaction Corner
---------------------------------------
There is a button with id="t2-btn".
When the button is clicked, change the text inside 
the <p> with id="t2-status" to:
    "You clicked the button!"

✅ Task:
- Get the button element.
- Add a click event listener.
- Inside the event, change the text of the status paragraph.

💡 Hint:
button.addEventListener("click", function () {
    // change text here
});
*/
    const btnT2 = document.getElementById("t2-btn");
    const statusT2 = document.getElementById("t2-status");
    btnT2.addEventListener("click", function () {
    statusT2.textContent = "✨ You clicked the button!";
  });
/*  
=======================================
TODO3: Inspiring Quote Board
---------------------------------------
Use the Quotable API to display a random quote.

🌍 API Link:
https://dummyjson.com/quotes/random

✅ Task:
- When the button with id="t3-loadQuote" is clicked:
    - Fetch a random quote from the API.
    - Display the quote text inside the <p> with id="t3-quote".
    - Display the author inside the <p> with id="t3-author".

💡 Hint:
The API returns JSON like:
{
  "content": "Do not watch the clock. Do what it does. Keep going.",
  "author": "Sam Levenson"
}

Use:
data.content   // the quote text
data.author    // the author
*/
    const quoteBtnT3 = document.getElementById("t3-loadQuote");
  const quoteT3 = document.getElementById("t3-quote");
  const authorT3 = document.getElementById("t3-author");

  quoteBtnT3.addEventListener("click", async () => {
    quoteBtnT3.disabled = true;
    quoteT3.textContent = "Loading…";
    authorT3.textContent = "";

    try {
      const API = await fetch("https://dummyjson.com/quotes/random");
      if (!API.ok)
            throw new Error("HTTP " + API.status);
        const data = await API.json();
        quoteT3.textContent = data.quote;
        authorT3.textContent = "- " + data.author;
    } catch (err) {
        quoteT3.textContent = "Keep pushing forward!";
        authorT3.textContent = "— Unknown";
    } finally {
        quoteBtnT3.disabled = false;
    }
  });

/*  
=======================================
TODO4: Dammam Weather Now
---------------------------------------
Use the OpenWeatherMap API to display live weather data.

🌍 API Link:
https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric

⚠️ Replace YOUR_API_KEY with your actual API key from:
https://openweathermap.org/api

✅ Task:
- When the button with id="t4-loadWx" is clicked:
    - Fetch current weather data for Dammam.
    - Show temperature in the element with id="t4-temp".
    - Show humidity in the element with id="t4-hum".
    - Show wind speed in the element with id="t4-wind".

💡 Hint:
data.main.temp      → temperature (°C)
data.main.humidity  → humidity (%)
data.wind.speed     → wind speed (m/s)
*/
    const wxBtnT4 = document.getElementById("t4-loadWx");
    const tempT4 = document.getElementById("t4-temp");
    const humT4 = document.getElementById("t4-hum");
    const windT4 = document.getElementById("t4-wind");
    const errT4 = document.getElementById("t4-err");

    wxBtnT4.addEventListener("click", async () => {
        wxBtnT4.disabled = true;
        errT4.textContent = "Loading weather data…";

        const base = "https://api.openweathermap.org/data/2.5/weather";
        const city = "Dammam";
        const units = "metric";
        const key = "e165eb54c7e62d96f188ac86e53b8983";
        const url = `${base}?q=${encodeURIComponent(city)}&appid=${key}&units=${units}`;

        try {
            const res = await fetch(url);
            if (!res.ok)
                throw new Error("HTTP " + res.status);

            const data = await res.json();
            tempT4.textContent = `${data.main.temp[1]} °C`;
            humT4.textContent = `${data.main.humidity}%`;
            windT4.textContent = `${data.wind.speed} m/s`;
            errT4.textContent = "";
    } catch (err) {
        errT4.textContent = "❌ Could not load weather data.";
    } finally {
        wxBtnT4.disabled = false;
    }
  });
});