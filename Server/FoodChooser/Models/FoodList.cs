using System;
using System.Collections.Generic;

namespace FoodChooser.Models
{
    public class FoodList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public ICollection<FoodItem> Foods { get; set; }
    }
}
