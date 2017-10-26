using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodChooser.Configuration
{
    public class AppSettings
    {
        public string DummyImageName { get; set; } = "dummy.png";
        public string ImageSaveFolder { get; set; } = "FoodImages/";
    }
}
