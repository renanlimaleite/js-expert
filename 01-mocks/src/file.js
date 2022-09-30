const { readFile } = require("fs/promises");
const User = require("./user");
const { error } = require("./constants");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

const File = () => {
  const csvToJson = async (filePath) => {
    const content = await getFileContent(filePath);

    // validar antes
    const validation = isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    const users = parseCSVToJSON(content);

    // return se estiver tudo válido
    return users;
  };

  const getFileContent = async (filePath) => {
    return (await readFile(filePath)).toString("utf8");
  };

  const isValid = (csvString, option = DEFAULT_OPTIONS) => {
    const [header, ...fileWithoutHeader] = csvString.split("\n");

    const isHeaderValid = header === option.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= option.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return {
      valid: true,
    };
  };

  const parseCSVToJSON = (csvString) => {
    const lines = csvString.split("\n");
    const firstLine = lines.shift();
    const header = firstLine.split(",");
    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      return User(user);
    });
    return users;
  };

  return {
    csvToJson,
    getFileContent,
  };
};

module.exports = File;
