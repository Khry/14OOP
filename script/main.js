function Casino(numberOfSlotMachines, initialAmountOfMoney) {
  if (numberOfSlotMachines <= 0 || initialAmountOfMoney <= 0) {
    return 'Casino creating error';
  }
  this.slotMachines = [];
  var moneyInMachine = Math.floor(initialAmountOfMoney / numberOfSlotMachines);
  var moneyRemainder = initialAmountOfMoney % numberOfSlotMachines;
  this.slotMachines[0] = new SlotMachine(moneyInMachine + moneyRemainder);
  this.slotMachines[0].id = 0;
  this.slotMachines[0].lucky = true;
  for (var i = 1; i < numberOfSlotMachines; i++) {
    this.slotMachines[i] = new SlotMachine(moneyInMachine);
    this.slotMachines[i].id = i;
  }
  this.getAmountOfMoney = function() {
    var amount = 0;
    for (var i = 0; i < this.numberOfSlotMachines; i++) {
      amount += this.slotMachines[i].amountOfMoneyInMachine;
    }
    return amount;
  };
  this.numberOfSlotMachines = numberOfSlotMachines;
  this.getNumberOfSlotMachines = function() {
    console.log(this.numberOfSlotMachines);
    return this.numberOfSlotMachines;
  };
  this.addSlotMachine = function() {
    var largest = 0;
    for (var i = 0; i < this.slotMachines.length; i++) {
      if (this.slotMachines[i].amountOfMoneyInMachine > largest) {
        largest = this.slotMachines[i].amountOfMoneyInMachine;
      }
    }
    this.slotMachines[numberOfSlotMachines] = new SlotMachine(largest/2);
    this.slotMachines[numberOfSlotMachines].id = numberOfSlotMachines;
    this.numberOfSlotMachines++;
  }
  this.removeSlotMachine = function(id) {
    for (var i = 0; i < this.slotMachines.length; i++) {
      if (id === this.slotMachines[i].id) {
        foundedSlotMachine = this.slotMachines[i];
        this.slotMachines.splice(i, 1);
        break;
      }
    }
    this.numberOfSlotMachines--;
  }
  this.takeMoneyFromCasino = function(amountOfMoney) {
    if (this.getAmountOfMoney() < amountOfMoney) {
      return 'You want too much...';
    }
    this.slotMachines.sort(function(a, b) {
      if (a.amountOfMoneyInMachine < b.amountOfMoneyInMachine) {
        return 1;
      }
      if (a.amountOfMoneyInMachine > b.amountOfMoneyInMachine) {
        return -1;
      }
      return 0;
    });
    var necessaryAmountOfMoney = Math.round(amountOfMoney / this.slotMachines.length);
    var remainder = amountOfMoney - necessaryAmountOfMoney * this.slotMachines.length;
    this.slotMachines[0].amountOfMoneyInMachine -= remainder;
    for (var i = 0; i < this.slotMachines.length; i++) {
      if (this.slotMachines[i].amountOfMoneyInMachine >= necessaryAmountOfMoney) {
        this.slotMachines[i].amountOfMoneyInMachine -= necessaryAmountOfMoney;
      }
    }
    return this.slotMachines;
  }
  function SlotMachine(initialAmountOfMoneyInMachine) {
    this.lucky = false;
    this.amountOfMoneyInMachine = initialAmountOfMoneyInMachine;
    this.getAmountOfMoneyInMachine = function() {
      return this.amountOfMoneyInMachine;
    }
    this.takeMoneyFromSlotMachine = function(amountOfMoney) {
      this.amountOfMoneyInMachine -= amountOfMoney;
    }
    this.putMoney = function(amountOfMoney) {
      this.amountOfMoneyInMachine += amountOfMoney;
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
        return 'You`re a lucky guy, you won '+ this.amountOfMoneyInMachine;
      }
      for (var i = 1; i < stringRandomNumber.length; i++) {
        var substrings = stringRandomNumber.split(stringRandomNumber[i]);
        if (substrings.length - 1 === 2) {
          if (amountOfMoney * 2 > this.amountOfMoneyInMachine) {
            this.amountOfMoneyInMachine = 0;
            return 'You`re a lucky guy, you won ' + this.amountOfMoneyInMachine;
          } else {
            this.amountOfMoneyInMachine -= amountOfMoney * 2;
            // Casino.amountOfMoney -= amountOfMoney * 2;
            return 'You`re a lucky guy, you won ' + amountOfMoney * 2;
          }
        } else if (substrings.length - 1 === 3) {
          if (amountOfMoney * 5 > this.amountOfMoneyInMachine) {
            this.amountOfMoneyInMachine = 0;
            return 'You`re a lucky guy, you won ' + this.amountOfMoneyInMachine;
          } else {
            this.amountOfMoneyInMachine -= amountOfMoney * 5;
            // Casino.amountOfMoney -= amountOfMoney * 5;
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
  casino.addSlotMachine();
  console.log(casino);
  casino.getNumberOfSlotMachines();
  console.log(casino.slotMachines[0].getAmountOfMoneyInMachine());
  console.log(casino.slotMachines[1].getAmountOfMoneyInMachine());
  console.log(casino.slotMachines[5].getAmountOfMoneyInMachine());
  console.log(casino.getAmountOfMoney());
  console.log(casino.slotMachines[1].play(77));
  console.log(casino.slotMachines[1].getAmountOfMoneyInMachine());
  console.log(casino.getAmountOfMoney());
  console.log(casino.takeMoneyFromCasino(200000));
  console.log(casino.takeMoneyFromCasino(200));
  console.log(casino.getAmountOfMoney());
}

demonstrate();
