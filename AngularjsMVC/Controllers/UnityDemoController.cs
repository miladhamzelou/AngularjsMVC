using AngularjsMVC.Models;
using System.Web.Mvc;
using System.Linq;
using Newtonsoft.Json;
using System;
using System.Data.Entity;

namespace AngularjsMVC.Controllers
{
    public class UnityDemoController : Controller
    {
        public ActionResult UnityDemo()
        {
            return View();
        }

        [HttpPost]
        public string Add(Interest list)
        {
            using (DemoDBEntities db = new DemoDBEntities())
            {
                db.Interest.Add(list);
                db.SaveChanges();
            }
            return JsonConvert.SerializeObject(list);
        }

        [HttpPost]
        public string GetList(Interest val)
        {
            using (DemoDBEntities db = new DemoDBEntities())
            {
                var query = (from s in db.Interest select s);

                if (val.Food != null)
                {
                    query = query.Where(d => d.Food.Contains(val.Food));
                }
                return JsonConvert.SerializeObject(query);
            }
        }

        [HttpPost]
        public string Update(Interest val)
        {
            using (DemoDBEntities db = new DemoDBEntities())
            {
                db.Entry(val).State = EntityState.Modified;
                db.SaveChanges();
            }
            return "OK";
        }

        [HttpPost]
        public string Delete(Interest val)
        {
            int Id = Convert.ToInt32(val.Id);
            using (DemoDBEntities db = new DemoDBEntities())
            {
                var List = db.Interest.Where(x => x.Id == Id).FirstOrDefault();
                db.Interest.Remove(List);
                db.SaveChanges();
            }
            return "OK";
        }
    }
}
