import { Component } from '@angular/core';
import { NotificationService } from 'src/services/NotificationService';

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
  commandInput: string = '';
  reportOutput: string = '';
  commandList: string[] = [];

  private x: number = 0;
  private y: number = 0;
  private direction!: Direction;
  private isPlaced: boolean = false;

  constructor(private notificationService: NotificationService) {}

  public executeCommand() {
    const commandParts = this.commandInput.split(' ');
    const action = commandParts[0];
    const parameters = commandParts[1]?.split(',');

    switch (action) {
      case 'PLACE':
        this.executePlaceCommand(parameters);
        break;
      case 'MOVE':
        this.move();
        break;
      case 'LEFT':
        this.rotate();
        break;
      case 'RIGHT':
        this.rotate();
        break;
      case 'REPORT':
        this.report();
        break;
      default:
        this.notificationService.openSnackBar('Invalid command');
    }

    this.commandList.push(this.commandInput);
    this.commandInput = '';
  }

  private executePlaceCommand(parameters: string[] | undefined) {
    if (parameters && (parameters.length === 2 || parameters.length === 3)) {
      const x = Number(parameters[0]);
      const y = Number(parameters[1]);
      const direction = parameters.length === 3 ? parameters[2] as Direction : this.direction;
  
      if (this.isValidPosition(x, y)) {
        this.place(x, y, direction);
      }
    }
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

  private rotate() {
    if (this.isPlaced) {
      switch (this.direction) {
        case Direction.NORTH:
          this.direction = Direction.WEST;
          break;
        case Direction.SOUTH:
          this.direction = Direction.EAST;
          break;
        case Direction.EAST:
          this.direction = Direction.NORTH;
          break;
        case Direction.WEST:
          this.direction = Direction.SOUTH;
          break;
      }
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

  public reset() {
    this.commandInput = '';
    this.reportOutput = '';
    this.commandList = [];
  }
}
