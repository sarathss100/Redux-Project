const homePage = function (req, res) {
  res.status(200).json({ message: `Home Page` });
};

export default homePage;
