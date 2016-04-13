using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using FoodChooser.Models;

namespace FoodChooser.ViewModels
{
    public class FoodListViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string UserId { get; set; }
        public ICollection<FoodItem> Foods { get; set; }
    }
}