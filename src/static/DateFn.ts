import ptBR from "date-fns/locale/pt-BR";
import { toDate as toDateFns } from "date-fns-tz";
import { format as formatDate } from "date-fns";

export const timeZone = "America/Bahia";

const defaultOptions = {
  locale: ptBR,
  timeZone,
};

export function toDate(date?: string | Date): Date {
  const newDate = toDateFns(date || new Date(), defaultOptions);

  return newDate;
}

type PresetPattern = "dd-MM" | "dd-MM-yyyy";

interface FormatOptions {
  locale?: any;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}

export function format(
  date: string | Date,
  pattern: PresetPattern | string,
  options?: FormatOptions
): string {
  const newDate = toDate(date);

  return formatDate(newDate, pattern, { locale: ptBR, ...options });
}
