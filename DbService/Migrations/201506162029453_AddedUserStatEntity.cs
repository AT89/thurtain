namespace DbService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedUserStatEntity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserStats",
                c => new
                    {
                        UserStatId = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 15),
                        Wins = c.Int(nullable: false),
                        Losses = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserStatId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UserStats");
        }
    }
}
