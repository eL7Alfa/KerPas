const base64: (
  file: Blob | File,
  cb?: (arg0: string | ArrayBuffer | null) => void,
) => void = (
  file: Blob | File,
  cb: (arg0: string | ArrayBuffer | null) => void = () => {},
) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
};

export default base64;
