import { extractIdsToRemove, getAllByType } from './utils';

// todo implement: read operation (by: matcherFn)
export const createReaderResolver = ({ idField, typename }) => (
  _,
  variables,
  { cache }
) => {
  const allItems = getAllByType({ data: cache.data.data, type: typename });

  if (!variables || !variables[idField]) {
    return allItems;
  }

  const id = variables[idField];

  return allItems.filter(item => item[idField] === id);
};

export const createWriterResolver = ({
  selector = ({ cacheData }) => cacheData,
  updater
}) => (_, variables, { cache }) => {
  const selectedData = selector({
    cacheData: cache.data.data,
    variables
  });
  const updatePayload = updater({ selectedData, variables });
  const shouldAvoidUpdate = !updatePayload;

  if (shouldAvoidUpdate) {
    return;
  }

  const {
    query: queryToUpdate,
    data: nextData,
    variables: queryVariables
  } = updatePayload;
  let prevData = {};

  try {
    prevData = cache.readQuery({
      query: queryToUpdate,
      variables: queryVariables
    });
  } catch (error) {
    const isAbsentQueryInCache =
      error.message.indexOf(`Can't find field`) === 0;

    if (!isAbsentQueryInCache) {
      console.error(error);
    }
  }

  cache.writeQuery({
    query: queryToUpdate,
    variables: queryVariables,
    data: nextData
  });

  extractIdsToRemove({ prevData, nextData }).forEach(dataId => {
    cache.data.delete(dataId);
  });

  return null;
};

/**
 * Currently it works only for mutations
 */
export const combineResolvers = resolves => (_, variables, { cache }) => {
  resolves.forEach(resolver => {
    resolver(_, variables, { cache });
  });

  return null;
};
