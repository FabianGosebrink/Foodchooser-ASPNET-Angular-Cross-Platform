using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodChooser.Models
{
    public class QueryParameters
    {
        private const int maxPageSize = 50;
        public int Page { get; set; } = 1;

        private int _pageSize = maxPageSize;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > maxPageSize) ? maxPageSize : value; }
        }

    }
}
