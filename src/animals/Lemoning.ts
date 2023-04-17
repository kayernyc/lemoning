export interface LemoningProps {
  ctx: CanvasRenderingContext2D,
  position: {
    x: number;
    y: number;
  },
  update: () => void,
}

type positionCoordinates = {
  x: number,
  y: number
}

type boundaryCoordinates = {
  right: number;
  bottom: number;
}

type movementVector = {
  x: number,
  y: number
}

const randomMovement = () => (Math.random() * 5) + 10;
const randomValence = () => Math.random() - .5 >= 0 ? 1 : -1;

const evaluateAgainstBoundary = (
  { deltaName,
    position,
    boundaries,
    movement }:
    {
      deltaName: 'x' | 'y',
      position: positionCoordinates,
      boundaries: boundaryCoordinates,
      movement: movementVector
    }): number => {
  let delta = movement[deltaName as keyof movementVector];
  const startPosition = position[deltaName as keyof positionCoordinates];
  const boundary = deltaName === 'x' ? boundaries.right : boundaries.bottom;
  let newPosition = startPosition + delta;

  if (startPosition > boundary) {
    //window has resized, may be outside the new draw area
    return -Math.abs(delta)
  }

  if (newPosition > 0 && newPosition < boundary) {
    return delta;
  } else {
    const valence = - (delta / Math.abs(delta));
    return randomMovement() * valence;
  }
}

export class Lemoning {
  static boundaries: boundaryCoordinates = {
    right: 0,
    bottom: 0
  };
  static frameRateRatio = 1;
  ctx: CanvasRenderingContext2D;
  position: positionCoordinates;
  private movement: movementVector;

  constructor(ctx: CanvasRenderingContext2D, position: positionCoordinates) {
    this.ctx = ctx;
    this.position = position;


    this.movement = {
      x: randomMovement() * randomValence(),
      y: randomMovement() * randomValence()
    }

    this.draw();
  }

  draw(ctx = this.ctx, position = this.position) {
    ctx.beginPath();
    ctx.arc(position.x - 10, position.y - 10, 20, 0, Math.PI * 2, true)
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();
  }

  update() {
    const coreParameterObject = {
      position: this.position,
      boundaries: Lemoning.boundaries,
      movement: this.movement
    }

    let deltaX = evaluateAgainstBoundary({ deltaName: 'x', ...coreParameterObject });
    let deltaY = evaluateAgainstBoundary({ deltaName: 'y', ...coreParameterObject });

    if (deltaX !== this.movement.x && deltaY === this.movement.y && Math.random() - .5 > 0) {
      deltaY = randomMovement() * randomValence();
    } else if (deltaY !== this.movement.y && deltaX === this.movement.x && Math.random() - .5 > 0) {
      deltaX = randomMovement() * randomValence();
    }
    this.movement.x = deltaX;
    this.movement.y = deltaY;

    this.position.x += this.movement.x * Lemoning.frameRateRatio;
    this.position.y += this.movement.y * Lemoning.frameRateRatio;

    this.draw()
  }
}
