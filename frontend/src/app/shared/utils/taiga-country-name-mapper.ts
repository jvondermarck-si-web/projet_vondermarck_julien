import {TuiCountryIsoCode} from "@taiga-ui/i18n";


/**
 * Maps the country iso codes to country names
 * @param isoCodes Array of country ISO codes
 * @param countryNames Object mapping country ISO codes to country names
 * @returns Array of country names
 */
export function mapCountryNames(isoCodes: TuiCountryIsoCode[], countryNames: Record<TuiCountryIsoCode, string>): string[] {
  return isoCodes.map(code => countryNames[code]);
}
