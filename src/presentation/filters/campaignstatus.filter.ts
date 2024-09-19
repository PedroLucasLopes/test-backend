import { StatusType } from '@prisma/client';

export default function campaignStatus(endDate: Date) {
  const today = Date.now();
  const campaignExpire = today >= endDate.getTime();

  if (campaignExpire) {
    return StatusType.EXPIRED;
  }

  return StatusType.ACTIVE;
}
