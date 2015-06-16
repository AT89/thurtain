using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using UserService;
using System.Threading.Tasks;
using GameService.DTO;

namespace Thurtain.Hubs
{
    public class UserHub : Hub
    {

        public void LoginAs(string username)
        {
            if (AllUsers.Users.Where(u => u.UserName == username).FirstOrDefault() != null)
            {
                Clients.Caller.HandleLoginRequest(false);
            }
            else if (AllUsers.UserNotInList(Context.ConnectionId))
            {
                Clients.Caller.HandleLoginRequest(true);
                User user = new User() { ConnectionId = Context.ConnectionId, UserName = username };
                AllUsers.Users.Add(user);
                SendUpdatedAllUsersList();
            }    
        }

        public void SendUpdatedAllUsersList()
        {
            Clients.All.UpdateAllUserList(AllUsers.Users);
        }

        public void Disconnect()
        {
            Players.RemovePlayer(Context.ConnectionId);
            PlayerStoodUp standEventData = new PlayerStoodUp()
            {
                User = AllUsers.GetUserBy(Context.ConnectionId),
                SeatsAvailable = 2 - Players.GetPlayers().Count
            };

            IHubContext gameHubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
            gameHubContext.Clients.All.StandEvent(standEventData);

            AllUsers.RemoveUserBy(Context.ConnectionId);
            SendUpdatedAllUsersList();
            Viewers.UpdateViewerList();
        }

        public override Task OnConnected()
        {
            SendUpdatedAllUsersList();
            Clients.Caller.ConnectionInitialized();
            Viewers.UpdateViewerList();
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            OnConnected();
            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Players.RemovePlayer(Context.ConnectionId);
            PlayerStoodUp standEventData = new PlayerStoodUp()
            {
                User = AllUsers.GetUserBy(Context.ConnectionId),
                SeatsAvailable = 2 - Players.GetPlayers().Count
            };

            IHubContext gameHubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
            gameHubContext.Clients.All.StandEvent(standEventData);

            AllUsers.RemoveUserBy(Context.ConnectionId);
            SendUpdatedAllUsersList();

            return base.OnDisconnected(true);
        }
    }
}