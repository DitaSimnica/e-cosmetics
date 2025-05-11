namespace backend.Services
{
    public interface IAuthService
    {
        Task<string> Register(RegisterDto request);
        Task<string> Login(LoginDto request);
    }
}
