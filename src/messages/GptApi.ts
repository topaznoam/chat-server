import { OpenAI } from 'openai';
import { config } from 'dotenv';
import { join } from 'node:path';
import { ROOT_DIR } from '../Constant';
config({ path: join(ROOT_DIR, './.env') });

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

export const generateSummary = async (text: string): Promise<string> => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'summarize very sortly the chat (Ignore unrelated messages ) ',
        },
        { role: 'user', content: text },
      ],
      model: 'gpt-3.5-turbo',
    });

    return (
      chatCompletion.choices[0]?.message?.content || 'No content available'
    );
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};
