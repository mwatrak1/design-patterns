class Account {
  private currentState: AccountState;

  constructor(name: string) {
    this.currentState = new ActiveState(this);
    this.registerTimer(this.getfutureDate(12));
  }

  setState(accountState: AccountState) {
    this.currentState = accountState;
  }

  registerTimer(date: Date) {
    console.log('Account state check set for:', date.toISOString());
  }

  getfutureDate(months: number) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date;
  }

  issueBook() {
    this.currentState.issueBook();
  }

  returnBook() {
    this.currentState.returnBook();
  }

  onPayment() {
    this.currentState.onPayment();
  }

  onTimeElapsed() {
    this.currentState.onTimeElapsed();
  }
}

abstract class AccountState {
  // methods should stay not abstract because for some events implementation will not change so we can have a default implementation
  issueBook() {}
  returnBook() {}
  onTimeElapsed() {}
  onPayment() {}
}

class ActiveState extends AccountState {
  constructor(private account: Account) {
    super();
  }

  issueBook() {
    console.log('Book issued succesfully');
  }

  returnBook() {
    console.log('Book returned succesfully');
  }

  onPayment() {
    this.account.setState(new EliteState(this.account));
    this.account.registerTimer(this.account.getfutureDate(3));
  }

  onTimeElapsed() {
    this.account.setState(new CancelledState(this.account));
  }
}

class CancelledState extends AccountState {
  constructor(private account: Account) {
    super();
  }

  returnBook() {
    console.log('Book returned succesfully');
  }

  onPayment() {
    this.account.setState(new ActiveState(this.account));
    this.account.registerTimer(this.account.getfutureDate(6));
  }
}

class EliteState extends AccountState {
  constructor(private account: Account) {
    super();
  }

  issueBook() {
    console.log('Book issued succesfully for a long time as an Elite member');
  }

  returnBook() {
    console.log('Book returned succesfully');
  }

  onTimeElapsed() {
    this.account.setState(new CancelledState(this.account));
  }
}

// Application

const account = new Account('Savings account');
account.issueBook();
account.returnBook();
account.onTimeElapsed();
console.log('Trying to issue a book while account is cancelled');
account.issueBook();
account.onPayment();
console.log('Trying to issue a book while account is active');
account.issueBook();
account.onPayment();
account.issueBook();
