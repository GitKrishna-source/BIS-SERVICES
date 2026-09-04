import { mockStandards, mockServices, mockLabs, sampleRAGSession } from './mockData';

// API Base URL - Configured for Python FastAPI backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Toggle between Mock Mode and Live FastAPI Backend
export const API_CONFIG = {
  useMock: true, // Default true for standalone demo, set to false when FastAPI is running
  baseUrl: API_BASE_URL
};

export const standardsApi = {
  // Search standards with query, category, and QCO filters
  async searchStandards({ query = '', category = 'all', qcoOnly = false, page = 1, limit = 10 }) {
    if (API_CONFIG.useMock) {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 200));
      
      let results = [...mockStandards];
      if (query.trim()) {
        const q = query.toLowerCase();
        results = results.filter(s => 
          s.code.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
        );
      }
      
      if (category !== 'all') {
        results = results.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
      }
      
      if (qcoOnly) {
        results = results.filter(s => s.statusType === 'mandatory');
      }

      return {
        success: true,
        data: results,
        total: results.length,
        page,
        totalPages: Math.ceil(results.length / limit) || 1
      };
    }

    try {
      const params = new URLSearchParams({ q: query, category, qcoOnly, page, limit });
      const response = await fetch(`${API_CONFIG.baseUrl}/standards/search?${params}`);
      if (!response.ok) throw new Error('Failed to fetch standards');
      return await response.json();
    } catch (error) {
      console.warn('FastAPI unavailable, falling back to mock standards', error);
      return { success: true, data: mockStandards, total: mockStandards.length, page: 1, totalPages: 1 };
    }
  },

  // Get single standard by ID or IS code
  async getStandardById(id) {
    if (API_CONFIG.useMock) {
      const std = mockStandards.find(s => s.id === id || s.code === id);
      return { success: true, data: std || mockStandards[0] };
    }
    const response = await fetch(`${API_CONFIG.baseUrl}/standards/${id}`);
    return await response.json();
  }
};

export const ragApi = {
  // Query RAG pipeline (FastAPI + Sentence-Transformers + LLM)
  async queryAssistant({ query, category = '', location = '' }) {
    if (API_CONFIG.useMock) {
      await new Promise(r => setTimeout(r, 450));
      // Return enhanced sample RAG session adapted for query
      const dynamicSession = JSON.parse(JSON.stringify(sampleRAGSession));
      if (query) {
        dynamicSession.user.query = query;
      }
      return {
        success: true,
        data: dynamicSession
      };
    }

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/rag/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category, location })
      });
      if (!response.ok) throw new Error('RAG query failed');
      return await response.json();
    } catch (error) {
      console.warn('FastAPI RAG endpoint error, using fallback RAG session', error);
      return { success: true, data: sampleRAGSession };
    }
  }
};

export const labsApi = {
  // Find accredited testing labs by standard or pincode
  async getLabs({ standard = '', pincode = '', state = '' }) {
    if (API_CONFIG.useMock) {
      await new Promise(r => setTimeout(r, 150));
      let labs = [...mockLabs];
      if (standard) {
        labs = labs.filter(l => l.standards.some(s => s.toLowerCase().includes(standard.toLowerCase())));
      }
      if (pincode) {
        labs = labs.filter(l => l.pincode.startsWith(pincode.slice(0, 2)));
      }
      if (state) {
        labs = labs.filter(l => l.state.toLowerCase().includes(state.toLowerCase()));
      }
      return { success: true, data: labs };
    }

    const params = new URLSearchParams({ standard, pincode, state });
    const response = await fetch(`${API_CONFIG.baseUrl}/labs?${params}`);
    return await response.json();
  }
};

export const servicesApi = {
  getServices() {
    return mockServices;
  }
};
