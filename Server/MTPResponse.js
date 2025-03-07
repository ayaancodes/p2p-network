// The server has to match the current Media Transport Protocol Structure
const HEADER_SIZE = 12;

module.exports = {
    /**
     * Initializes a new response packet with the correct structure.
     * @param {number} responseType - Response type (0 = Query, 1 = Found, 2 = Not Found, 3 = Busy).
     * @param {number} sequenceNum - 26-bit sequence number.
     * @param {number} timestamp - 32-bit server timestamp.
     * @param {Buffer} payload - The media data (empty if Not Found).
     * @param {boolean} isLastPacket - True if this is the last packet for the file.
     */
    init: function (responseType, sequenceNum, timestamp, payload, isLastPacket) {
        this.responseHeader = Buffer.alloc(HEADER_SIZE);
        this.payload = payload;
        this.payloadSize = payload.length;

        // Set MTP version (4-bit) → Must be `1001` (9 in decimal)
        storeBitPacket(this.responseHeader, 9, 0, 4);

        // Set response type (3-bit)
        storeBitPacket(this.responseHeader, responseType, 4, 3);

        // Set sequence number (26-bit)
        storeBitPacket(this.responseHeader, sequenceNum, 7, 26);

        // Set timestamp (32-bit)
        storeBitPacket(this.responseHeader, timestamp, 33, 32);

        // Set last packet flag (1-bit)
        storeBitPacket(this.responseHeader, isLastPacket ? 1 : 0, 65, 1);

        // Set payload size (31-bit)
        storeBitPacket(this.responseHeader, this.payloadSize, 66, 31);
    },

    /**
     * Returns the complete response packet (header + payload).
     * @returns {Buffer} - The entire packet in bytes.
     */
    getBytePacket: function () {
        let packet = Buffer.alloc(this.payloadSize + HEADER_SIZE);
        
        // Copy header
        for (let Hi = 0; Hi < HEADER_SIZE; Hi++) {
            packet[Hi] = this.responseHeader[Hi];
        }
        
        // Copy payload
        for (let Pi = 0; Pi < this.payloadSize; Pi++) {
            packet[Pi + HEADER_SIZE] = this.payload[Pi];
        }

        return packet;
    }
};

// Store integer value into the packet bit stream
function storeBitPacket(packet, value, offset, length) {
    let lastBitPosition = offset + length - 1;
    let number = value.toString(2);
    let j = number.length - 1;

    for (let i = 0; i < number.length; i++) {
        let bytePosition = Math.floor(lastBitPosition / 8);
        let bitPosition = 7 - (lastBitPosition % 8);

        if (number.charAt(j--) === "0") {
            packet[bytePosition] &= ~(1 << bitPosition);
        } else {
            packet[bytePosition] |= 1 << bitPosition;
        }

        lastBitPosition--;
    }
}

// Prints the entire packet in bits format
function printPacketBit(packet) {
    let bitString = "";

    for (let i = 0; i < packet.length; i++) {
        let b = "00000000" + packet[i].toString(2);
        if (i > 0 && i % 4 === 0) bitString += "\n";
        bitString += " " + b.substr(b.length - 8);
    }
    console.log(bitString);
}
