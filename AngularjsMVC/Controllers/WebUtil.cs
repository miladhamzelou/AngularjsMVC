using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace TopPos.Web.Controllers
{
    /// <summary>
    /// 網頁公用元件
    /// </summary>
    public class WebUtil
    {
        /// <summary>
        /// 將資料物件的轉為JSON
        /// </summary>
        /// <param name="value">資料物件</param>
        /// <returns>資料物件的JSON</returns>
        public static string ToJson(object value)
        {
            return JsonConvert.SerializeObject(PagingData(value));
        }

        private static object PagingData(object value, object extraData = null)
        {
            if ((value is IQueryable<object>) || (value is IEnumerable<object>))
            {
                PageSetting setting = GetPageSetting();
                if (setting != null)
                {
                    value = new PageInfo
                    {
                        Items = ((IQueryable<object>)value).Skip((setting.CurrentPage - 1) * setting.PageSize).Take(setting.PageSize),
                        TotalItems = ((IQueryable<object>)value).Count(),
                        PageSize = setting.PageSize,
                        CurrentPage = setting.CurrentPage,
                        ExtraData = extraData
                    };
                }
            }
            return value;
        }

        /// <summary>
        /// 將傳入的物件做分頁處理並回傳JsonResult
        /// </summary>
        /// <param name="value"></param>
        /// <returns>內含序列化成JSON格式物件的JsonResult</returns>
        public static ActionResult ToJsonResult(object value)
        {
            ContentResult result = new ContentResult();

            result.ContentType = "application/json";
            result.Content = JsonConvert.SerializeObject(PagingData(value));

            return result;
        }

        public static ActionResult ToJsonResult(object value, object paginExtraData)
        {
            ContentResult result = new ContentResult();

            result.ContentType = "application/json";
            result.Content = JsonConvert.SerializeObject(PagingData(value, paginExtraData));

            return result;
        }

        /// <summary>
        /// 將傳入的物件做內容處理並回傳ContentResult
        /// </summary>
        /// <param name="value"></param>
        /// <returns>內含序列化成JSON格式物件的ContentResult</returns>
        public static ActionResult ToContentResult(object value)
        {
            ContentResult result = new ContentResult();

            result.Content = JsonConvert.SerializeObject(PagingData(value));

            return result;
        }

        private static PageSetting GetPageSetting()
        {
            HttpRequest request = HttpContext.Current.Request;
            PageSetting setting = null;

            if (request.QueryString.Get("pageSize") != null && request.QueryString.Get("currentPage") != null)
            {
                setting = new PageSetting
                {
                    PageSize = int.Parse(request.QueryString.Get("pageSize")),
                    CurrentPage = int.Parse(request.QueryString.Get("currentPage"))
                };
            }

            return setting;
        }

        private class PageSetting
        {
            public int PageSize { get; set; }
            public int CurrentPage { get; set; }
        }

        public class PageInfo
        {
            public IQueryable<object> Items { get; set; }
            public int TotalItems { get; set; }
            public int PageSize { get; set; }
            public int CurrentPage { get; set; }
            public int TotalPages
            {
                get
                {
                    return (int)Math.Ceiling((decimal)TotalItems / PageSize);
                }
            }
            public object ExtraData { get; set; }
        }

        /// <summary>
        /// 根據新增還是異動資料，設定使用者
        /// </summary>
        /// <param name="items">多筆資料</param>
        /// <param name="empId">使用者ID</param>
        /// <param name="isAdd">是否為新增</param>
        public static void SetEntitiesUser(IEnumerable<object> items, string empId, bool isAdd)
        {
            if (items == null)
            {
                return;
            }

            foreach (var item in items)
            {
                SetEntityUser(item, empId, isAdd);
            }
        }

        /// <summary>
        /// 根據新增還是異動資料，設定使用者
        /// </summary>
        /// <param name="items">資料</param>
        /// <param name="empId">使用者ID</param>
        /// <param name="isAdd">是否為新增</param>
        public static void SetEntityUser(object item, string empId, bool isAdd)
        {
            if (item == null)
            {
                return;
            }

            if (isAdd)
            {
                SetPropertyValue(item, "CreateID", empId);
            }
            SetPropertyValue(item, "UserID", empId);
        }

        private static void SetPropertyValue(object data, string propertyName, object value)
        {
            try
            {
                Type type = data.GetType();
                PropertyInfo propertyInfo = type.GetProperty(propertyName);

                propertyInfo.SetValue(data, value);
            }
            catch (Exception)
            {
                // do nothing
            }
        }
    }
}