const whislostRepository = require("../repositories/whislostRepository");

module.exports = {
  create(requestBody) {
    return whislostRepository.create(requestBody);
  },

  update(id, requestBody) {
    return whislostRepository.update(id, requestBody);
  },

  destroy(id) {
    return whislostRepository.destroy(id);
  },

  async list() {
    try {
      const whislist = await whislostRepository.findAll();
      const whislistCount = await whislostRepository.getTotalWhislist();

      return {
        data: whislist,
        count: whislistCount,
      };
    } catch (err) {
      throw err;
    }
  },

  findOne(id) {
    return whislostRepository.findOne(id);
  },

  findByPk(id) {
    return whislostRepository.findByPk(id);
  },
};
