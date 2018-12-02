const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

const getDataIdFromObject = ({ id, __typename }) => `${__typename}:${id}`;

const isObject = item => typeof item === 'object' && item !== null;

const isApolloObject = item => item && item.id && item.__typename;

const extractIdsFromData = data => {
  return Object.values(data).reduce((collectedIds, item) => {
    let extractedIds = [];

    if (isApolloObject(item)) {
      extractedIds = [getDataIdFromObject(item)];
    } else if (Array.isArray(item) || isObject(item)) {
      extractedIds = extractIdsFromData(item);
    }

    return [...collectedIds, ...extractedIds];
  }, []);
};

export const getAllByType = ({ data, type }) => {
  return Object.entries(data)
    .filter(([key]) => key.indexOf(`${type}:`) === 0)
    .map(([, value]) => value);
};

export const extractIdsToRemove = ({ prevData, nextData }) => {
  const prevIds = extractIdsFromData(prevData);
  const nextIds = extractIdsFromData(nextData);

  return difference(prevIds, nextIds);
};
