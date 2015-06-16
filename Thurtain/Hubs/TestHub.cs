using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using CardModels;

namespace Thurtain.Hubs
{
    public class TestHub : Hub
    {
        public void GetFullDeck()
        {
            //DeckOfCards deck = new DeckOfCards();
            //Clients.Client(Context.ConnectionId).SendFullDeck(new DeckOfCards().deck);
            
            Clients.All.SendFullDeck(new DeckOfCards().deck);

        }
    }
}