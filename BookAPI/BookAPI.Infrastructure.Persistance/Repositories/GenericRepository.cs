using BookAPI.Infrastructure.Persistance.Interfaces.Repositories;
using BookAPI.Infrastructure.Persistance.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookAPI.Infrastructure.Persistance.Repositories
{
    public class GenericRepository<Entity> : IGenericRepository<Entity> where Entity : class
    {
        private readonly GenericService<Entity> _dbContext;
        public GenericRepository()
        {
            _dbContext = new GenericService<Entity>();
        }
        #region methods
        public async Task<bool> Add(Entity entity)
        {
            return await _dbContext.AddAsync(entity);
        }
        public async Task<bool> Delete(int id)
        {
            return await _dbContext.DeleteAsync(id);
        }
        public async Task<IEnumerable<Entity>> GetAll()
        {
            return await _dbContext.GetAllAsync();
        }
        public async Task<Entity> GetById(int id)
        {
            return await _dbContext.GetByIdAsync(id);
        }
        public async Task<bool> Update(int id, Entity entity)
        {
            return await _dbContext.UpdateAsync(id, entity);
        }
        #endregion
    }
}
