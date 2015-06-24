using System.Data.Entity.ModelConfiguration;
using DbService.Entities;

namespace DbService.MappingConfigurations
{
    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            HasKey(u => u.UserId);
            Property(u => u.UserId).IsRequired().HasColumnName("UserId");
            Property(u => u.UserName).IsRequired().HasMaxLength(15).HasColumnName("UserName");
            Property(u => u.Email).IsRequired().HasMaxLength(50).HasColumnName("Email");
        }
    }
}
