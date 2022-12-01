// See https://aka.ms/new-console-template for more information
using AoC.One;
using Microsoft.Extensions.Logging;
using Utilities;

var logger = LogFactory.GetLogger();
logger.LogInformation("Let's count some calories for the elves.");

var provisionList = Provisions.GetList();
var elfIndex = 0;
var currentCalories = 0;
var caloriesPerElf = new Dictionary<int, int>();

foreach (var rawCalories in provisionList)
{
    if (string.IsNullOrWhiteSpace(rawCalories))
    {
        caloriesPerElf.Add(elfIndex, currentCalories);
        elfIndex++;
        currentCalories = 0;
        continue;
    }

    currentCalories += int.Parse(rawCalories);
}

var top3 = caloriesPerElf.OrderByDescending(kvp => kvp.Value).Take(3).ToList();

logger.LogInformation("Top 3 elves with most calories:");
for (int i = 0; i < top3.Count; i++)
    logger.LogInformation("{position:00}. Elf no. {elfIndex} with {calories}", i, top3[i].Key, top3[i].Value);

logger.LogInformation("With a total of {top3TotalCalories}", top3.Select(kvp => kvp.Value).Sum());