namespace BloggerManager.API.DTOs
{
    public class BloggerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Topic { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public int PostsCount { get; set; }
        public int Followers { get; set; }
        public string Status { get; set; } = string.Empty;
        public string JoinDate { get; set; } = string.Empty;
    }

    public class CreateBloggerDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Topic { get; set; }
        public string? Bio { get; set; }
        public string? Avatar { get; set; }
        public string? Status { get; set; }
    }

    public class UpdateBloggerDto
    {
        public string? Name { get; set; }
        public string? Topic { get; set; }
        public string? Bio { get; set; }
        public string? Status { get; set; }
    }
}
