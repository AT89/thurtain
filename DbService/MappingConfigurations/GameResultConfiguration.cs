using System.Data.Entity.ModelConfiguration;
using DbService.Entities;

namespace DbService.MappingConfigurations
{
    public class GameResultConfiguration : EntityTypeConfiguration<GameResult>
    {
        public GameResultConfiguration()
        {
            HasKey(g => g.GameResultId);

            Property(g => g.GameResultId).IsRequired().HasColumnName("GameResultId");
            Property(g => g.PlayedAt).IsRequired().HasColumnName("PlayedAt");
            Property(g => g.WinnerUserName).IsRequired().HasColumnName("WinnerUserName");
            Property(g => g.LoserUserName).IsRequired().HasColumnName("LoserUserName");

            //HasRequired(g => g.Winner).WithRequiredDependent().WillCascadeOnDelete(false);
            //HasRequired(g => g.Loser).WithRequiredDependent().WillCascadeOnDelete(false);



        }
    }
}
