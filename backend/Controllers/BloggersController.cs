using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BloggerManager.API.Data;
using BloggerManager.API.Models;
using BloggerManager.API.DTOs;

namespace BloggerManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BloggersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BloggersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/bloggers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloggerDto>>> GetBloggers()
        {
            var bloggers = await _context.Bloggers
                .Select(b => new BloggerDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Username = b.Username,
                    Email = b.Email,
                    Topic = b.Topic,
                    Bio = b.Bio,
                    Avatar = b.Avatar,
                    PostsCount = b.Posts.Count,
                    Followers = b.Followers,
                    Status = b.Status,
                    JoinDate = b.JoinDate
                })
                .ToListAsync();

            return Ok(bloggers);
        }

        // GET: api/bloggers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BloggerDto>> GetBlogger(int id)
        {
            var blogger = await _context.Bloggers
                .Include(b => b.Posts)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (blogger == null)
            {
                return NotFound(new { message = $"Không tìm thấy blogger có ID = {id}" });
            }

            var dto = new BloggerDto
            {
                Id = blogger.Id,
                Name = blogger.Name,
                Username = blogger.Username,
                Email = blogger.Email,
                Topic = blogger.Topic,
                Bio = blogger.Bio,
                Avatar = blogger.Avatar,
                PostsCount = blogger.Posts.Count,
                Followers = blogger.Followers,
                Status = blogger.Status,
                JoinDate = blogger.JoinDate
            };

            return Ok(dto);
        }

        // POST: api/bloggers
        [HttpPost]
        public async Task<ActionResult<BloggerDto>> CreateBlogger([FromBody] CreateBloggerDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                return BadRequest(new { message = "Tên blogger không được để trống" });
            }

            var username = !string.IsNullOrWhiteSpace(dto.Username) 
                ? dto.Username 
                : $"@{dto.Name.Trim().ToLower().Replace(" ", "_")}";

            var email = !string.IsNullOrWhiteSpace(dto.Email)
                ? dto.Email
                : $"{dto.Name.Trim().ToLower().Replace(" ", ".")}@example.com";

            var blogger = new Blogger
            {
                Name = dto.Name.Trim(),
                Username = username,
                Email = email,
                Topic = dto.Topic ?? "Đời sống",
                Bio = dto.Bio ?? $"Blogger chuyên mục {dto.Topic ?? "Đời sống"}.",
                Avatar = string.IsNullOrWhiteSpace(dto.Avatar) ? "/default-avatar.svg" : dto.Avatar,
                Status = dto.Status ?? "Đang hoạt động",
                JoinDate = DateTime.Now.ToString("dd/MM/yyyy")
            };

            _context.Bloggers.Add(blogger);
            await _context.SaveChangesAsync();

            var resultDto = new BloggerDto
            {
                Id = blogger.Id,
                Name = blogger.Name,
                Username = blogger.Username,
                Email = blogger.Email,
                Topic = blogger.Topic,
                Bio = blogger.Bio,
                Avatar = blogger.Avatar,
                PostsCount = 0,
                Followers = blogger.Followers,
                Status = blogger.Status,
                JoinDate = blogger.JoinDate
            };

            return CreatedAtAction(nameof(GetBlogger), new { id = blogger.Id }, resultDto);
        }

        // PUT: api/bloggers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlogger(int id, [FromBody] UpdateBloggerDto dto)
        {
            var blogger = await _context.Bloggers.FindAsync(id);
            if (blogger == null)
            {
                return NotFound(new { message = $"Không tìm thấy blogger có ID = {id}" });
            }

            if (!string.IsNullOrWhiteSpace(dto.Name))
                blogger.Name = dto.Name.Trim();

            if (!string.IsNullOrWhiteSpace(dto.Topic))
                blogger.Topic = dto.Topic.Trim();

            if (dto.Bio != null)
                blogger.Bio = dto.Bio;

            if (!string.IsNullOrWhiteSpace(dto.Status))
                blogger.Status = dto.Status;

            _context.Entry(blogger).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật thông tin blogger thành công", data = blogger });
        }

        // DELETE: api/bloggers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogger(int id)
        {
            var blogger = await _context.Bloggers.FindAsync(id);
            if (blogger == null)
            {
                return NotFound(new { message = $"Không tìm thấy blogger có ID = {id}" });
            }

            _context.Bloggers.Remove(blogger);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Đã xóa thành công blogger có ID = {id}" });
        }
    }
}
