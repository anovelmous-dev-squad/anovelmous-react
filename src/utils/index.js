import moment from 'moment';

export const isPrewriting = (novel) => {
  return !(novel.stage.name === 'WRITING' || novel.stage.name === 'FINISHED');
};

/* Returns the remaining voting time in seconds */
export const getRemainingVotingTime = (start, duration) => {
  const startTimestamp = moment(start).unix();
  const secondsElapsed = moment().unix() - startTimestamp;
  if (__DEBUG__ && secondsElapsed > duration) { // mock objects mean no live voting, yet
    const modSecondsElapsed = secondsElapsed % duration;
    return duration - modSecondsElapsed;
  }
  return duration - secondsElapsed;
};

export const getVotingRoundProgress = (start, duration) => {
  const secondsRemaining = getRemainingVotingTime(start, duration);
  return {
    percentComplete: (1 - (secondsRemaining / duration)) * 100,
    secondsRemaining: secondsRemaining
  };
};

export const hexToRgb = (hex) => {
  // Adapted from http://stackoverflow.com/a/5624139/4418536
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const newHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
