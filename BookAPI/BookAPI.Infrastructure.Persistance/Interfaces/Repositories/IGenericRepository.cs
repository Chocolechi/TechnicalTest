using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookAPI.Infrastructure.Persistance.Interfaces.Repositories
{
    public interface IGenericRepository<Entity> where Entity : class
    {
        Task<IEnumerable<Entity>> GetAll();
        Task<Entity> GetById(int Id);
        Task<bool> Add(Entity entity);
        Task<bool> Update(int Id, Entity entity);
        Task<bool> Delete(int Id);
    }
}
