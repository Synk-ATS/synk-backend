module.exports = {
  async afterUpdate(event) {
    const { result } = event;

    // Change set timer from seconds to milliseconds
    const timer = result.timer * 1000;

    // Check if the attendance is open
    if (result.open == true) {

      // If the attendance is open, set a timer to close it
      setTimeout(async ()=> {
        await strapi.db.query('api::attendance.attendance').update({
          where: { id: result.id },
          data: { open: false }
        });
      }, timer);
    }
  }
}
