using System.Text.Json.Serialization;
using PortTimeReactApp.Data;

namespace PortTimeReactApp.Data
{
    public class CurrentWeatherResponse
    {
        [JsonPropertyName("location")]
        public Location Location { get; set; }

        [JsonPropertyName("current")]
        public Current Current { get; set; }
    }
}
