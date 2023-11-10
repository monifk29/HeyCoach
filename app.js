// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const Restaurant = require('./models/restaurant');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Create a new restaurant
app.post('/restaurant', async (req, res) => {
    try {
      const { name, address, contact } = req.body;
      const restaurant = await Restaurant.create({ name, address, contact });
      res.json(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all restaurants
  app.get('/restaurants', async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll();
      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a restaurant
  app.put('/restaurant-update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, contact } = req.body;
      const restaurant = await Restaurant.findByPk(id);
      if (restaurant) {
        await restaurant.update({ name, address, contact });
        res.json(restaurant);
      } else {
        res.status(404).json({ error: 'Restaurant not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a restaurant
  app.delete('/restaurant-delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await Restaurant.findByPk(id);
      if (restaurant) {
        await restaurant.destroy();
        res.json({ message: 'Restaurant deleted successfully' });
      } else {
        res.status(404).json({ error: 'Restaurant not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
