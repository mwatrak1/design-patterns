// Base Component
interface ITicket {
  getTicketCost(): number;
  getDescription(): string;
}

// Concrete Component
class BasicTicket implements ITicket {
  getTicketCost(): number {
    return 10;
  }
  getDescription(): string {
    return 'Base Ticket';
  }
}

// Base Decorator
abstract class TicketDecorator implements ITicket {
  abstract getTicketCost(): number;
  abstract getDescription(): string;
  protected abstract baseTicket: ITicket;
}

// Concrete Decorator
class PalaceDecorator extends TicketDecorator {
  constructor(protected baseTicket: ITicket) {
    super();
  }

  getTicketCost() {
    return this.baseTicket.getTicketCost() + 10;
  }

  getDescription() {
    return this.baseTicket.getDescription() + ' + Palace Tour';
  }
}

// Concrete Decorator
class ToyTrainDecorator extends TicketDecorator {
  constructor(protected baseTicket: ITicket) {
    super();
  }

  getTicketCost() {
    return this.baseTicket.getTicketCost() + 5;
  }

  getDescription() {
    return this.baseTicket.getDescription() + ' + Toy Train Ride';
  }
}


function ticketProcessor(ticket: ITicket) {
  console.log(`
  Ticket 
  Description: ${ticket.getDescription()}
  Price: ${ticket.getTicketCost()}
  `);
}

// APPLICATION which will use above classes

// 1. instantiate base ticket on startup
const ticket = new BasicTicket();

// 2. customize the ticket later if needed
const palaceTicket = new PalaceDecorator(ticket);
const palaceTrainTicket = new ToyTrainDecorator(palaceTicket);
const palaceTrainTrainTicket = new ToyTrainDecorator(palaceTrainTicket);

ticketProcessor(palaceTrainTrainTicket);

//  Ticket 
//  Description: Base Ticket + Palace Tour + Toy Train Ride + Toy Train Ride
//  Price: 30
