export interface IStringObject {
  /**
   * A dictionary object with string keys and string values.
   * 
   * @remarks
   * This allows specifying any key-value pairs where the keys and values are both of type string.
   * The keys can be of any string type, and the values must be of string type.
   */
  [key: string]: string;
}

/**
 * Represents the cache strategy options for an HTTP request.
 */
export type TCacheStrategy = "NO-CACHE" | "PER-SESSION" | "RELOAD";

