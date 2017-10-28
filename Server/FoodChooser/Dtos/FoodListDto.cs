using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using FoodChooser.Models;
using System;

namespace FoodChooser.ViewModels
{
    public class FoodListDto
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string UserId { get; set; }
        public ICollection<FoodItem> Foods { get; set; }
    }
}