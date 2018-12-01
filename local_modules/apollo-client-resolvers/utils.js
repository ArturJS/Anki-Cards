const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

const getDataIdFromObject = ({ id, __typename }) => `${__typename}:${id}`;

const extractIdsFromData = data => {
  return Object.values(data).reduce((collectedIds, item) => {
    if (Array.isArray(item)) {
      return [...collectedIds, ...extractIdsFromData(item)];
    } else if (item && item.id && item.__typename) {
      return [...collectedIds, getDataIdFromObject(item)];
    }

    return collectedIds;
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
