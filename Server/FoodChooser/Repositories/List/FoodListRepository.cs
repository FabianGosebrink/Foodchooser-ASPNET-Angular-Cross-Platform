using OfferingSolutions.UoW.Structure.RepositoryContext;

namespace FoodChooser.Repositories.List
{
    public class FoodListRepository : RepositoryContextImpl<Models.FoodList>, IFoodListRepository
    {
        public FoodListRepository(FoodChooserDbContext databaseContext) : base(databaseContext)
        {
        }
    }
}