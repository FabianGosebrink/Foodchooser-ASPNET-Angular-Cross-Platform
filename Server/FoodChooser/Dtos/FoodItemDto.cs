using System;
using System.ComponentModel.DataAnnotations;

namespace FoodChooser.ViewModels
{
    public class FoodItemDto
    {
        public Guid Id { get; set; }
        [Required]
        public string ItemName { get; set; }
        public int Rating{ get; set; }
        public Guid FoodListId { get; set; }
        public DateTime Created { get; set; }
        public bool IsPublic { get; set; }
        public string ImageString { get; set; }
    }
}
