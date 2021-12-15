const ProfileHelper = require('./ProfileHelper');
const AvatarHelper = require("../AvatarHelper");
const FolderHelper = require("../FolderHelper");

const auth2ProviderNameToCustomize = "studip"; //TODO change to your provider you want to adapt

/**
 * Example UserProfile from Studip
 {
  "user_id": "76ed43ef286fb55cf9e41beadb484a9f",
  "username": "root",
  "perms": "root",
  "email": "root@localhost",
  "name": {
    "family": "Studip",
    "given": "Root",
    "formatted": "Root Studip",
    "prefix": "",
    "username": "root@studip.com",
    "suffix": ""
  },
  "avatar_small": "https://studip.example.org/pictures/user/nobody_small.png?d=1476444962",
  "avatar_normal": "https://studip.example.org/pictures/user/nobody_normal.png?d=1476444962",
  "avatar_medium": "https://studip.example.org/pictures/user/nobody_medium.png?d=1476444962",
  "avatar_original": "https://studip.example.org/pictures/user/nobody_original.png?d=0",

  "homepage": "",
  "privadr": "",
  "phone": "",
  "skype": "",
  "datafields": [],
  "skype_show": null
}

 */

async function handleCustomProviderLogin(uploadImageFunc, deleteImageFunc, existingUser, updatedUserInfos, userProfile, usersService) {
  //TODO update your specific informations here
  console.log(userProfile);
  let title = "";
  let prefix = userProfile.name.prefix;
  let suffix = userProfile.name.suffix;

  title = !!prefix ? prefix : title;
  title = !!suffix ? suffix : title;

  let avatar_normal_url = userProfile.avatar_normal;
  if(existingUser?.id){
    await deleteImageFunc(existingUser.id);
  }

  let avatar_filename = await uploadImageFunc(avatar_normal_url);

  updatedUserInfos = {
    first_name: userProfile.name.given,
    last_name: userProfile.name.family,
    email: userProfile.email,
    avatar: avatar_filename,
    title: title,
  };

  return updatedUserInfos;
}

module.exports = function registerHook({ filter, action, init, schedule }, { services, exceptions, database, getSchema, env, logger }) {
  action('auth.login', async (input, {database, schema, accountability}) => {

    // create a folder where to place the images of users
    let avatar_image_folder = await FolderHelper.getOrCreateFolderIdByName(services, database, schema, accountability, exceptions, "avatar_images");

    //bind the upload function
    const uploadImageFunc = AvatarHelper.uploadImageByURL.bind(null, services, database, schema, accountability, exceptions, avatar_image_folder);
    const deleteImageFunc = AvatarHelper.deleteAvatarOfUser.bind(null, services, database, schema, accountability, exceptions);

    //TODO maybe add more provider handler here if needed
    const handleStudipLogin = handleCustomProviderLogin.bind(null, uploadImageFunc, deleteImageFunc); //get the login hook
    await ProfileHelper.handleProviderLogin(auth2ProviderNameToCustomize, input, database, schema, services, env, handleStudipLogin); //register login hook

    return input;
  });

};
