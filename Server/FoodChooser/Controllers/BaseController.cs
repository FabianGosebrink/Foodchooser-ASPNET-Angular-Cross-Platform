using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using FoodChooser.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace FoodChooser.Controllers
{
    public class BaseController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; set; }

        public IAuthenticationManager AuthenticationManager
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            set
            {
                _userManager = value;
            }
        }
        public ClaimsIdentity CurrentUser { get { return this.User.Identity as ClaimsIdentity; } }

        public string CurrentUserId
        {
            get
            {

                string userName = this.RequestContext.Principal.Identity.Name;
                ApplicationUser user = UserManager.FindByName(userName);
                //return Convert.ToInt32(CurrentUser.FindFirst("userid").Value);
                return user.Id;
            }
        }

        public string CurrentUserEmail
        {
            get
            {
                //return Convert.ToInt32(CurrentUser.FindFirst("userid").Value);
                return "fabian.gosebrink@outlook.com";
            }
        }
    }
}
