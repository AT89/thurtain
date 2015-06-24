using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using DbService.Entities;
using DbService.MappingConfigurations;
using System.Data.Entity.ModelConfiguration.Conventions;


namespace DbService
{
    public class ThurtainContext : DbContext
    {
        public ThurtainContext() : base("name=ThurtainContext") { }

        public DbSet<User> Users { get; set; }
        public DbSet<GameResult> GameResults { get; set; }
        public DbSet<UserStat> UserStats { get; set; }


        // Mappings
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            modelBuilder.Configurations.Add(new UserConfiguration());
            modelBuilder.Configurations.Add(new GameResultConfiguration());
            modelBuilder.Configurations.Add(new UserStatConfiguration());
        }
    }
}
