﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService
{
    public static class AllUsers
    {
        public static List<User> Users = new List<User>();

        public static void RemoveUserBy(string connectionId)
        {
            Users = Users.Where(u => u.ConnectionId != connectionId).ToList();
        }

        public static bool UserNotInList(string connectionId)
        {
            var lookingFor = Users.Where(u => u.ConnectionId == connectionId).FirstOrDefault();
            return (lookingFor == null) ? true : false;
        }

        public static User GetUserBy(string connectionId)
        {
            var user = Users.Where(u => u.ConnectionId == connectionId).FirstOrDefault();
            return user;
        }

    }
}
