using System.Data.Entity.ModelConfiguration;
using DbService.Entities;

namespace DbService.MappingConfigurations
{
    public class UserStatConfiguration : EntityTypeConfiguration<UserStat>
    {
        public UserStatConfiguration()
        {
            HasKey(u => u.UserStatId);
            Property(u => u.UserStatId).IsRequired().HasColumnName("UserStatId");
            Property(u => u.UserName).IsRequired().HasMaxLength(15).HasColumnName("UserName");
            Property(u => u.Wins).IsRequired().HasColumnName("Wins");
            Property(u => u.Losses).IsRequired().HasColumnName("Losses");
        }
    }
}
