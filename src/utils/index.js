import moment from 'moment';

export const computeRemainingVotingTime = (start, duration) => {
  const timeElapsed = moment(start).fromNow();
  return duration - timeElapsed;
};
