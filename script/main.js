function Casino(numberOfSlotMachines, initialAmountOfMoney) {
  if (numberOfSlotMachines <= 0 || initialAmountOfMoney <= 0) {
    return 'Casino creating error';
  }
  this.slotMachinesArr = [];
  var moneyInMachine = Math.floor(initialAmountOfMoney / numberOfSlotMachines);
  var moneyRemainder = initialAmountOfMoney % numberOfSlotMachines;
  this.slotMachinesArr[0] = new SlotMachine(moneyInMachine + moneyRemainder);
  this.slotMachinesArr[0].id = 0;
  this.slotMachinesArr[0].lucky = true;
  for (var i = 1; i < numberOfSlotMachines; i++) {
    this.slotMachinesArr[i] = new SlotMachine(moneyInMachine);
    this.slotMachinesArr[i].id = i;
  }
  this.getAmountOfMoney = function() {
    var amount = 0;
    for (var i = 0; i < this.numberOfSlotMachines; i++) {
      amount += this.slotMachinesArr[i].amountOfMoneyInMachine;
    }
    return amount;
  };
  this.numberOfSlotMachines = numberOfSlotMachines;
  this.getNumberOfMachines = function() {
    return this.numberOfSlotMachines;
  };
  this.addMachine = function() {
    var largest = 0;
    for (var i = 0; i < this.slotMachinesArr.length; i++) {
      if (this.slotMachinesArr[i].amountOfMoneyInMachine > largest) {
        largest = this.slotMachinesArr[i].amountOfMoneyInMachine;
      }
    }
    this.slotMachinesArr[numberOfSlotMachines] = new SlotMachine(largest / 2);
    this.slotMachinesArr[numberOfSlotMachines].id = numberOfSlotMachines;
    this.numberOfSlotMachines++;
  }
  this.removeMachine = function(id) {
    for (var i = 0; i < this.slotMachinesArr.length; i++) {
      if (id === this.slotMachinesArr[i].id) {
        foundedSlotMachine = this.slotMachinesArr[i];
        var necessaryAmountOfMoney = Math.floor( this.slotMachinesArr[i].amountOfMoneyInMachine / (this.slotMachinesArr.length - 1));
        console.log(necessaryAmountOfMoney);
        var remainder = this.slotMachinesArr[i].amountOfMoneyInMachine - necessaryAmountOfMoney * (this.slotMachinesArr.length - 1);
        console.log(remainder);
        this.slotMachinesArr[0].amountOfMoneyInMachine += remainder;
        for (var j = 0; j < this.slotMachinesArr.length; j++) {
          this.slotMachinesArr[j].amountOfMoneyInMachine += necessaryAmountOfMoney;
        }
        this.slotMachinesArr.splice(i, 1);
        break;
      }
    }

    this.numberOfSlotMachines--;
    return 'You removed slot machine';
  }
  this.takeMoneyFromCasino = function(amountOfMoney) {
    if (this.getAmountOfMoney() < amountOfMoney) {
      return 'You want too much...';
    }
    this.slotMachinesArr.sort(function(a, b) {
      if (a.amountOfMoneyInMachine < b.amountOfMoneyInMachine) {
        return 1;
      }
      if (a.amountOfMoneyInMachine > b.amountOfMoneyInMachine) {
        return -1;
      }
      return 0;
    });
    var necessaryAmountOfMoney = Math.round(amountOfMoney / this.slotMachinesArr.length);
    var remainder = amountOfMoney - necessaryAmountOfMoney * this.slotMachinesArr.length;
    this.slotMachinesArr[0].amountOfMoneyInMachine -= remainder;
    for (var i = 0; i < this.slotMachinesArr.length; i++) {
      if (this.slotMachinesArr[i].amountOfMoneyInMachine >= necessaryAmountOfMoney) {
        this.slotMachinesArr[i].amountOfMoneyInMachine -= necessaryAmountOfMoney;
      }
    }
    return this.slotMachinesArr;
  }

  function SlotMachine(initialAmountOfMoneyInMachine) {
    this.lucky = false;
    this.amountOfMoneyInMachine = initialAmountOfMoneyInMachine;
    this.getAmountOfMoneyInMachine = function() {
      return this.amountOfMoneyInMachine;
    }
    this.takeMoneyFromSlotMachine = function(amountOfMoney) {
      this.amountOfMoneyInMachine -= amountOfMoney;
      return 'You took '+ amountOfMoney + ' from slot machine';
    }
    this.putMoneyInSlotMachine = function(amountOfMoney) {
      this.amountOfMoneyInMachine += amountOfMoney;
      return 'You put '+ amountOfMoney + ' in slot machine';
    }
    this.play = function(amountOfMoney) {
      if (amountOfMoney <= 0) {
        return "Are you joking?";
      }
      if (this.amountOfMoneyInMachine < amountOfMoney) {
        return 'Slot Machine is out of money';
      }
      var randomNumber = Math.floor(Math.random() * 1000);
      var stringRandomNumber = randomNumber.toString();
      if (stringRandomNumber === '777' && this.lucky) {
        this.amountOfMoneyInMachine = 0;
        return 'You`re a lucky guy, you won ' + this.amountOfMoneyInMachine;
      }
      for (var i = 1; i < stringRandomNumber.length; i++) {
        var substrings = stringRandomNumber.split(stringRandomNumber[i]);
        if (substrings.length - 1 === 2) {
          if (amountOfMoney * 2 > this.amountOfMoneyInMachine) {
            this.amountOfMoneyInMachine = 0;
            return 'You`re a lucky guy, you won ' + this.amountOfMoneyInMachine;
          } else {
            this.amountOfMoneyInMachine -= amountOfMoney * 2;
            return 'You`re a lucky guy, you won ' + amountOfMoney * 2;
          }
        } else if (substrings.length - 1 === 3) {
          if (amountOfMoney * 5 > this.amountOfMoneyInMachine) {
            this.amountOfMoneyInMachine = 0;
            return 'You`re a lucky guy, you won ' + this.amountOfMoneyInMachine;
          } else {
            this.amountOfMoneyInMachine -= amountOfMoney * 5;
            return 'You`re a lucky guy, you won ' + amountOfMoney * 5;
          }
        } else {
          this.amountOfMoneyInMachine += amountOfMoney;
          return "You lost... Try again";
        }
      }
    }
  }
}


var casino = new Casino(15, 100000);

function demonstrate() {
  console.log(casino);
  casino.addMachine();
  console.log(casino);
  casino.getNumberOfMachines();
  console.log(casino.slotMachinesArr[0].getAmountOfMoneyInMachine());
  console.log(casino.slotMachinesArr[5].getAmountOfMoneyInMachine());
  console.log(casino.getAmountOfMoney());
  console.log(casino.slotMachinesArr[1].play(77));
  console.log(casino.slotMachinesArr[1].getAmountOfMoneyInMachine());
  console.log(casino.getAmountOfMoney());
  console.log(casino.takeMoneyFromCasino(200000));
  console.log(casino.takeMoneyFromCasino(200));
  console.log(casino.getAmountOfMoney());
  console.log(casino.removeMachine(5));
  console.log(casino.getNumberOfMachines());
  console.log(casino.getAmountOfMoney());
  console.log(casino.slotMachinesArr[0].getAmountOfMoneyInMachine());
  console.log(casino.slotMachinesArr[0].takeMoneyFromSlotMachine(50));
  console.log(casino.slotMachinesArr[0].getAmountOfMoneyInMachine());
  console.log(casino.getAmountOfMoney());
  console.log(casino.slotMachinesArr[0].putMoneyInSlotMachine(80));
  console.log(casino.slotMachinesArr[0].getAmountOfMoneyInMachine());
  console.log(casino.getAmountOfMoney());
}
demonstrate();
