using FoodChooser.Repositories;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FoodChooser.Services.DataBaseInit
{

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DatabaseInitializer(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        public async Task Initialize(FoodChooserDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                context.Users.RemoveRange(context.Users);
                context.SaveChanges();
            }

            // Creates Roles.
            await _roleManager.CreateAsync(new IdentityRole("administrator"));
            await _roleManager.CreateAsync(new IdentityRole("user"));

            // Seeds an admin user.
            var user = new IdentityUser
            {
                AccessFailedCount = 0,
                Email = "admin@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = "ADMIN@GMAIL.COM",
                NormalizedUserName = "ADMIN@GMAIL.COM",
                TwoFactorEnabled = false,
                UserName = "admin"
            };

            var result = await _userManager.CreateAsync(user, "adminadmin");

            if (result.Succeeded)
            {
                var adminUser = await _userManager.FindByNameAsync(user.UserName);
                // Assigns the administrator role.
                await _userManager.AddToRoleAsync(adminUser, "administrator");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.Name, value: user.UserName)
                };
                await _userManager.AddClaimsAsync(adminUser, claims);
            }
        }
    }
}
