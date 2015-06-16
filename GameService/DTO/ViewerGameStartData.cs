using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardModels;
using UserService;

namespace GameService.DTO
{
    public class ViewerGameStartData
    {
        public User Player1 { get; set; }
        public List<Card> Player1StartingHand { get; set; }
        public User Player2 { get; set; }
        public List<Card> Player2StartingHand { get; set; }
        public User Starter { get; set; }
    }
}
