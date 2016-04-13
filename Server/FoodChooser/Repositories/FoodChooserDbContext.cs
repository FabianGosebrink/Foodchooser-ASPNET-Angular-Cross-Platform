using System.Data.Entity;
using FoodChooser.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FoodChooser.Repositories
{
    public class FoodChooserDbContext : IdentityDbContext<ApplicationUser>
    {
        public FoodChooserDbContext() : base("DefaultConnection")
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<FoodChooserDbContext>());
        }

        public static FoodChooserDbContext Create()
        {
            return new FoodChooserDbContext();
        }

        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<FoodList> FoodLists { get; set; }
        public DbSet<SharedFoodList> SharedLists { get; set; }
    }
}
