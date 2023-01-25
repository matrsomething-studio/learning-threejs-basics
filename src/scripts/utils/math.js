// Linear interpolation
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

// Restrict a value to a given range
const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Random number between min & max 
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export {
    lerp,
    clamp,
    map,
    randomNumber
};
