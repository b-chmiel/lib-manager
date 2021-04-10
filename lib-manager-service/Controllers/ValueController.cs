using System.Web.Http;
using WebApi.Jwt.Filters;

namespace lib_manager.Controllers
{
    public class ValueController : ApiController
    {
        [JwtAuthentication]
        public string Get()
        {
            return "value";
        }
    }
}