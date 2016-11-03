namespace TopPos.Web.Controllers.Common.ReturnTypes
{
    public class ZipcodeReturnData : ReturnData
    {
        /// <summary>
        /// Tooltip
        /// </summary>
        public new string label
        {
            get
            {
                return string.Format("{0} - {1}{2}", value, name, ZipCodeName2);
            }
        }

        public string ZipCodeName2 { get; set; }
    }
}