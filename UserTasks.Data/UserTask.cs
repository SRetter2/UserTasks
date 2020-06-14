using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json;

namespace UserTasks.Data
{
    public class UserTask
    {
        public int Id { get; set; }
        public string Name { get; set; }   
        public string UserName { get; set; }
    }
}
