const me = {
  id: '1',
  name: 'Me'
};

const firstNToken = {
  id: '1',
  content: 'I'
};

const secondNToken = {
  id: '2',
  content: 'am'
};

const thirdNToken = {
  id: '3',
  content: 'finished.'
};

const fourthNToken = {
  id: '4',
  content: 'I'
};

const fifthNToken = {
  id: '5',
  content: 'am'
};

const sixthNToken = {
  id: '6',
  content: 'not'
};

const chapterOne = {
  id: '1',
  title: 'Chapter One',
  formattedNovelTokens: ['1', '2', '3']
};

const chapterOneDos = {
  id: '2',
  title: 'Chapter 1',
  formattedNovelTokens: ['4']
};

const chapterTwo = {
  id: '3',
  title: 'Chapter 2',
  formattedNovelTokens: ['5']
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
  FormattedNovelToken: {
    1: firstNToken,
    2: secondNToken,
    3: thirdNToken,
    4: fourthNToken,
    5: fifthNToken,
    6: sixthNToken
  },
  Contributor: {
    1: me
  }
};

export function getLiveNovel () {
  return data.Novel[2];
}

export function getNovel (id) {
  return data.Novel[id];
}

export function getNovels () {
  return [data.Novel[1], data.Novel[2]];
}

export function getChapter (id) {
  return data.Chapter[id];
}

export function getContributor(id) {
  return data.Contributor[id];
}
