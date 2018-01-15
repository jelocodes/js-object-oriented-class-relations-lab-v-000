const store = {drivers: [], passengers: [], trips: []}
driverId = 0;
passengerId = 0;
tripId = 0;

class Trip {
	constructor(driver, passenger) {
		this.id = ++tripId;
		if (driver) {
			this.driverId = driver.id;
		}
		if (passenger) {
			this.passengerId = passenger.id;
		}
		store.trips.push(this);
	}

	setPassenger(passenger){
    	this.passengerId = passenger.id;
  	}
  	setDriver(driver) {
  		this.driverId = driver.id;
  	}

	driver(){
	    return store.drivers.find(function(driver){
      		return driver.id === this.driverId;
    	}.bind(this))
	}
	passenger(){
	    return store.passengers.find(function(passenger){
      		return passenger.id === this.passengerId;
    	}.bind(this))
	}
}

class Driver {
	constructor(name) {
		this.name = name;
		this.id = ++driverId;
		store.drivers.push(this);
	}
	trips(){
		return store.trips.filter(function(trip){
			return trip.driverId === this.id;
		}.bind(this))
	}
	passengers(){
		return store.passengers.filter(function(passenger){
			for (let i = 0; i < this.trips().length; i++) {
				if (passenger.id === this.trips()[i].passengerId) {
					return passenger
				}
			}
		}.bind(this))
	}
}

class Passenger {
	constructor(name) {
		this.name = name;
		this.id = ++passengerId;
		store.passengers.push(this);
	}
	trips(){
		return store.trips.filter(function(trip){
			return trip.passengerId == this.id;
		}.bind(this))
	}
	drivers(){
		return store.drivers.filter(function(driver){
			for (let i = 0; i < this.trips().length; i++) {
				if (driver.id === this.trips()[i].driverId) {
					return driver
				}
			}
		}.bind(this))
	}
}
