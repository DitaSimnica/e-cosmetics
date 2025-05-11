using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartProduct> CartProducts { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Set precision and scale for decimal fields
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)"); // Precision of 18, scale of 2

        modelBuilder.Entity<Cart>()
            .Property(c => c.TotalAmount)
            .HasColumnType("decimal(18,2)"); // Precision of 18, scale of 2

        modelBuilder.Entity<Order>()
            .Property(o => o.TotalAmount)
            .HasColumnType("decimal(18,2)"); // Precision of 18, scale of 2

        // Configure composite key for CartProduct
        modelBuilder.Entity<CartProduct>()
            .HasKey(cp => new { cp.CartId, cp.ProductId });
    }
}
