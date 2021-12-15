const AvatarHelper = require("../AvatarHelper");

/**
 * A small hook to delete the avatar image before user deletion
 */
module.exports = function registerHook({ filter, action, init, schedule }, { services, exceptions, database, getSchema, env, logger }) {
  // when a user has an avatar, it cant be deleted, so we need to delete the file ourself with a hook
  filter('users.delete', async (payload, input, {database, schema, accountability}) => {
    let usersIds = payload; //get the user ids
    for(let userId of usersIds){ // for all users which get deleted
      await AvatarHelper.deleteAvatarOfUser(services, database, schema, accountability, exceptions, userId) //delete avatar file
    }

    return payload;
  });

};
