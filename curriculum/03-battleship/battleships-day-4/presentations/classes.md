# Classes in ES6

One of the highly anticipated additions to the Javascript language introduced in ES6 are Classes.  When we think of our application from an Object Oriented perspective, we think of it as a collection of objects, and actors who interact with those objects.  A car, for example is an object that is made up of many smaller objects.  It has wheels, a horn, and an engine, all of which can be interacted with by a driver.  Wheels, horns, engines, and drivers are all objects, and thus, all modeled using classes in our application.

Classes define attributes and behaviors.  An engine has attributes such as horsepower, oil level, rpm, and temperature, for example.  It has behaviors as well, such as start, accelerate, and stop.

Classes themselves are not real things, but rather definitions of things.  Think of them as the product of an engineer sitting at a desk with a pencil and paper designing exactly what he or she wants the engine to be.  Those plans then go to the manufacturing floor (our our running application) and are made into real things which can interact with other things.  

Let's take a look at an example of specifying an Engine class, and then creating an application around it where the engine can be built and used.

We'll start by creating a new application called 'racecar.html'.

```Javascript
// ./racecar.html
<html>
  <head>
  </head>
  <body>
    <script>
      class Engine{
        constructor(){
          this.horsepower = 350
          this.oilLevel = 100
          this.rpm = 0
        }
      }

      // calling `new Engine()' is just like sending the plans
      // to the production floor to have it built
      let engine = new Engine()

      // now that we have an instance of our engine built,
      // we can interact with it
      console.log("horsepower:", engine.horsepower)
      console.log("oil:", engine.oilLevel)
      console.log("rpm:", engine.rpm)
    </script>
  </body>
</html>
```

![racecar 1](https://s3.amazonaws.com/learn-site/curriculum/racecar-1.png)

That's a start!  We now have an engine, and can ask it details about its current state.  But what if we want to be able to turn the engine on, and have it do some work for us?  Remember that classes are collections of attributes and behavior, we can add a method to the class that turns it on.

```Javascript
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
      }

      let engine = new Engine()

      console.log("rpm:", engine.rpm)
      engine.start()
      console.log("rpm:", engine.rpm)

      engine.stop()
      console.log("rpm:", engine.rpm)
    </script>
```

That works, but we want to be able to accelerate, and decelerate as well.  Let's add those methods as well.

```Javascipt
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

      let engine = new Engine()

      console.log("rpm:", engine.rpm)
      engine.start()
      console.log("rpm:", engine.rpm)

      engine.accelerate()
      console.log("rpm:", engine.rpm)

      engine.accelerate()
      console.log("rpm:", engine.rpm)

      engine.decelerate()
      engine.decelerate()
      console.log("rpm:", engine.rpm)

      engine.stop()
      console.log("rpm:", engine.rpm)
    </script>

```
And now we can rev the engine.
![rev it up](https://s3.amazonaws.com/learn-site/curriculum/racecar-2.png)

Excellent!  Now that we have an engine, we can go back to our pencil pushing engineer and ask her to design the racecar that our engine will power.  

```Javascript
class Racecar{
  constructor(){
    this.speed = 0
  }
}
```

That's a start, but our racecar doesn't have an engine!  We're not going to win many races if we can't propel ourselves down the track, so we go back to the engineer and ask her to allow us to add an engine to the car, along with an ignition, throttle, transmission, speedometer, and shift lever.

```Javascript
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

We're ready to take our racecar out for a test drive around the track.

```Javascript
let engine = new Engine()
let racecar = new Racecar(engine)

racecar.start()
console.log('accelerating')
racecar.accelerate()
console.log('speed:', racecar.speed)

console.log('accelerating')
racecar.accelerate()
console.log('speed:', racecar.speed)

console.log('shifting Up')
racecar.shiftUp()
console.log('speed:', racecar.speed)

console.log('shifting Down')
racecar.shiftDown()
console.log('speed:', racecar.speed)

```

![test drive](https://s3.amazonaws.com/learn-site/curriculum/racecar-3.png)

