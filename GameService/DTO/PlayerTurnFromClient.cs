using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardModels;
using UserService;

namespace GameService.DTO
{
    public class PlayerTurnFromClient
    {
        //public User Player { get; set; }
        public List<Card> CardsPlayed { get; set; }
        public List<Card> CardsRemaining { get; set; }
        public bool WonGameOver { get; set; }
        public bool Skipped { get; set; }
    }
}
