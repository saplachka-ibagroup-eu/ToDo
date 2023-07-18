namespace AuthApi.Services;

public class ImageUtils
{
    public static string ToBase64String(IFormFile file)
    {
        using var binaryReader = new BinaryReader(file.OpenReadStream());
        byte[] data = binaryReader.ReadBytes((int)file.Length);
        return $"data:{file.ContentType};base64,{Convert.ToBase64String(data)}";
    }
}
