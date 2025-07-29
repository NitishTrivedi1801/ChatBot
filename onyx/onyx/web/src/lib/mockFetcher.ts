import { mockAPIResponses } from './mockData';

// Check if we should use mock data
const shouldUseMockData = () => {
  return process.env.NODE_ENV === 'development' && 
         process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

// Mock fetcher that intercepts API calls
export const mockFetcher = async <T>(url: string): Promise<T> => {
  if (!shouldUseMockData()) {
    // Fall back to real fetch
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Find matching mock response
  const mockResponse = mockAPIResponses[url as keyof typeof mockAPIResponses];
  
  if (mockResponse) {
    return mockResponse as T;
  }

  // Default mock response for unknown endpoints
  console.warn(`No mock data found for: ${url}, returning empty response`);
  return {} as T;
};

// Enhanced error handling fetcher with mock support
export const errorHandlingMockFetcher = async <T>(url: string): Promise<T> => {
  if (!shouldUseMockData()) {
    // Use the original error handling fetcher
    const response = await fetch(url);
    
    if (response.status === 403) {
      throw new Error('Authentication error');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Use mock data
  return mockFetcher<T>(url);
}; 