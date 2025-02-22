require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const SERIAL_PORT = process.env.SERIAL_PORT || 'COM8';
const BAUD_RATE = parseInt(process.env.BAUD_RATE) || 115200;
const SERVER_PORT = process.env.PORT || 3000;
const HEART_RATE_THRESHOLD = 150; // Alert if BPM > 180

let lastHeartRate = 75; // Default heart rate

const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => {
  console.log(`✅ Serial Port Opened on ${SERIAL_PORT} with Baud Rate ${BAUD_RATE}`);
});

port.on('error', (err) => {
  console.error(`❌ Serial Port Error: ${err.message}`);
});

// **Handle Incoming Heart Rate Data**
parser.on('data', (data) => {
  try {
    const jsonData = JSON.parse(data.trim()); // Parse JSON from Arduino
    if (jsonData.BPM) {
      const heartRate = parseInt(jsonData.BPM, 10);
      lastHeartRate = heartRate;
      console.log(`💓 Heartbeat Data: ${heartRate} BPM`);

      io.emit('heartbeat', heartRate);

      if (heartRate > HEART_RATE_THRESHOLD) {
        const alertMessage = `🚨 ALERT! High Heart Rate: ${heartRate} BPM`;
        console.log(alertMessage);
        io.emit('alert', alertMessage); // Send alert to mobile app
      }
    }
  } catch (error) {
    console.error('⚠️ Error parsing JSON:', error.message);
  }
});

// **API Endpoint to Get Latest Heart Rate (Only > 75 BPM)**
app.get('/heartbeat', (req, res) => {
  if (lastHeartRate > 75) {
    res.json({ heartRate: lastHeartRate });
  } else {
    res.json({ message: "Heart rate is normal", heartRate: lastHeartRate });
  }
});

// **Start Server**
server.listen(SERVER_PORT, () => {
  console.log(`🚀 Server running on http:// 172.16.30.206:${SERVER_PORT}`);
});
