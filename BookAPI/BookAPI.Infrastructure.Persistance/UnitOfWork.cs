using BookAPI.Infrastructure.Persistance.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookAPI.Infrastructure.Persistance
{
    public class UnitOfWork
    {
        private Dictionary<string, object> _repos;

        public GenericRepository<Entity> Repository<Entity>() where Entity : class
        {
            if (_repos == null)
            {
                _repos = new Dictionary<string, object>();
            }

            var type = typeof(Entity).Name;

            if (!_repos.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                object repositoryInstance = null;

                repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(Entity)));
                _repos.Add(type, repositoryInstance);
            }
            return (GenericRepository<Entity>)_repos[type];
        }
    }
}
