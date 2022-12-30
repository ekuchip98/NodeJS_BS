import db from "../models/index";
import CURDService from "../services/CURDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CURDService.createNewUser(req.body);
  console.log(message);
  return res.send("crud.ejs");
};

let displayGetCRUD = async (req, res) => {
  let data = await CURDService.getAllUser();
  return res.render("displayCRUD", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CURDService.getUserInfoById(userId);
    if (userData) {
      return res.render("editCRUD.ejs", {
        userData: userData,
      });
    }
  } else {
    return res.send("User not found!");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CURDService.updateUserData(data);
  return res.render("displayCRUD", {
    dataTable: allUser,
  });
};
let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let allUser = await CURDService.deleteUserData(userId);
    return res.render("displayCRUD", {
      dataTable: allUser,
    });
  } else {
    return res.send("User not found!");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
