using BookAPI.Infrastructure.Persistance;
using BookAPI.Infrastructure.Persistance.Entities;
using BookAPI.Infrastructure.Persistance.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookAPI.Controllers
{
    [Route("api/Books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private GenericRepository<Book> _repo;

        public BooksController()
        {
            _unitOfWork = new();
            _repo = _unitOfWork.Repository<Book>();
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Book>))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetAllBooks()
        {
            try
            {
                return Ok(await _repo.GetAll());
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.ToString());
                return StatusCode(400, ModelState);
            }
        }

        [HttpGet("{id:int}", Name = "GetBookById")]
        [ProducesResponseType(200, Type = typeof(Book))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> GetBookById(int id)
        {
            try
            {
                Book book = await _repo.GetById(id);

                if (book == null)
                {
                    return NotFound("This book does not exists.");
                }
                else
                {
                    return Ok(book);
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.ToString());
                return StatusCode(400, ModelState);
            }
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Book))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateBook([FromBody] Book book)
        {
            try
            {
                if (book == null)
                {
                    return BadRequest(ModelState);
                }

                if (await _repo.Add(book))
                {
                    return Created("~api/Book", new { book = book });
                }

                ModelState.AddModelError("", $"Something bad happened trying to save {book.Title}");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.ToString());
                return StatusCode(400, ModelState);
            }
        }

        [HttpPut("{id:int}", Name = "UpdateBook")]
        [ProducesResponseType(204)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            try
            {
                if (book == null || id != book.Id)
                {
                    return BadRequest(ModelState);
                }

                if (!await _repo.Update(id, book))
                {
                    ModelState.AddModelError("", $"Something bad happened trying to update {book.Title}");
                    return StatusCode(500, ModelState);
                }

                return Content("Record Updated.");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.ToString());
                return StatusCode(400, ModelState);
            }
        }


        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                Book book = await _repo.GetById(id);
                if (book == null)
                {
                    return NotFound("This book does not exist.");
                }

                if (!await _repo.Delete(id))
                {
                    ModelState.AddModelError("", $"There was an error trying to delete {book.Title}");
                    return StatusCode(500, ModelState);
                }

                return Content("Record deleted successfuly.");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.ToString());
                return StatusCode(400, ModelState);
            }
        }

    }
}
