const singleton = require("./Singleton");

// Initialize the timer
singleton.init();

// Print values every second to verify correctness
setInterval(() => {
    console.log(`Timestamp: ${singleton.getTimestamp()}, Sequence Number: ${singleton.getSequenceNumber()}`);
}, 1000);
