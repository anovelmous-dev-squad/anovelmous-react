const me = {
  id: '1',
  name: 'Me'
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

const firstNToken = {
  id: '1',
  token: '1'
};

const secondNToken = {
  id: '2',
  token: '2'
};

const thirdNToken = {
  id: '3',
  token: '3'
};

const fourthNToken = {
  id: '4',
  token: '4'
};

const fifthNToken = {
  id: '5',
  token: '1'
};

const sixthNToken = {
  id: '6',
  token: '2'
};

const seventhNToken = {
  id: '7',
  token: '5'
};

const firstFNToken = {
  id: '1',
  content: 'I'
};

const secondFNToken = {
  id: '2',
  content: 'am'
};

const thirdFNToken = {
  id: '3',
  content: 'finished.'
};

const fourthFNToken = {
  id: '4',
  content: 'I'
};

const fifthFNToken = {
  id: '5',
  content: 'am'
};

const sixthFNToken = {
  id: '6',
  content: 'not'
};

const chapterOne = {
  id: '1',
  title: 'Chapter One',
  tokens: ['1', '2', '3', '4'],
  text: ['1', '2', '3']
};

const chapterOneDos = {
  id: '2',
  title: 'Chapter 1',
  tokens: ['5'],
  text: ['4']
};

const chapterTwo = {
  id: '3',
  title: 'Chapter 2',
  tokens: ['6'],
  text: ['5']
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
  contributor: '1',
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
  NovelToken: {
    1: firstNToken,
    2: secondNToken,
    3: thirdNToken,
    4: fourthNToken,
    5: fifthNToken,
    6: sixthNToken,
    7: seventhNToken
  },
  FormattedNovelToken: {
    1: firstFNToken,
    2: secondFNToken,
    3: thirdFNToken,
    4: fourthFNToken,
    5: fifthFNToken,
    6: sixthFNToken
  },
  Vote: {
    1: firstVote
  },
  Contributor: {
    1: me
  }
};

export function getNovel (id) {
  return data.Novel[id];
}

export function getNovels () {
  return [data.Novel[1], data.Novel[2]];
}

export function getLiveNovel () {
  return data.Novel[2];
}

export function getChapter (id) {
  return data.Chapter[id];
}

export function getNovelToken(id) {
  return data.NovelToken[id];
}

export function getFormattedNovelToken(id) {
  return data.FormattedNovelToken[id];
}

export function getContributor(id) {
  return data.Contributor[id];
}
