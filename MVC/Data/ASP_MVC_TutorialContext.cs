using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ASP_MVC_Tutorial.Models;

namespace ASP_MVC_Tutorial.Data
{
    public class ASP_MVC_TutorialContext : DbContext
    {
        public ASP_MVC_TutorialContext (DbContextOptions<ASP_MVC_TutorialContext> options)
            : base(options)
        {
        }

        public DbSet<ASP_MVC_Tutorial.Models.Movie> Movie { get; set; } = default!;
    }
}
