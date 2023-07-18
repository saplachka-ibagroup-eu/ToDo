using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;


namespace webapi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;
    public TodoController(TodoContext context)
    {
        _context = context;
    }

    // GET: api/Todo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetAll([FromQuery] QueryParameters parameters)
    {
        var todoName = parameters.Name;

        if (todoName == null)
        {
            return await _context.TodoItems.ToListAsync();
        }
        else
        {
            return await _context.TodoItems.Where(e => e.Name == todoName)
             .ToListAsync();
        }
    }

    // GET: api/Todo/5
    [HttpGet("{id}", Name = "GetTodo")]
    public async Task<ActionResult<TodoItem>> GetById(int id)
    {
        var todo = await _context.TodoItems.FindAsync(id);

        if (todo == null)
        {
            return NotFound();
        }

        return todo;
    }

    // PUT: api/Todo/5

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TodoItem todoItem)
    {
        todoItem.Key = id;

        _context.Entry(todoItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoItemExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Todo
    [HttpPost]
    public async Task<ActionResult<TodoItem>> CreateToDo(TodoPostItem todo)
    {
        TodoItem todoItem = new()
        {
            Name = todo.Name,
        };

        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = todoItem.Key }, todoItem);
    }

    // DELETE: api/Todo/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<TodoItem>> Delete(int id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return todoItem;
    }

    private bool TodoItemExists(int id)
    {
        return _context.TodoItems.Any(e => e.Key == id);
    }

}

