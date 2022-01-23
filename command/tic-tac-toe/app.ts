interface OnEvent {
  row: number;
  col: number;
}

interface ICommand {
  mousePressed(event: OnEvent): void;
}

class TicTacToeApp {
  private view: GameViewController;
  private model: GameModel;

  constructor() {
    this.model = new GameModel();
    this.view = new GameViewController(this.model);
  }
}

class GameViewController implements ICommand {
  private UI: string;

  constructor(private gameModel: GameModel) {
    this.createUI();
  }

  createUI() {
    this.UI = 'UI';
  }

  updateUI() {
    this.UI = `UI Updated at ${ new Date()}`;
  }

  // invoker
  mousePressed(event: OnEvent) {
    this.cellClicked(event.col, event.row);
  }

  // receiver
  private cellClicked(col: number, row: number) {
    this.gameModel.markCell(col, row);
    this.updateUI();
  }
}

interface Cell {
  field: string;
}

class GameModel {
  isTurnOfX: boolean;
  lastClick: Cell;
  board: Cell[][] = [];

  constructor() {
    this.isTurnOfX = true;
    // rows
    this.board.push([{ field: '' }, { field: '' }, { field: '' }]);
    this.board.push([{ field: '' }, { field: '' }, { field: '' }]);
    this.board.push([{ field: '' }, { field: '' }, { field: '' }]);
  }

  markCell(row: number, col: number) {
    this.board[row][col].field = this.isTurnOfX ? 'X' : 'O';
    this.isTurnOfX = !this.isTurnOfX;
    this.lastClick = this.board[row][col];
  }

}
