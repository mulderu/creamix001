// 
module.exports = {
  async afterCreate(event) {
    // const { data } = event.params;
    // const logPath = '/opt/app/public/upload/logfile.txt'

    // strapi.fs.appendFile(logPath, `case.lifecycle=${data.dcms.length}\n`);

    // strapi.log.info(`log.case: ${data.dcms ? 0 : data.dcms.length}`)
    // strapi.log.warn(`log.case: ${data.dcms ? 0 : data.dcms.length}`)
    // strapi.log.error(`log.case: ${data.dcms ? 0 : data.dcms.length}`)




    // if (data.category === "user_register") {
    //   const exaiRole = await strapi
    //     .query("plugin::users-permissions.role")
    //     .findOne({
    //       where: { name: exaiUser_Role_Name },
    //     });

    //   // update user role
    //   await strapi
    //     .plugin("users-permissions")
    //     .service("user")
    //     .edit(data.jsval.user.id, { role: exaiRole.id });

    //   strapi.log.info(
    //     `Updated user ${data.jsval.user.id} role to ${exaiUser_Role_Name}`
    //   );
    // }
  },
};
