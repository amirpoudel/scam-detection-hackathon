# Phishing Detection Agent

A comprehensive Node.js TypeScript agent built with LangChain that can detect phishing attempts in both text messages and audio content.

## Features

### Text Message Analysis
- Detects urgency tactics and pressure language
- Identifies requests for sensitive information
- Analyzes grammar and spelling patterns
- Evaluates links and suspicious instructions
- Detects impersonation attempts

### Audio Message Analysis
- Transcribes audio to text using OpenAI's Whisper model
- Analyzes voice characteristics for signs of synthetic voice
- Detects emotional manipulation in voice tone
- Identifies pressure tactics in delivery
- Combines voice and content analysis for comprehensive detection

## Components

The system consists of three main components:

1. **TextPhishingDetector**: Specialized agent for text message analysis
2. **AudioPhishingDetector**: Specialized agent for audio file analysis
3. **PhishingDetectionAgent**: Main application that integrates both detectors

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- OpenAI API key

### Installation

1. Clone this repository or download the files
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### Building

```bash
npm run build
```

## Usage

### Command Line Interface

Run the tool directly:

```bash
npm run start
```

This will start both the CLI interface and the API server. The CLI provides an interactive menu:

1. Analyze text message
2. Analyze audio file
3. Exit

### API Server

The agent provides REST API endpoints:

#### Text Analysis
- **POST /api/detect/text** - Full analysis of text content
  - Body: `{ "text": "Text message to analyze" }`
  - Returns: Detailed analysis result

- **POST /api/detect/text/quick** - Quick check of text content
  - Body: `{ "text": "Text message to analyze" }`
  - Returns: Simplified safety assessment

#### Audio Analysis
- **POST /api/detect/audio** - Full analysis of audio file
  - Form data: `audio` (file upload)
  - Returns: Detailed analysis including voice characteristics

- **POST /api/detect/audio/quick** - Quick check of audio file
  - Form data: `audio` (file upload)
  - Returns: Simplified safety assessment

### Example API Request (Text)

```bash
curl -X POST http://localhost:3000/api/detect/text \
  -H "Content-Type: application/json" \
  -d '{"text": "URGENT: Your account has been compromised. Click this link immediately to reset your password: http://suspicious-link.com"}'
```

### Example API Request (Audio)

```bash
curl -X POST http://localhost:3000/api/detect/audio \
  -F "audio=@/path/to/audiofile.mp3"
```

## How It Works

### Text Analysis Pipeline

1. The text content is submitted to the TextPhishingDetector
2. LangChain processes the text using a specialized prompt template
3. GPT-4 analyzes the content for phishing indicators
4. The response is structured using Zod schema validation
5. A comprehensive analysis is returned

### Audio Analysis Pipeline

1. The audio file is submitted to the AudioPhishingDetector
2. OpenAI's Whisper model transcribes the audio to text
3. The transcribed text is analyzed for content-based indicators
4. Voice characteristics are analyzed separately
5. Both analyses are combined for a final assessment
6. A comprehensive analysis is returned

## Output Format

Analysis results include:

- Phishing likelihood (High/Medium/Low)
- Confidence score (0-100%)
- List of suspicious indicators
- Detailed explanation
- Safety recommendation
- Voice characteristics (for audio)

## License

MIT