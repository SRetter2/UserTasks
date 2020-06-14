using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using UserTasks.Data;
using UserTasks.Web.Models;

namespace UserTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTaskController : ControllerBase
    {
        private string _connectionString;

        public UserTaskController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }        
        [HttpPost]
        [Route("addtask")]
        public void AddUserTask(UserTask task)
        {
            var repo = new UserTaskRepository(_connectionString);
            repo.AddTask(task);
        }
        [HttpPost]
        [Route("updatetask")]
        public void UpdateTask(UserTask task)
        {
            var repo = new UserTaskRepository(_connectionString);
            var repo2 = new UserRepository(_connectionString);
            var user = repo2.GetByEmail(User.Identity.Name);
            task.UserName = $"{ user.FirstName} {user.LastName}";
            repo.UpdateTask(task);
        }
        [HttpPost]
        [Route("deletetask")]
        public void DeleteTask(DeleteUserTaskViewModel vm)
        {
            var repo = new UserTaskRepository(_connectionString);
            repo.DeleteTask(vm.Id);
        }

    }
}