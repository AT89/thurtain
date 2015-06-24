using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DbService.Entities;
using UserService;


namespace DbService
{
    public static class GameDbService
    {
        public static void PlayerLeft(string connectionId)
        {
            var players = Players.GetPlayers();

            var loser = players.Where(p => p.ConnectionId == connectionId).FirstOrDefault();           
            var winner = players.Where(p => p.ConnectionId != connectionId).FirstOrDefault();

            using (ThurtainContext db = new ThurtainContext())
            {
                UserStat loserRow = db.UserStats.Where(u => u.UserName == loser.UserName).FirstOrDefault();
                loserRow.Losses = loserRow.Losses + 1;

                UserStat winnerRow = db.UserStats.Where(u => u.UserName == winner.UserName).FirstOrDefault();
                winnerRow.Wins = winnerRow.Wins + 1;

                db.GameResults.Add(new GameResult()
                    {
                        PlayedAt = DateTime.Now,
                        WinnerUserName = winner.UserName,
                        LoserUserName = loser.UserName
                    });

                db.SaveChanges();
            }
        }

        public static void RecordGameResults(UserService.User winner, UserService.User loser)
        {
            using (ThurtainContext db = new ThurtainContext())
            {
                UserStat loserRow = db.UserStats.Where(u => u.UserName == loser.UserName).FirstOrDefault();
                loserRow.Losses++;

                UserStat winnerRow = db.UserStats.Where(u => u.UserName == winner.UserName).FirstOrDefault();
                winnerRow.Wins++;

                db.GameResults.Add(new GameResult()
                {
                    PlayedAt = DateTime.Now,
                    WinnerUserName = winner.UserName,
                    LoserUserName = loser.UserName
                });

                db.SaveChanges();
            }
        }

        public static string GetAlltimeStatsBetween(string player1Username, string player2Username)
        {
            using (ThurtainContext db = new ThurtainContext())
            {
                var player1wins = db.GameResults
                    .Where(m => m.WinnerUserName == player1Username)
                    .Where(m => m.LoserUserName == player2Username).ToList().Count;

                var player2wins = db.GameResults
                    .Where(m => m.WinnerUserName == player2Username)
                    .Where(m => m.LoserUserName == player1Username).ToList().Count;

                return String.Format("{0} {1} - {2} {3}",
                    player1Username, player1wins.ToString(), player2Username, player2wins.ToString());
            }
        }

    }
}
