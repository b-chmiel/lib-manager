using lib_manager;
using lib_manager.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace lib_manager_tests
{
    public class WeatherForecastControllerTest
    {
        private WeatherForecastController _controller;
        private ControllerContext _controllerContext;

        [SetUp]
        public void Setup()
        {
            var mockRequest = new Mock<HttpRequest>();
            var headers = new HeaderDictionary();
            mockRequest.Setup(x => x.Headers).Returns(headers);

            var httpContext = Mock.Of<HttpContext>(_ =>
                _.Request == mockRequest.Object
            );
            _controllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };
            _controller = new WeatherForecastController(null)
            {
                ControllerContext = _controllerContext
            };
        }

        [Test]
        public void TestReturnsNotNull()
        {
            var result = _controller.Get();
            Assert.NotNull(result);
        }
    }
}