using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodChooser.Provider
{
    public interface IAppSettings
    {
        T Get<T>(string name);
    }
}
