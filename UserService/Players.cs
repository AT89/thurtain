using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService
{
    public static class Players
    {
        private static List<User> players = new List<User>();

        public static void AddPlayer(string connectionId)
        {
            // Can only have 2 players, and only add if the user is NOT already in the list.
            if (players.Count < 2)
            {
                if (!players.Any(p => p.ConnectionId == connectionId))
                    players.Add(AllUsers.GetUserBy(connectionId));
            }
        }

        // THIS REMOVE FUNCTION IS WRONG?
        public static void RemovePlayer(string connectionId)
        {
            if (players.Count > 0)
                players.RemoveAll(p => p.ConnectionId == connectionId);
        }

        public static List<User> GetPlayers()
        {
            return players;
        }
    }
}
