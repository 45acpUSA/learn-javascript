Using Express, create an app that satisfies the following requirements:

1. *Given* that I am on the car simulator landing page, *then* I see “Welcome to the Car Simulator”

1. *Given* that I am on the landing page, *then* I can create a car based on make and model year of the car to be simulated.

1. *Given* that I have entered the make and model year, *when* I click on a button labelled “Simulate Car”, *then* I am taken to a status page showing make, model year and initial speed of the car.

1. *Given* that I have created a car, *when* I click an accelerate button, *then* I make it speed up in 10Km/h increments. <br/>
Hint:	Create a route `get 'cars/accelerate'`.

1. *Given* that I have created a car, when I click the brake button, then the car slows down by 7Km/h.

1. *Given* that I have created a car, and accelerated it, when I repeatedly click the brake, then the car eventually slows down to 0Km/h and does not go backwards.

1. *Given* that I have entered the make and model year, *when* clicking on a button labelled “Simulate Car”, *then* I am taken to a status page that shows whether the lights on the car are on or off. They start off. <br/>
Hint:	Add a `lights` method to the `Car` class that returns true or false.

1. *Given* that I have created a car *when* I visit the status page, *then* I can turn the lights on using a button that toggles between showing “On” and “Off”. <br/>
Hint:	Implement a `toggle` method on the `Car` class.

1. *Given* that I have created a car, *when* I visit the car status page, *then* I can set and release the parking brake using radio buttons.

1. *Given* that I have created a car, *when* the parking brake is set, *then* the accelerate button does not work.

1. *Given* that I have created a car, *when* the car is moving, *then* the parking brake does not work.

1. *Given* that I have created a car, *when* I select a color on the index page, *then* it is displayed as the background color on make text of the car.<br/>
Hint:	Use input of type color

