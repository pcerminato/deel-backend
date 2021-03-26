async function payJob(req, res) {
  const { Job, Profile, Contract } = req.app.get("models");
  const profileId = req.profile.id;
  const { job_id } = req.params;

  try {
    const job = await Job.findOne({
      where: {
        id: job_id,
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

    if (!job) return res.status(404).end("Job not found");

    const clientBalance = await Profile.findOne({
      where: {
        id: profileId,
        type: "client",
      },
    });

    if (clientBalance.balance < job.price) {
      return res
        .status(404)
        .end("There's not enough in the balance to pay the job");
    }

    const contractorBalance = await Profile.findOne({
      where: {
        id: job.Contract.ContractorId,
        type: "contractor",
      },
    });

    if (!contractorBalance)
      return res.status(404).end("Contractor balance not found");

    contractorBalance.balance += job.price;
    clientBalance.balance -= job.price;
    job.paid = true;
    job.paymentDate = Date.now();

    await contractorBalance.save();
    await clientBalance.save();
    await job.save();

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = payJob;
