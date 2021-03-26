const { Op } = require("sequelize");

module.exports = async function getAllUnpaid(req, res) {
  const { Job, Contract } = req.app.get("models");
  const profileId = req.profile.id;
  const jobs = await Job.findAll({
    where: {
      paid: null,
    },
    include: [
      {
        model: Contract,
        where: {
          [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
          status: "in_progress",
        },
      },
    ],
  });

  if (!jobs) return res.status(404).end();

  res.json(jobs);
};
