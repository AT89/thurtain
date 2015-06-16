using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using UserService;
using System.Threading.Tasks;

namespace Thurtain.Hubs
{
    public class ChatHub : Hub
    {
        public class ChatMessage
        {
            public string Message { get; set; }
            public string UserName { get; set; }
        }

        public void SendChat(string chatMessage)
        {
            User caller = AllUsers.GetUserBy(Context.ConnectionId);
            ChatMessage msg = new ChatMessage() { Message = chatMessage, UserName = caller.UserName };
            Clients.All.BroadcastChatMessage(msg);
        }

    }

    
}