using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardModels;
using UserService;

namespace GameService.DTO
{
    public class PlayerTurnToClient
    {
        public List<Card> CardsPlayed { get; set; }
        public bool OpponentWon { get; set; }
        public bool OpponentSkipped { get; set; }
        public int NumberCardsPlayed { get; set; }
    }
}
