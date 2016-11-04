using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace TopPos.Web.Controllers.Common
{
    public class DialogController : Controller
    {
        public DialogController()
        {
        }

        #region Dialog 

        public ActionResult AreaDialog()
        {
            return View();
        }

        #endregion Views

        #region (JSON AJAX)

        public ActionResult QueryArea(AreaData model)
        {
            var area1 = new DialogReturnData { Id = "A01", Name = "Taipei" };
            var area2 = new DialogReturnData { Id = "A02", Name = "Tainan" };

            List<DialogReturnData> allArea = new List<DialogReturnData>();
            allArea.Add(area1);
            allArea.Add(area2);
            var query = from c in allArea select c;
            if (!string.IsNullOrWhiteSpace(model.AreaID))
            {
                query = query.Where(d => d.Id.Contains(model.AreaID));
            }

            if (!string.IsNullOrWhiteSpace(model.AreaNM))
            {
                query = query.Where(d => d.Name.Contains(model.AreaNM));
            }

            return WebUtil.ToJsonResult(query);
        }

        public ActionResult QueryStore()
        {
            var store1 = new DialogReturnData { Id = "1", Name = "Taipei" };
            var store2 = new DialogReturnData { Id = "2", Name = "Tainan" };
            var store3 = new DialogReturnData { Id = "3", Name = "Keelung" };
            var store4 = new DialogReturnData { Id = "4", Name = "Hsinchu" };
            var store5 = new DialogReturnData { Id = "5", Name = "Taichung" };
            var store6 = new DialogReturnData { Id = "6", Name = "Kaohsiung" };

            List<DialogReturnData> allStore = new List<DialogReturnData>();
            allStore.Add(store1);
            allStore.Add(store2);
            allStore.Add(store3);
            allStore.Add(store4);
            allStore.Add(store5);
            allStore.Add(store6);

            return WebUtil.ToJsonResult(allStore.AsQueryable());
        }

        #endregion

        public class DialogReturnData
        {
            public string Id { get; set; }
            public string Name { get; set; }
        }

        public class AreaData
        {
            public string AreaID { get; set; }
            public string AreaNM { get; set; }
        }

        public class StoreData
        {
            public string Id { get; set; }
            public string Name { get; set; }
        }
    }
}