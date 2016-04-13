using FoodChooser.Models;
using OfferingSolutions.UoW.Structure.RepositoryContext;

namespace FoodChooser.Repositories.Food
{
    public class FoodRepository : RepositoryContextImpl<FoodItem>, IFoodRepository
    {
        public FoodRepository(FoodChooserDbContext databaseContext) : base(databaseContext)
        {
        }
    }
}