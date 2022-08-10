
using BookAPI.Infrastructure.Persistance.Interfaces.Services;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace BookAPI.Infrastructure.Persistance.Services
{
    public class GenericService<Entity> : IGenericService<Entity> where Entity : class
    {
        private readonly string url = "https://fakerestapi.azurewebsites.net/api/v1/Books";
        private readonly HttpClient _http;

        public GenericService()
        {
            _http = new HttpClient();
        }
        #region service methods
        public async Task<bool> AddAsync(Entity entity)
        {
            var json = JsonConvert.SerializeObject(entity);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var ServerResponse = await _http.PostAsync(url, data);
            var result = ServerResponse.Content.ReadAsStringAsync();

            return result.IsCompletedSuccessfully;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var response = await _http.DeleteAsync(url + "/" + id);
            var result = response.Content.ReadAsStringAsync();

            return result.IsCompletedSuccessfully;
        }

        public async Task<IEnumerable<Entity>> GetAllAsync()
        {
            var response = await _http.GetStringAsync(url);
            return JsonConvert.DeserializeObject<List<Entity>>(response);
        }

        public async Task<Entity> GetByIdAsync(int id)
        {
            var response = await _http.GetStringAsync(url + "/" + id);
            return JsonConvert.DeserializeObject<Entity>(response);
        }

        public async Task<bool> UpdateAsync(int id, Entity entity)
        {
            var json = JsonConvert.SerializeObject(entity);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var ServerResponse = await _http.PutAsync(url + "/" + id, data);

            return ServerResponse.Content.ReadAsStringAsync().IsCompletedSuccessfully;
        }
        #endregion
    }
}
