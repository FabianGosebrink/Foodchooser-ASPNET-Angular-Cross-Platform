using FoodChooser.Repositories;
using System.Threading.Tasks;

namespace FoodChooser.Services.DataBaseInit
{
    public interface IDatabaseInitializer
    {
        Task Initialize(FoodChooserDbContext context);
    }
}
