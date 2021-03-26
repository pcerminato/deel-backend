const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { Contract } = req.app.get("models");
  const { id } = req.params;
  const profileId = req.profile.id;

  const contract = await Contract.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  });

  if (!contract) return res.status(404).end("The contract does not exist");

  res.json(contract);
};
