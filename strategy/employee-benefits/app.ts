// Client
class FinanceCalculations {
  private myEmployyBenefits: EmployeeBenefits
  constructor() {
    this.myEmployyBenefits = new EmployeeBenefits();
  }

  getEmployeeBenefits() {
    return this.myEmployyBenefits;
  }
}

// Context
class EmployeeBenefits {
  private myBonusCalculator: IBonusCalculator;
  calculateBonus() {
    return this.myBonusCalculator.calculateBonus();
  }

  calculateLoan() {
    // could be another strategy
    return 1230;
  }

  setBonusCalculator(bonusCalculator: IBonusCalculator) {
    this.myBonusCalculator = bonusCalculator;
  }

}

// Base Abstract Strategy
interface IBonusCalculator {
  calculateBonus(): number;
}

// Concrete Strategy
class BonusCalculatorGrade implements IBonusCalculator {
  constructor(private grade: number) {}
  calculateBonus() {
    return this.grade * 100;
  }
}

// Concrete Strategy
class BonusCalculatorMerit {
  constructor(private merit: number) {}
  calculateBonus() {
    return this.merit * 12;
  }
}

// Application

// setup
const financeCalculator = new FinanceCalculations();
const empBenefits = financeCalculator.getEmployeeBenefits();

// allows for easily setting bonus calculation algorithm that is interchangable with other implementations
empBenefits.setBonusCalculator(new BonusCalculatorGrade(5));
const bonusByGrade = empBenefits.calculateBonus();

empBenefits.setBonusCalculator(new BonusCalculatorMerit(20));
const bonusByMerit = empBenefits.calculateBonus();

console.log(bonusByGrade, bonusByMerit);
