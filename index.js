const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

//server side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;



app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  const totalCartValue = newItemPrice + cartTotal;

  res.send(totalCartValue);
});

app.get('/membership-discount', (req, res) => {
  console.log(req.query.isMember);
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';

  let finalPrice = cartTotal;

  if (isMember) {
    finalPrice = cartTotal - cartTotal * (discountPercentage / 100);
  }

  console.log(finalPrice, isMember, 'price');
  res.send(finalPrice);
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);

  const taxAmount = cartTotal * taxRate;

  res.send(taxAmount);
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod.toLowerCase();
  const distance = parseFloat(req.query.distance);

  let deliveryDays;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.send('Invalid shipping method');
  }

  res.send(deliveryDays);
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);

  if (isNaN(weight) || isNaN(distance)) {
    return res.send(
      'Invalid input. Please provide both weight and distance as valid numbers.'
    );
  }

  const shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toFixed(2));
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  if (isNaN(purchaseAmount)) {
    return res.send('Invalid input. Please provide a valid purchase amount.');
  }

  const loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
