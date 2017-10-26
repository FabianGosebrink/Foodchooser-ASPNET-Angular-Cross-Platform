using FoodChooser.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodChooser.Repositories
{
    public class FoodChooserDbContext : IdentityDbContext<IdentityUser>
    {
        public FoodChooserDbContext(DbContextOptions<FoodChooserDbContext> options)
           : base(options)
        {

        }

        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<FoodList> FoodLists { get; set; }
    }
}
