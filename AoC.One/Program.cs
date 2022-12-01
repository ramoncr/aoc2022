// See https://aka.ms/new-console-template for more information
using AoC.One;

Console.WriteLine("Hello, World!");

var provisionList = Provisions.GetList();


var elfIndex = 0;
var currentCalories = 0;

var caloriesPerElf = new Dictionary<int, int>();


var highestAmountOfCalories = 0;

foreach (var rawCalories in provisionList)
{
    if (string.IsNullOrWhiteSpace(rawCalories))
    {
        if (currentCalories > highestAmountOfCalories) highestAmountOfCalories = currentCalories;

        caloriesPerElf.Add(elfIndex, currentCalories);

        elfIndex++;
        currentCalories = 0;
        continue;
    }

    var calories = int.Parse(rawCalories);
    currentCalories += calories;

}

Console.WriteLine($"Hightest Calories: {highestAmountOfCalories}");

;

var top3 = caloriesPerElf.OrderByDescending(kvp => kvp.Value).Take(3);
Console.WriteLine("Top 3:");
foreach (var kvp in
top3)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}


Console.WriteLine($"Total: {top3.Select(kvp => kvp.Value).Sum()}");

