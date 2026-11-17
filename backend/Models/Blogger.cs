using System.ComponentModel.DataAnnotations;

namespace BloggerManager.API.Models
{
    public class Blogger
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Topic { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Bio { get; set; } = string.Empty;

        [MaxLength(255)]
        public string Avatar { get; set; } = "/default-avatar.svg";

        public int PostsCount { get; set; } = 0;

        public int Followers { get; set; } = 0;

        [MaxLength(50)]
        public string Status { get; set; } = "Đang hoạt động";

        [MaxLength(50)]
        public string JoinDate { get; set; } = DateTime.Now.ToString("dd/MM/yyyy");

        // Navigation property: 1 Blogger có nhiều bài viết
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}
