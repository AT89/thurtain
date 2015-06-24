using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using UserService;
using System.Threading.Tasks;
using GameService;
using CardModels;
using GameService.DTO;
using DbService;
using DbService.Entities;

namespace Thurtain.Hubs
{
    public class GameHub : Hub
    {

        public void PlayerSits()
        {
            if (Players.GetPlayers().Count < 2)
            {
                Players.AddPlayer(Context.ConnectionId);
                Viewers.UpdateViewerList();

                PlayerSatDown sitEventData = new PlayerSatDown()
                {
                    User = AllUsers.GetUserBy(Context.ConnectionId),
                    SeatsAvailable = 2 - Players.GetPlayers().Count
                };

                if (Players.GetPlayers().Count == 2)
                    GameStart();
            }
            //else if (Players.GetPlayers().Count == 2)
            //{
            //    Clients.Caller.NotifyGameFull();
            //}
        }

        public void PlayerStands(bool hasPlayedHand)
        {
            // Record a loss if game is in session (if players.Count is 2),
            // and the player has already played a hand
            if (Players.GetPlayers().Count == 2 && hasPlayedHand)
            {
                GameDbService.PlayerLeft(Context.ConnectionId);
            }

            Players.GetPlayers().Clear();

            Viewers.UpdateViewerList();

            PlayerStoodUp standEventData = new PlayerStoodUp()
            {
                User = AllUsers.GetUserBy(Context.ConnectionId),
                SeatsAvailable = 2 - Players.GetPlayers().Count
            };

            Clients.All.StandEvent(standEventData);
        }

        public void GameStart()
        {
            GameInitializer init = new GameInitializer();
            List<List<Card>> startingHands = init.GetStartingHands();
            List<UserService.User> players = Players.GetPlayers();

            UserService.User player1 = players[0];
            UserService.User player2 = players[1];

            List<Card> player1startingHand = startingHands[0];
            List<Card> player2startingHand = startingHands[1];

            UserService.User starter = 
                GameInitializer.GetGameStarter(player1startingHand, player2startingHand, players);

            ViewerGameStartData viewerStartData = new ViewerGameStartData()
            {
                Player1 = player1,
                Player1StartingHand = player1startingHand,
                Player2 = player2,
                Player2StartingHand = player2startingHand,
                Starter = starter
            };

            PlayerGameStartData player1startData = new PlayerGameStartData()
            {
                StartingHand = player1startingHand,
                Starting = (player1.ConnectionId == starter.ConnectionId) ? true : false,
                Opponent = player2
            };

            PlayerGameStartData player2startData = new PlayerGameStartData()
            {
                StartingHand = player2startingHand,
                Starting = (player2.ConnectionId == starter.ConnectionId) ? true : false,
                Opponent = player1
            };

            List<string> viewerConnectionIds = Viewers.viewers.Select(v => v.ConnectionId).ToList();

            // Get All time record between the 2 players (as a simple string literal to append to DOM)
            string recordString = GameDbService.GetAlltimeStatsBetween(player1.UserName, player2.UserName);

            Clients.Clients(viewerConnectionIds).ReceiveViewerGameStartData(viewerStartData);
            Clients.Client(player1.ConnectionId).ReceivePlayerStartData(player1startData);
            Clients.Client(player2.ConnectionId).ReceivePlayerStartData(player2startData);
            Clients.All.UpdateAlltimeStats(recordString);
        }

        // think about the viewers! :D
        public void ProcessPlayerTurn(PlayerTurnFromClient turnInfo)
        {
            UserService.User playerThatPlayed = AllUsers.GetUserBy(Context.ConnectionId);

            List<UserService.User> players = Players.GetPlayers();
            UserService.User opponent = players.Where(p => p.ConnectionId != Context.ConnectionId).FirstOrDefault();

            PlayerTurnToClient turnInfoForOpponent = new PlayerTurnToClient()
            {
                CardsPlayed = turnInfo.CardsPlayed,
                OpponentWon = turnInfo.WonGameOver,
                OpponentSkipped = turnInfo.Skipped,
                NumberCardsPlayed = turnInfo.CardsPlayed.Count
            };


            Clients.Client(opponent.ConnectionId).ProcessOpponentTurn(turnInfoForOpponent);

            // Process and send info to viewer
            List<string> viewerConnectionIds = Viewers.viewers.Select(v => v.ConnectionId).ToList();

            PlayerTurnForViewer turnInfoForViewer = new PlayerTurnForViewer()
            {
                GameOver = turnInfo.WonGameOver,
                GameWinner = turnInfo.WonGameOver ? playerThatPlayed.UserName : null,
                CardsPlayed = turnInfo.Skipped? null : turnInfo.CardsPlayed,
                CardsRemaining = turnInfo.CardsRemaining,
                Skipped = turnInfo.Skipped,
                NextPlayer = opponent.UserName,
                PlayerNumber = (playerThatPlayed == Players.GetPlayers()[0]) ? 1 : 2
            };

            Clients.Clients(viewerConnectionIds).ReceiveViewerTurnInfo(turnInfoForViewer);

            // Game ended?
            if (turnInfo.WonGameOver)
            {
                GameEnd(playerThatPlayed, opponent);
            }
        }


        // save game info to db
        private void GameEnd(UserService.User winner, UserService.User loser)
        {
            GameDbService.RecordGameResults(winner, loser);
        }



        public void GetLeaderboard()
        {
            using (ThurtainContext db = new ThurtainContext())
            {
                var boardStats = db.UserStats.ToList();
                Clients.Caller.GetLeaderboard(boardStats);
            }
        }
    }
}