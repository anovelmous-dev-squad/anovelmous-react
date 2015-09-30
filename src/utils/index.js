import moment from 'moment';

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
