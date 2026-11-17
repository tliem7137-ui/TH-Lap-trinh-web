namespace BloggerManager.API.DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Excerpt { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Views { get; set; }
        public int Likes { get; set; }
        public string Status { get; set; } = string.Empty;
        public string CreatedAt { get; set; } = string.Empty;
        public int BloggerId { get; set; }
        public string BloggerName { get; set; } = string.Empty;
    }

    public class CreatePostDto
    {
        public string Title { get; set; } = string.Empty;
        public string Excerpt { get; set; } = string.Empty;
        public string? Content { get; set; }
        public string Category { get; set; } = "Công nghệ";
        public string? Status { get; set; } = "Đã xuất bản";
        public int? BloggerId { get; set; }
        public string? BloggerName { get; set; }
    }

    public class UpdatePostDto
    {
        public string? Title { get; set; }
        public string? Excerpt { get; set; }
        public string? Content { get; set; }
        public string? Category { get; set; }
        public string? Status { get; set; }
    }
}
