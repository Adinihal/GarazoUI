/**
 * Utility functions for common operations
 */

/**
 * Checks if a value is null or undefined
 * @param value - The value to check
 * @returns true if the value is null or undefined, false otherwise
 */
export const isNull = (value: any): boolean => {
  return value === null || value === undefined;
};

/**
 * Checks if a value is null, undefined, or empty (for arrays and strings)
 * @param value - The value to check
 * @returns true if the value is null, undefined, or empty
 */
export const isNullOrEmpty = (value: any): boolean => {
  if (isNull(value)) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
};

/**
 * Checks if a value is not null and not undefined
 * @param value - The value to check
 * @returns true if the value is not null and not undefined
 */
export const isNotNull = (value: any): boolean => {
  return !isNull(value);
};