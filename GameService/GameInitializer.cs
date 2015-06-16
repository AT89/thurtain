using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardModels;
using UserService;
using Utility;

namespace GameService
{
    public class GameInitializer
    {
        public List<List<Card>> GetStartingHands()
        {
            DeckOfCards newDeck = new DeckOfCards();
            List<Card> Player1Hand = new List<Card>();
            List<Card> Player2Hand = new List<Card>();

            for (int i = 0; i < 13; i++)
                Player1Hand.Add(newDeck.deck.Pop());

            for (int i = 0; i < 13; i++)
                Player2Hand.Add(newDeck.deck.Pop());

            List<List<Card>> startingHands =
                new List<List<Card>>() 
                {
                    Player1Hand,
                    Player2Hand
                };

            return startingHands;
        }

        public static User GetGameStarter(List<Card> player1hand, List<Card> player2hand,
                                          List<User> players)
        {
            var player1sorted = player1hand.OrderBy(c => c.OrderedValue).ToList();
            var player2sorted = player2hand.OrderBy(c => c.OrderedValue).ToList();

            if (player1sorted[0].OrderedValue < player2sorted[0].OrderedValue)
                return players[0];
            else
                return players[1];
        }
    }
}
