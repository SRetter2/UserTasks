using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace UserTasks.Data
{
    public class UserTaskRepository
    {
        private string _connectionString;
        public UserTaskRepository(string conn)
        {
            _connectionString = conn;
        }
        public void AddTask(UserTask task)
        {
            using(var cxt = new UserTaskContext(_connectionString))
            {               
                cxt.Tasks.Add(task);
                cxt.SaveChanges();
            }
        }
        public List<UserTask> GetUserTasks()
        {
            using (var cxt = new UserTaskContext(_connectionString))
            {
                return cxt.Tasks.ToList();
            }
        }
        public void UpdateTask(UserTask task)
        {
            using (var context = new UserTaskContext(_connectionString))
            {
                context.Tasks.Attach(task);
                context.Entry(task).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void DeleteTask(int userTaskId)
        {
            using (var context = new UserTaskContext(_connectionString))
            {
                context.Database.ExecuteSqlCommand(
                    "DELETE FROM Tasks WHERE Id = @id",
                    new SqlParameter("@id", userTaskId));
            }
        }
    }
}
