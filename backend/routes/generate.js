const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/generate', async (req, res) => {
  const text = req.query.text || 'Hello from NivaBand!';
  const HF_API_TOKEN = process.env.HF_API_TOKEN;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/suno/bark',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    res.set('Content-Type', 'audio/wav');
    res.send(response.data);
  } catch (err) {
    console.error('Error generating audio:', err);
    res.status(500).json({ error: 'Failed to generate sound.' });
  }
});

module.exports = router;
