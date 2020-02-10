const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const scores = require('../../Scores');

// Get scores
router.get('/', (req, res) => res.json(scores));

// Add a new score
router.post('/', (req, res) => { 
  try {
    const newScore = {
        id: uuid(),
        name: req.body.name,
        score: req.body.score
      };    
      if (!newScore.name || !newScore.score) {
        return res.status(400).json({ msg: 'Score or name cannot be empty' });
      }
      scores.push(newScore);
      res.json(newScore);
  } catch (error) {
      console.log(error)
  }
});


module.exports = router;