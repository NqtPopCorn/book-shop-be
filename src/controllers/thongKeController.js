import service from "../services/thongKeService.js";

const handleGetReceipts = async (req, res) => {
  const { fromDate, toDate } = req.query;
  const receipts = await service.getReceipts(fromDate, toDate);
  res.json({
    receipts,
  });
};

export default {
  handleGetReceipts,
};
