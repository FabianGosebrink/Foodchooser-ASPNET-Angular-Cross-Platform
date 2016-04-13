using FoodChooser.Models;
using OfferingSolutions.UoW.Structure.RepositoryContext;

namespace FoodChooser.Repositories.SharedList
{
    public class SharedFoodListRepository : RepositoryContextImpl<SharedFoodList>, ISharedFoodListRepository
    {
        public SharedFoodListRepository(FoodChooserDbContext databaseContext) : base(databaseContext)
        {
        }
    }
}