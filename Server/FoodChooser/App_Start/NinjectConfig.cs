using FoodChooser.Repositories;
using FoodChooser.Repositories.Food;
using FoodChooser.Repositories.List;
using FoodChooser.Repositories.SharedList;
using FoodChooser.Services;
using Ninject;
using Ninject.Web.Common;

namespace FoodChooser
{
    public static class NinjectConfig
    {
        public static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();

            kernel.Bind<FoodChooserDbContext>().To<FoodChooserDbContext>().InRequestScope();
            kernel.Bind<IFoodRepository>().To<FoodRepository>();
            kernel.Bind<IFoodListRepository>().To<FoodListRepository>();
            kernel.Bind<ISharedFoodListRepository>().To<SharedFoodListRepository>();
            kernel.Bind<IRandomNumberGenerator>().ToConstant(new RandomNumberGenerator());

            return kernel;
        }
    }
}
