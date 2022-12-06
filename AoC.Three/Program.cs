// See https://aka.ms/new-console-template for more information
using AoC.Three;

Console.WriteLine("Hello, World!");

var allSacks = RuckSacks.Contents();
var sum = 0;


foreach (var sack in allSacks)
{
    var split = sack.Length / 2;
    var comp1 = sack.Substring(0, split);
    var comp2 = sack.Substring(split);
    var duplicateList = new List<char>();

    foreach (var comp1type in comp1)
    {

        if (comp2.Contains(comp1type, StringComparison.Ordinal) && !duplicateList.Contains(comp1type))
        {
            duplicateList.Add(comp1type);
            int index = char.ToUpper(comp1type) - 64;
            if (char.IsUpper(comp1type)) index += 26;
            sum += index;
            continue;
        }
    }
}


Console.WriteLine($"Result: {sum}");
