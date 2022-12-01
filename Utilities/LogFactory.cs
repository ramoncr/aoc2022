using Microsoft.Extensions.Logging;

namespace Utilities
{
    public static class LogFactory
    {

        public static ILogger GetLogger(string category = "main")
        {
            ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
                builder.AddSimpleConsole(options =>
                {
                    options.IncludeScopes = true;
                    options.SingleLine = true;
                    options.TimestampFormat = "HH:mm:ss ";
                }));


            return loggerFactory.CreateLogger(category);
        }
    }
}