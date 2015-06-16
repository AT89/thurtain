using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// The SpriteX and SpriteY values are specific to the "cards.png" image,
// found in the Thurtain web app project.

namespace CardModels
{
    public class DeckOfCards
    {
        public List<Card> deck = new List<Card>();

        public DeckOfCards()
        {
            this.AddCardsToDeck();
            this.Shuffle();
        }

        private void AddCardsToDeck()
        {
            // Spades
            deck.Add(new Card() { OrderedValue = 45, SuitValue = 1, SpriteX = 0, SpriteY = -98, OrdinalString = "A", Selected = false });
            deck.Add(new Card() { OrderedValue = 49, SuitValue = 1, SpriteX = -73.077, SpriteY = -98, OrdinalString = "2", Selected = false });
            deck.Add(new Card() { OrderedValue = 1, SuitValue = 1, SpriteX = -146.154, SpriteY = -98, OrdinalString = "3", Selected = false });
            deck.Add(new Card() { OrderedValue = 5, SuitValue = 1, SpriteX = -219.231, SpriteY = -98, OrdinalString = "4", Selected = false });
            deck.Add(new Card() { OrderedValue = 9, SuitValue = 1, SpriteX = -292.308, SpriteY = -98, OrdinalString = "5", Selected = false });
            deck.Add(new Card() { OrderedValue = 13, SuitValue = 1, SpriteX = -365.385, SpriteY = -98, OrdinalString = "6", Selected = false });
            deck.Add(new Card() { OrderedValue = 17, SuitValue = 1, SpriteX = -438.462, SpriteY = -98, OrdinalString = "7", Selected = false });
            deck.Add(new Card() { OrderedValue = 21, SuitValue = 1, SpriteX = -511.539, SpriteY = -98, OrdinalString = "8", Selected = false });
            deck.Add(new Card() { OrderedValue = 25, SuitValue = 1, SpriteX = -584.616, SpriteY = -98, OrdinalString = "9", Selected = false });
            deck.Add(new Card() { OrderedValue = 29, SuitValue = 1, SpriteX = -657.693, SpriteY = -98, OrdinalString = "10", Selected = false });
            deck.Add(new Card() { OrderedValue = 33, SuitValue = 1, SpriteX = -730.77, SpriteY = -98, OrdinalString = "J", Selected = false });
            deck.Add(new Card() { OrderedValue = 37, SuitValue = 1, SpriteX = -803.847, SpriteY = -98, OrdinalString = "Q", Selected = false });
            deck.Add(new Card() { OrderedValue = 41, SuitValue = 1, SpriteX = -876.924, SpriteY = -98, OrdinalString = "K", Selected = false });

            // Clubs
            deck.Add(new Card() { OrderedValue = 46, SuitValue = 2, SpriteX = 0, SpriteY = 0, OrdinalString = "A", Selected = false });
            deck.Add(new Card() { OrderedValue = 50, SuitValue = 2, SpriteX = -73.077, SpriteY = 0, OrdinalString = "2", Selected = false });
            deck.Add(new Card() { OrderedValue = 2, SuitValue = 2, SpriteX = -146.154, SpriteY = 0, OrdinalString = "3", Selected = false });
            deck.Add(new Card() { OrderedValue = 6, SuitValue = 2, SpriteX = -219.231, SpriteY = 0, OrdinalString = "4", Selected = false });
            deck.Add(new Card() { OrderedValue = 10, SuitValue = 2, SpriteX = -292.308, SpriteY = 0, OrdinalString = "5", Selected = false });
            deck.Add(new Card() { OrderedValue = 14, SuitValue = 2, SpriteX = -365.385, SpriteY = 0, OrdinalString = "6", Selected = false });
            deck.Add(new Card() { OrderedValue = 18, SuitValue = 2, SpriteX = -438.462, SpriteY = 0, OrdinalString = "7", Selected = false });
            deck.Add(new Card() { OrderedValue = 22, SuitValue = 2, SpriteX = -511.539, SpriteY = 0, OrdinalString = "8", Selected = false });
            deck.Add(new Card() { OrderedValue = 26, SuitValue = 2, SpriteX = -584.616, SpriteY = 0, OrdinalString = "9", Selected = false });
            deck.Add(new Card() { OrderedValue = 30, SuitValue = 2, SpriteX = -657.693, SpriteY = 0, OrdinalString = "10", Selected = false });
            deck.Add(new Card() { OrderedValue = 34, SuitValue = 2, SpriteX = -730.77, SpriteY = 0, OrdinalString = "J", Selected = false });
            deck.Add(new Card() { OrderedValue = 38, SuitValue = 2, SpriteX = -803.847, SpriteY = 0, OrdinalString = "Q", Selected = false });
            deck.Add(new Card() { OrderedValue = 42, SuitValue = 2, SpriteX = -876.924, SpriteY = 0, OrdinalString = "K", Selected = false });

            // Diamonds
            deck.Add(new Card() { OrderedValue = 47, SuitValue = 3, SpriteX = 0, SpriteY = -294, OrdinalString = "A", Selected = false });
            deck.Add(new Card() { OrderedValue = 51, SuitValue = 3, SpriteX = -73.077, SpriteY = -294, OrdinalString = "2", Selected = false });
            deck.Add(new Card() { OrderedValue = 3, SuitValue = 3, SpriteX = -146.154, SpriteY = -294, OrdinalString = "3", Selected = false });
            deck.Add(new Card() { OrderedValue = 7, SuitValue = 3, SpriteX = -219.231, SpriteY = -294, OrdinalString = "4", Selected = false });
            deck.Add(new Card() { OrderedValue = 11, SuitValue = 3, SpriteX = -292.308, SpriteY = -294, OrdinalString = "5", Selected = false });
            deck.Add(new Card() { OrderedValue = 15, SuitValue = 3, SpriteX = -365.385, SpriteY = -294, OrdinalString = "6", Selected = false });
            deck.Add(new Card() { OrderedValue = 19, SuitValue = 3, SpriteX = -438.462, SpriteY = -294, OrdinalString = "7", Selected = false });
            deck.Add(new Card() { OrderedValue = 23, SuitValue = 3, SpriteX = -511.539, SpriteY = -294, OrdinalString = "8", Selected = false });
            deck.Add(new Card() { OrderedValue = 27, SuitValue = 3, SpriteX = -584.616, SpriteY = -294, OrdinalString = "9", Selected = false });
            deck.Add(new Card() { OrderedValue = 31, SuitValue = 3, SpriteX = -657.693, SpriteY = -294, OrdinalString = "10", Selected = false });
            deck.Add(new Card() { OrderedValue = 35, SuitValue = 3, SpriteX = -730.77, SpriteY = -294, OrdinalString = "J", Selected = false });
            deck.Add(new Card() { OrderedValue = 39, SuitValue = 3, SpriteX = -803.847, SpriteY = -294, OrdinalString = "Q", Selected = false });
            deck.Add(new Card() { OrderedValue = 43, SuitValue = 3, SpriteX = -876.924, SpriteY = -294, OrdinalString = "K", Selected = false });

            // Hearts
            deck.Add(new Card() { OrderedValue = 48, SuitValue = 4, SpriteX = 0, SpriteY = -196, OrdinalString = "A", Selected = false });
            deck.Add(new Card() { OrderedValue = 52, SuitValue = 4, SpriteX = -73.077, SpriteY = -196, OrdinalString = "2", Selected = false });
            deck.Add(new Card() { OrderedValue = 4, SuitValue = 4, SpriteX = -146.154, SpriteY = -196, OrdinalString = "3", Selected = false });
            deck.Add(new Card() { OrderedValue = 8, SuitValue = 4, SpriteX = -219.231, SpriteY = -196, OrdinalString = "4", Selected = false });
            deck.Add(new Card() { OrderedValue = 12, SuitValue = 4, SpriteX = -292.308, SpriteY = -196, OrdinalString = "5", Selected = false });
            deck.Add(new Card() { OrderedValue = 16, SuitValue = 4, SpriteX = -365.385, SpriteY = -196, OrdinalString = "6", Selected = false });
            deck.Add(new Card() { OrderedValue = 20, SuitValue = 4, SpriteX = -438.462, SpriteY = -196, OrdinalString = "7", Selected = false });
            deck.Add(new Card() { OrderedValue = 24, SuitValue = 4, SpriteX = -511.539, SpriteY = -196, OrdinalString = "8", Selected = false });
            deck.Add(new Card() { OrderedValue = 28, SuitValue = 4, SpriteX = -584.616, SpriteY = -196, OrdinalString = "9", Selected = false });
            deck.Add(new Card() { OrderedValue = 32, SuitValue = 4, SpriteX = -657.693, SpriteY = -196, OrdinalString = "10", Selected = false });
            deck.Add(new Card() { OrderedValue = 36, SuitValue = 4, SpriteX = -730.77, SpriteY = -196, OrdinalString = "J", Selected = false });
            deck.Add(new Card() { OrderedValue = 40, SuitValue = 4, SpriteX = -803.847, SpriteY = -196, OrdinalString = "Q", Selected = false });
            deck.Add(new Card() { OrderedValue = 44, SuitValue = 4, SpriteX = -876.924, SpriteY = -196, OrdinalString = "K", Selected = false });
        }

        public void Shuffle()
        {
            var temp = new List<Card>();

            Random r = new Random();
            int randomIndex;
            while (this.deck.Count != 0)
            {
                randomIndex = r.Next(0, this.deck.Count - 1);
                temp.Add(this.deck[randomIndex]);
                this.deck.RemoveAt(randomIndex);
            }

            this.deck = temp;
        }

        // For Testing only: ensure the shuffle() works!
        public void DisplayCards()
        {
            foreach (Card card in this.deck)
            {
                Console.WriteLine(card.OrderedValue.ToString() + " ");
            }
        }
    }
}
