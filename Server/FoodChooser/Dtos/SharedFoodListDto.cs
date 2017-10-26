using System.Collections.Generic;

namespace FoodChooser.ViewModels
{
    public class SharedFoodListDto
    {
        public int Id { get; set; }
        public int FoodListId { get; set; }
        public virtual List<FoodListDto> FoodList { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
    }
}