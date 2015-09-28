const VIEWER_ID = 1;

const me = {
  id: '1',
  name: 'Me',
  novels: ['1', '2'],
  vocabulary: ['1', '2', '3', '4', '5'],
  votes: ['1']
};

const i = {
  id: '1',
  content: 'I',
  isPunctuation: false
};

const am = {
  id: '2',
  content: 'am',
  isPunctuation: false
};

const finished = {
  id: '3',
  content: 'finished',
  isPunctuation: false
};

const period = {
  id: '4',
  content: '.',
  isPunctuation: true
};

const not = {
  id: '5',
  content: 'not',
  isPunctuation: false
};

const chapterOne = {
  id: '1',
  title: 'Chapter One',
  tokens: ['1', '2', '3', '4']
};

const chapterOneDos = {
  id: '2',
  title: 'Chapter 1',
  tokens: ['5']
};

const chapterTwo = {
  id: '3',
  title: 'Chapter 2',
  tokens: ['1', '2']
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
  createdAt: 'a while ago'
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
    1: i,
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
  }
};

export const getNovel = (id) => {
  return data.Novel[id];
};

export const getNovels = () => {
  return Object.keys(data.Novel).map(k => data.Novel[k]);
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

export const getViewer = () => {
  return data.Contributor[VIEWER_ID];
};

export const getVote = (id) => {
  return data.Vote[id];
};

export const getVocabulary = () => {
  return Object.keys(data.Token).map(k => data.Token[k]);
};
