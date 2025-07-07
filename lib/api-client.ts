import { User, Thing } from "../types/api";
import { CORS_PROXY_URL } from "./constants";

// load env variables
const isMockData = process.env.NEXT_PUBLIC_MOCK_DATA === "true";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(`Error ${status}: ${message}`);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`);
  }
  if (response.status === 204) {
    return null as T;
  }
  return response.json();
}

// Create a wrapper function for fetch that uses the CORS proxy when needed
async function fetchWithFallback(url: string, options: RequestInit = {}) {
  try {
    // First try direct fetch
    console.log(`Attempting direct fetch to: ${url}`);
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Direct fetch failed with status: ${response.status}`);
    }
    
    return response;
  } catch (error: unknown) {
    console.warn('Direct fetch failed, trying CORS proxy:', error);
    
    // If direct fetch fails, try with CORS proxy
    const proxyUrl = `${CORS_PROXY_URL}?url=${encodeURIComponent(url)}`;
    console.log(`Attempting proxy fetch to: ${proxyUrl}`);
    
    // Create a new options object for the proxy request
    // The proxy will handle credentials internally
    const proxyOptions: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    try {
      const proxyResponse = await fetch(proxyUrl, proxyOptions);
      
      if (!proxyResponse.ok) {
        throw new Error(`Proxy fetch failed with status: ${proxyResponse.status}`);
      }
      
      return proxyResponse;
    } catch (proxyError: unknown) {
      console.error('Proxy fetch also failed:', proxyError);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const proxyErrorMessage = proxyError instanceof Error ? proxyError.message : String(proxyError);
      throw new Error(`Both direct and proxy fetches failed: ${errorMessage}, ${proxyErrorMessage}`);
    }
  }
}

export const apiClient = {
  // Get the status of the API
  async getStatus(): Promise<any> {
    const response = await fetchWithFallback(`${baseUrl}/status`);
    return handleResponse(response);
  }, 

  // Check if a user exists by UID
  async getUser(uid: string): Promise<User | null> {
    console.log("baseUrl", baseUrl);
    const response = await fetchWithFallback(`${baseUrl}/api/v1/users/${uid}`);
    console.log("my response", response)

    if (response.status === 204) {
      return null; // Return null if the user is not found (204 No Content)
    }

    if (!response.ok) {
      return null; // Return null for other error cases
    }

    return handleResponse<User>(response);
  },

  // Get all users
  async getAllUsers(): Promise<User[]> {
    console.log("baseUrl", baseUrl);
    const response = await fetchWithFallback(`${baseUrl}/api/v1/users`);
    return handleResponse<User[]>(response);
  },

  // Get maximum user ID
  async getMaxUserId(): Promise<number> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/users/max-id`);
    return handleResponse<number>(response);
  },

  // Create a new user
  async createUser(user: Omit<User, 'user_id'> & { user_id: number }): Promise<User> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return handleResponse<User>(response);
  },

  // Update an existing user
  async updateUser(userId: number, user: Partial<User>): Promise<void> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return handleResponse<void>(response);
  },

  // Delete a user
  async deleteUser(userId: number): Promise<void> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/users/${userId}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },

  // Get all things
  async getThings(): Promise<Thing[]> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/things`);
    return handleResponse<Thing[]>(response);
  },

  // Get a specific thing by ID
  async getThing(id: number): Promise<Thing | null> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/things/${id}`);

    if (!response.ok) {
      return null; // Return null if the thing is not found or an error occurs
    }

    return handleResponse<Thing>(response);
  },

  // Create a new thing
  async createThing(thing: Omit<Thing, 'id'>): Promise<Thing> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/things`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thing),
    });
    return handleResponse<Thing>(response);
  },

  // Update an existing thing
  async updateThing(id: number, thing: Partial<Thing>): Promise<void> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/things/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thing),
    });
    return handleResponse<void>(response);
  },

  // Delete a thing
  async deleteThing(id: number): Promise<void> {
    const response = await fetchWithFallback(`${baseUrl}/api/v1/things/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },
}