using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using UserTasks.Data;

namespace UserTasks.Web
{
    public class UserTaskHub : Hub
    {
        private string _connectionString;

        public UserTaskHub(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        public void GetTasks()
        {
            var repo = new UserTaskRepository(_connectionString);
            var result = repo.GetUserTasks();
            Clients.All.SendAsync("refreshTasks", result);
        }
    }
}
