// Mock data for frontend-only development
export const mockUser = {
  id: "mock-user-id",
  email: "dev@example.com",
  fullName: "Development User",
  role: "admin",
  is_verified: true,
};

export const mockChatSessions = [
  {
    id: "mock-session-1",
    description: "Mock chat session 1",
    time_created: new Date().toISOString(),
    time_updated: new Date().toISOString(),
  },
  {
    id: "mock-session-2", 
    description: "Mock chat session 2",
    time_created: new Date(Date.now() - 86400000).toISOString(),
    time_updated: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const mockAssistants = [
  {
    id: 1,
    name: "General Assistant",
    description: "A helpful general assistant",
    is_visible: true,
    builtin_persona: true,
    display_priority: 1,
  },
  {
    id: 2,
    name: "Technical Support",
    description: "Specialized in technical questions",
    is_visible: true,
    builtin_persona: false,
    display_priority: 2,
  },
];

export const mockCCPairs = [
  {
    id: 1,
    name: "Mock Confluence",
    source: "confluence",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Mock Google Drive",
    source: "google_drive", 
    status: "ACTIVE",
  },
];

export const mockDocumentSets = [
  {
    id: 1,
    name: "Mock Document Set 1",
    description: "A mock document set for testing",
    is_public: true,
  },
  {
    id: 2,
    name: "Mock Document Set 2", 
    description: "Another mock document set",
    is_public: false,
  },
];

export const mockFolders = [
  {
    id: 1,
    name: "Mock Folder 1",
    description: "A mock folder for testing",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Mock Folder 2",
    description: "Another mock folder",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const mockTags = [
  { id: 1, tag_key: "category", tag_value: "technical" },
  { id: 2, tag_key: "category", tag_value: "general" },
  { id: 3, tag_key: "priority", tag_value: "high" },
];

export const mockLLMProviders = [
  {
    id: 1,
    name: "OpenAI",
    provider: "openai",
    default_model_name: "gpt-3.5-turbo",
    is_default_provider: true,
  },
  {
    id: 2,
    name: "Anthropic",
    provider: "anthropic", 
    default_model_name: "claude-3-sonnet",
    is_default_provider: false,
  },
];

// Mock API responses
export const mockAPIResponses = {
  "/api/type": { auth_type: "disabled" },
  "/api/user": mockUser,
  "/api/chat/sessions": { sessions: mockChatSessions },
  "/api/manage/admin/assistant": mockAssistants,
  "/api/manage/admin/connector-credential-pair": mockCCPairs,
  "/api/manage/admin/document-set": mockDocumentSets,
  "/api/user/folder": { folders: mockFolders },
  "/api/manage/admin/tag": { tags: mockTags },
  "/api/llm/provider": mockLLMProviders,
}; 