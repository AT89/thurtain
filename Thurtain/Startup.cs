using Microsoft.Owin;
using Owin;
using UserService;

namespace Thurtain
{   
    public class Startup
    {

        // Configure the OWIN pipeline here
        public void Configuration(IAppBuilder app)
        {
            UserService.AllUsers.Users.Clear();
            app.MapSignalR();
        }
    }
}