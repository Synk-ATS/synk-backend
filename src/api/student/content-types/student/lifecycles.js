module.exports = {
  async afterCreate(event)  {
    const { result, params } = event;

    const firstName = result.firstName.split('-')[0].toLowerCase();
    const lastName = result.lastName.toString().toLowerCase();
    const username = `${firstName}.${lastName}`;
    const usernameAlt = `${firstName}.${lastName}${result.id}`;
    const email = `${firstName}.${lastName}@stu.synk.io`;
    const emailAlt = `${firstName}.${lastName}${result.id}@stu.synk.io`;
    const date = new Date();
    const password = `${firstName}${date.getFullYear()}?`;

    function getStudentId(seq, year = '01', program = 'ECN') {
      let getZero = '';
      for (let i = 0; i < 5 - seq.toString().length; i += 1) {
        getZero += '0';
      }
      return year + program + getZero + seq;
    }

    const oldUser = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email:email },
    });

    if(oldUser) {
      try {
        await strapi.plugins['users-permissions'].services.user.add({
          blocked: false,
          confirmed: true,
          firstName: result.firstName,
          lastName: result.lastName,
          username: usernameAlt,
          email: emailAlt,
          password: password, //will be hashed automatically
          provider: 'local', //provider
          created_by: 1, //user admin id
          updated_by: 1, //user admin id
          role: 4 //role id
        }).then(async (res)=>{
          await strapi.db.query('api::student.student').update({
            where: { id: result.id },
            data: {
              email: res.email,
              uid: getStudentId(result.id),
            }
          });
          await strapi.db.query('plugin::users-permissions.user').update({
            where: { email:email },
            data: {
              avatar: { ...result.avatar }
            }
          });
        });
      } catch (e) {
        console.log(e.errors)
      }


    }

    try {
      await strapi.plugins['users-permissions'].services.user.add({
        blocked: false,
        confirmed: true,
        firstName: result.firstName,
        lastName: result.lastName,
        username: username,
        email: email,
        password: password, //will be hashed automatically
        provider: 'local', //provider
        created_by: 1, //user admin id
        updated_by: 1, //user admin id
        role: 4 //role id
      }).then(async (res)=>{
        await strapi.db.query('api::student.student').update({
          where: { id: result.id },
          data: {
            email: res.email,
            uid: getStudentId(result.id),
          }
        });
        await strapi.db.query('plugin::users-permissions.user').update({
          where: { email:email },
          data: {
            avatar: { ...result.avatar }
          }
        });
      });
    } catch (e) {
      console.log(e);
    }





    // const entry = await strapi.db.query('plugin::users-permissions.user').findMany({});

    // const entry = await strapi.plugins['users-permissions'].services.user.findMany();

    // console.log(entry);
  },
  // async afterUpdate(event) {
  //   const { result, params } = event;
  //
  //   const attendanceRecord = result.courses.map((c)=> ({
  //     course: c.id,
  //     daysPresent: 0,
  //   }));
  //
  //   const serialized = JSON.stringify(attendanceRecord);
  //
  //   try {
  //     await strapi.db.query('api::student.student').update({
  //       where: { id: result.id },
  //       data: { attendanceRecord: serialized }
  //     });
  //   } catch (e) {
  //     //console.log(e);
  //   }
  // }
};
