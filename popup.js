function sendMessage() {
    chrome.runtime.sendMessage({action: "getCurrentForecast"}, function(response) {
        if (response == null) {
            setTimeout(sendMessage, 2000);
        } else {
            showResult(response);
        }
    });
}

function showResult(response) {
    var statusDiv = document.getElementById("status");
    var icoImg = document.getElementById("ico");
    var temperatureDiv = document.getElementById("temperature");

    statusDiv.textContent = response.currently.summary;
    if(response.currently.summary == "Ligeiramente Nublado")
    {
        statusDiv.textContent = "Slightly cloudy"
    }
    else if(response.currently.summary == "Úmido e Ligeiramente Nublado")
    {
        statusDiv.textContent = "Undying and Slightly Cloudy"
    }

    temperatureDiv.style.display = "block";
    temperatureDiv.textContent = response.currently.temperature.toString().split('.')[0] + "˚C";

    icoImg.style.display = "block";
    icoImg.src = chrome.extension.getURL("/" + response.currently.icon + ".png");

}

document.addEventListener('DOMContentLoaded', sendMessage);