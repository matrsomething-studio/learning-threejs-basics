// // Linear interpolation
// const lerp = (a, b, n) => (1 - n) * a + n * b;

// // Restrict a value to a given range
// const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));


// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Random number between min & max 
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export {
    lerp,
    invlerp,
    clamp,
    map,
    randomNumber
};
