import FileSaver from 'file-saver';

export const exportFile = ({ filename, payload }) => {
  const jsonExportPayload = JSON.stringify(payload, null, '  ');
  const blob = new Blob([jsonExportPayload], {
    type: 'application/json;charset=utf-8'
  });

  FileSaver.saveAs(blob, `${filename}.json`);
};

export const importFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      try {
        const result = JSON.parse(event.target.result);

        resolve(result);
      } catch (err) {
        reject(new Error('Broken JSON file'));
      }
    };
    reader.onerror = reject;

    reader.readAsText(file, 'utf-8');
  });
};
