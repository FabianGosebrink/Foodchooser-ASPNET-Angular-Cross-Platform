using System;
using System.Linq;
using System.Net;
using AutoMapper;
using FoodChooser.Models;
using FoodChooser.Repositories.List;
using FoodChooser.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using FoodChooser.Configuration;
using Microsoft.Extensions.Options;
using System.IO;
using System.Collections.Generic;
using FoodChooser.Helpers;
using FoodChooser.Dtos;
using IdentityServer4.AccessTokenValidation;

namespace FoodChooser.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class FoodListsController : Controller
    {
        private readonly IFoodListRepository _foodListRepository;
        private readonly IHostingEnvironment _hostingEnvironment;
        public AppSettings _appSettingsAccessor;
        const int MaxPageSize = 10;
        public UserManager<IdentityUser> _userManager;
        private readonly IUrlHelper _urlHelper;

        public FoodListsController(IFoodListRepository foodListRepository,
            UserManager<IdentityUser> userManager,
            IHostingEnvironment hostingEnvironment,
            IUrlHelper urlHelper, IOptions<AppSettings> appSettingsAccessor)
        {
            _foodListRepository = foodListRepository;
            _userManager = userManager;
            _hostingEnvironment = hostingEnvironment;
            _appSettingsAccessor = appSettingsAccessor.Value;
            _urlHelper = urlHelper;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
        public IActionResult GetAllLists([FromQuery] QueryParameters queryParameters)
        {
            var foodItems = _foodListRepository.GetAll(queryParameters)
                .Where(x => x.UserId == _userManager.GetUserId(HttpContext.User));

            var allItemCount = _foodListRepository.Count();

            var paginationMetadata = new
            {
                totalCount = allItemCount,
                pageSize = queryParameters.PageSize,
                currentPage = queryParameters.Page,
                totalPages = queryParameters.GetTotalPages(allItemCount)
            };

            Response.Headers.Add("X-Pagination",
                Newtonsoft.Json.JsonConvert.SerializeObject(paginationMetadata));

            var links = CreateLinksForCollection(queryParameters, allItemCount);

            var toReturn = foodItems.Select(x => ExpandSingleFoodItem(x));

            return Ok(new
            {
                value = toReturn,
                links = links
            });
        }

        [HttpGet]
        [Route("{id}", Name = nameof(GetSingleList))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
        public IActionResult GetSingleList(Guid id)
        {
            FoodList singleFoodList = _foodListRepository.GetSingle(id);

            if (singleFoodList == null)
            {
                return NotFound();
            }

            if (singleFoodList.UserId != _userManager.GetUserId(HttpContext.User))
            {
                return new StatusCodeResult((int)HttpStatusCode.Forbidden);
            }

            return Ok(Mapper.Map<FoodListDto>(singleFoodList));

        }

        [HttpGet]
        [Route("{id}/getrandomimage")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
        public IActionResult GetRandomImageStringFromList(Guid id)
        {
            FoodList singleFoodList = _foodListRepository.GetSingle(id);

            if (singleFoodList == null)
            {
                return NotFound();
            }

            if (singleFoodList.UserId != _userManager.GetUserId(HttpContext.User))
            {
                return new StatusCodeResult((int)HttpStatusCode.Forbidden);
            }

            if (!singleFoodList.Foods.Any())
            {
                string imagePath = Path.Combine(_hostingEnvironment.ContentRootPath, _appSettingsAccessor.ImageSaveFolder, _appSettingsAccessor.DummyImageName);
                return Ok(imagePath);
            }

            Random random = new Random();
            int index = random.Next(0, singleFoodList.Foods.Count);
            FoodItem foodItem = singleFoodList.Foods.ToList()[index];

            if (String.IsNullOrEmpty(foodItem.ImageString))
            {
                string imagePath = Path.Combine(_hostingEnvironment.ContentRootPath, _appSettingsAccessor.ImageSaveFolder, _appSettingsAccessor.DummyImageName);
                return Ok(imagePath);
            }

            FoodItemDto foodItemViewModel = Mapper.Map<FoodItemDto>(foodItem);
            return Ok(foodItemViewModel.ImageString);

        }

        [HttpPost(Name = nameof(AddList))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult AddList([FromBody] FoodListDto viewModel)
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
            item.UserId = _userManager.GetUserId(HttpContext.User);
            _foodListRepository.Add(item);

            if (_foodListRepository.Save())
            {
                return CreatedAtRoute("GetSingleList", new { id = item.Id }, item);
            }

            return BadRequest();
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult DeleteList(Guid id)
        {
            FoodList singleFoodList = _foodListRepository.GetSingle(id);

            if (singleFoodList == null)
            {
                return NotFound();
            }

            if (singleFoodList.UserId != _userManager.GetUserId(HttpContext.User))
            {
                return new StatusCodeResult((int)HttpStatusCode.Forbidden);
            }

            _foodListRepository.Delete(singleFoodList.Id);

            if (_foodListRepository.Save())
            {
                return NoContent();
            }

            return BadRequest();

        }

        private List<LinkDto> CreateLinksForCollection(QueryParameters queryParameters, int totalCount)
        {
            var links = new List<LinkDto>();

            // self 
            links.Add(
             new LinkDto(_urlHelper.Link(nameof(GetAllLists), new
             {
                 pagecount = queryParameters.PageSize,
                 page = queryParameters.Page
             }), "self", "GET"));

            links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllLists), new
            {
                pagecount = queryParameters.PageSize,
                page = 1
            }), "first", "GET"));

            links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllLists), new
            {
                pagecount = queryParameters.PageSize,
                page = queryParameters.GetTotalPages(totalCount)
            }), "last", "GET"));

            if (queryParameters.HasNext(totalCount))
            {
                links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllLists), new
                {
                    pagecount = queryParameters.PageSize,
                    page = queryParameters.Page + 1
                }), "next", "GET"));
            }

            if (queryParameters.HasPrevious())
            {
                links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllLists), new
                {
                    pagecount = queryParameters.PageSize,
                    page = queryParameters.Page - 1
                }), "previous", "GET"));
            }

            return links;
        }

        private dynamic ExpandSingleFoodItem(FoodList foodList)
        {
            var links = GetLinks(foodList.Id);
            FoodListDto item = Mapper.Map<FoodListDto>(foodList);

            var resourceToReturn = item.ToDynamic() as IDictionary<string, object>;
            resourceToReturn.Add("links", links);

            return resourceToReturn;
        }

        private IEnumerable<LinkDto> GetLinks(Guid id)
        {
            var links = new List<LinkDto>();

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(GetSingleList), new { id = id }),
              "self",
              "GET"));

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(DeleteList), new { id = id }),
              "delete_food",
              "DELETE"));

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(AddList), null),
              "create_food",
              "POST"));

            //links.Add(
            //   new LinkDto(_urlHelper.Link(nameof(), new { id = id }),
            //   "update_food",
            //   "PUT"));

            return links;
        }
    }
}
