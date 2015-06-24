using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DbService.Entities
{
    public class GameResult
    {
        public int GameResultId { get; set; }
        public DateTime PlayedAt { get; set; }
        public string WinnerUserName { get; set; }
        public string LoserUserName { get; set; }
    }
}
