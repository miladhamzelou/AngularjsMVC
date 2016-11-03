using System.Web.Mvc;

namespace AngularjsMVC.Controllers
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
