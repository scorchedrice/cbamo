class Coffee {
    startProgramming() {
        console.log('I need Caffeine ☕️')
    }
}

class Starbucks extends Coffee {
    startProgramming() {
        console.log('I like Starbucks! ☕️')
    }
}

class Programmer {
    private coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    programming() {
        this.coffee.startProgramming();
    }
}

const programmer: Programmer = new Programmer(new Starbucks());
programmer.programming(); // I like Starbucks! ☕️