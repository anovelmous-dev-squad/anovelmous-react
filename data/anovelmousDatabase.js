import moment from 'moment';

const VIEWER_ID = 1;

const me = {
  id: '1',
  name: 'Me',
  novels: ['1', '2'],
  vocabulary: ['1', '2', '3', '4', '5'],
  votes: ['1']
};

const iToken = {
  id: '1',
  content: 'I',
  isPunctuation: false,
  addedAt: '2015-02-12T01:03:14.046431Z'
};

const am = {
  id: '2',
  content: 'am',
  isPunctuation: false,
  addedAt: '2015-02-12T01:03:14.146431Z'
};

const finished = {
  id: '3',
  content: 'finished',
  isPunctuation: false,
  addedAt: '2015-02-12T01:03:14.246431Z'
};

const period = {
  id: '4',
  content: '.',
  isPunctuation: true,
  addedAt: '2015-02-12T01:03:14.346431Z'
};

const not = {
  id: '5',
  content: 'not',
  isPunctuation: false,
  addedAt: '2015-02-12T01:03:14.446431Z'
};

const chapterOne = {
  id: '1',
  title: 'Chapter One',
  tokens: ['1', '2', '3', '4'],
  votingDuration: 10,
  prevVotingEndedAt: moment().startOf('day')
};

const chapterOneDos = {
  id: '2',
  title: 'Chapter 1',
  tokens: ['5'],
  votingDuration: 10,
  prevVotingEndedAt: moment().startOf('hour')
};

const chapterTwo = {
  id: '3',
  title: 'Chapter 2',
  tokens: ['1', '2'],
  votingDuration: 15,
  prevVotingEndedAt: moment().format()
};

const oldNovel = {
  id: '1',
  title: 'Old Novel',
  chapters: ['1']
};

const liveNovel = {
  id: '2',
  title: 'Live Novel',
  chapters: ['2', '3']
};

const firstVote = {
  id: '1',
  chapter: '1',
  contributor: `${VIEWER_ID}`,
  token: '1',
  ordinal: 0,
  selected: false,
  createdAt: moment().startOf('day')
};

const stan = {
  id: '1',
  firstName: 'Stan',
  lastName: 'Lee',
  bio: 'A cool guy from this book',
  novel: '2'
};

const nyc = {
  id: '1',
  name: 'New York City',
  description: 'The city that never sleeps.',
  novel: '2'
};

const data = {
  Novel: {
    1: oldNovel,
    2: liveNovel
  },
  Chapter: {
    1: chapterOne,
    2: chapterOneDos,
    3: chapterTwo
  },
  Token: {
    1: iToken,
    2: am,
    3: finished,
    4: period,
    5: not
  },
  Vote: {
    1: firstVote
  },
  Contributor: {
    1: me
  },
  Character: {
    1: stan
  },
  Place: {
    1: nyc
  }
};

export const getNovel = (id) => {
  return data.Novel[id];
};

export const getNovels = () => {
  return Object.keys(data.Novel).map(id => data.Novel[id]);
};

export const getChapter = (id) => {
  return data.Chapter[id];
};

export const getMostRecentChapter = () => {
  return data.Chapter[3];
};

export const getToken = (id) => {
  return data.Token[id];
};

export const getTokensForChapter = (chapterId) => {
  const tokenIds = data.Chapter[chapterId].tokens;
  return tokenIds.map(id => data.Token[parseInt(id, 10)]);
};

export const getViewer = () => {
  return data.Contributor[VIEWER_ID];
};

export const getVote = (id) => {
  return data.Vote[id];
};

export const getVotes = () => {
  return Object.keys(data.Vote).map(id => data.Vote[id]);
};

export const getVocabulary = () => {
  return Object.keys(data.Token).map(id => data.Token[id]);
};

export const getCharacter = (id) => data.Character[id];

export const getCharacters = () => {
  return Object.keys(data.Character).map(id => data.Character[id]);
};


/* Mutative */

const addNewInstance = (type, instance) => {
  const typeIds = Object.keys(data[type]);
  const newId = typeIds.sort()[typeIds.length - 1] + 1;
  const instanceWithId = Object.assign(instance, {id: newId});
  data[type][newId] = instanceWithId;
  return newId;
};

export const castVote = (token, chapter, ordinal) => {
  const newVote = {
    token: token.id,
    contributor: getViewer(),
    chapter: chapter.id,
    ordinal,
    selected: false,
    createdAt: moment()
  };
  return addNewInstance('Vote', newVote);
};

export const createCharacter = (firstName, lastName, bio, novel) => {
  const newCharacter = {
    firstName,
    lastName,
    bio,
    novel: novel.id
  };
  return addNewInstance('Character', newCharacter);
};

export const createPlace = (name, description, novel) => {
  const newPlace = {
    name,
    description,
    novel: novel.id
  };
  return addNewInstance('Place', newPlace);
};
