import { loadAllSprites, drawSprite, getSpriteInfo } from "./sprites.js";
import { SPRITE_ENUM } from "./constants.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const aspectRatio = 16 / 9;

let gameWidth;
let gameHeight;
let scaleFactor;

const resizeCanvas = async () => {
    const { innerWidth, innerHeight } = window;

    gameHeight = innerHeight * 0.8;
    gameWidth = innerHeight / aspectRatio;
    scaleFactor = gameHeight / 512;

    console.log(gameWidth, gameHeight, scaleFactor);

    canvas.width = gameWidth;
    canvas.height = gameHeight;
    canvas.style.width = `${gameWidth}px`;
    canvas.style.height = `${gameHeight}px`;

    await loadAllSprites();
    draw();
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite(ctx, 'background-day', 0, 0, gameWidth, gameHeight);
    
    const baseSpriteInfo = getSpriteInfo('base');
    const baseHeight = baseSpriteInfo.height * scaleFactor * 0.8;
    const baseWidth = gameWidth;
    const baseY = gameHeight - baseHeight;
    const baseX = 0;
    drawSprite(ctx, 'base', baseX, baseY, baseWidth, baseHeight);

    const birdSpriteInfo = getSpriteInfo('bluebird-midflap');
    const birdHeight = birdSpriteInfo.height * scaleFactor *1.2;
    const birdWidth = birdSpriteInfo.width * scaleFactor*1.2;
    const birdY = gameHeight / 2 - birdHeight / 2;
    const birdX = gameWidth / 2 - birdWidth / 2;
    drawSprite(ctx, 'bluebird-midflap', birdX, birdY, birdWidth, birdHeight);
    
}

window.addEventListener('load', async () => {
    await loadAllSprites();
    resizeCanvas();
});

window.addEventListener('resize', resizeCanvas);