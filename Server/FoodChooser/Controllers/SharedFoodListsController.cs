using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using FoodChooser.Models;
using FoodChooser.Repositories.List;
using FoodChooser.Repositories.SharedList;
using FoodChooser.ViewModels;

namespace FoodChooser.Controllers
{
    [Authorize]
    [RoutePrefix("api")]
    public class SharedFoodListsController : BaseController
    {
        private readonly ISharedFoodListRepository _sharedFoodListRepository;
        private readonly IFoodListRepository _foodListRepository;

        public SharedFoodListsController(ISharedFoodListRepository _sharedFoodListRepository, IFoodListRepository foodListRepository)
        {
            this._sharedFoodListRepository = _sharedFoodListRepository;
            _foodListRepository = foodListRepository;
        }

        [HttpGet]
        [Route("SharedFoodLists")]
        public IHttpActionResult GetAllSharedLists()
        {
            try
            {
                List<SharedFoodList> existingMatches = _sharedFoodListRepository
                    .GetAll(x => x.UserEmail == CurrentUserEmail).ToList();

                if (existingMatches.Any(x => x.UserId == String.Empty))
                {
                    foreach (SharedFoodList sharedFoodList in existingMatches)
                    {
                        if (sharedFoodList.UserId == String.Empty)
                        {
                            sharedFoodList.UserId = CurrentUserId;
                            _sharedFoodListRepository.Update(sharedFoodList);
                        }
                    }

                    _sharedFoodListRepository.Save();
                }

                List<FoodList> toReturn = existingMatches
                    .Select(sharedFoodList => _foodListRepository
                        .GetSingle(x => x.Id == sharedFoodList.FoodListId))
                    .ToList();

                return Ok(toReturn.Select(x => Mapper.Map<FoodListViewModel>(x)));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpGet]
        [Route("SharedFoodLists/{listId:int}/{email}")]
        public IHttpActionResult AddUserToList(int listId, string email)
        {
            try
            {
                FoodList singleById = _foodListRepository.GetSingleById(listId);

                if (singleById == null)
                {
                    return NotFound();
                }

                IQueryable<SharedFoodList> existingMatches = _sharedFoodListRepository
                    .GetAll(x => x.UserEmail == email && x.FoodListId == listId);

                if (existingMatches.Any())
                {
                    return BadRequest("User has List already");
                }

                SharedFoodList sharedFoodList = new SharedFoodList
                {
                    FoodListId = listId,
                    UserEmail = email
                };

                _sharedFoodListRepository.Add(sharedFoodList);
                int save = _sharedFoodListRepository.Save();

                if (save > 0)
                {
                    return Ok(Mapper.Map<SharedFoodListViewModel>(sharedFoodList));
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
