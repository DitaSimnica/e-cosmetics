//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace backend.Helpers
//{
//    public class JwtHelper
//    {
//        private readonly string _key;

//        public JwtHelper(string key)
//        {
//            _key = key;
//        }

//        public string GenerateJwtToken(string userId)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.ASCII.GetBytes(_key);
//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(new[] { new Claim("id", userId) }),
//                Expires = DateTime.UtcNow.AddDays(7),
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };
//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return tokenHandler.WriteToken(token);
//        }
//    }
//}
