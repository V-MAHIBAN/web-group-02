import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for live interactivity
let waterIntakeStore = {
  targetMl: 2500,
  consumedMl: 1750,
  glassSizeMl: 250,
  reminderIntervalMinutes: 60,
  remindersEnabled: true,
  lastDrinkTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  streakDays: 12,
  history: [
    { time: "08:15 AM", amountMl: 250 },
    { time: "09:30 AM", amountMl: 250 },
    { time: "11:00 AM", amountMl: 500 },
    { time: "01:15 PM", amountMl: 250 },
    { time: "03:45 PM", amountMl: 500 }
  ]
};

// Health endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: "EduCommunity Pro API" });
});

// Water intake & wellness endpoints
app.get("/api/wellness/water", (req: Request, res: Response) => {
  res.json(waterIntakeStore);
});

app.post("/api/wellness/water/log", (req: Request, res: Response) => {
  const { amountMl } = req.body;
  const loggedAmount = Number(amountMl) || waterIntakeStore.glassSizeMl;
  waterIntakeStore.consumedMl += loggedAmount;
  const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  waterIntakeStore.lastDrinkTime = nowStr;
  waterIntakeStore.history.unshift({
    time: nowStr,
    amountMl: loggedAmount
  });
  if (waterIntakeStore.consumedMl >= waterIntakeStore.targetMl && waterIntakeStore.history.length === 1) {
    waterIntakeStore.streakDays += 1;
  }
  res.json({ success: true, waterTracker: waterIntakeStore });
});

app.post("/api/wellness/water/reset", (req: Request, res: Response) => {
  waterIntakeStore.consumedMl = 0;
  waterIntakeStore.history = [];
  res.json({ success: true, waterTracker: waterIntakeStore });
});

app.post("/api/wellness/water/settings", (req: Request, res: Response) => {
  const { targetMl, reminderIntervalMinutes, remindersEnabled } = req.body;
  if (targetMl) waterIntakeStore.targetMl = Number(targetMl);
  if (reminderIntervalMinutes) waterIntakeStore.reminderIntervalMinutes = Number(reminderIntervalMinutes);
  if (typeof remindersEnabled === 'boolean') waterIntakeStore.remindersEnabled = remindersEnabled;
  res.json({ success: true, waterTracker: waterIntakeStore });
});

// AI Chatbot endpoint using Google GenAI SDK (gemini-3.7-flash)
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message prompt is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are EduAssist AI, the intelligent instructional & learning assistant built into EduCommunity Pro.
You help educators, civic leaders, students, and administrators create lesson plans, review public policy frameworks, brainstorm collaborative simulations, create quizzes, and explain complex civic concepts.
Provide structured, crisp, beautifully articulated responses.
When generating a lesson plan or structured curriculum, organize it cleanly with phases, durations, and interactive components.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          ...(history || []).map((h: any) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }]
          })),
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Here is information to assist your learning objectives.";
      return res.json({ reply: responseText });
    } else {
      // Fallback structured educational responses if API key is not yet configured in UI
      const lower = message.toLowerCase();
      let fallback = "";

      if (lower.includes("activity") || lower.includes("elaborate") || lower.includes("atp")) {
        fallback = `### Interactive Activity: The ATP Energy Factory Simulation

**Objective:** Students visualize cellular respiration dynamics through hands-on roleplaying of biochemical energy pathways.

1. **Station 1 (Cytoplasm):** 2 students assemble 6-carbon Glucose puzzle pieces, split them into Pyruvates, yielding 2 ATP tokens.
2. **Station 2 (Mitochondrial Matrix):** The Krebs Cycle station extracts high-energy electrons (represented by glow markers) and produces CO₂ byproduct cards.
3. **Station 3 (Inner Membrane):** The Electron Transport Chain pump converts proton concentration gradients into 32–34 ATP stamps.

**Key Assessment:** Have each station explain why oxygen acts as the final electron acceptor!`;
      } else if (lower.includes("quiz") || lower.includes("question")) {
        fallback = `### Formative Quiz: Civic Governance & Leadership

1. **Question 1:** What is the primary ethical responsibility of public officials when implementing open data initiatives?
   - *A)* Maximizing commercial monetizability
   - *B)* Ensuring transparency while rigorously protecting individual privacy data *(Correct)*
   - *C)* Restricting public query access to government hours only
   - *D)* Offloading verification to third-party advertisers

2. **Question 2:** In transit-oriented urban planning, what is the primary benefit of dedicated bus rapid transit (BRT) corridors?
   - *A)* Increases private vehicle parking space
   - *B)* Decreases modal shift to mass transit
   - *C)* Reduces cross-corridor congestion by up to 24% and enhances equity *(Correct)*
   - *D)* Eliminates all municipal operating expenses

3. **Question 3:** What phase of cellular respiration produces the greatest yield of ATP?
   - *A)* Glycolysis
   - *B)* Fermentation
   - *C)* Oxidative Phosphorylation / Electron Transport *(Correct)*
   - *D)* Acetyl-CoA formation`;
      } else if (lower.includes("unit") || lower.includes("next")) {
        fallback = `### Link to Next Unit: Photosynthesis & Ecological Balance

To transition seamlessly from Cellular Respiration:
- **Core Bridge Question:** *"Where does the glucose that fuels the ATP factory originally come from?"*
- **Comparative Matrix:** Contrast the light-dependent and Calvin cycles in chloroplasts with mitochondrial electron transport.
- **Cross-Curricular Civic Extension:** Explore how urban tree canopy coverage directly combats municipal heat islands and improves neighborhood respiratory health metrics.`;
      } else {
        fallback = `Here is a structured overview for: **${message}**

- **Key Concept:** Clear pedagogical alignment with civic and academic excellence standards.
- **Suggested Learning Phase:** 15-minute direct instruction followed by a 20-minute active synthesis seminar.
- **Action Step:** Would you like me to elaborate on activity design, generate an instant 5-question quiz, or build a rubric?`;
      }

      return res.json({ reply: fallback });
    }
  } catch (err: any) {
    console.error("AI chat error:", err);
    res.status(500).json({ error: "Failed to generate AI response: " + (err.message || "Unknown error") });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduCommunity Pro Server running on http://localhost:${PORT}`);
  });
}

startServer();
