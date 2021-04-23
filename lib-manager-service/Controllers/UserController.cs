
using Swashbuckle.AspNetCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using lib_manager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace lib_manager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private IConfiguration _config;
        public List<UserModel> users=new List<UserModel>
        {
            new UserModel {username = "test1@gmail.com", password = "123", role = UserModel.Role.User}, 
            new UserModel {username = "thepope@gmail.com", password = "123", role = UserModel.Role.User}   
        };
        public UserController(IConfiguration config)
        {
            _config = config;
        }

        //[Authorize(Roles = "Admin, User")]
        
        
        [AllowAnonymous]
        [HttpPost("Register")]
        
        public IActionResult Register([FromBody] UserModel login)
        {
            //to do: 
            //check if provided email is in database
            //if yes, return unauthorized
            //if no, create the uservar result = new OkObjectResult(new { message = "200 OK", currentDate = DateTime.Now });
            IActionResult response = new OkObjectResult(new { message = "User Already Exists"});
            var temp = AuthenticateUser(login);
            if (temp == null)
            {
                users.Add(CreateUser(login));
                var tokenString = GenerateJSONWebToken(login);
                response = Ok(new {token = tokenString});
            }
            return response;
        }
        
        [AllowAnonymous]
        [HttpPost ("Login")]
        
        public IActionResult Login([FromBody] UserModel login)
        {
            //to do: 
            //check if provided email is in database
            //if yes, check if provided password matches stored password
            IActionResult response = new OkObjectResult(new { message = "User Doesn't Exist"});
            var user = FindUser(login);
            if (user != null)
            {
                Console.WriteLine(user.password);
                Console.WriteLine(login.password);
                if (user.password.Equals(login.password))
                {
                    var tokenString = GenerateJSONWebToken(login);
                    response = Ok(new {token = tokenString});
                }
                else
                {
                    response= new OkObjectResult(new { message = "Incorrect Password"});
                }
            }
            
            return response;
        }
        
        
//add role into jwt token
        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.username),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.username),
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
            //create user with provided model information
            //add user to database
            UserModel user = null;
            user = new UserModel {username = login.username, password = login.password, role = UserModel.Role.User};
            return user;
        }

        private UserModel FindUser(UserModel login)
        {
            //if user in database, return the user
            //if user not in database, return null
            UserModel result = null;
            //find user using LINQ query
            foreach (var user in users)
            {
                if (user.username.Equals(login.username))
                {
                    Console.WriteLine("Found user");
                    result = user;
                }
            }
            
            
            return result;
        }
        
        
        private UserModel AuthenticateUser(UserModel data)
        {
            //if user is in database, return user
            //if user is not in database, return null
            UserModel user = null;
            
            return FindUser(data);
        }
    }
}