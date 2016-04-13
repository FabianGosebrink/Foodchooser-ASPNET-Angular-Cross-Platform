using FoodChooser.Models;
using OfferingSolutions.UoW.Structure.RepositoryContext;

namespace FoodChooser.Repositories.Food
{
    public interface IFoodRepository : IRepositoryContext<FoodItem>
    {
    }
}
