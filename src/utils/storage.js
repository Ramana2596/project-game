// Modular persistence utilities
// src/core/utils/storage.js

// Function: save data to localStorage
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error saving to storage", err);
  }
};

// Function: load data from localStorage (with default fallback)
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (err) {
    console.error("Error loading from storage", err);
    return defaultValue;
  }
};

// Function: clear specific key from localStorage
export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error clearing storage", err);
  }
};

// ❌ No sessionStorage or IndexedDB here — kept minimal for simplicity
// ❌ No verbose error handling — only console logs for clarity
