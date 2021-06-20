interface IObserver {
  update(): void;
  account: Account;
}

interface Subject {
  observers: IObserver[];
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

class Account implements Subject {
  observers: IObserver[];

  constructor(private accName: string) {
    this.observers = [];
  }

  attach(observer: IObserver): void {
    this.observers.push(observer);
  }
  detach(observer: IObserver): void {
    const found = this.observers.indexOf(observer);
    if (found < 0) return;
    this.observers.splice(found, 1);
  }
  notify(): void {
    for (let observer of this.observers) {
      observer.update();
    }
  }
}

class EmailNotifier implements IObserver {
  constructor(public account: Account) {}
  update() {
    console.log('Email notification sent for account', this.account);
  }
}

class SMSNotifier implements IObserver {
  constructor(public account: Account) {}
  update() {
    console.log('Email notification sent for account', this.account);
  }
}

class AccountExpireContent implements IObserver {
  constructor(public account: Account) {}
  update() {
    console.log('Account', this.account, 'has been blocked and content is unavailable');
  }
}

const johnAccount = new Account('John');
const maryAccount = new Account('Mary');

johnAccount.attach(new SMSNotifier(johnAccount));
johnAccount.notify();
maryAccount.attach(new AccountExpireContent(maryAccount));
maryAccount.notify();
