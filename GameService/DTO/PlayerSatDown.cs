using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserService;

namespace GameService.DTO
{
    public class PlayerSatDown
    {
        public User User { get; set; }
        public int SeatsAvailable { get; set; }
    }
}
