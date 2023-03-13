Port Time - A React app
This is a simple React app that displays the local time and weather information for a given city. The app fetches weather data from a REST API and displays it in a table.

Installation
To install the app, you'll need to have Node.js and npm installed on your computer. Clone the repository, navigate to the project directory, and run npm install to install the necessary dependencies.

Usage
To run the app, use the command npm start in the project directory. This will start a development server on port 3000, and the app will be available at http://localhost:3000.

To use the app, enter the name of a city in the input field and click the "Search" button. The app will fetch weather data for that city and display it in the table.

Development
This app was created using React, and uses the fetch API to communicate with the REST API. The app is built using components, and the state of the app is managed using the setState method. The app also uses the componentDidMount and componentWillUnmount lifecycle methods to start and stop a timer that updates the local time every second.

To modify the app, you can edit the components in the src directory. You can also modify the styling in the src/App.css file.

API=================================

GET Request
URL: /city/GetWeather?cityName=Tokyo

Parameters
Name        Type	Description
cityName	string	The name of the city to retrieve.
Response
Success (200)
{
    "city": "Tokyo",
    "region": "",
    "country": "Japan",
    "localTime": "2023-03-13T08:12:13.000Z",
    "temperature": 12.2,
    "sunrise": "2023-03-12T21:57:09.000Z",
    "sunset": "2023-03-13T09:33:38.000Z",
    "flatData": {
        "currentData": {
            "location": [
                {
                    "name": "Tokyo",
                    "region": "",
                    "country": "Japan",
                    "lat": 35.69,
                    "lon": 139.69,
                    "tz_id": "Asia/Tokyo",
                    "localtime_epoch": 1647738530,
                    "localtime": "2023-03-13 17:08"
                }
            ],
            "current": [
                {
                    "last_updated_epoch": 1647738000,
                    "last_updated": "2023-03-13 17:00",
                    "temp_c": 12.2,
                    "temp_f": 54,
                    "is_day": 1,
                    "condition": {
                        "text": "Sunny",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                        "code": 1000
                    },
                    "wind_mph": 6.9,
                    "wind_kph": 11.2,
                    "wind_degree": 320,
                    "wind_dir": "NW",
                    "pressure_mb": 1014,
                    "pressure_in": 30.4,
                    "precip_mm": 0,
                    "precip_in": 0,
                    "humidity": 47,
                    "cloud": 0,
                    "feelslike_c": 12.2,
                    "feelslike_f": 54,
                    "vis_km": 10,
                    "vis_miles": 6,
                    "uv": 5,
                    "gust_mph": 11.2,
                    "gust_kph": 18
                }
            ]
        },
        "astronomyData": {
            "astronomies": [
                {
                    "astro": {
                        "sunrise": "06:01 AM",
                        "sunset": "06:06 PM",
                        "moonrise": "04:08 PM",
                        "moonset": "05:27 AM"
                    }
                }
            ]
        }
    }
}
if Error(404) 
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-..."
}

Testing===============================================================

[Unit Tests]
**to run first navigate to "PortTimeReactApp\UnitTestProject" followed by dotnet test command
The tests included in the PortTimeReactApp.tests project are unit tests that are designed to test the behavior of the CityController's GetWeather method under different scenarios.

To run the tests, you can use a test runner such as the one built into Visual Studio or JetBrains Rider. Alternatively, you can run the tests using the command line by navigating to the project directory and running the following command:dotnet test before navigating to the projects directory
This will build and run all of the tests in the project.

The tests in this project are designed to test the CityController's behavior in a standalone environment, without the need for a running web server. Instead, the tests make use of the controller's methods directly, passing in sample input and verifying the output against expected results.

For example, the GetWeather_ReturnsNotFound_WhenCityNameIsEmpty test case checks that the GetWeather method returns a NotFoundResult when the city name parameter is an empty string. The test creates an instance of the CityController, calls the GetWeather method with an empty string as the city name, and verifies that the result is of type NotFoundResult and that the status code is 404.


[Integration Tests]
The integration tests in this project use the HttpClient class to send requests to the API endpoints and receive responses. The tests then validate that the responses contain the expected data.

In the above code snippet, there are two integration tests:

The first test sends a request to the /City/GetWeather endpoint with a valid city name and validates that the response contains a non-null CityWeather object with the expected city name.

The second test sends a request to the same endpoint with an invalid city name and validates that the response has a status code of 404 (not found).

To run the integration tests, navigate to the PortTimeReactApp.Tests project in the solution explorer and run the tests using the test runner provided by your IDE or by running the dotnet test command in the command line. Note that the ASP.NET Core Web API project must be running for the integration tests to pass.

[UI Test]
to test the UI navigate to PortTimeReactApp\PortTimeReactApp\ClientApp followed by npm test

Credits
This app was created by Jai Choudhary. It uses the OpenWeatherMap API to fetch weather data.

License
This app is licensed under the MIT License. See the LICENSE file for more information.