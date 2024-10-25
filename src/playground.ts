import throttle from './throttle';

const func = () => {
    "Throttled"
}
const throttled = throttle(func)
const timeoutId = setInterval(() => {
    throttled();
}, 100)

setTimeout(() => {
    clearInterval(timeoutId);
}, 10000)