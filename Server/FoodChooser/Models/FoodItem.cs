using System;
using System.ComponentModel.DataAnnotations;

namespace FoodChooser.Models
{
    public class FoodItem
    {
        [Key]
        public int Id { get; set; }
        public string ItemName { get; set; }
        public FoodList FoodList { get; set; }
        public int FoodListId { get; set; }
        public DateTime Created { get; set; }
        public bool IsPublic { get; set; }
    }
}
