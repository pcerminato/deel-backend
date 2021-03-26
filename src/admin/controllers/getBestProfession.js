const sequelize = require("sequelize");

module.exports = async (req, res, next) => {
  const { start, end } = req.params;
  const { Profile, Job, Contract } = req.app.get("models");

  try {
    const ContractHigherPrice = await Job.findOne({
      where: start && end ? { createdAt: { $between: [start, end] } } : {},
      attributes: [
        "ContractId",
        [sequelize.fn("sum", sequelize.col("price")), "total_price"],
      ],
      include: [
        {
          model: Contract,
        },
      ],
    });

    const profileHigerPrice = await Profile.findOne({
      where: {
        id: ContractHigherPrice.Contract.ContractorId,
        type: "contractor",
      },
    });

    res.json(profileHigerPrice);
  } catch (error) {
    return next(error);
  }
};
