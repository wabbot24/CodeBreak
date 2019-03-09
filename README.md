# Mastermind

This is a browser game for the classic board game Mastermind.

GAME PLAY: 
- There is a randomly selected 4 color code that you are trying to break.
- You have 10 turns to correctly guess the code.
- For each guess you will receive feedback to the right of your guess.
- You will see a red square for each colored circle in your code that is the correct color AND is in the correct position.
- You will see a white square for each colored circle that is the correct color but is not in the correct position.
- Using this feedback and your deductive reasoning, crack the code!

FEATURES/UI:
- Click the colored squares on the left to fill the current row from left to right.
- You can remove a colored circle in your guess row by clicking on it.
- You can also clear the whole row by clicking the "Clear Row" button on the left.
- Use the "Filler Square" button to add a gray color to circles you're not ready to guess yet.
- When you have populated all four circles with viable colors, a "GUESS" button will appear.
- Click the "GUESS" button to lock in your guess and get feedback.
- When you guess the code correctly or run out of guesses, your wins, losses, and average guesses will update
    and the answer code will display. Click the "PLAY AGAIN" button to try again with a new random code!

MY CODE:
- Feel free to run the code! There are a number of console.log()s you can un-comment to see some of the inner workings.
- I use HTML tables to create the board. I probably could have created them with jquery, and I may go back and try that,
    but for now it's just big old tables in the HTML file.
- I named the classes/IDs of table elements as numbers that correspond to the FOR loops in the javascript.
    So that's why you end up with jquery lines like this: $("#" + (3 + i + reds) + currentrow).css("background-color", "white");
    That's just how I'm leveraging variable values to link them to all these table <td>'s with numeral IDs.
    Sorry if it's difficult to read. I'm sure it's not best practices.

ENJOY!