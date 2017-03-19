ES5

```Javascript
function Sailboat(){
  this.speed = 0;
  this.color = 'blue';
  this.numberOfHulls = 1;
  this.sailPosition = 'down';
};

Sailboat.prototype.sail = function(){
  this.sailPosition = 'up';
  this.speed = 6;
};

Sailboat.prototype.lowerSails = function(){
  this.sailPosition = 'down';
  this.speed = 0;
}

function Catamaran(){
  this.numberOfHulls = 2;
}
Catamaran.prototype = new Sailboat();

Catamaran.prototype.sail = function(){
  super();
  this.speed = 12;
}

```


ES6 introduces Classes

```Javascript
class Sailboat{
  constructor(){
    this.speed = 0
    this.color = 'red'
    this.numberOfHulls = 1
    this.sailPosition = 'down'
  }

  sail(){
    this.speed = 6
    this.sailPosition = 'up'
  }

  lowerSails(){
    this.sailPosition = 0;
    this.speed = 0;
  }
}

class Catamaran extends Sailboat{
  constructor(){
    this.numberOfHulls = 2
  }

  sail(){
    super()
    this.speed = 12
  }
}

```

Constructor and method attributes

```
class Sailboat{
  constructor(color, maxSpeed){
    this.speed = 0
    this.maxSpeed = maxSpeed
    this.color = color
    this.numberOfHulls = 1
    this.sailPosition = 'down'
  }

  sail(){
    this.speed = this.maxSpeed
    this.sailPosition = 'up'
  }

  ...
```

```Javascript
let boat = new Sailboat('blue', 6)
```

default values

```Javascript
  constructor(color, maxSpeed=6){
    this.speed = 0
    this.maxSpeed = maxSpeed
    this.color = color
    this.numberOfHulls = 1
    this.sailPosition = 'down'
  }
  ...

```

```
let boat = new Sailboat('red')
console.log(boat.maxSpeed)
```

desstructuring attributes

Static Methods

```Javascript
  class Sailboat{
    static availableBoatColors(){
      ["blue", "green", "red"]
    }
  }
```

```Javascript
  let boatColors = Sailboat.availableBoatColors()
  let boat = new Sailboat(boatColors[0])
````


