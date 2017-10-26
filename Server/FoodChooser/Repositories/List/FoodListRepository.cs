
using FoodChooser.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace FoodChooser.Repositories.List
{
    public class FoodListRepository : IFoodListRepository
    {
        private readonly FoodChooserDbContext _foodDbContext;

        public FoodListRepository(FoodChooserDbContext foodDbContext)
        {
            _foodDbContext = foodDbContext;
        }

        public FoodList GetSingle(Guid id)
        {
            return _foodDbContext.FoodLists.Include(x => x.Foods).FirstOrDefault(x => x.Id == id);
        }

        public void Add(FoodList item)
        {
            _foodDbContext.FoodLists.Add(item);
        }

        public void Delete(Guid id)
        {
            FoodList foodList = GetSingle(id);
            _foodDbContext.FoodLists.Remove(foodList);
        }

        public void Update(FoodList item)
        {
            _foodDbContext.FoodLists.Update(item);
        }

        public IQueryable<FoodList> GetAll(QueryParameters queryParameters)
        {
            IQueryable<FoodList> _allItems = _foodDbContext.FoodLists;

            return _allItems
                .Skip(queryParameters.PageSize * (queryParameters.Page - 1))
                .Take(queryParameters.PageSize);
        }

        public int Count()
        {
            return _foodDbContext.FoodLists.Count();
        }

        public bool Save()
        {
            return (_foodDbContext.SaveChanges() >= 0);
        }
    }
}