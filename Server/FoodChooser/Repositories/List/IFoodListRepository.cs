using FoodChooser.Models;
using System;
using System.Linq;

namespace FoodChooser.Repositories.List
{
    public interface IFoodListRepository
    {
        FoodList GetSingle(Guid id);
        void Add(FoodList item);
        void Delete(Guid id);
        void Update(FoodList item);
        IQueryable<FoodList> GetAll(QueryParameters queryParameters);
        int Count();
        bool Save();
    }
}
