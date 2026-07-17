export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencyCode: string;
}

export const COUNTRIES: Country[] = [
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX', currencyCode: 'UGX' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', currencyCode: 'KES' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currency: 'TZS', currencyCode: 'TZS' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', currencyCode: 'NGN' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', currencyCode: 'ZAR' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencyCode: 'USD' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencyCode: 'GBP' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencyCode: 'CAD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', currencyCode: 'AUD' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', currencyCode: 'INR' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', currencyCode: 'CNY' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencyCode: 'JPY' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', currencyCode: 'KRW' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', currencyCode: 'EUR' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencyCode: 'EUR' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', currencyCode: 'EUR' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', currencyCode: 'BRL' },
] as const;

export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES.find((c) => c.code === code);
};