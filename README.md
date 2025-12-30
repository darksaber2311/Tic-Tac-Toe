# Tic-Tac-Toe Game

A classic Tic-Tac-Toe game built with HTML5 Canvas and vanilla JavaScript. Play against a Computer opponent with smooth animations and visual feedback.

Project Live at : https://darksaber2311.github.io/Tic-Tac-Toe/

## 🎮 Features

- **Player vs Computer**: Play against a computer opponent
- **Smooth Animations**: X's and O's animate as they're placed on the board
- **Win Detection**: Automatic win detection with visual strike-through lines
- **Canvas-based Graphics**: Beautiful orange-themed UI with clean grid lines

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Click on any empty cell to place your O (circle)
3. The computer will automatically place an X (red cross) after your move
4. The first player to get three in a row (horizontally, vertically, or diagonally) wins!
5. A blue line will appear through the winning combination

## 🛠️ Technologies Used

- **HTML5**: Structure and canvas element
- **JavaScript**: Game logic and AI
- **Canvas API**: Rendering and animations

## 📁 Project Structure

```
TicTacToe/
├── index.html    # Main HTML file with canvas element
├── index.js      # Game logic, AI, and rendering
└── README.md     # Project documentation
```

## 🎯 Game Rules

- You play as **O** (white circles)
- The computer plays as **X** (red crosses)
- Players take turns placing their marks
- First to get three in a row wins
- The game ends when there's a winner or the board is full

## 💻 Installation & Usage

No installation required! Simply:

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Start playing!

## 🎨 Customization

The game uses a 1024x576 canvas with an orange background. You can customize:
- Colors in the `draw()` methods of the `X` and `Circle` classes
- Canvas size by modifying `canvas.width` and `canvas.height`
- Animation speed by adjusting `growthSpeed` increments

## 📝 License

This project is open source and available for personal and educational use.

