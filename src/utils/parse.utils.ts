const parseUtils = {
  duration(durationStr: string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (!match) throw new Error('Invalid duration string');
    const [, value, unit] = match;
    const valueNum = parseInt(value);
    switch (unit) {
      case 'ms': return valueNum;
      case 's': return valueNum * 1000;
      case 'm': return valueNum * 60000;
      case 'h': return valueNum * 3600000;
    };
  },
};

export { parseUtils };
