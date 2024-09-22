import { StatusType } from "@prisma/client";

export default function statusTypeIsValid(status: StatusType): boolean {
    return Object.values(StatusType).includes(status)
}