const Formatter = (function() {
   let timesRun = 0;
 
   const log = message => console.log(`[${Date.now()}] Logger: ${message}`);
   const setTimesRun = () => {
     log("Setting times run");
     ++timesRun;
     console.log(timesRun);
   };
 
   const makeUppercase = text => {
     log("Making uppercase");
     setTimesRun();
     return text.toUpperCase();
   };
 
   return {
     makeUppercase,
     getTimesRun: () => timesRun,
     incrementTimesRun: (value) => timesRun = value,
   };
 })();
 
 
 
 Formatter.incrementTimesRun(5);
 console.log(Formatter.makeUppercase("hi there"));
 console.log(Formatter.getTimesRun());
 console.log(Formatter.makeUppercase("hi there"));
 console.log(Formatter.getTimesRun());
 