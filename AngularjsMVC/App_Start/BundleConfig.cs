using System.Web;
using System.Web.Optimization;

namespace NECPractice
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include("~/Scripts/jquery-ui.js"));
            bundles.Add(new ScriptBundle("~/bundles/ng").Include("~/Scripts/angular.js"));

            //added by Nick 2016-10-14
            bundles.Add(new ScriptBundle("~/bundles/ng-Module").Include("~/Content/Angularjs/Module.js"));
            bundles.Add(new ScriptBundle("~/bundles/ng-Service").Include("~/Content/Angularjs/Service.js"));
            bundles.Add(new ScriptBundle("~/bundles/ng-Controller").Include("~/Content/Angularjs/Controller.js"));
            
            
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/Site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/jqueryui").Include(
                "~/Content/themes/jqueryui/jquery-ui.css",
                "~/Content/themes/jqueryui/jquery-ui.theme.css",
                "~/Content/themes/jqueryui/jquery-ui.structure.css"));
        }
    }
}