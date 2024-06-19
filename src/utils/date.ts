import { Dayjs } from "dayjs";

/**
 * Split month to the minimum parts with the given range. The last part may have more days than the others.
 * @param date
 * @param range
 * @example splitMonthToParts(dayjs("2022-01-01"), 4); => [[1, 4], [5, 8], [9, 12], [13, 16], [17, 20], [21, 31]]
 */
const splitMonthToParts = (date: Dayjs, range: number): [Dayjs, Dayjs][] => {
  const days = date.daysInMonth();
  const parts = Math.floor(days / range);
  const firstDate = date.startOf("month");

  const result = Array.from({ length: parts }, (_, index) => {
    const startDay = index * range + 1;
    let endDay = (index + 1) * range;

    if (index === parts - 1) {
      endDay = days;
    }

    return [firstDate.date(startDay), firstDate.date(endDay)];
  });

  return result as [Dayjs, Dayjs][];
};

const getRangeByDate = (parts: [Dayjs, Dayjs][], date: Dayjs): [Dayjs, Dayjs] => {
  const index = parts.findIndex(
    ([first, last]) => date.isBetween(first, last) || date.isSame(first) || date.isSame(last),
  );
  return parts[index] ?? parts[0];
};

export { getRangeByDate, splitMonthToParts };
