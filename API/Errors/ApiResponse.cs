namespace API.Errors
{
  public class ApiResponse
  {
    public ApiResponse(int statusCode, string message = null)
    {
      StatusCode = statusCode;
      Message = message ?? GetDefaultMessageForStatusCode(statusCode);
    }

    public int StatusCode { get; set; }
    public string Message { get; set; }

    private string GetDefaultMessageForStatusCode(int statusCode)
    {
      return statusCode switch
      {
        400 => "A Bad Request, You Have Made",
        401 => "Authorized, You are not",
        404 => "Resource found, it was not",
        500 => "Errors are the path to the dark Side. Errors Leads to anger, Anger Leads to hate. Hate Leads to career change",
        _ => null
      };
    }
  }
}