using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using AutoMapper;
using FoodChooser.Models;
using FoodChooser.Repositories.Food;
using FoodChooser.Repositories.List;
using FoodChooser.Services;
using FoodChooser.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using FoodChooser.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting;
using IdentityServer4.AccessTokenValidation;

namespace FoodChooser.Controllers
{
    [Route("api")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class FoodsController : Controller
    {
        private static string DataImagePngBase64Prefix = "data:image/png;base64";

        const int MaxPageSize = 10;
        private readonly IFoodRepository _foodRepository;
        private readonly IFoodListRepository _foodListRepository;
        private readonly IRandomNumberGenerator _randomNumberGenerator;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AppSettings _appSettingsAccessor;
        private readonly IHostingEnvironment _hostingEnvironment;


        public FoodsController(IFoodRepository foodRepository, IFoodListRepository foodListRepository,
            IRandomNumberGenerator randomNumberGenerator, UserManager<IdentityUser> userManager,
            IOptions<AppSettings> appSettingsAccessor, IHostingEnvironment hostingEnvironment)
        {
            _foodRepository = foodRepository;
            _foodListRepository = foodListRepository;
            _randomNumberGenerator = randomNumberGenerator;
            _userManager = userManager;
            _appSettingsAccessor = appSettingsAccessor.Value;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [Route("foodlists/{id}/foods")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
        public IActionResult GetFoodsFromList(Guid id)
        {
            FoodList foodList = _foodListRepository.GetSingle(id, true);

            if (foodList.Foods == null)
            {
                var items = new List<FoodItem>();
                return Ok(items.Select(x => Mapper.Map<FoodItemDto>(x)));
            }

            return Ok(foodList.Foods.Select(x => Mapper.Map<FoodItemDto>(x)));
        }

        [HttpGet]
        [Route("foodlists/{listId}/food/{foodItemId}")]
        [Route("foods/{foodItemId}", Name = "GetSingleFood")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
        public IActionResult GetSingleFood(Guid foodItemId, Guid? listId = null)
        {
            FoodItem foodItem;
            if (listId.HasValue)
            {
                foodItem = _foodRepository.GetSingle(foodItemId, listId.Value);
            }
            else
            {
                foodItem = _foodRepository.GetSingle(foodItemId, null);
            }

            if (foodItem == null)
            {
                return NotFound();
            }

            if (foodItem.FoodList == null || foodItem.FoodList.UserId != _userManager.GetUserId(HttpContext.User))
            {
                return new StatusCodeResult((int)HttpStatusCode.Forbidden);
            }

            return Ok(Mapper.Map<FoodItemDto>(foodItem));
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("foods/getrandomfood")]
        public IActionResult GetRandomFood()
        {
            IEnumerable<FoodItem> foodItems = _foodRepository.GetAllPublic();

            if (!foodItems.Any())
            {
                return BadRequest("No Items Found");
            }

            FoodItem elementAt = foodItems.ElementAt(_randomNumberGenerator.GetRandomNumber(foodItems.Count()));

            if (elementAt == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<FoodItemDto>(elementAt));
        }

        [HttpPost]
        [Route("foods")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult AddFoodToList([FromBody]FoodItemDto viewModel)
        {
            if (viewModel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FoodList singleFoodList = _foodListRepository.GetSingle(viewModel.FoodListId, true);
            FoodItem item = Mapper.Map<FoodItem>(viewModel);
            item.Created = DateTime.Now;
            item.ImageString = Path.Combine(_appSettingsAccessor.ImageSaveFolder, _appSettingsAccessor.DummyImageName);
            singleFoodList.Foods.Add(item);
            _foodListRepository.Update(singleFoodList);

            if (_foodListRepository.Save())
            {
                return CreatedAtRoute("GetSingleFood", new { foodItemId = item.Id }, Mapper.Map<FoodItemDto>(item));
            }

            return BadRequest();
        }

        [HttpPut]
        [Route("foods/{foodItemId}")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult UpdateFoodInList(Guid foodItemId, [FromBody]FoodItemDto viewModel)
        {
            if (viewModel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FoodItem singleById = _foodRepository.GetSingle(foodItemId, null);

            if (singleById == null)
            {
                return NotFound();
            }

            singleById.ItemName = viewModel.ItemName;
            singleById.IsPublic = viewModel.IsPublic;

            if (ImageIsNewImage(viewModel))
            {
                HandleImage(viewModel, singleById);
            }

            _foodRepository.Update(singleById);

            if (_foodListRepository.Save())
            {
                return Ok(Mapper.Map<FoodItemDto>(singleById));
            }

            return BadRequest();
        }

        [HttpDelete]
        [Route("foods/{foodItemId}")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult DeleteFoodFromList(Guid foodItemId)
        {
            FoodItem singleById = _foodRepository.GetSingle(foodItemId, null);

            if (singleById == null)
            {
                return NotFound();
            }

            _foodRepository.Delete(foodItemId);
            if (_foodListRepository.Save())
            {
                return NoContent();
            }

            return BadRequest();
        }

        private string SaveImage(FoodItemDto viewModel)
        {
            if (String.IsNullOrEmpty(viewModel.ImageString))
            {
                return String.Empty;
            }

            string filePath = Path.Combine(_hostingEnvironment.ContentRootPath, _appSettingsAccessor.ImageSaveFolder);

            //Check if directory exist
            if (!System.IO.Directory.Exists(filePath))
            {
                System.IO.Directory.CreateDirectory(filePath); //Create directory if it doesn't exist
            }

            // Get Filename of new image
            var newFileName = Guid.NewGuid() + ".png";

            //set the image path
            string imgPath = Path.Combine(filePath, newFileName);

            byte[] imageBytes = Convert.FromBase64String(viewModel.ImageString.Split(',')[1]);

            System.IO.File.WriteAllBytes(imgPath, imageBytes);

            return newFileName;
        }

        private static bool ImageIsNewImage(FoodItemDto viewModel)
        {
            return viewModel.ImageString.StartsWith(DataImagePngBase64Prefix);
        }


        private void HandleImage(FoodItemDto viewModel, FoodItem singleById)
        {
            // save new image
            var newFileName = SaveImage(viewModel);

            if (!String.IsNullOrEmpty(newFileName))
            {
                if (singleById.ImageString != _appSettingsAccessor.DummyImageName)
                {
                    // if old image is there
                    var oldimagePath = Path.Combine(_hostingEnvironment.ContentRootPath, _appSettingsAccessor.ImageSaveFolder, singleById.ImageString);

                    // delete old image
                    if (System.IO.File.Exists(oldimagePath))
                    {
                        System.IO.File.Delete(oldimagePath);
                    }
                }

                // save db entry
                singleById.ImageString = newFileName;
            }
        }
    }
}
