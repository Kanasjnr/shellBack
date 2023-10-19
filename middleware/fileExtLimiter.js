const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];

    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    //ARE THE EXTENSIONS ALLOWED?
    const allowed = fileExtensions.every((extension) =>
      allowedExtArray.includes(extension)
    );

    if (!allowed) {
      const message =
        `Upload Failed. only ${allowedExtArray.toString()}  files allowed`.replaceAll(
          ",",
          ","
        );

      //UN PROCESSED CONTENTS

      return res.status(422).json({ status: "error", message });
    }
    next();
  };
};

module.exports = fileExtLimiter;
