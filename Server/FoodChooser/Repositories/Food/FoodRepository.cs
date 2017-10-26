using System;
using System.Linq;
using FoodChooser.Models;
using FoodChooser.Helpers;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace FoodChooser.Repositories.Food
{
    public class FoodRepository : IFoodRepository
    {
        private readonly FoodChooserDbContext _foodDbContext;

        public FoodRepository(FoodChooserDbContext foodDbContext)
        {
            _foodDbContext = foodDbContext;
        }

        public FoodItem GetSingle(Guid foodItemId, Guid? foodListId = null)
        {
            if (foodListId.HasValue)
            {
                return _foodDbContext
                .FoodItems
                .Include(x => x.FoodList)
                .FirstOrDefault(x => x.Id == foodItemId && x.FoodListId == foodListId);
            }

            return _foodDbContext
                .FoodItems
                .Include(x => x.FoodList)
                .FirstOrDefault(x => x.Id == foodItemId);

        }

        public void Add(FoodItem item)
        {
            _foodDbContext.FoodItems.Add(item);
        }

        public void Delete(Guid id)
        {
            FoodItem foodItem = GetSingle(id);
            _foodDbContext.FoodItems.Remove(foodItem);
        }

        public void Update(FoodItem item)
        {
            _foodDbContext.FoodItems.Update(item);
        }

        public IQueryable<FoodItem> GetAll()
        {
            return _foodDbContext.FoodItems;
        }

        public int Count()
        {
            return _foodDbContext.FoodItems.Count();
        }

        public bool Save()
        {
            return (_foodDbContext.SaveChanges() >= 0);
        }

        public IQueryable<FoodItem> GetAllPublic()
        {
            return _foodDbContext.FoodItems.Include(x => x.FoodList).Where(x => x.IsPublic);
        }
    }
}