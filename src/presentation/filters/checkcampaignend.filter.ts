export default function checkCampaignEnd(startDate: Date, endDate: Date) {
  const campaignFinish = startDate > endDate;
  if (campaignFinish) {
    const finishDate = `${String(endDate.getDate())}/${String(
      endDate.getMonth() + 1,
    )}/${String(endDate.getFullYear())}`;
    return finishDate;
  }
}
