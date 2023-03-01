class CalculationOfFuelCosts {
  //field
  WeekFuelPrices: number[];
  Cars: Car[] = [];

  //constructor
  constructor(Cars: Car[], WeekFuelPrices: number[]) {
    this.WeekFuelPrices = WeekFuelPrices;
    this.Cars = Cars;
  }

  //functions
  StepOne(): void {
    console.log("1. How much € does each car spend for 3 months ?");
    for (var i = 0; i < this.Cars.length; i++) {
      console.log(
        `Car ${0} spend ${1} for 3 months`,
        i + 1,
        this.Cars[i].costPerMonth(this.WeekFuelPrices) * 3
      );
    }
  }

  StepTwo(): void {
    console.log(
      "2. If Car1 and Car2 work for 1 month and Car3 and Car4 work for 1.5 months how much € do they spend in total?"
    );
    const result =
      (this.Cars[0].fuelAmountPerWeek + this.Cars[1].fuelAmountPerWeek) *
        this.sumArrayFunction(this.WeekFuelPrices) +
      (this.Cars[2].fuelAmountPerWeek + this.Cars[3].fuelAmountPerWeek) *
        this.sumArrayFunction([
          this.sumArrayFunction(this.WeekFuelPrices),
          ...this.WeekFuelPrices.slice(0, this.WeekFuelPrices.length / 2),
        ]);
    console.log(`they spend ${0}€ in total`, result);
  }
  sumArrayFunction(arr: number[]): number {
    return arr.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
  }

  StepThree(): void {
    console.log(
      "3. What is the average cost for one liter for car 1 & 4 if they work 1 month?"
    );
    const result =
      (this.Cars[0].costPerMonth(this.WeekFuelPrices) +
        this.Cars[3].costPerMonth(this.WeekFuelPrices)) /
      ((this.Cars[0].fuelAmountPerWeek + this.Cars[3].fuelAmountPerWeek) * 4);
    console.log(`The average cost for one liter is ${0}`, result);
  }

  StepFour(): void {
    console.log(
      "4. How much more weeks can Car1 drive within the same budget as Car4 spends for 1 month?"
    );
    const result =
      this.Cars[0].costPerMonth(this.WeekFuelPrices) /
      (this.Cars[3].costPerMonth(this.WeekFuelPrices) -
        this.Cars[0].costPerMonth(this.WeekFuelPrices));
    console.log(`${0} more Weeks`, result);
  }

  StepFive(): void {
    console.log(
      "5. What is the minimum monthly cost we need for two cars to be operational?"
    );
    var costsPerMonth: number[] = [this.Cars.length];

    for (var i = 0; i < this.Cars.length; i++) {
      costsPerMonth[i] = this.Cars[i].costPerMonth(this.WeekFuelPrices);
    }
    var costsPerMonthLength = costsPerMonth.length;
    var minimumMonthlyCost = Number.MAX_VALUE;
    var secondMinimumMonthlyCost = Number.MAX_VALUE;
    for (var i = 0; i < costsPerMonthLength; i++) {
      if (costsPerMonth[i] < minimumMonthlyCost) {
        minimumMonthlyCost = costsPerMonth[i];
      } else if (costsPerMonth[i] < secondMinimumMonthlyCost) {
        secondMinimumMonthlyCost = costsPerMonth[i];
      }
    }
    const result = minimumMonthlyCost + secondMinimumMonthlyCost;
    console.log("Minimum monthly cost is: " + result);
  }
}

class Car {
  //field
  fuelAmountPerWeek: number;

  //constructor
  constructor(fuelAmountPerWeek: number) {
    this.fuelAmountPerWeek = fuelAmountPerWeek;
  }

  //function
  public costPerMonth(fuelPricesPerMonthWeeks: number[]): number {
    const result = fuelPricesPerMonthWeeks.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);

    return this.fuelAmountPerWeek * result;
  }
}

var cars: Car[] = [new Car(30), new Car(35), new Car(40), new Car(45)];

var weekFuelPrices: number[] = [1.1, 1.22, 1.47, 1.77];

var fuelExpenseCalculator = new CalculationOfFuelCosts(cars, weekFuelPrices);
fuelExpenseCalculator.StepOne();
fuelExpenseCalculator.StepTwo();
fuelExpenseCalculator.StepThree();
fuelExpenseCalculator.StepFour();
fuelExpenseCalculator.StepFive();
