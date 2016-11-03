using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace TopPos.Web.Infrastructure.Helpers
{
    public static class Menu
    {
        public static MvcHtmlString RenderMenu(this HtmlHelper htmlHelper,
            IEnumerable<MenuItem> items, int parentId = 0)
        {
            return MvcHtmlString.Create(RenderChildren(items, parentId));
        }

        private static string RenderChildren(IEnumerable<MenuItem> items, int parentId)
        {
            StringBuilder sb = new StringBuilder();
            IEnumerable<MenuItem> subItems = items.Where(x => x.ParentId.Equals(parentId)).OrderBy(x => x.Seq);

            sb.Append("<ul>");
            foreach (MenuItem item in subItems)
            {
                sb.Append(RenderItem(items, item));
            }
            sb.Append("</ul>");

            return sb.ToString();
        }

        private static string RenderItem(IEnumerable<MenuItem> items, MenuItem item)
        {
            string html = String.Empty;
            bool hasSubItems = (items.Where(x => x.ParentId.Equals(item.Id)).Count() > 0);

            if (hasSubItems)
            {
                html = String.Format("<li class='node'><h2>{0}</h2>{1}</li>",
                    item.Name, RenderChildren(items, item.Id));
            }
            else
            {
                html = String.Format("<li><h2><a href='#{0}'>{1}</a></h2></li>",
                    item.Route, item.Name);
            }

            return html;
        }
    }
}