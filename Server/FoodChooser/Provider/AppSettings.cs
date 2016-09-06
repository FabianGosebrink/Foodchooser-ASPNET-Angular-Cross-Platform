using System;
using System.Configuration;

namespace FoodChooser.Provider
{
    public class AppSettings : IAppSettings
    {
        public T Get<T>(string name)
        {
            return (T) Convert.ChangeType(ConfigurationManager.AppSettings[name], typeof(T));
        }
    }
}