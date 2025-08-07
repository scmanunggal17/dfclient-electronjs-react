const dgram = require('dgram');
const client = dgram.createSocket('udp4');

// Get integer from command line arguments
const messageArg = process.argv[2];

if (!messageArg) {
    console.error('Usage: node udp-client.js <integer>');
    console.error('Example: node udp-client.js 101000');
    process.exit(1);
}

const messageInt = (parseInt(messageArg, 10))* 1000; // Convert to milliseconds

if (isNaN(messageInt)) {
    console.error('Error: Argument must be a valid integer');
    console.error('Example: node udp-client.js 101000');
    process.exit(1);
}

const PORT = 55555;
const ADDRESS = '127.0.0.1'; // Or the IP address of your UDP server

const buffer = Buffer.from(messageInt.toString());

client.send(buffer, PORT, ADDRESS, (err) => {
    if (err) {
        console.error('Error sending UDP message:', err);
    } else {
        console.log(`UDP message "${messageInt}" sent to ${ADDRESS}:${PORT}`);
    }
    client.close(); // Close the socket when done
});

client.on('error', (err) => {
    console.error(`Client error:\n${err.stack}`);
    client.close();
});