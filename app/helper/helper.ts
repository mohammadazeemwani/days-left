export function getDaysInYear(year: number) {
    return isLeapYear(year) ? 366 : 365
}

function isLeapYear(year: number) {
    return (year%4 === 0 && year%100 !== 0) || (year%400 === 0)
}

export function getDaysLeftInYear(): number {
    const today = new Date();
    const endOfYear = new Date(today.getFullYear(), 11, 31); // Dec 31 of current year
  
    const msInDay = 1000 * 60 * 60 * 24;
    const diffInMs = endOfYear.getTime() - today.getTime();
  
    return Math.ceil(diffInMs / msInDay);
  }

export function range(start: number, end: number, step = 1) {
    let output = [];
  
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }
  
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
  
    return output;
  };