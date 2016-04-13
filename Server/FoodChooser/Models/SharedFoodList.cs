using System.Collections.Generic;

namespace FoodChooser.Models
{
    public class SharedFoodList
    {
        public int Id { get; set; }
        public int FoodListId { get; set; }
        public virtual List<FoodList> FoodList { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
    }
}
