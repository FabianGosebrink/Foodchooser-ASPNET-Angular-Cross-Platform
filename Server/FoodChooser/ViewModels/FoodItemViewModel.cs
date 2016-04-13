using System;
using System.ComponentModel.DataAnnotations;

namespace FoodChooser.ViewModels
{
    public class FoodItemViewModel
    {
        public int Id { get; set; }
        [Required]
        public string ItemName { get; set; }
        public int Rating{ get; set; }
        public int FoodListId { get; set; }
        public DateTime Created { get; set; }
        public bool IsPublic { get; set; }
    }
}
