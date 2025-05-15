import axios from 'axios';
import { ForgeAIPayload } from '@/lib/utils/types';
import { ForgeAIResponse } from '@/lib/utils/interfaces';

if (!process.env.NEXT_PUBLIC_FORGE_API_KEY) {
  throw new Error('FORGE_API_KEY is not defined in environment variables');
}

const API_KEY = process.env.NEXT_PUBLIC_FORGE_API_KEY;
const API_URL = "https://api.forgeai.com/v1/apps/6824d23979cf1f4f0605100e/view/run";

export async function generateEmail(botName: string, prompt: string): Promise<ForgeAIResponse> {
  try {
    const payload: ForgeAIPayload = {
      user_inputs: {
        assitance_3: { value: botName },
        prompt_5: { value: prompt },
        today_6: { value: new Date().toLocaleDateString() },
      }
    };

    const res = await axios.post(
      API_URL,
      payload,
      {
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return JSON.parse(res.data.user_outputs.Node_Name_9.value);
  } catch (error) {
    console.error('Error generating email:', error);
    return {
      subject: 'Error',
      body: 'Something went wrong. Please try again.',
      success: false
    };
  }
} 