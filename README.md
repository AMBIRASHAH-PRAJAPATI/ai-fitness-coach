# 🧠 AI Fitness Coach

**AI Fitness Coach** is a web application built with **Next.js** that generates personalized **7-day fitness and diet plans** using **Google Gemini AI**.  
Users fill out a multi-step form with their personal details, goals, and preferences, and the app provides a detailed, day-by-day plan complete with motivational quotes and AI-generated illustrations.

---

## 🚀 Core Features

### 🧾 Multi-Step Form
An interactive, 4-step form (using **React Hook Form** and **Zod** for validation) that guides users through providing their fitness details.

#### 🩵 **Step 1: Basic Information**
Collects fundamental details:
- Name  
- Age  
- Gender  

#### 💪 **Step 2: Body Metrics & Fitness Preferences**
Captures user’s fitness profile:
- Height & Weight  
- Fitness Goal (Weight Loss, Muscle Gain, Endurance, etc.)  
- Current Fitness Level (Beginner, Intermediate, Advanced)  
- Workout Location (Home, Gym, Outdoor)  
- Dietary Preference (Veg, Non-Veg, Vegan, Keto)

#### 🧠 **Step 3: Lifestyle & Wellness**
Gathers personal insights for deeper personalization:
- Medical History (if any)  
- Stress Level (Low, Moderate, High)

#### 🏁 **Step 4: Plan Generation**
- User reviews entered data  
- Submits the form to generate a **personalized 7-day fitness & diet plan**  
- A loading modal appears:  
  > “Hang tight! Your personalized fitness journey is being crafted.”

---

### 🧠 Dynamic Plan Generation
Uses the **Google Gemini Pro** model to generate a **structured JSON** response containing a complete weekly workout and diet plan, including:
- Daily workout focus  
- Exercises (sets, reps, rest)  
- Motivation quote & workout tips  
- Daily diet summary with calorie breakdown  

---

### 🖼️ AI Image Generation
Each exercise in the generated plan comes with an **AI-generated image** (using **Gemini Pro Vision**) for visual guidance.

---

### 💬 Motivational Quotes + Text-to-Speech
Displays a **daily motivational quote**, and uses the **ElevenLabs API** to generate a **text-to-speech** version for an inspiring experience.

---

### 📄 PDF Export
Users can download their complete fitness plan as a **PDF document**, powered by `jsPDF` and `html2canvas`.

---

### 💾 Client-Side Storage
All user inputs and generated plans are saved in **localStorage**, so users can revisit their data even after refreshing or closing the browser.

---

### 🌗 Dark Mode
Includes a **theme toggle** for **light/dark mode** support using **shadcn/ui** and **Tailwind CSS**.

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **UI Library** | React + Framer Motion |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Form Management** | React Hook Form + Zod |
| **AI (Text & Image)** | Google Gemini API |
| **AI (Text-to-Speech)** | ElevenLabs API |
| **PDF Generation** | jsPDF + html2canvas |
| **Utilities** | clsx, tailwind-merge |

---

## 🏗️ Architecture Overview

This project follows a **secure, modular architecture**, separating client logic from server-side operations to protect secret keys and improve scalability.

### **1️⃣ Client Components ("use client")**
- **Location:** `src/app/page.tsx`
- **Purpose:** Handles all form logic, validation, and user interaction.
- **Runs in:** Browser  
- **Note:** Cannot access server-side secrets like `process.env.GEMINI_API_KEY`.

---

### **2️⃣ API Routes (Server-Side Bridge)**
- **Location:** `src/app/api/.../route.ts` (e.g., `api/generate-plan/route.ts`)
- **Purpose:** Acts as a **secure bridge** between client and server.
- **Process:**
  1. Client sends form data via `fetch('/api/generate-plan')`.
  2. API route securely accesses Gemini and ElevenLabs API keys.
  3. API invokes business logic functions from `/lib`.

---

### **3️⃣ Business Logic (Server-Side Only)**
- **Location:** `src/lib/*Service.ts` (e.g., `lib/planService.ts`, `lib/imageService.ts`)
- **Purpose:** Contains the **core application logic**:
  - Constructs prompts for Gemini AI
  - Handles schema-based responses
  - Manages error handling and plan formatting

---

### ✅ Security Advantage
- No API keys are ever exposed to the client.
- All sensitive AI logic runs securely on the server.
- Ensures the app is both **scalable** and **secure**.

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ambirashah-prajapati/ai-fitness-coach.git
cd ai-fitness-coach
```
### 2. Install Dependencies
This project uses pnpm (based on pnpm-lock.yaml).

```bash
pnpm install
```
### 3. Set Up Environment Variables
Create a file named .env.local in the root of your project and add your secret keys:

```
GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
ELEVENLABS_API_KEY=YOUR_ELEVENLABS_API_KEY
```
### 4. Run the Development Server
```bash
pnpm run dev
```
Open http://localhost:3000 with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
