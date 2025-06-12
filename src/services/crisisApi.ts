import axios from 'axios';

// Use environment variable or default to Render URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://boweryconnect-api.onrender.com';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface CrisisResponse {
  message: string;
  urgency: 'immediate' | 'high' | 'medium' | 'low' | 'error';
  actions?: string[];
  resources?: string[];
  fallback?: boolean;
}

interface NearbyResources {
  resources: Array<{
    name: string;
    address?: string;
    phone?: string;
    distance?: string;
    services: string[];
  }>;
}

class CrisisAPI {
  private axios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async sendMessage(
    message: string, 
    conversationHistory: Message[] = []
  ): Promise<CrisisResponse> {
    try {
      const response = await this.axios.post<CrisisResponse>('/api/crisis-chat', {
        message,
        conversationHistory: conversationHistory.slice(-10) // Last 10 messages for context
      });
      
      return response.data;
    } catch (error) {
      console.error('Crisis API error:', error);
      
      // Fallback response if API fails
      return {
        message: "I'm having trouble connecting right now, but I'm still here for you. If this is an emergency, please call 988 or 911. What's happening?",
        urgency: 'error',
        fallback: true,
        actions: ['call_988', 'call_911']
      };
    }
  }

  async getNearbyResources(
    latitude: number,
    longitude: number,
    type: 'shelters' | 'mental_health' | 'food' | 'medical'
  ): Promise<NearbyResources> {
    try {
      const response = await this.axios.post<NearbyResources>('/api/resources/nearby', {
        latitude,
        longitude,
        type
      });
      
      return response.data;
    } catch (error) {
      console.error('Resources API error:', error);
      
      // Return default Bowery Mission as fallback
      return {
        resources: [{
          name: "The Bowery Mission",
          address: "227 Bowery, New York, NY 10002",
          phone: "(212) 226-6214",
          services: ["Emergency Services Available"]
        }]
      };
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await this.axios.get('/health');
      return response.data.status === 'healthy';
    } catch {
      return false;
    }
  }
}

export default new CrisisAPI();