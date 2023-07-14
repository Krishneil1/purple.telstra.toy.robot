# purple.telstra.toy.robot
## Getting Started

### Prerequisites

To run this solution, you need to have the following installed on your system:

- Node.js
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```shell
   git clone <repository_url>
   ```
2. Change to the project directory
3. Install dependencies

  ```shell
   npm install
   ```
4. Start the application

  ```shell
   ng serve
   ```
Implementation Purple Interview Toy Robot
Toy Robot
Scenario

Create a library that can read in commands of the following form:

    PLACE X, Y, DIRECTION
    MOVE
    LEFT
    RIGHT
    REPORT

Developing your Solution

    Use your preferred language, platform and IDE to implement this solution.
        .NET: A console application written in C#
        Web: A web app written in React and TypeScript
        iOS: An interactive UI for the application written in Swift
        Android: An interactive UI for the application written in Kotlin
    Your solution should be clean, easy to read, maintain and production ready. It should also be proportionally complex to address the problem.
    Ensure your code is robust and satisfies the test cases.
    Error conditions should be handled appropriately and presented in a clear way.
    You should provide build scripts or instructions to build and run the solution.
    There should be a user interface to run the solution and assess that it works correctly. This could be a command prompt interface that takes one string command in at a time.
    The code should be original and you may not use any external libraries or open source code to solve this problem, but you may use external libraries or tools for building or testing purposes.

Solution Requirements

    The library allows for a simulation of a toy robot moving on a 6 x 6 square tabletop.
    There are no obstructions on the table surface.
    The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in this must be prevented, however further valid movement commands must still be allowed.
    PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
    (0,0) can be considered as the SOUTH WEST corner and (5,5) as the NORTH EAST corner.
    The first valid command to the robot is a PLACE command. After that, any sequence of commands may be issued, in any order, including another PLACE command. The library should discard all commands in the sequence until a valid PLACE command has been executed.
    The PLACE command should be discarded if it places the robot outside of the table surface.
    Once the robot is on the table, subsequent PLACE commands could leave out the direction and only provide the coordinates. When this happens, the robot moves to the new coordinates without changing the direction.
    MOVE will move the toy robot one unit forward in the direction it is currently facing.
    LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
    REPORT will announce the X,Y and orientation of the robot.
    A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.

Example Input and Output

    Example 1 Input

> PLACE 0,0,NORTH
> MOVE
> REPORT
Output: 0,1,NORTH

    Example 2 Input

> PLACE 0,0,NORTH
> LEFT
> REPORT
Output: 0,0,WEST

    Example 3 Input

> PLACE 1,2,EAST
> MOVE
> MOVE
> LEFT
> MOVE
> REPORT
Output: 3,3,NORTH

    Example 4 Input

> PLACE 1,2,EAST
> MOVE
> LEFT
> MOVE
> PLACE 3,1
> MOVE
> REPORT
Output: 3,2,NORTH

Code Complete
