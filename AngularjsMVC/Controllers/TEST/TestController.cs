using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace TopPos.Web.Controllers.TEST
{
    public class TestController : Controller
    {
        public ViewResult Test()
        {
            return View();
        }

        public ActionResult ImportExcel()
        {
            return View();
        }

        public ActionResult ExportCsv()
        {
            return View();
        }

        public ViewResult CssDemo()
        {
            return View();
        }

        public ActionResult TestDragDrop()
        {
            return View();
        }

        public ViewResult ExportExcel()
        {
            return View();
        }

        public ActionResult ZipFile()
        {
            return View();
        }

        public ActionResult CustomDirectiveDemo()
        {
            return View();
        }

        public ActionResult FileUpload(HttpPostedFileBase file, string folder)
        {
            ActionResult result = null;

            if (file != null)
            {
                if (file.ContentLength > 0)
                {
                    var path = Path.Combine(Server.MapPath(WebConfigurationManager.AppSettings["FileUploadPath"] + "/" + folder), file.FileName);
                    FileInfo finfo = new FileInfo(path);

                    if (!finfo.Directory.Exists)
                    {
                        finfo.Directory.Create();
                    }
                    file.SaveAs(path);

                    result = WebUtil.ToJsonResult(path);
                }
            }

            return result;
        }

        public ActionResult MutiUpload(string[] test1, string[] test2, IEnumerable<HttpPostedFileBase> files)
        {
            ActionResult returnTemp = null;
            foreach (var file in files)
            {
                if (file != null)
                {
                    if (file.ContentLength > 0)
                    {
                        string a = file.ToString();
                        var fileName = Path.GetFileName(file.FileName);
                        var path = Path.Combine(Server.MapPath("~/Log"), fileName);
                        file.SaveAs(path);
                    }
                }
            }
            return returnTemp;
        }

        public class demoExcelImport
        {
            public virtual string test1 { get; set; }
            public virtual string test2 { get; set; }
        }

        public ViewResult FormValidation()
        {
            return View();
        }

        public class TestUpload
        {
            public virtual string Column1 { get; set; }
            public virtual string ImageUrl { get; set; }
            public virtual string ImageFileName { get; set; }
        }

        public ViewResult LoadingBlocker()
        {
            return View();
        }

        public string WaitForSeconds(int seconds)
        {
            Thread.Sleep(seconds * 1000);

            return "OK";
        }

        public ViewResult DragDrop()
        {
            return View();
        }

        public ViewResult LockData()
        {
            return View();
        }
    }
}