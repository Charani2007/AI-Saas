# Imagine - AI Image Generator Landing Page

Welcome to the official workspace for **Imagine**, a next-generation AI image generation SaaS platform. This codebase contains an ultra-premium, interactive, and responsive landing page designed using modern web design principles (glassmorphism, vibrant HSL gradients, and keyframe animations).

## Core Features

1. **Interactive Prompt Simulator**: Users can experience the image generation workflow directly on the landing page! Choose a preset prompt or type a custom query, click "Generate", and watch simulated cluster logs render the output.
2. **Dynamic Pricing Toggle**: Switches between Monthly and Yearly subscriptions with count animations.
3. **Responsive Grid Layouts**: Fits perfectly on desktops, laptops, tablets, and mobile viewports.
4. **Interactive Accordion FAQ**: Smoothly collapsing/expanding frequently asked questions with interactive icons.
5. **Prompt Copy Clipboard**: Seamless prompt sharing with neon-cyan toast notifications.

## Project Structure

```text
├── assets/                    # AI Generated HD Showcase Assets
│   ├── hero-showcase.png      # Cyberpunk cityscape
│   ├── art-fantasy.png        # Bioluminescent forest
│   ├── art-character.png      # Cybernetic astronaut portrait
│   └── art-scifi.png          # Cosmic nebula spaceship
├── index.html                 # Main markup with SEO metadata
├── styles.css                 # Custom HSL-tailored dark stylesheet
├── script.js                  # Frontend interactive scripts
└── readme.md                  # Project documentation
```

## Running Locally

To start a lightweight local web server and preview the landing page, open your terminal in this workspace and run:

### Using Python:
```bash
python -m http.server 8000
```
Then visit **`http://localhost:8000`** in your browser.

### Using Node.js (npx serve):
```bash
npx serve .
```
Then visit **`http://localhost:3000`** in your browser.
