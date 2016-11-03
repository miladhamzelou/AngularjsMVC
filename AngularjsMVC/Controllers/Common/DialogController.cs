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

        #region Dialog 畫面 

        public ActionResult AreaDialog()
        {
            return View();
        }

        #endregion Views

        #region 清單查詢 (JSON AJAX)

        //public ActionResult QueryArea(BAC_Area_M model)
        //{
        //    return WebUtil.ToJsonResult(service.GetArea(model));
        //}

        public ActionResult QueryStore()
        {
            var store1 = new DialogReturnData { Id = "1111", Name = "台北門市" };
            var store2 = new DialogReturnData { Id = "2222", Name = "台南門市" };

            List<DialogReturnData> allStore = new List<DialogReturnData>();
            allStore.Add(store1);
            allStore.Add(store2);

            return WebUtil.ToJsonResult(allStore.AsQueryable());
        }

        #endregion

        public class DialogReturnData
        {
            /// <summary>
            /// 代碼值
            /// </summary>
            public string Id { get; set; }

            /// <summary>
            /// 代碼名稱
            /// </summary>
            public string Name { get; set; }
        }
    }
}