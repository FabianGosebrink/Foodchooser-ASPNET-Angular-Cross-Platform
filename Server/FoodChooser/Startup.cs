using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using FoodChooser;
using FoodChooser.Models;
using FoodChooser.ViewModels;
using Microsoft.Owin;
using Owin;
using WebApiContrib.IoC.Ninject;

[assembly: OwinStartup(typeof(Startup))]

namespace FoodChooser
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration
            {
                DependencyResolver = new NinjectResolver(NinjectConfig.CreateKernel())
            };
           
            WebApiConfig.Register(config);

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());

            Mapper.Initialize(mapper =>
            {
                mapper.CreateMap<FoodItem, FoodItemViewModel>().ReverseMap();
                mapper.CreateMap<FoodList, FoodListViewModel>().ReverseMap();
                mapper.CreateMap<SharedFoodList, SharedFoodListViewModel>().ReverseMap();
            });

            ConfigureAuthentication.ConfigureAuth(app);

            app.UseWebApi(config);
        }
    }
}
