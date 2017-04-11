# Inheritance

Recall the Engine class that we built in the Class module.  That engine worked great to propel our car, but just like in the real world, we're not limited to only having one type of engine.  There can by many variations of engines, all of which share attributes and behaviors, but are different in their own ways.  Javascript classes allow us to model this situation by using inheritance.  We start with an Engine class that has properties common to all engines, and then can inherit from it to create new Engine classes that are specialized.  

For this example, we'll move the Racecar class out to its own file, and include it in our application.

Starting where we left off:

```HTML
<html>
  <head>
    <script type='text/javascript' src='racecar.js'></script>
  </head>
  <body>
    <script>
      class Engine{
        constructor(){
          this.horsepower = 350
          this.oilLevel = 100
          this.rpm = 0
        }

        start(){
          this.rpm = 500
        }

        stop(){
          this.rpm = 0
        }

        accelerate(){
          if(this.rpm != 0){
            this.rpm += 500
          }
        }

        decelerate(){
          if(this.rpm != 0){
            this.rpm -= 500
          }
        }
      }
    </script>
  </body>
</html>
```

We can define two new types of engine, TurboEngine, and StockEngine that inherit most of their attributes and behavior from the base Engine class.  The only difference is that they accelerate and decelerate at different rates:

```Javascript
class Engine{
  constructor(){
    this.oilLevel = 100
    this.rpm = 0
  }

  start(){
    this.rpm = 500
  }

  stop(){
    this.rpm = 0
  }

  accelerate(){
    console.log("Warning!  This is a base class method, should not be called")
  }

  decelerate(){
    console.log("Warning!  This is a base class method, should not be called")
  }
}

class TurboEngine extends Engine{
  constructor(){
    super()
    this.horsepower = 450
  }
  accelerate(){
    if(this.rpm != 0){
      this.rpm += 750 
    }
  }

  decelerate(){
    if(this.rpm != 0){
      this.rpm -= 750
    }
  }
}

class StockEngine extends Engine{
  constructor(){
    super()
    this.horsepower = 250
  }
  accelerate(){
    if(this.rpm != 0){
      this.rpm += 250 
    }
  }

  decelerate(){
    if(this.rpm != 0){
      this.rpm -= 250
    }
  }
}

```

And When we take our racecars out for a test drive, here is the results

![inheritance](https://s3.amazonaws.com/learn-site/curriculum/inheritance-1.png)

## A note about ```super()```

Did you notice that in the constructor of our child classes we called ```super()```?  

```Javascript
class Engine{
  constructor(){
    this.oilLevel = 100
    this.rpm = 0
  }
  ...

class TurboEngine extends Engine{
  constructor(){
    super()
    this.horsepower = 450
  }
  ...

class StockEngine extends Engine{
  constructor(){
    super()
    this.horsepower = 250
  }
  ...
```

What is that all about?  When we inherit from a parent class we often times will overrite methods defined on the parent in the child, but we still want to call those parent methods.  In this case, we have setup work to do that in the parent constructor, as well as work to do in the child. ```super()``` allows us access the parent method that has the same name.

Here is the complete application for reference:

```Javascript
// ./racecar.js

class Racecar{
  constructor(engine){
    this.engine = engine
    this.speed = 0
    this.gear = 1
  }

  start(){
    this.engine.start()
  }

  shiftUp(){
    if(this.gear < 5){
      this.gear++
      this.speed = this.calculateSpeed()
    }
  }

  shiftDown(){
    if(this.gear > 1){
      this.gear --
      this.speed = this.calculateSpeed()
    }
  }

  accelerate(){
    this.engine.accelerate()
    this.speed = this.calculateSpeed()
  }

  decelerate(){
    this.engine.decelerate()
    this.speed = this.calculateSpeed()
  }

  calculateSpeed(){
    return this.engine.rpm * this.gear / 50
  }
}

```

```HTML
// ./racecar.html

<html>
  <head>
    <script type='text/javascript' src='racecar.js'></script>
  </head>
  <body>
    <script>
      class Engine{
        constructor(){
          this.oilLevel = 100
          this.rpm = 0
        }

        start(){
          this.rpm = 500
        }

        stop(){
          this.rpm = 0
        }

        accelerate(){
          console.log("Warning!  This is a base class method, should not be called")
        }

        decelerate(){
          console.log("Warning!  This is a base class method, should not be called")
        }
      }

      class TurboEngine extends Engine{
        constructor(){
          super()
          this.horsepower = 450
        }
        accelerate(){
          if(this.rpm != 0){
            this.rpm += 750 
          }
        }

        decelerate(){
          if(this.rpm != 0){
            this.rpm -= 750
          }
        }
      }

      class StockEngine extends Engine{
        constructor(){
          super()
          this.horsepower = 250
        }
        accelerate(){
          if(this.rpm != 0){
            this.rpm += 250 
          }
        }

        decelerate(){
          if(this.rpm != 0){
            this.rpm -= 250
          }
        }
      }




      let turbo = new TurboEngine()
      let fastRacecar = new Racecar(turbo)

      let stock = new StockEngine()
      let slowRacecar = new Racecar(stock)
      
      console.log("Test drive the fast racecar")
      fastRacecar.start()
      console.log('accelerating')
      fastRacecar.accelerate()
      console.log('speed:', fastRacecar.speed)

      console.log('shifting Up')
      fastRacecar.shiftUp()
      console.log('speed:', fastRacecar.speed)


      console.log("Test drive the slow racecar")
      slowRacecar.start()
      console.log('accelerating')
      slowRacecar.accelerate()
      console.log('speed:', slowRacecar.speed)

      console.log('shifting Up')
      slowRacecar.shiftUp()
      console.log('speed:', slowRacecar.speed)
    </script>
  </body>
</html>

```
