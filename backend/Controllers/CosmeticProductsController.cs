using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using backend.Models;
using System.Data.SqlClient;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CosmeticProductsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CosmeticProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("addToCart")]
        public Response addToCart(Cart cart)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ECosmetics").ToString());
            Response response = dal.addToCart(cart, connection);
            return response;
        }
        [HttpPost]
        [Route("placeOrder")]
        public Response placeOrder(Users users)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ECosmetics").ToString());
            Response response = dal.placeOrder(users, connection);
            return response;
        }
        [HttpPost]
        [Route("orderList")]
        public Response orderList(Users users)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ECosmetics").ToString());
            Response response = dal.orderList(users, connection);
            return response;
        }

    }
}