using System;
using Xunit;
using PortTimeReactApp;
using Xceed.Wpf.Toolkit;
using PortTimeReactApp.Controllers;
using PortTimeReactApp.Data;
using PortTimeReactApp.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace PortTimeReactApp.tests
{
    public class UnitTest
    {

        [Fact]
        public async Task GetWeather_ReturnsNotFound_WhenCityNameIsInvalid()
        {
            // Arrange
            var controller = new CityController();

            // Act
            var result = await controller.GetWeather("InvalidCityName");

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
            Assert.Equal(404, (result.Result as StatusCodeResult).StatusCode);
        }

        [Fact]
        public async Task GetWeather_ReturnsOk_WhenCityNameIsValid()
        {
            // Arrange
            var controller = new CityController();

            // Act
            var result = await controller.GetWeather("New York");

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }


        [Fact]
        public async Task GetWeather_ReturnsNotFound_WhenCityNameIsEmpty()
        {
            // Arrange
            var controller = new CityController();

            // Act
            var result = await controller.GetWeather("");

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
            Assert.Equal(404, (result.Result as StatusCodeResult).StatusCode);
        }



    }
}
