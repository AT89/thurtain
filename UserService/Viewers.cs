using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace UserService
{
    public static class Viewers
    {
        public static List<User> viewers = new List<User>();

        // Viewers list is simply the all viewers list, 
        // excluding the players.
        public static void UpdateViewerList()
        {        
            List<User> players = Players.GetPlayers();

            string player1connectionId = default(string), 
                   player2connectionId = default(string);

            if (players.Count == 1) 
            {
                player1connectionId = players[0].ConnectionId;
            } 
            else if (players.Count == 2) 
            {
                player1connectionId = players[0].ConnectionId;
                player2connectionId = players[1].ConnectionId;
            }

            viewers = AllUsers.Users
                        .Where(u => u.ConnectionId != player1connectionId)
                        .Where(u => u.ConnectionId != player2connectionId)
                        .ToList();             
        }
    }
}
