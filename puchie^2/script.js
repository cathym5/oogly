const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const heart = document.getElementById('heart');

let player1Score = 0;
let player2Score = 0;

function movePlayer(player, dx, dy) {
    const rect = player.getBoundingClientRect();
    const gameAreaRect = document.getElementById('gameArea').getBoundingClientRect();

    const newLeft = Math.min(Math.max(rect.left + dx, gameAreaRect.left), gameAreaRect.right - rect.width);
    const newTop = Math.min(Math.max(rect.top + dy, gameAreaRect.top), gameAreaRect.bottom - rect.height);

    player.style.left = newLeft - gameAreaRect.left + 'px';
    player.style.top = newTop - gameAreaRect.top + 'px';

    checkCollision(player);
}

function checkCollision(player) {
    const heartRect = heart.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
        playerRect.left < heartRect.right &&
        playerRect.right > heartRect.left &&
        playerRect.top < heartRect.bottom &&
        playerRect.bottom > heartRect.top
    ) {
        if (player === player1) {
            player1Score++;
            alert(`Player 1 collected a heart! Score: ${player1Score}`);
        } else {
            player2Score++;
            alert(`Player 2 collected a heart! Score: ${player2Score}`);
        }
        relocateHeart();
    }
}

function relocateHeart() {
    const gameArea = document.getElementById('gameArea');
    const x = Math.random() * (gameArea.clientWidth - 20);
    const y = Math.random() * (gameArea.clientHeight - 20);
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
}

// Key controls for players
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') movePlayer(player1, 0, -10);
    if (event.key === 'ArrowDown') movePlayer(player1, 0, 10);
    if (event.key === 'ArrowLeft') movePlayer(player1, -10, 0);
    if (event.key === 'ArrowRight') movePlayer(player1, 10, 0);

    if (event.key === 'w') movePlayer(player2, 0, -10);
    if (event.key === 's') movePlayer(player2, 0, 10);
    if (event.key === 'a') movePlayer(player2, -10, 0);
    if (event.key === 'd') movePlayer(player2, 10, 0);
});

// Initialize the heart position
relocateHeart();