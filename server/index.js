import express from 'express';
import cors from 'cors';
import { fetchRecipeMetadata } from './extract.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/extract-recipe', async (req, res) => {
  const { url } = req.body || {};
  if (typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ ok: false, error: 'missing_url' });
  }

  const result = await fetchRecipeMetadata(url.trim());
  if (!result.ok) {
    return res.status(200).json(result);
  }
  return res.json(result);
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Harvest recipe extraction API listening on http://localhost:${PORT}`);
});
