using NECPractice.Models;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Newtonsoft.Json;
using System;
using System.Data.Entity;

namespace NECPractice.Controllers
{
    public class UnityDemoController : Controller
    {
        public ActionResult UnityDemo()
        {
            return View();
        }

        [HttpPost]
        public string GetList()
        {
            List<Interest> list = new List<Interest>();
            using (TestDBEntities1 db = new TestDBEntities1())
            {
                list = (from s in db.Interest select s).ToList();
            }
            return JsonConvert.SerializeObject(list);

        }
        //新增
        [HttpPost]
        public string Add(Interest list)
        {
            using (TestDBEntities1 db = new TestDBEntities1())
            {
                db.Interest.Add(list);
                db.SaveChanges();
            }
            return JsonConvert.SerializeObject(list);

        }

        //查詢
        [HttpPost]
        public string Search(Interest val)
        {
            if (val.Food == null)
            {
                return GetList();
            }
            else
            {
                List<Interest> list = new List<Interest>();
                using (TestDBEntities1 db = new TestDBEntities1())
                {
                    list = (from s in db.Interest
                            where s.Food.Contains(val.Food)
                            select s).ToList();
                }
                return JsonConvert.SerializeObject(list);
            }
        }

        //查詢2
        [HttpPost]
        public string Search2(Interest val)
        {
            List<Interest> list = new List<Interest>();
            using (TestDBEntities1 db = new TestDBEntities1())
            {
                var query = (from s in db.Interest select s);
                if (!string.IsNullOrEmpty(val.Food))
                {
                    query = query.Where(d => d.Food.Contains(val.Food));
                }
                list = query.ToList();
            }
            return JsonConvert.SerializeObject(list);
        }

        //修改
        [HttpPost]
        public string Update(Interest val)
        {
            if (val != null)
            {
                int Id = Convert.ToInt32(val.Id);
                using (TestDBEntities1 db = new TestDBEntities1())
                {
                    var List = db.Interest.Where(x => x.Id == Id).FirstOrDefault();
                    //List = val; Q1.為什麼不能直接指定?
                    List.Food = val.Food;
                    List.Drink = val.Drink;
                    List.Sport = val.Sport;
                    db.SaveChanges();
                }

                return "修改成功";
            }
            else
            { return "修改失敗"; }
        }

        //修改2
        [HttpPost]
        public string Update2(Interest val)
        {
            if (val != null)
            {
                using (TestDBEntities1 db = new TestDBEntities1())
                {
                    db.Entry(val).State = EntityState.Modified;
                    db.SaveChanges();
                }

                return "修改成功";
            }
            else
            { return "修改失敗"; }
        }

        //刪除
        [HttpPost]
        public string Delete(Interest val)
        {
            if (val != null)
            {
                int Id = Convert.ToInt32(val.Id);
                using (TestDBEntities1 db = new TestDBEntities1())
                {
                    var List = db.Interest.Where(x => x.Id == Id).FirstOrDefault();
                    db.Interest.Remove(List);
                    db.SaveChanges();
                }
                return "刪除成功";
            }
            else
            { return "刪除失敗"; }
        }
    }
}
