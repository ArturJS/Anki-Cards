const localStorageMock = (function() {
  let store = {};

  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => (store[key] = JSON.stringify(value)),
    clear: () => (store = {})
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
