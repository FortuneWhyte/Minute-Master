import express from 'express';
import cors from 'cors';
import multer from 'multer';
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Minute Master, a professional meeting minutes extraction engine.
You MUST extract and structure raw meeting transcripts strictly following Robert's Rules of Order.

OUTPUT FORMAT: Return ONLY valid JSON with this exact structure (no markdown, no backticks):
{
  "title": "Full meeting title (e.g., 'HARBORVIEW CONDOMINIUMS AGM')",
  "date": "Meeting date as stated (e.g., 'March 3rd, 2026')",
  "location": "Venue (e.g., 'Zoom (Virtual)' or physical address)",
  "board_members": number of board/committee members present,
  "residents": number of residents/proxies present,
  "motions": [
    {
      "description": "Exact wording of what was voted on",
      "mover": "Full name of person who moved (with Unit if available)",
      "seconder": "Full name of seconder (with Unit if available)",
      "result": "Carried" or "Defeated" or "Tabled"
    }
  ],
  "action_items": [
    {
      "task": "Specific follow-up task identified",
      "assignee": "Person or role responsible",
      "status": "Pending"
    }
  ],
  "minutes_text": "The complete, professionally formatted meeting minutes following Robert's Rules of Order with numbered sections: 1. Call to Order, 2. Roll Call / Attendance, 3. Quorum, 4. Approval of Agenda, etc. Each motion must use the format: Motion: [description] Moved by: [name] Seconded by: [name] Result: [outcome]. End with Adjournment section."
}

RULES:
- Extract ALL motions. Each motion MUST have mover, seconder, and result.
- The minutes_text must be professionally written, not a raw transcript copy.
- Use numbered sections (1, 2, 3...) with sub-sections (8.1, 8.2) for dense topics.
- Use bullet points for discussion details.
- Filter out filler words, crosstalk, and off-topic conversation.
- If data is unclear or missing, use "[Not recorded]" rather than guessing.`;

app.post('/api/process-transcript', upload.single('transcript'), async (req, res) => {
  try {
    let transcriptText = '';

    if (req.file) {
      transcriptText = readFileSync(req.file.path, 'utf-8');
    } else if (req.body.text) {
      transcriptText = req.body.text;
    } else {
      return res.status(400).json({ error: 'No transcript provided' });
    }

    if (!transcriptText.trim()) {
      return res.status(400).json({ error: 'Empty transcript' });
    }

    console.log(`Processing transcript (${transcriptText.length} chars)...`);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Process this meeting transcript:\n\n${transcriptText}` },
      ],
      temperature: 0.2,
      max_tokens: 4096,
    });

    const rawResponse = completion.choices[0]?.message?.content || '';

    // Parse the JSON response
    let parsed;
    try {
      // Strip markdown code fences if present
      const cleaned = rawResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error('Failed to parse AI response:', rawResponse);
      return res.status(500).json({ error: 'AI returned invalid format', raw: rawResponse });
    }

    console.log(`✓ Extracted: ${parsed.motions?.length || 0} motions, ${parsed.action_items?.length || 0} action items`);

    res.json(parsed);
  } catch (err) {
    console.error('Processing error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Processing failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n  Minute Master API server running on http://localhost:${PORT}\n`);
});
