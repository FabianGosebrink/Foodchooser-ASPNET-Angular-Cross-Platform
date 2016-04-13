using System.Collections.Generic;

namespace FoodChooser.ViewModels
{
    public class SharedFoodListViewModel
    {
        public int Id { get; set; }
        public int FoodListId { get; set; }
        public virtual List<FoodListViewModel> FoodList { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
    }
}