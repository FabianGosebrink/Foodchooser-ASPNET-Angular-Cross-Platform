using System.Web;
using AutoMapper;
using FoodChooser.Models;
using FoodChooser.ViewModels;

namespace FoodChooser
{
    public static class MappingConfig
    {
        public static void CreateMappings()
        {
            Mapper.Initialize(mapper =>
            {
                mapper.CreateMap<FoodItem, FoodItemViewModel>()
                    .ForMember(dest => dest.ImageString, opt => opt.MapFrom(src => VirtualPathUtility.ToAbsolute(CurrentAppSettings.ImageSaveFolder + src.ImageString).TrimStart('/')));
                mapper.CreateMap<FoodItemViewModel, FoodItem>();
                mapper.CreateMap<FoodList, FoodListViewModel>().ReverseMap();
                mapper.CreateMap<SharedFoodList, SharedFoodListViewModel>().ReverseMap();
            });
        }
    }
}