namespace TopPos.Web.Infrastructure.Helpers
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Route { get; set; }
        public int? ParentId { get; set; }
        public string Seq { get; set; }
    }
}