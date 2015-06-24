using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbService;
using DbService.Entities;
using Newtonsoft.Json;

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
                User user = UserDbService.GetUserByEmail(email);
                return JsonConvert.SerializeObject(user);
            }
            else
            {
                return null;
            }
        }

	}
}