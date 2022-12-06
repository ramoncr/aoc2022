// See https://aka.ms/new-console-template for more information
using AoC.Two;

Console.WriteLine("Hello, World!");

var lookupValues = new Dictionary<string, int>
{
    { "A", 1 },
    { "B", 2 },
    { "C", 3 }
};

// A & X = Rock => 1 point
// B & Y = Paper => 2 points
// C & Z = Scissors => 3 points

// Draw = 3 points
// Lose = 0 points
// Win = 6 points

var totalScore = 0;

foreach (var round in Rounds.GetAll())
{
    var elf = round.Item1;
    var me = round.Item2.Replace("X", "A").Replace("Y", "B").Replace("Z", "C");

    var roundScore = 0;

    if (elf.Equals(me)) // Equal
        roundScore += 3;

    if (elf.Equals("A") && me.Equals("B") || elf.Equals("B") && me.Equals("C") || elf.Equals("C") && me.Equals("A")) // Win
        roundScore += 6;

    roundScore += lookupValues[me];
    totalScore += roundScore;
}

Console.WriteLine($"Total score: {totalScore}");

// Secret tactic
// Z = Win
// X = Lose
// Y = Draw

totalScore = 0;
foreach (var round in Rounds.GetAll())
{
    var elf = round.Item1;
    var outcome = round.Item2;
    var me = string.Empty;

    if (outcome.Equals("Y")) me = elf; // Draw
    if (outcome.Equals("X")) // Lose
    {
        if (elf.Equals("A")) me = "C";
        if (elf.Equals("B")) me = "A";
        if (elf.Equals("C")) me = "B";
    }
    if (outcome.Equals("Z")) // Win
    {
        if (elf.Equals("C")) me = "A";
        if (elf.Equals("A")) me = "B";
        if (elf.Equals("B")) me = "C";
    }

    var roundScore = 0;

    if (outcome.Equals("Y")) // Equal
        roundScore += 3;

    if (outcome.Equals("Z")) // Win
        roundScore += 6;

    roundScore += lookupValues[me];
    totalScore += roundScore;
}

Console.WriteLine($"Tactic score: {totalScore}");
