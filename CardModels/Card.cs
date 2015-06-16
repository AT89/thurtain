// Represents a card in the deck. The OrderedValue is an integer from 1-52 
// that represents a card based on its value in this game.

// The SuitValue is a number 1-4 that represents its suit, with a higher
// value representing a stronger suit.

// SpriteX and SpriteY are float coordinates that represent the pixel 
// displacement so we can visually display the cards on the frontend.
// The displacement is in negative pixels, so we'll use negative numbers
// so we can use the values directly.

namespace CardModels
{
    public class Card
    {
        public int OrderedValue { get; set; }
        public int SuitValue { get; set; }
        public string OrdinalString { get; set; }
        public double SpriteX { get; set; }
        public double SpriteY { get; set; }
        public bool Selected { get; set; }
    }
}
