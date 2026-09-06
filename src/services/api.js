import { mockStandards, mockServices, mockLabs, sampleRAGSession } from './mockData';

// API Base URL - Configured for Python FastAPI backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Toggle between Mock Mode and Live FastAPI Backend
export const API_CONFIG = {
  useMock: false, // Default false to query live FastAPI backend; will auto-fallback on connection error
  baseUrl: API_BASE_URL
};

export const standardsApi = {
  // Search standards with query, category, and QCO filters
  async searchStandards({ query = '', category = 'all', qcoOnly = false, page = 1, limit = 10 }) {
    if (API_CONFIG.useMock) {
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
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/standards/${id}`);
      if (!response.ok) throw new Error('Failed to fetch standard');
      return await response.json();
    } catch (error) {
      console.warn('FastAPI unavailable, falling back to mock standard', error);
      const std = mockStandards.find(s => s.id === id || s.code === id);
      return { success: true, data: std || mockStandards[0] };
    }
  },

  // Get standard categories
  async getCategories() {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/standards/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      return { success: true, data: [] };
    }
  }
};

export const ragApi = {
  // Query RAG pipeline (FastAPI + Sentence-Transformers / Regulatory Engine)
  async queryAssistant({ query, category = '', location = '' }, token = null) {
    if (API_CONFIG.useMock) {
      await new Promise(r => setTimeout(r, 450));
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
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${API_CONFIG.baseUrl}/rag/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, category, location })
      });
      if (!response.ok) throw new Error('RAG query failed');
      return await response.json();
    } catch (error) {
      console.warn('FastAPI RAG endpoint error, using fallback RAG session', error);
      return { success: true, data: sampleRAGSession };
    }
  },

  // Get sample quick prompts
  async getSamplePrompts() {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/rag/prompts`);
      if (!response.ok) throw new Error('Failed to fetch prompts');
      return await response.json();
    } catch (error) {
      return { success: true, data: [] };
    }
  }
};

export const labsApi = {
  // Find accredited testing labs by standard, pincode, or state
  async getLabs({ standard = '', pincode = '', state = '', query = '' } = {}) {
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
      if (query) {
        const q = query.toLowerCase();
        labs = labs.filter(l => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q));
      }
      return { success: true, data: labs };
    }

    try {
      const params = new URLSearchParams({ standard, pincode, state, query });
      const response = await fetch(`${API_CONFIG.baseUrl}/labs?${params}`);
      if (!response.ok) throw new Error('Failed to fetch labs');
      return await response.json();
    } catch (error) {
      console.warn('FastAPI unavailable, using mock labs', error);
      return { success: true, data: mockLabs };
    }
  },

  // Get lab summary stats
  async getLabStats() {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/labs/stats/summary`);
      if (!response.ok) throw new Error('Failed to fetch lab stats');
      return await response.json();
    } catch (error) {
      return { success: true, data: { totalLabs: mockLabs.length, statesCovered: 18 } };
    }
  }
};

export const servicesApi = {
  async getServices() {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      return data.data || mockServices;
    } catch (error) {
      return mockServices;
    }
  },

  async verifyHuid(code) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/services/verify-huid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (!response.ok) throw new Error('HUID verification failed');
      return await response.json();
    } catch (error) {
      console.warn('FastAPI unavailable, evaluating offline HUID check', error);
      const clean = code.trim().toUpperCase();
      const invalidSet = new Set(['ZZ9999', '000000', 'XXXXXX', 'FAKE01']);
      const isFake = invalidSet.has(clean) || clean.length !== 6;
      
      return {
        success: true,
        data: isFake ? {
          valid: false,
          huidCode: clean,
          message: 'Unrecognized HUID token or unregistered jeweler record in BIS statutory hallmarking system.'
        } : {
          valid: true,
          huidCode: clean,
          jeweler: clean === 'KL8842' ? 'Kalyan Jewellers (Branch #502)' : 'Tanishq Jewellers (Branch #1042)',
          purity: clean === 'KL8842' ? '18K750 (75.0% Pure Gold)' : '22K916 (91.6% Pure Gold)',
          articleType: 'Gold Bangle / Ornament',
          hallmarkingCenter: 'Manak Assaying Centre, New Delhi',
          date: '14-Feb-2025',
          complianceStandard: 'IS 1417:2016'
        }
      };
    }
  }
};

export const authApi = {
  async login(email, password) {
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Login failed');
    }
    return await response.json();
  },

  async register(name, email, password, role = 'Manufacturer / Compliance Officer', persona_id = null) {
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, persona_id })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Registration failed');
    }
    return await response.json();
  },

  async getProfile(token) {
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  },

  async getPersonas() {
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/personas`);
    if (!response.ok) throw new Error('Failed to fetch personas');
    return await response.json();
  }
};
