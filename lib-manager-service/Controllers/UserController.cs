
using Swashbuckle.AspNetCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using lib_manager.Database;
using lib_manager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace lib_manager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IConfiguration _config;
        private UserContext _context;

        public UserController(IConfiguration config, UserContext context)
        {
            _config = config;
            _context = context;
        }
        
        [AllowAnonymous]
        [HttpPost("Register")]

        public IActionResult Register([FromBody] UserModel login)
        {
            IActionResult response = StatusCode(409, "User Already Exists");
            var temp = AuthenticateUser(login);
            if (temp == null)
            {
                _context.UserList.Add(CreateUser(login));
                _context.SaveChanges();
                var tokenString = GenerateJSONWebToken(login);
                response = Ok(new { token = tokenString });
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost("Login")]

        public IActionResult Login([FromBody] UserModel login)
        {
            IActionResult response = StatusCode(401, "Username or Password is Incorrect");
            var user = AuthenticateUser(login);
            if (user != null)
            {
                if (user.password.Equals(login.password))
                {
                    login.role = GetRole(login.username);
                    var tokenString = GenerateJSONWebToken(login);
                    response = Ok(new { token = tokenString });
                }
            }
            return response;
        }

        private UserModel.Role GetRole(string username)
        {
            var temp = _context.UserList.First(x => x.username == username);
            return temp.role;
        }
        
        [HttpGet("UserList")]
        public IActionResult Users()
        {
            IActionResult response = Ok(_context.UserList.ToList());
            return response;
        }


        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.username),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.username),
                new Claim("Role", userInfo.role.ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, "Front End"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(1000),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private UserModel CreateUser(UserModel login)
        {
            return new UserModel { username = login.username, password = login.password, role = UserModel.Role.User };
        }


        private UserModel AuthenticateUser(UserModel data)
        {
            return _context.UserList.FirstOrDefault(x => x.username == data.username);
        }
    }
}