using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbService;
using DbService.Entities;
using Newtonsoft.Json;
using UserService;

namespace Thurtain.Controllers
{
    public class UserController : Controller
    {

        [HttpPost]
        public bool TryCreateNewUser(string username, string email)
        {
            return UserDbService.CreateNewUser(username, email);
        }

        [HttpPost]
        public string EmailExists(string email)
        {
            //return UserDbService.CheckUserExistsByEmail(email);
            if (UserDbService.CheckUserExistsByEmail(email))
            {
                DbService.Entities.User user = UserDbService.GetUserByEmail(email);
                return JsonConvert.SerializeObject(user);
            }
            else
            {
                return null;
            }
        }

        [HttpPost]
        public bool CanJoinGame()
        {
            int currentNumPlayers = Players.GetPlayers().Count;
            return (currentNumPlayers < 2) ? true : false;
        }

	}
}