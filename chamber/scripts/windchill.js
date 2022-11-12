function windChill() {
    let currentTemp = 49;
    let windSpeed = 12;
    let windChill = 48;
    
    if (windSpeed > 3 && currentTemp <= 50) {
        windChill = 35.74 + 0.6215 * currentTemp - 35.75 * windSpeed ** 0.16 + 0.4275 * currentTemp * windSpeed ** 0.16;
        windChill = windChill.toFixed(1)
    } else {
        windChill = "NA";
    }
    document.getElementById("temp").innerHTML = currentTemp;
    document.getElementById("speed").innerHTML = windSpeed;
    document.getElementById("chill").innerHTML = windChill;
}

windChill();