const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { Contract } = req.app.get("models");
  const id = req.profile.id;

  const contracts = await Contract.findAll({
    where: {
      [Op.not]: [{ status: "terminated" }],
      [Op.or]: [{ ClientId: id }, { ContractorId: id }],
    },
  });

  if (!contracts) return res.status(404).end();

  res.json(contracts);
};
