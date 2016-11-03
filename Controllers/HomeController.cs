using System.Web.Mvc;

namespace AngularjsPractice.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.IsHome = true;
            return View();
        }
    }
}
