namespace TopPos.Web.Controllers.Common.ReturnTypes
{
    /// <summary>
    /// 自動完成的回覆資料
    /// </summary>
    public class ReturnData
    {
        /// <summary>
        /// Tooltip
        /// </summary>
        public string label
        {
            get
            {
                return string.Format("{0} - {1}", value, name);
            }
        }

        public string value { get; set; }

        public string name { get; set; }
    }
}