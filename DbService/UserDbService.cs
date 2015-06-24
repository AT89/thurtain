using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DbService.Entities;

namespace DbService
{
    public static class UserDbService
    {
        public static bool CreateNewUser(string username, string email)
        {
            if (!CheckUserExistsByEmail(email) && !CheckUserExistsByUserName(username))
            {
                using (ThurtainContext db = new ThurtainContext())
                {
                    db.Users.Add(new User()
                        {
                            UserName = username,
                            Email = email
                        });

                    db.UserStats.Add(new UserStat()
                        {
                            UserName = username,
                            Wins = 0,
                            Losses = 0
                        });

                    db.SaveChanges();
                }
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool CheckUserExistsByUserName(string username)
        {
            using (ThurtainContext db = new ThurtainContext())
            {
                var dbUsers = db.Users.ToList();
                var user = dbUsers.Where(u => u.UserName == username).FirstOrDefault();
                return (user == null) ? false : true;
            }
        }

        public static bool CheckUserExistsByEmail(string email)
        {
            using (ThurtainContext db = new ThurtainContext())
            {
                var dbUsers = db.Users.ToList();
                var user = dbUsers.Where(u => u.Email == email).FirstOrDefault();
                return (user == null) ? false : true;
            }
        }

        public static User GetUserByEmail(string email)
        {
            using (ThurtainContext db = new ThurtainContext())
            {
                var dbUsers = db.Users.ToList();
                return dbUsers.Where(u => u.Email == email).FirstOrDefault();
            }
        }
    }
}
