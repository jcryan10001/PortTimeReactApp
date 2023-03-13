using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System;
using Newtonsoft.Json.Linq;
using PortTimeReactApp.Data;
using System.Globalization;
using System.Net;
using System.Text.Json;

namespace PortTimeReactApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CityController : ControllerBase
    {
        private HttpClient _httpClient = new HttpClient();
        private string WeatherApiKey => "0f01ac738e5f459194a135448230303";//api key for weatherapi.com


        // This method is used to retrieve the weather data for a specific city by making a request to the weather API
        // It retrieves the current weather data as well as the astronomy data (sunrise and sunset times)
        // The JSON responses are deserialized into C# objects using the System.Text.Json library
        // The current weather and astronomy data are combined into a single object of type CityWeather and returned as an ActionResult
        [HttpGet("GetWeather")]
        public async Task<ActionResult<CityWeather>> GetWeather(string cityName)
        {
            CityWeather emptyCity = new CityWeather();
            try
            {
                var currentWeatherResponse = await _httpClient.GetAsync($"http://api.weatherapi.com/v1/current.json?key={WeatherApiKey}&q={cityName}&aqi=no");
                currentWeatherResponse.EnsureSuccessStatusCode();
                var currentWeatherJson = await currentWeatherResponse.Content.ReadAsStringAsync();
                var currentWeatherData = JsonSerializer.Deserialize<CurrentWeatherResponse>(currentWeatherJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                var astronomyResponse = await _httpClient.GetAsync($"http://api.weatherapi.com/v1/astronomy.json?key={WeatherApiKey}&q={cityName}&dt={currentWeatherData.Current.LastUpdated:yyyy-MM-dd}");
                astronomyResponse.EnsureSuccessStatusCode();
                var astronomyJson = await astronomyResponse.Content.ReadAsStringAsync();
                var astroData = JsonSerializer.Deserialize<AstronomyResponse>(astronomyJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                var flatData = new FlatData
                {
                    CurrentData = new CurrentData
                    {
                        Location = new List<Location> { currentWeatherData.Location },
                        Current = new List<Current> { currentWeatherData.Current }
                    },
                    AstronomyData = new AstronomyData
                    {
                        Astronomies = new List<Astronomy> { astroData.Astronomy }
                    }
                };

                var localTimeStr = currentWeatherData.Current.;
                var sunriseStr = astroData.Astronomy.Astro.Sunrise;
                var sunsetStr = astroData.Astronomy.Astro.Sunset;
                DateTime localTime = DateTime.Parse(localTimeStr);
                var sunSet = DateTime.ParseExact(sunsetStr, "hh:mm tt", CultureInfo.InvariantCulture);
                var sunRise = DateTime.ParseExact(sunriseStr, "hh:mm tt", CultureInfo.InvariantCulture);

                var cityWeather = new CityWeather
                {
                    City = currentWeatherData.Location.Name,
                    Region = currentWeatherData.Location.Region,
                    Country = currentWeatherData.Location.Country,
                    LocalTime = localTime,
                    Temperature = currentWeatherData.Current.TempC,
                    Sunrise = sunRise,
                    Sunset = sunSet,
                    flatData = flatData
                };
                return Ok(cityWeather);
            }
            catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return NotFound();
            }
        }



    
    }
}
