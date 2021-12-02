//Make an AJX Request



//Create 2 functions
//1. Wait for the data and convert to JSON object
function waitFordata(response){
    return response.json();
}

//2. Logs actual data
function handleData(data){
    let currentTemp = data.main.temp;
    let maxTemp = data.main.temp_max;
    let minTemp = data.main.temp_min;
    
    let resultsDiv = document.querySelector("#results");
    let markup = `
        <p>Current Temp: ${currentTemp} degrees</p>
        <p>Min Temp: ${minTemp} degrees</p>
        <p>Max Temp: ${maxTemp} degrees</p>
    `;

    resultsDiv.innerHTML = markup;

    let utter = new SpeechSynthesisUtterance(
        `The current temperature is ${currentTemp}`
    );
    speechSynthesis.speak(utter);
}



function weatherData(location){
    //Base URL
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    //What are the required query parameters?
    // - q (Cityname)
    // - appid (API Key)

    //What are the optional query parameters?
    // - units (metrics or imperial)

    const apiKey = "70b7815a9325df1d691d675e2c72bd36";
    const queryString = `?q=${location}&appid=${apiKey}&units=metric`;

    const apiEndpoint = baseUrl + queryString;

    fetch(apiEndpoint).then(waitFordata).then(handleData);
    //Bonus: Log out min, max and curreny temp today
}

// Here is how to handle user input
let form = document.querySelector("form");

function onSubmit(event){
    event.preventDefault();
    let input = document.querySelector("input");
    let weatherLocation = input.value;

    weatherData(weatherLocation);
}

form.addEventListener("submit",onSubmit);