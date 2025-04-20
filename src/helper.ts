export function getDaysInYear(year: number=new Date().getFullYear()) {
    return isLeapYear(year) ? 366 : 365
}

function isLeapYear(year: number) {
    return (year%4 === 0 && year%100 !== 0) || (year%400 === 0)
}

export function getDaysPassInYear(): number {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1); // Jan 1 of current year
  
    const msInDay = 1000 * 60 * 60 * 24;
    const diffInMs = today.getTime() - startOfYear.getTime();
  
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