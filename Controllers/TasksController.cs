using Microsoft.AspNetCore.Mvc;
using todolist.Models;
using System.Linq;

namespace todolist.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static readonly List<TaskItem> tasks = new();
        private static int nextId = 1;

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult Post([FromBody] TaskItem task)
        {
            if (task == null || string.IsNullOrWhiteSpace(task.Name))
                return BadRequest("Task name is required.");

            task.Id = nextId++;
            tasks.Add(task);

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);

            if (task == null)
                return NotFound();

            tasks.Remove(task);
            return Ok();
        }
    }
}