using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Thurtain.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/
        //public ActionResult Index()
        //{
        //    return View();
        //}

        [HttpPost]
        public string Test()
        {
            return "this was returned from UserController!";
        }
	}
}