//using Microsoft.AspNetCore.Hosting;
//using Xunit.Sdk;

//namespace PortTimeReactApp.Data
//{
//    public class TestServerFixture : IDisposable
//    {
//        public TestServer Server { get; }
//        public HttpClient Client { get; }

//        public TestServerFixture()
//        {
//            var builder = new WebHostBuilder()
//            .UseEnvironment("Testing")
//                .UseStartup<TestStarting>();

//            Server = new TestServer(builder);
//            Client = Server.CreateClient();
//        }

//        public void Dispose()
//        {
//            Server.Dispose();
//            Client.Dispose();
//        }
//    }

//}
