
import { useState, useEffect } from 'react';

// Define the interface for the category data structure from the API
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// The hook will return the state of the fetch operation
interface UseCategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

/**
 * A custom hook to fetch categories from the backend API.
 * Manages loading and error states automatically.
 * @returns {UseCategoriesState} An object containing categories, loading status, and error message.
 */
export const useCategories = (): UseCategoriesState => {
  const [state, setState] = useState<UseCategoriesState>({
    categories: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Define the async function to fetch data
    const fetchCategories = async () => {
      try {
        // Fetch from the backend API via the Vite proxy
        // This relative URL will be intercepted by the proxy and forwarded to http://localhost:3001
        const response = await fetch("/api/categories");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // The API returns an object like { data: [...] }, so we extract the 'data' property
        setState({ categories: result.data, loading: false, error: null });

      } catch (e: any) {
        // If an error occurs, update the state
        setState({ categories: [], loading: false, error: e.message });
        console.error("Failed to fetch categories:", e);
      }
    };

    // Call the function
    fetchCategories();

  }, []); // The empty dependency array ensures this effect runs only once

  // Return the complete state
  return state;
};
