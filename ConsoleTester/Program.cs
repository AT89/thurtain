using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CardModels;

namespace ConsoleTester
{
    class Program
    {
        static void Main(string[] args)
        {

            DeckOfCards deck = new DeckOfCards();

            Console.WriteLine("cards after instantiating DECK:\n");
            deck.DisplayCards();

            deck.Shuffle();

            Console.WriteLine("\n\ncards after SHUFFLING:\n");
            deck.DisplayCards();

            Console.ReadLine();
        }
    }
}
