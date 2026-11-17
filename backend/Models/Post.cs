using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BloggerManager.API.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Excerpt { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = "Công nghệ";

        public int Views { get; set; } = 0;

        public int Likes { get; set; } = 0;

        [MaxLength(50)]
        public string Status { get; set; } = "Đã xuất bản";

        [MaxLength(50)]
        public string CreatedAt { get; set; } = DateTime.Now.ToString("dd/MM/yyyy");

        // Khóa ngoại liên kết với Blogger
        [ForeignKey("Blogger")]
        public int BloggerId { get; set; }

        [JsonIgnore]
        public Blogger? Blogger { get; set; }
    }
}
