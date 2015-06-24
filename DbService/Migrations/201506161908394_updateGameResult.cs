namespace DbService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateGameResult : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GameResults",
                c => new
                    {
                        GameResultId = c.Int(nullable: false, identity: true),
                        PlayedAt = c.DateTime(nullable: false),
                        WinnerUserName = c.String(nullable: false),
                        LoserUserName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.GameResultId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.GameResults");
        }
    }
}
