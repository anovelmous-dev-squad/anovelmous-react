import moment from 'moment';

/* Returns the remaining voting time in seconds */
export const computeRemainingVotingTime = (start, duration) => {
  const startTimestamp = moment(start).unix();
  const secondsElapsed = moment().unix() - startTimestamp;
  if (__DEBUG__ && secondsElapsed > duration) { // mock objects mean no live voting, yet
    const modSecondsElapsed = secondsElapsed % duration;
    return duration - modSecondsElapsed;
  }
  return duration - secondsElapsed;
};

export const getVotingRoundPercentage = (start, duration) => {
  const remainingSeconds = computeRemainingVotingTime(start, duration);
  return (1 - (remainingSeconds / duration)) * 100;
};
