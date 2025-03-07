//This file basically maintains a global state timer for the entire application 
// Sends sequence numbers for packet responses to the client



//Initiailize the timer with a random value between 1 and 999
let timer = Math.floor(Math.random() * 999) + 1

module.exports = {
    /*
    Initialize the server timer
    This function starts a timer that increments every 10 milliseconds
    The timer resets after reaching 2^32 to prevent overflow
     */
    init: function () {
        //Set interval repeatdely calls a function with a fixed time delay between each call 
        setInterval(() => {
            timer = (timer + 1) % Math.pow(2, 32);; //32-bit timer
        }, 10 //delay
        );
    },

    /*--------------------------
    *Generate the next sequence number. 
    * This is a 26-bit value that increments for every response sent. 
    * It resets after reaching 2^26
    * @returns {number} - The next sequenece number. 
    //--------------------------*/
    getSequenceNumber: function () {
        return (timer+1) % Math.pow(2, 26) 
    },

    //--------------------------
    //getTimestamp: return the current timer value
    //--------------------------
    getTimestamp: function () {
        return timer;
    }
}

