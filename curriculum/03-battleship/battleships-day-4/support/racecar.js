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

