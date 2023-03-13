using PortTimeReactApp.Data;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

namespace PortTimeReactApp.Tests
{
    public class IntegrationTests
    {
        private readonly HttpClient _httpClient = new HttpClient();

        [Fact]
        public async Task GetWeather_ReturnsCityWeather()
        {
            // Arrange
            var cityName = "New York";
            var baseUrl = "https://localhost:7115"; // Replace with your base URL

            // Act
            var response = await _httpClient.GetAsync($"{baseUrl}/City/GetWeather?cityName={cityName}");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<CityWeather>();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(cityName, result.City);
        }

        [Fact]
        public async Task GetWeather_ReturnsNotFound_WhenCityNameIsInvalid()
        {
            // Arrange
            var cityName = "InvalidCityName";
            var baseUrl = "https://localhost:7115"; // Replace with your base URL

            // Act
            var response = await _httpClient.GetAsync($"{baseUrl}/City/GetWeather?cityName={cityName}");

            // Assert
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
