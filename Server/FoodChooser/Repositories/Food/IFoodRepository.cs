using FoodChooser.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodChooser.Repositories.Food
{
    public interface IFoodRepository
    {
        FoodItem GetSingle(Guid foodItemId, Guid? foodListId);
        void Add(FoodItem item);
        void Delete(Guid id);
        void Update(FoodItem item);
        IQueryable<FoodItem> GetAll();
        IQueryable<FoodItem> GetAllPublic();
        int Count();
        bool Save();
    }
}
