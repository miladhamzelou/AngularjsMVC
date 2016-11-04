using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TopPos.Web.Controllers.Common.ReturnTypes;

namespace TopPos.Web.Controllers.Common
{
    public class AutoCompleteController : Controller
    {
        private const int DefaultCount = 5;

        /// <summary>
        /// 取得限定筆數的資料
        /// </summary>
        /// <param name="items">原資料清單</param>
        /// <param name="count">限定筆數</param>
        /// <returns>已限定筆數的資料</returns>
        private object GetByLimit(object items, int count = DefaultCount)
        {
            count = (count == 0) ? DefaultCount : count;

            if ((items is IQueryable<object>) || (items is IEnumerable<object>))
            {
                items = (items as IEnumerable<object>).Take(count);
            }
            return items;
        }

        public ActionResult GetCategory(string term, int count)
        {
            var item1 = new ReturnData
            {
                value = "A0",
                name = "apple product name"
            };

            var item11 = new ReturnData
            {
                value = "B0",
                name = "Jack customer name"
            };

            var item2 = new ReturnData
            {
                value = "A1",
                name = "water product name"
            };

            var item12 = new ReturnData
            {
                value = "B1",
                name = "Tom customer name"
            };

            List<ReturnData> items = new List<ReturnData>();
            items.Add(item1);
            items.Add(item2);
            items.Add(item11);
            items.Add(item12);

            var query = items.Where(d => d.value.Contains(term))
                .Select(x => new ReturnData
                {
                    value = x.value,
                    name = x.name
                });

            return WebUtil.ToJsonResult(GetByLimit(query, count));
        }
    }
}