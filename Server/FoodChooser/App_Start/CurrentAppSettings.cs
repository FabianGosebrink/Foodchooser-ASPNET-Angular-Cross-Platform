using System;
using FoodChooser.Provider;

namespace FoodChooser
{
    public static class CurrentAppSettings
    {
        private static readonly IAppSettings AppSettings = new AppSettings();

        public static string ImageSaveFolder => AppSettings.Get<string>("ImageSaveFolder");
        public static string DummyImageName => AppSettings.Get<string>("DummyImageName");
    }
}