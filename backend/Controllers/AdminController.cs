using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("addUpdateCosmeticProducts")]
        public Response addUpdateCosmeticProducts(CosmeticProducts cosmeticProducts)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ECosmetics").ToString());
            
            Response response = dal.addUpdateCosmeticProducts(cosmeticProducts, connection);
            return response;
        }
    }
}
