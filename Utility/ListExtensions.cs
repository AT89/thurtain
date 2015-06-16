using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility
{
    public static class ListExtensions
    {
        public static T Pop<T>(this List<T> list)
        {
            T firstElement = list[0];
            list.RemoveAt(0);
            return firstElement;
        }
    }
}
