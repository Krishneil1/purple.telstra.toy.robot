import { Component } from '@angular/core';

enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent {
  commandInput: any = '';
  reportOutput = '';
  commandList: string[] = [];

  private x = 0;
  private y = 0;
  private direction!: Direction;
  private isPlaced = false;

  executeCommand() {
    const commandParts = this.commandInput.split(' ');
    const action = commandParts[0];
    const parameters = commandParts[1]?.split(',');

    switch (action) {
      case 'PLACE':
        if (parameters.length === 3) {
          const x = Number(parameters[0]);
          const y = Number(parameters[1]);
          const direction = parameters[2] as Direction;
          this.place(x, y, direction);
        }
        break;
      case 'MOVE':
        this.move();
        break;
      case 'LEFT':
        this.rotateLeft();
        break;
      case 'RIGHT':
        this.rotateRight();
        break;
      case 'REPORT':
        this.report();
        break;
      default:
        console.log('Invalid command');
    }

    this.commandList.push(this.commandInput);
    this.commandInput = '';
  }

  private place(x: number, y: number, direction: Direction) {
    if (this.isValidPosition(x, y)) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.isPlaced = true;
    }
  }

  private move() {
    if (this.isPlaced) {
      let newX = this.x;
      let newY = this.y;

      switch (this.direction) {
        case Direction.NORTH:
          newY++;
          break;
        case Direction.SOUTH:
          newY--;
          break;
        case Direction.EAST:
          newX++;
          break;
        case Direction.WEST:
          newX--;
          break;
      }

      if (this.isValidPosition(newX, newY)) {
        this.x = newX;
        this.y = newY;
      }
    }
  }

  private rotateLeft() {
    if (this.isPlaced) {
      const directions = Object.values(Direction);
      const currentIndex = directions.indexOf(this.direction);
      const newDirection =
        currentIndex === 0 ? directions[directions.length - 1] : directions[currentIndex - 1];
      this.direction = newDirection as Direction;
    }
  }

  private rotateRight() {
    if (this.isPlaced) {
      const directions = Object.values(Direction);
      const currentIndex = directions.indexOf(this.direction);
      const newDirection =
        currentIndex === directions.length - 1 ? directions[0] : directions[currentIndex + 1];
      this.direction = newDirection as Direction;
    }
  }

  private report() {
    if (this.isPlaced) {
      this.reportOutput = `${this.x},${this.y},${this.direction}`;
    }
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < 6 && y >= 0 && y < 6;
  }
  reset() {
    this.commandInput = '';
    this.reportOutput = '';
    this.commandList = [];
  }
}
