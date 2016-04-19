using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using AutoMapper;
using FoodChooser.Models;
using FoodChooser.Repositories.Food;
using FoodChooser.Repositories.List;
using FoodChooser.Services;
using FoodChooser.ViewModels;

namespace FoodChooser.Controllers
{
    [Authorize]
    [RoutePrefix("api")]
    public class FoodsController : BaseController
    {
        const int MaxPageSize = 10;
        private readonly IFoodRepository _foodRepository;
        private readonly IFoodListRepository _foodListRepository;
        private readonly IRandomNumberGenerator _randomNumberGenerator;

        public FoodsController(IFoodRepository foodRepository, IFoodListRepository foodListRepository,
            IRandomNumberGenerator randomNumberGenerator)
        {
            _foodRepository = foodRepository;
            _foodListRepository = foodListRepository;
            _randomNumberGenerator = randomNumberGenerator;
        }

        [HttpGet]
        [Route("foodlists/{id:int}/foods")]
        public IHttpActionResult GetFoodsFromList(int id)
        {
            try
            {
                FoodList foodList = _foodListRepository.GetSingle(x => x.Id == id, "Foods");
                return Ok(foodList.Foods.Select(x => Mapper.Map<FoodItemViewModel>(x)));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpGet]
        [Route("foodlists/{listId:int}/food/{foodItemId:int}")]
        [Route("foods/{foodItemId:int}", Name = "GetSingleFood")]
        public IHttpActionResult GetSingleFood(int foodItemId, int? listId = null)
        {
            try
            {
                FoodItem foodItem;
                if (listId.HasValue)
                {
                    foodItem = _foodRepository.GetSingle(x => x.Id == foodItemId && x.FoodList.Id == listId.Value,
                        includeProperties: "FoodList");
                }
                else
                {
                    foodItem = _foodRepository.GetSingle(x => x.Id == foodItemId, "FoodList");
                }

                if (foodItem == null)
                {
                    return NotFound();
                }

                if (foodItem.FoodList == null || foodItem.FoodList.UserId != CurrentUserId)
                {
                    return StatusCode(HttpStatusCode.Forbidden);
                }

                return Ok(Mapper.Map<FoodItemViewModel>(foodItem));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("foods/getrandomfood")]
        public IHttpActionResult GetRandomFood()
        {
            try
            {

                IEnumerable<FoodItem> foodItems = _foodRepository.GetAll(x => x.IsPublic, includeProperties: "FoodList").AsEnumerable();

                if (!foodItems.Any())
                {
                    return NotFound();
                }

                IEnumerable<FoodItem> enumerable = foodItems as IList<FoodItem> ?? foodItems.ToList();
                FoodItem elementAt = enumerable.ElementAt(_randomNumberGenerator.GetRandomNumber(enumerable.Count()));

                if (elementAt == null)
                {
                    return NotFound();
                }

                return Ok(Mapper.Map<FoodItemViewModel>(elementAt));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpPost]
        [Route("foods")]
        public IHttpActionResult AddFoodToList([FromBody]FoodItemViewModel viewModel)
        {
            try
            {
                if (viewModel == null)
                {
                    return BadRequest();
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                FoodList singleFoodList = _foodListRepository.GetSingle(x => x.Id == viewModel.FoodListId, "Foods");
                FoodItem item = Mapper.Map<FoodItem>(viewModel);
                item.Created = DateTime.Now;
                singleFoodList.Foods.Add(item);
                _foodListRepository.Update(singleFoodList);

                int save = _foodListRepository.Save();

                if (save > 0)
                {
                    return CreatedAtRoute("GetSingleFood", new { foodItemId = item.Id }, Mapper.Map<FoodItemViewModel>(item));
                }

                return BadRequest();
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpPut]
        [Route("foods/{foodItemId:int}")]
        public IHttpActionResult UpdateFoodInList(int foodItemId, [FromBody]FoodItemViewModel viewModel)
        {
            try
            {
                if (viewModel == null)
                {
                    return BadRequest();
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                FoodItem singleById = _foodRepository.GetSingleById(foodItemId);

                if (singleById == null)
                {
                    return NotFound();
                }

                singleById.ItemName = viewModel.ItemName;
                singleById.IsPublic = viewModel.IsPublic;

                _foodRepository.Update(singleById);
                int save = _foodRepository.Save();

                if (save > 0)
                {
                    return Ok(Mapper.Map<FoodItemViewModel>(singleById));
                }

                return BadRequest();
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpDelete]
        [Route("foods/{foodItemId:int}")]
        public IHttpActionResult DeleteFoodFromList(int foodItemId)
        {
            try
            {
                FoodItem singleById = _foodRepository.GetSingleById(foodItemId);

                if (singleById == null)
                {
                    return NotFound();
                }

                _foodRepository.Delete(foodItemId);
                int save = _foodRepository.Save();

                if (save > 0)
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return BadRequest();
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }
    }
}
