using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardModels;
using UserService;

namespace GameService.DTO
{
    public class PlayerGameStartData
    {
        public List<Card> StartingHand { get; set; }
        public bool Starting { get; set; }
        public User Opponent { get; set; }
    }
}
