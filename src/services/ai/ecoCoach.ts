/**
 * Purpose: Conversational AI assistant interface.
 * Responsibility: Maintain chat session context and communicate with the Gemini API to act as the Eco Coach.
 * Future Integrations: Persist chat history in Supabase, pass dynamic user context (like current emission score) into the system prompt invisibly.
 */

import { GoogleGenAI } from '@google/genai';
import { SystemPrompts } from './promptBuilder';
import { AIResponse } from './types';

export class EcoCoach {
  private ai?: GoogleGenAI;
  private chatSession: any;

  constructor() {}

  /**
   * Initializes the chat session with the persona instructions.
   */
  async startChat(): Promise<AIResponse<boolean>> {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    }
    try {
      this.chatSession = await this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SystemPrompts.ECO_COACH,
        }
      });
      return { success: true, data: true };
    } catch (error: any) {
      console.error("Failed to start Eco Coach:", error);
      return { success: false, message: error.message || "Failed to initialize Eco Coach." };
    }
  }

  /**
   * Sends a message to the active chat session.
   */
  async sendMessage(message: string): Promise<AIResponse<string>> {
    if (!this.chatSession) {
      return { success: false, message: "Chat session not initialized. Call startChat() first." };
    }
    
    try {
      const response = await (this.chatSession as any).sendMessage({ message });
      if (!response.text) throw new Error("Empty response from AI");
      
      return { success: true, data: response.text };
    } catch (error: any) {
      console.error("Eco Coach Error:", error);
      return { success: false, message: "Failed to process message." };
    }
  }
}
