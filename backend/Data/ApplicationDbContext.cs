using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        { }

        public DbSet<Users> Users { get; set; }
        public DbSet<CosmeticProduct> CosmeticProduct { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add your column type configurations here
            modelBuilder.Entity<Cart>()
                .Property(c => c.Discount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Cart>()
                .Property(c => c.TotalPrice)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Cart>()
                .Property(c => c.UnitPrice)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<CosmeticProduct>()
                .Property(cp => cp.Discount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<CosmeticProduct>()
                .Property(cp => cp.UnitPrice)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.Discount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.TotalPrice)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.UnitPrice)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Orders>()
                .Property(o => o.OrderTotal)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Users>()
                .Property(u => u.Fund)
                .HasColumnType("decimal(18, 2)");

            base.OnModelCreating(modelBuilder); // Ensure this line is called to maintain EF Core functionality
        }

    }
}
