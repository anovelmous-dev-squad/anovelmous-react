import moment from 'moment';

const VIEWER_ID = 1;

const me = {
  id: '1',
  name: 'Me',
  novels: ['1', '2'],
  vocabulary: ['1', '2', '3', '4', '5'],
  votes: ['1'],
  plots: ['1'],
  characters: ['1'],
  places: ['1'],
  plotItems: ['1']
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
  prevVotingEndedAt: moment().startOf('day'),
  isComplete: true
};

const chapterOneDos = {
  id: '2',
  title: 'Chapter 1',
  tokens: ['5'],
  votingDuration: 10,
  prevVotingEndedAt: moment().startOf('hour'),
  isComplete: true
};

const chapterTwo = {
  id: '3',
  title: 'Chapter 2',
  tokens: ['1', '2'],
  votingDuration: 15,
  prevVotingEndedAt: moment().format(),
  isComplete: false
};

const oldNovel = {
  id: '1',
  title: 'Old Novel',
  chapters: ['1'],
  stage: '6'
};

const liveNovel = {
  id: '2',
  title: 'Live Novel',
  chapters: ['2', '3'],
  stage: '5'
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

const scepter = {
  id: '1',
  name: 'Abacaderon Scepter',
  description: 'Transmogrifies foes',
  novel: '2'
};

const magicianTale = {
  id: '1',
  summary: 'A magician turns a rat into a human friend.',
  novel: '1'
};

const brainstorming = {
  id: '1',
  name: 'BRAINSTORMING',
  description: 'Period before producing plot summaries.',
  ordinal: 0,
  duration: '1 day'
};

const plotSummary = {
  id: '2',
  name: 'PLOT SUMMARY',
  description: 'Submit and vote on your favorite plots.',
  ordinal: 1,
  duration: '1 day'
};

const structureCreation = {
  id: '3',
  name: 'STRUCTURE CREATION',
  description: 'Submit and vote on your favorite people, places, and things.',
  ordinal: 2,
  duration: '1 day'
};

const titleDecision = {
  id: '4',
  name: 'TITLE DECISION',
  description: 'Submit and vote on a title for the novel.',
  ordinal: 3,
  duration: '6 hours'
};

const writing = {
  id: '5',
  name: 'WRITING',
  description: 'Word-by-word contributing stage',
  ordinal: 4,
  duration: '2 weeks'
};

const finishedStage = {
  id: '6',
  name: 'FINISHED',
  description: 'Novel is a finished creation',
  ordinal: 5,
  duration: 'N/A'
};

const data = {
  Novel: {
    1: oldNovel,
    2: liveNovel
  },
  Stage: {
    1: brainstorming,
    2: plotSummary,
    3: structureCreation,
    4: titleDecision,
    5: writing,
    6: finishedStage
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
  },
  PlotItem: {
    1: scepter
  },
  Plot: {
    1: magicianTale
  }
};

const getAllOfType = (type) => {
  return Object.keys(data[type]).map(id => data[type][id]);
};

export const getNovel = (id) => data.Novel[id];

export const getNovels = () => getAllOfType('Novel');

export const getStage = (id) => data.Stage[parseInt(id, 10)];

export const getChapter = (id) => data.Chapter[id];

export const getMostRecentChapter = () => data.Chapter[3];

export const getToken = (id) => data.Token[id];

export const getTokensForChapter = (chapterId) => {
  const tokenIds = data.Chapter[chapterId].tokens;
  return tokenIds.map(id => data.Token[parseInt(id, 10)]);
};

export const getViewer = () => data.Contributor[VIEWER_ID];

export const getVote = (id) => data.Vote[id];

export const getVotes = () => getAllOfType('Vote');

export const getVocabulary = () => getAllOfType('Token');

export const getPlot = (id) => data.Plot[id];

export const getPlots = () => getAllOfType('Plot');

export const getCharacter = (id) => data.Character[id];

export const getCharacters = () => getAllOfType('Character');

export const getPlace = (id) => data.Place[id];

export const getPlaces = () => getAllOfType('Place');

export const getPlotItem = (id) => data.PlotItem[id];

export const getPlotItems = () => getAllOfType('PlotItem');

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
  const character = {
    firstName,
    lastName,
    bio,
    novel: novel.id
  };
  const characterId = addNewInstance('Character', character);
  data.Contributor[VIEWER_ID].characters.push(characterId);
  return characterId;
};

export const createPlace = (name, description, novel) => {
  const place = {
    name,
    description,
    novel: novel.id
  };
  const placeId = addNewInstance('Place', place);
  data.Contributor[VIEWER_ID].places.push(placeId);
  return placeId;
};

export const createPlotItem = (name, description, novel) => {
  const plotItem = {
    name,
    description,
    novel: novel.id
  };
  const plotItemId = addNewInstance('PlotItem', plotItem);
  data.Contributor[VIEWER_ID].plotItems.push(plotItemId);
  return plotItemId;
};

export const createPlot = (summary, novel) => {
  const plot = {
    summary,
    novel: novel.id
  };
  const plotId = addNewInstance('Plot', plot);
  data.Plot[VIEWER_ID].plots.push(plotId);
  return plotId;
};
