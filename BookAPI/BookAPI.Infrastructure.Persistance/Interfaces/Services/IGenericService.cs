using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookAPI.Infrastructure.Persistance.Interfaces.Services
{
    public interface IGenericService<Entity> where Entity : class
    {
        Task<IEnumerable<Entity>> GetAllAsync();
        Task<Entity> GetByIdAsync(int id);
        Task<bool> AddAsync(Entity entity);
        Task<bool> UpdateAsync(int id, Entity entity);
        Task<bool> DeleteAsync(int id);
    }
}
