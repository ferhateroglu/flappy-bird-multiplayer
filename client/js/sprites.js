import { SPRITE_ENUM } from './constants.js';

const sprites = {};

const loadSprite = (key, src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            sprites[key] = {
                image: img,
                width: img.width,
                height: img.height,
                drawedWidth: null,
                drawedHeight: null
            };
            resolve(sprites[key]);
        };
        img.onerror = reject;
    });
};

const loadAllSprites = async () => {
    const loadPromises = Object.entries(SPRITE_ENUM).map(([key, file]) => {
        return loadSprite(key.toLowerCase().replace('_','-'), `../assets/sprites/${file}`);
    });

    try {
        await Promise.all(loadPromises);
    } catch (error) {
        console.error('Error loading sprites:', error);
    }
};

const drawSprite = (ctx, key, x, y, width, height) => {
    const spriteInfo = sprites[key];
    spriteInfo.drawedWidth = width;
    spriteInfo.drawedHeight = height;
    
    if (spriteInfo && spriteInfo.image.complete) {
        ctx.drawImage(spriteInfo.image, x, y, width, height);
    } else if (spriteInfo) {
        spriteInfo.image.onload = () => ctx.drawImage(spriteInfo.image, x, y, width, height);
    } else {
        console.error(`Sprite with key "${key}" not found`);
    }
};

const getSpriteInfo = (key, scaleFactor = 1) => {
    const spriteInfo = sprites[key];
    if (spriteInfo) {
        return {
            width: spriteInfo.width * scaleFactor,
            height: spriteInfo.height * scaleFactor
        };
    } else {
        console.error(`Sprite with key "${key}" not found`);
        return null;
    }
};

export { loadAllSprites, drawSprite, getSpriteInfo };
