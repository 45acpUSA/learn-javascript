# Software is modeled after real life

When we build software, most of the time, we are building things that represent something that exists in the physical world.  Most web apps have a User, for example, which represents a real life person.  In the software, we assign attributes to the representation of the user like first name, email, and hair color.  We also want to allow our computer representation of the real life user to be able to do things, so we code up behaviors that they can do such as logging into the application.  You may have heard the term 'Object Oriented' programming before, and wondered what that mean.  Building an object oriented ('OO' for short) piece of software means that we are grouping our code around the idea of things that have both attributes and behaviors.  In Javascript and most OO languages the 'things' are represented by classes.  You can think of all the things in your program as belonging to a certain class or type of object. 

## Classes are made up of Nouns and Verbs

Another useful way to think about objects in Javascript are as collections of nouns and verbs.  Imagine that we have a Vehicle class.  It would have a list of attributes such as color, make, model, miles, etc.  Those are the nouns.  It would also have a list of behaviors, being the verbs, such as drive, park, open the trunk, etc.  The nouns describe the thing, and the verbs are the things you can do with it.

## Classes have Relationships

In your Car challenge, you have at minimum a Vehicle class and a Car class.  There can be as many Cars as you want to make, and they will share a lot of the same attributes as Vehicle.  Any time you identify this kind of relationship forming, whether it's one to many or one to one, it's a strong indication that there should be inheritance between the two classes.  This will allow you to share methods across related classes.

## Objects are Interrelated

Objects can also be interrelated to each other.  Think about the Car class again.  Cars have tires, seats, and windshield wipers.  Those things are probably going to be classes of their own, and made up of even more components that you may or may not need to represent in your software.  Cars also interact with other objects that you may want to model, users, the road, garage, etc.  All of these things work together to make the running software and depend on each other.


# Writing Classes in Javascript

# ES5

We're going to take a quick look at how developers wrote classes before ES6 because you'll likely come across them when looking at other people's code, and it can seem a bit confusing at first.  

Actually, before ES5, Javascript didn't have classes at all.  It is still an Object Oriented language, but used the concept of a prototype instead.  An object's prototype is shared among all of the other instances of that object, so you can define common attributes and behaviors on it that are shared.  You can also set the prototype of a new object you are defining to be another object and get inheritance.  

In Javascript, everything is an object, even functions.  Functions, like all objects have both attributes, behaviors, and a prototype that we can access.  

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


# ES6 introduces Classes

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

## Constructor and method attributes

When we create a new instance of our class, we often need to configure it with its own attributes.  When our program calls `new Catamaran()`, a special method is called the constructor.  The constructor's responsibility is to initialize the object so it is ready for use.  In an ES6 class, the initialization method is conveniently called `constructor`.  If you put a method called `constructor` in your class it will automatically be called for each new instance of that object that you create.

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

## Default Values

You may want to provide some defaults for new instances of your object.  This way code creating new objects don't have to always pass in the configuration values if they are fine with reasonable defaults.  

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

## Static Methods

We can also create methods that span all instances of the class called 'static' or 'class' methods.  These are useful to do things that don't involve a particular instance, as in this example, available colors.

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


