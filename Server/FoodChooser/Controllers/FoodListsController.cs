using System;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using AutoMapper;
using FoodChooser.Models;
using FoodChooser.Repositories.List;
using FoodChooser.ViewModels;
using Newtonsoft.Json;

namespace FoodChooser.Controllers
{
    [Authorize]
    [RoutePrefix("api")]
    public class FoodListsController : BaseController
    {
        private readonly IFoodListRepository _foodListRepository;
        const int MaxPageSize = 10;

        public FoodListsController(IFoodListRepository foodListRepository)
        {
            _foodListRepository = foodListRepository;
        }

        [HttpGet]
        [Route("foodlists")]
        public IHttpActionResult GetAllLists(int page = 1, int pageSize = MaxPageSize)
        {
            try
            {
                if (pageSize > MaxPageSize)
                {
                    pageSize = MaxPageSize;
                }

                IQueryable<FoodList> foodLists = _foodListRepository
                    .GetAll()
                    .Where(x => x.UserId == CurrentUserId);

                var paginationHeader = new
                {
                    totalCount = foodLists.Count()
                    // Add more headers here if you want...
                    // Link to next and previous page etc.
                    // Also see OData-Options for this
                };

                var result = foodLists
                    .OrderBy(x => x.Id)
                    .Skip(pageSize * (page - 1))
                    .Take(pageSize)
                    .ToList();

                HttpContext.Current.Response.AppendHeader("X-Pagination", JsonConvert.SerializeObject(paginationHeader));

                return Ok(result.Select(x => Mapper.Map<FoodListViewModel>(x)));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpGet]
        [Route("foodlists/{id:int}", Name = "GetSingleList")]
        public IHttpActionResult GetSingleList(int id)
        {
            try
            {
                FoodList singleFoodList = _foodListRepository.GetSingle(x => x.Id == id);

                if (singleFoodList == null)
                {
                    return NotFound();
                }

                if (singleFoodList.UserId != CurrentUserId)
                {
                    return StatusCode(HttpStatusCode.Forbidden);
                }

                return Ok(Mapper.Map<FoodListViewModel>(singleFoodList));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpPost]
        [Route("foodlists")]
        public IHttpActionResult AddList([FromBody] FoodListViewModel viewModel)
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

                FoodList item = Mapper.Map<FoodList>(viewModel);
                item.UserId = CurrentUserId;
                _foodListRepository.Add(item);
                int save = _foodListRepository.Save();

                if (save > 0)
                {
                    return CreatedAtRoute("GetSingleList", new { id = item.Id }, item);
                }

                return BadRequest();
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpDelete]
        [Route("foodlists/{id:int}")]
        public IHttpActionResult DeleteList(int id)
        {
            try
            {
                FoodList singleFoodList = _foodListRepository.GetSingle(x => x.Id == id, "Foods");

                if (singleFoodList == null)
                {
                    return NotFound();
                }

                if (singleFoodList.UserId != CurrentUserId)
                {
                    return StatusCode(HttpStatusCode.Forbidden);
                }

                _foodListRepository.Delete(singleFoodList);
                int save = _foodListRepository.Save();

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
