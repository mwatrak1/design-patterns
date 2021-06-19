var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicTicket = /** @class */ (function () {
    function BasicTicket() {
    }
    BasicTicket.prototype.getTicketCost = function () {
        return 10;
    };
    BasicTicket.prototype.getDescription = function () {
        return 'Base Ticket';
    };
    return BasicTicket;
}());
var TicketDecorator = /** @class */ (function () {
    function TicketDecorator() {
    }
    return TicketDecorator;
}());
var PalaceDecorator = /** @class */ (function (_super) {
    __extends(PalaceDecorator, _super);
    function PalaceDecorator(baseTicket) {
        var _this = _super.call(this) || this;
        _this.baseTicket = baseTicket;
        return _this;
    }
    PalaceDecorator.prototype.getTicketCost = function () {
        return this.baseTicket.getTicketCost() + 10;
    };
    PalaceDecorator.prototype.getDescription = function () {
        return this.baseTicket.getDescription() + ' + Palace Tour';
    };
    return PalaceDecorator;
}(TicketDecorator));
var ToyTrainDecorator = /** @class */ (function (_super) {
    __extends(ToyTrainDecorator, _super);
    function ToyTrainDecorator(baseTicket) {
        var _this = _super.call(this) || this;
        _this.baseTicket = baseTicket;
        return _this;
    }
    ToyTrainDecorator.prototype.getTicketCost = function () {
        return this.baseTicket.getTicketCost() + 5;
    };
    ToyTrainDecorator.prototype.getDescription = function () {
        return this.baseTicket.getDescription() + ' + Toy Train Ride';
    };
    return ToyTrainDecorator;
}(TicketDecorator));
function ticketProcessor(ticket) {
    console.log("\n  Ticket \n  Description: " + ticket.getDescription() + "\n  Price: " + ticket.getTicketCost() + "\n  ");
}
// APPLICATION which will use above classes
// 1. instantiate base ticket on startup
var ticket = new BasicTicket();
// 2. customize the ticket later if needed
var palaceTicket = new PalaceDecorator(ticket);
var palaceTrainTicket = new ToyTrainDecorator(palaceTicket);
var palaceTrainTrainTicket = new ToyTrainDecorator(palaceTrainTicket);
ticketProcessor(palaceTrainTrainTicket);
