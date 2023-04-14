import { Lemoning } from './animals/Lemoning';
import './style.css'
const lemonings: Lemoning[] = [];

const initField = (app: HTMLElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  canvas.setAttribute('height', '600px')
  canvas.setAttribute('width', '600px')
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  app.append(canvas)

  lemonings.push(new Lemoning(ctx, { x: 400, y: 300 }, { right: 600, bottom: 600 }));
  tick();
}

const tick = () => {
  ctx?.clearRect(0, 0, 600, 600);
  lemonings.forEach(lemoning => lemoning.update())
  window.requestAnimationFrame(tick);
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const app = document.querySelector<HTMLDivElement>('#app');

if (app && canvas && ctx) {
  initField(app, canvas, ctx);
}
