const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware


// Create an Express app
const app = express();
app.use(cors())
// Create an HTTP server using the Express app
const server = http.createServer(app);

// a Socket.IO instance attached to the HTTP server
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
});

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.status(200).send('Welcome to the SSS')
})

io.on("connection", (socket) => {
  console.log("a client connected")
})
// Handle Swish webhook endpoint
app.post('/api/success', (req, res) => {
  const paymentDetails = req.body;

  // Assuming you've stored the paymentDetails in a variable or database
  // Emit the paymentDetails to all connected clients
  console.log(paymentDetails)
  io.emit('paymentDetails', paymentDetails);

  // Respond to Swish with a success message
  res.status(200).json({ message: 'Payment details received successfully' });
});

// Start the server on a specific port
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});