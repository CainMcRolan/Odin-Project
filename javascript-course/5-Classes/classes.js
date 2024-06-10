// class Clock {
//    constructor({template}) {
//       this.template = template;
//    }

//    render() {
//       let date = new Date();
//       let hours = date.getHours();
//       let minutes = date.getMinutes();
//       let seconds = date.getSeconds();

//       let timeString = this.template.replace('h', hours.toString().padStart(2, 0))
//                                     .replace('m', minutes.toString().padStart(2, 0))
//                                     .replace('s', seconds.toString().padStart(2, 0));
//       let timeOutput = `Time: ${timeString}`;
//       console.log(timeOutput);
//    }

//    start() {
//       this.render();
//       this.timer = setInterval(this.render.bind(this) , 1000);
//    }

//    stop() {
//       clearInterval(this.timer);
//    }
// }

// let clock = new Clock({template: 'h:m:s'});
// clock.start();

// setTimeout(clock.stop.bind(clock), 5000);

