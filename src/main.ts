import { Lemoning } from './animals/Lemoning';
import './style.css';
import { debounce } from './utils/debounce';

// TODO: add linting

const lemonings: Lemoning[] = [];
let newHeight: undefined | number;
let newWidth: undefined | number;

let lastTime = Date.now();

const setCanvasSize = (canvas: HTMLCanvasElement, height: number, width: number) => {
  canvas.setAttribute('height', `${height} px`);
  canvas.setAttribute('width', `${width} px`);
}

const resizeHandler = debounce(() => {
  newHeight = window.innerHeight;
  newWidth = window.innerWidth;
});

const initField = (app: HTMLElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  window.addEventListener('resize', resizeHandler);

  setCanvasSize(canvas, window.innerHeight, window.innerWidth);
  Lemoning.boundaries.right = window.innerWidth;
  Lemoning.boundaries.bottom = window.innerHeight;

  app.append(canvas);
  lemonings.push(new Lemoning(ctx, { x: 400, y: 300 }));

  tick();
}

const tick = () => {
  const currentTime = Date.now();
  Lemoning.frameRateRatio = (currentTime - lastTime) / 100;
  lastTime = currentTime;

  ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if (newHeight !== undefined || newWidth !== undefined) {
    const targetHeight = newHeight || window.innerHeight;
    const targetWidth = newWidth || window.innerWidth;
    setCanvasSize(canvas, targetHeight, targetWidth);
    Lemoning.boundaries.bottom = targetHeight;
    Lemoning.boundaries.right = targetWidth;
    newHeight = undefined;
    newWidth = undefined;
  }

  lemonings.forEach(lemoning => lemoning.update())
  window.requestAnimationFrame(tick);
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const app = document.querySelector<HTMLDivElement>('#app');

if (app && canvas && ctx) {
  initField(app, canvas, ctx);
}
