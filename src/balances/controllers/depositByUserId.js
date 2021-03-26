module.exports = async (req, res) => {
  const { Profile, Job, Contract } = req.app.get("models");
  const profileId = req.profile.id;
  const { userId } = req.params;
  const { amount } = req.body;

  const depositTo = await Profile.findOne({
    where: {
      id: userId,
      type: "client",
    },
  });

  if (!depositTo) return res.status(404).end("client not found");

  const profileJobs = await Job.findAll({
    where: {
      paid: null,
    },
    include: [
      {
        model: Contract,
        where: {
          ClientId: profileId,
        },
      },
    ],
  });

  const totalOfJobsToPayValue = profileJobs.reduce(
    (total, { price }) => total + price,
    0
  );

  if (amount > totalOfJobsToPayValue * 0.25) {
    return res
      .status(404)
      .end("cannot deposit more than 25% his total of jobs to pay");
  }

  try {
    depositTo.balance += amount;
    depositTo.save();
    res.end();
  } catch (error) {
    res.status(500).send(error);
  }
};
