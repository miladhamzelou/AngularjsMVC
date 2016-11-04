using System.Web.Optimization;

namespace TopPos.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            //bundles.Add(new StyleBundle("~/Content/Login").Include(
            //        "~/Content/base/layout.css",
            //        "~/Content/base/page.css"
            //    ));

            bundles.Add(new StyleBundle("~/Content/basecss").Include(
                    "~/Content/base/blocks.css",
                    "~/Content/base/menu.css",
                    "~/Content/base/icons.css",
                    "~/Content/base/page.css",
                    "~/Content/base/directive.css",
                    "~/Content/base/ng-tree-dnd.css"
                ));

            bundles.Add(new StyleBundle("~/Content/jqueryui")
                .IncludeDirectory("~/Content/themes/jqueryui", "*.css", true));

            bundles.Add(new ScriptBundle("~/Scripts/ng").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-resource.min.js"
                ));

            bundles.Add(new ScriptBundle("~/Scripts/thirdparty").Include(
                "~/Scripts/ocLazyLoad.min.js",
                "~/Scripts/ng-tree-dnd.debug.js",
                "~/Scripts/alasql.min.js",
                "~/Scripts/xlsx.core.min.js"
                ));

            bundles.Add(new ScriptBundle("~/Scripts/ngcustom").Include(
                 "~/Scripts/Custom/common.js",
                 "~/Scripts/Custom/services.js",
                 "~/Scripts/Custom/services/*.js",
                 "~/Scripts/Custom/app.module.js",
                 "~/Scripts/Custom/app.config.js",
                 "~/Scripts/Custom/app.run.js",
                 "~/Scripts/Custom/*.js",
                 "~/Scripts/Custom/components/*.js",
                 "~/Scripts/Repository/repositories.js",
                 "~/Scripts/Repository/Common/*.js",
                 "~/Scripts/Controller/Common/*.js",

                 "~/Scripts/Controller/TEST/*.js"
                 ));

            bundles.Add(new ScriptBundle("~/Scripts/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/Scripts/jqueryui").Include(
                "~/Scripts/jquery-ui-1.11.4.js",
                "~/Scripts/jquery-ui-ext.js",
                "~/Scripts/datepicker-zh-TW.js"
                ));

            bundles.Add(new ScriptBundle("~/Scripts/jqueryval").Include(
                "~/Scripts/jquery.validate*"));
        }
    }
}
