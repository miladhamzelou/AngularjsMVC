using System.Web.Mvc;

namespace AngularjsMVC.Controllers
{
    public class AjaxController : Controller
    {
        public JsonResult GetItems()
        {
            Item[] items = {
                               new Item{id="1", name="item1", amount=12345},
                               new Item{id="2", name="item2", amount=1234567},
                               new Item{id="3", name="item3", amount=123},
                           };


            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPhones()
        {
            Phone[] phones = {
                               new Phone{ name= "John", mobile= "0909123456", age= 25 },
                               new Phone{ name= "Mary", mobile= "0909123457", age= 30 },
                               new Phone{ name= "Jack", mobile= "0909123458", age= 20 },
                           };


            return Json(phones, JsonRequestBehavior.AllowGet);
        }

        public string GetXMLItems()
        {
            Response.ContentType = "application/xml";
            return "<?xml version=\"1.0\" encoding=\"utf-8\"?><items></items>";
        }

        class Item
        {
            public string id { get; set; }
            public string name { get; set; }
            public int amount { get; set; }
        }

        class Phone
        {
            public string name { get; set; }
            public string mobile { get; set; }
            public int age { get; set; }
        }
    }
}
