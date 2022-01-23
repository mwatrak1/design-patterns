interface OnEvent {
  row: number;
  col: number;
}

interface ICommand {
  execute(event: OnEvent): void;
  undo(event: OnEvent): void;
}

class MarkCommand implements ICommand {
  gameModel: GameModel;
  row: number;
  col: number;

  constructor(gameModel: GameModel, row: number, col: number) {
    this.gameModel = gameModel;
    this.row = row;
    this.col = col;
  }

  execute(event: OnEvent) {
    this.gameModel.markCell(event.row, event.col);
  }

  undo(event: OnEvent) {
    this.gameModel.clearCell(event.row, event.col);
  }

}

class TicTacToeApp {
  private view: GameViewController;
  private model: GameModel;

  constructor() {
    this.model = new GameModel();
    this.view = new GameViewController(this.model, new MarkCommandProcessor());
  }
}

class GameViewController  {
  private UI: string;

  constructor(private gameModel: GameModel, private commandProcessor: MarkCommandProcessor) {
    this.createUI();
  }

  createUI() {
    this.UI = 'UI';
  }

  updateUI() {
    this.UI = `UI Updated at ${new Date()}`;
  }

  // invoker
  mousePressed(event: OnEvent) {
    const markCommand = new MarkCommand(this.gameModel, event.row, event.col);
    this.commandProcessor.run(markCommand);
    this.updateUI();
  }

  // invoker
  undoPressed() {
    this.commandProcessor.undo();
    this.updateUI();
  }
}

class MarkCommandProcessor {
  undoStack: MarkCommand[] = [];

  run(command: MarkCommand) {
    this.undoStack.push(command);
    command.execute({ row: command.row, col: command.col });
  }

  undo() {
    const command = this.undoStack.pop();
    command.undo({ row: command.row, col: command.col });
  }
}

interface Cell {
  // 0 - empty
  // 1 - X
  // 2 - O
  field: number;
}

interface Move {
  row: number;
  col: number;
}

class GameModel {
  isTurnOfX: boolean;

  board: Cell[][] = [];

  constructor() {
    this.isTurnOfX = true;
    // rows
    this.board.push([{ field: 0 }, { field: 0 }, { field: 0 }]);
    this.board.push([{ field: 0 }, { field: 0 }, { field: 0 }]);
    this.board.push([{ field: 0 }, { field: 0 }, { field: 0 }]);
  }

  markCell(row: number, col: number) {
    this.board[row][col].field = this.isTurnOfX ? 1 : 2;
    this.changeTurn();
  }

  clearCell(row: number, col: number) {
    this.board[row][col].field = 0;
    this.changeTurn();
  }

  private changeTurn() {
    this.isTurnOfX = !this.isTurnOfX;
  }

}
