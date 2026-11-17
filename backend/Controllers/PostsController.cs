using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BloggerManager.API.Data;
using BloggerManager.API.Models;
using BloggerManager.API.DTOs;

namespace BloggerManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/posts?category=...&status=...
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts(
            [FromQuery] string? category, 
            [FromQuery] string? status)
        {
            var query = _context.Posts.Include(p => p.Blogger).AsQueryable();

            if (!string.IsNullOrWhiteSpace(category) && category != "All")
            {
                query = query.Where(p => p.Category == category);
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "All")
            {
                query = query.Where(p => p.Status == status);
            }

            var posts = await query
                .OrderByDescending(p => p.Id)
                .Select(p => new PostDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Excerpt = p.Excerpt,
                    Content = p.Content,
                    Category = p.Category,
                    Views = p.Views,
                    Likes = p.Likes,
                    Status = p.Status,
                    CreatedAt = p.CreatedAt,
                    BloggerId = p.BloggerId,
                    BloggerName = p.Blogger != null ? p.Blogger.Name : "Không rõ"
                })
                .ToListAsync();

            return Ok(posts);
        }

        // GET: api/posts/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> GetPost(int id)
        {
            var post = await _context.Posts
                .Include(p => p.Blogger)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound(new { message = $"Không tìm thấy bài viết có ID = {id}" });
            }

            var dto = new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Excerpt = post.Excerpt,
                Content = post.Content,
                Category = post.Category,
                Views = post.Views,
                Likes = post.Likes,
                Status = post.Status,
                CreatedAt = post.CreatedAt,
                BloggerId = post.BloggerId,
                BloggerName = post.Blogger != null ? post.Blogger.Name : "Không rõ"
            };

            return Ok(dto);
        }

        // POST: api/posts
        [HttpPost]
        public async Task<ActionResult<PostDto>> CreatePost([FromBody] CreatePostDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.Excerpt))
            {
                return BadRequest(new { message = "Tiêu đề và tóm tắt bài viết không được để trống" });
            }

            // Xử lý xác định Blogger: Nếu chưa có BloggerId nhưng có BloggerName
            int targetBloggerId = 0;

            if (dto.BloggerId.HasValue && dto.BloggerId.Value > 0)
            {
                var exists = await _context.Bloggers.AnyAsync(b => b.Id == dto.BloggerId.Value);
                if (exists)
                {
                    targetBloggerId = dto.BloggerId.Value;
                }
            }

            if (targetBloggerId == 0 && !string.IsNullOrWhiteSpace(dto.BloggerName))
            {
                var existingBlogger = await _context.Bloggers
                    .FirstOrDefaultAsync(b => b.Name.ToLower() == dto.BloggerName.Trim().ToLower());

                if (existingBlogger != null)
                {
                    targetBloggerId = existingBlogger.Id;
                }
                else
                {
                    // Tạo mới Blogger nếu người dùng nhập tên blogger mới
                    var newBlogger = new Blogger
                    {
                        Name = dto.BloggerName.Trim(),
                        Username = $"@{dto.BloggerName.Trim().ToLower().Replace(" ", "_")}",
                        Email = $"{dto.BloggerName.Trim().ToLower().Replace(" ", ".")}@example.com",
                        Topic = dto.Category,
                        Bio = $"Blogger chuyên mục {dto.Category}.",
                        Avatar = "/default-avatar.svg",
                        Status = "Đang hoạt động",
                        JoinDate = DateTime.Now.ToString("dd/MM/yyyy")
                    };

                    _context.Bloggers.Add(newBlogger);
                    await _context.SaveChangesAsync();
                    targetBloggerId = newBlogger.Id;
                }
            }

            // Nếu vẫn không có blogger nào, lấy blogger đầu tiên trong database
            if (targetBloggerId == 0)
            {
                var defaultBlogger = await _context.Bloggers.FirstOrDefaultAsync();
                if (defaultBlogger == null)
                {
                    return BadRequest(new { message = "Hệ thống chưa có blogger nào để gán bài viết" });
                }
                targetBloggerId = defaultBlogger.Id;
            }

            var post = new Post
            {
                Title = dto.Title.Trim(),
                Excerpt = dto.Excerpt.Trim(),
                Content = dto.Content ?? string.Empty,
                Category = string.IsNullOrWhiteSpace(dto.Category) ? "Công nghệ" : dto.Category.Trim(),
                BloggerId = targetBloggerId,
                Status = string.IsNullOrWhiteSpace(dto.Status) ? "Đã xuất bản" : dto.Status,
                CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"),
                Views = 0,
                Likes = 0
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            // Lấy lại kèm thông tin Blogger để trả về
            var createdPost = await _context.Posts
                .Include(p => p.Blogger)
                .FirstAsync(p => p.Id == post.Id);

            var resultDto = new PostDto
            {
                Id = createdPost.Id,
                Title = createdPost.Title,
                Excerpt = createdPost.Excerpt,
                Content = createdPost.Content,
                Category = createdPost.Category,
                Views = createdPost.Views,
                Likes = createdPost.Likes,
                Status = createdPost.Status,
                CreatedAt = createdPost.CreatedAt,
                BloggerId = createdPost.BloggerId,
                BloggerName = createdPost.Blogger?.Name ?? "Không rõ"
            };

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, resultDto);
        }

        // PUT: api/posts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] UpdatePostDto dto)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound(new { message = $"Không tìm thấy bài viết có ID = {id}" });
            }

            if (!string.IsNullOrWhiteSpace(dto.Title))
                post.Title = dto.Title.Trim();

            if (!string.IsNullOrWhiteSpace(dto.Excerpt))
                post.Excerpt = dto.Excerpt.Trim();

            if (dto.Content != null)
                post.Content = dto.Content;

            if (!string.IsNullOrWhiteSpace(dto.Category))
                post.Category = dto.Category.Trim();

            if (!string.IsNullOrWhiteSpace(dto.Status))
                post.Status = dto.Status;

            _context.Entry(post).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật bài viết thành công", data = post });
        }

        // DELETE: api/posts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound(new { message = $"Không tìm thấy bài viết có ID = {id}" });
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Đã xóa thành công bài viết có ID = {id}" });
        }
    }
}
