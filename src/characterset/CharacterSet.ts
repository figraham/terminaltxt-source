import { stringify } from "querystring";

/**
 * For creating, loading, and saving terminal character sets.
 * 
 * ## string based constructor
 * 
 * String of characters that will be converted to a set. No separator characters.
 * 
 * ```ts
 * const example: CharacterSet = new CharacterSet(' .:-=+*#%@');
 * ```
 * 
 * ## number[] based constructor
 * 
 * Use a set that has already been converted to UTF-16.
 * 
 * ```ts
 * const example: CharacterSet = new CharacterSet([32, 46, 58, 45, 61, 43, 42, 35, 37, 64]);
 * ```
 * 
 * Notes:
 * - In some cases order matters, so keep that in mind.
 * - You must include a space (32 in UTF-16) in the constructor for it to be included in the set.
 * 
 */ // TODO write class // TODO add unknown example // TODO add see to set used in example
export class CharacterSet {

  /**
   * A set of characters stored as UTF-16 numbers.
   */
  public set: number[];

  /**
   * A number representing the UTF-16 code of the character to use if not in set.
   */
  public unknown: number;

  /**
   * @param characters 
   * @param unknown
   *//**
   * @param set
   * @param unknown
   */
  constructor(characters: string, unknown?: string | number)
  constructor(set: number[], unknown?: string | number)
  constructor(argument: string | number[], unknown?: string | number) {

    if (typeof argument === 'string') {
      const set: number[] = [];
      for (let i: number = 0; i < argument.length; i++) {
        const code: number = argument.charCodeAt(i);
        if (set.indexOf(code) === -1) {
          set.push(code);
        }
      }
      this.set = set;
    } else {
      // TODO consider adding some checks
      this.set = argument;
    }

    if (!unknown) {
      this.unknown = '�'.charCodeAt(0);
    } else {
      if (typeof unknown === 'string') {
        this.unknown = unknown.charCodeAt(0);
      } else {
        this.unknown = unknown;
      }
    }

  }

}