import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const PROMPT = `You are an expert AI Resume Analyst and Recruiter. 
I will provide you with the raw extracted text from a resume. 
Your task is to analyze it thoroughly and return ONLY a valid JSON object matching the exact structure below. Do not include markdown formatting like \`\`\`json or any other conversational text. Just output the raw JSON string.

Expected JSON Structure:
{
  "parsedData": {
    "personalInfo": {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "location": "string",
      "linkedin": "string",
      "github": "string",
      "portfolio": "string"
    },
    "summary": "string",
    "skills": ["string"],
    "experience": [
      {
        "title": "string",
        "company": "string",
        "location": "string",
        "startDate": "string",
        "endDate": "string",
        "current": boolean,
        "description": "string"
      }
    ],
    "education": [
      {
        "degree": "string",
        "institution": "string",
        "location": "string",
        "startDate": "string",
        "endDate": "string",
        "current": boolean,
        "description": "string"
      }
    ],
    "projects": [
      {
        "title": "string",
        "description": "string",
        "url": "string",
        "technologies": ["string"]
      }
    ]
  },
  "analysis": {
    "atsScore": number (0-100),
    "resumeScore": number (0-100),
    "strengths": ["string"],
    "weaknesses": ["string"],
    "missingSkills": ["string"],
    "grammarSuggestions": [
      {
        "original": "string",
        "suggestion": "string",
        "reason": "string"
      }
    ],
    "formattingSuggestions": ["string"],
    "keywordSuggestions": ["string"],
    "recruiterFeedback": "string",
    "industryReadiness": "string",
    "actionPlan": [
      {
        "step": number,
        "task": "string",
        "timeline": "string"
      }
    ]
  }
}

Raw Resume Text:
`;

export const analyzeResumeWithHF = async (rawText) => {
  try {
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content: rawText }
      ],
      max_tokens: 4000,
      temperature: 0.1,
    });

    const responseContent = response.choices[0].message.content.trim();
    
    // Clean up potential markdown formatting that models sometimes include despite instructions
    let jsonString = responseContent;
    if (jsonString.startsWith('\`\`\`json')) {
      jsonString = jsonString.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
    } else if (jsonString.startsWith('\`\`\`')) {
      jsonString = jsonString.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
    }

    try {
      const parsed = JSON.parse(jsonString);
      return parsed;
    } catch (parseError) {
      console.error("Failed to parse HF output as JSON:", parseError);
      console.log("Raw Output:", responseContent);
      throw new Error("AI returned invalid JSON format.");
    }
  } catch (error) {
    console.error('Error with Hugging Face Inference:', error);
    throw new Error('Failed to analyze resume with AI');
  }
};
