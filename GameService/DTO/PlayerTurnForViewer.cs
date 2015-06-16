using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardModels;

namespace GameService.DTO
{
    public class PlayerTurnForViewer
    {
        public bool GameOver { get; set; }
        public string GameWinner { get; set; }
        public List<Card> CardsPlayed { get; set; }
        public List<Card> CardsRemaining { get; set; }
        public bool Skipped { get; set; }
        public string NextPlayer { get; set; }
        public int PlayerNumber { get; set; }
    }
}
