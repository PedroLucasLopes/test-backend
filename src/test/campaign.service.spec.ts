import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { CampaignService } from '../application/services/campaign.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { CampaignType, StatusType } from '@prisma/client';
import { BadRequestError, UnauthorizedError } from '../presentation/responses/error.types';
import convertToDate from '../presentation/filters/converttodate.filter';
import { CampaignBodyDTO } from 'src/application/DTO/campaign-body-dto';

const now = new Date();
const id = uuidv4();
const signUpDate = new Date(Date.now());
const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
const endDate = new Date(twoDaysLater.getTime());

const campaignArray = {campaigns: [
    {
        id,
        name: "Unit Test Campaign",
        signUpDate,
        startDate: signUpDate,
        endDate,
        status: StatusType.ACTIVE,
        category: CampaignType.MARKETING,
    }
]}

const oneCampaign = campaignArray.campaigns[0];


const db = {
    campaign: {
        findMany: jest.fn().mockResolvedValue(campaignArray),
        findUnique: jest.fn().mockResolvedValue(oneCampaign),
        create: jest.fn().mockResolvedValue(oneCampaign),
        update: jest.fn().mockResolvedValue(oneCampaign),
        delete: jest.fn().mockResolvedValue(oneCampaign),
    },
};

describe("CampaignService", () => {
    let service: CampaignService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CampaignService,
                {
                    provide: PrismaService,
                    useValue: db,
                },
            ],
        }).compile();

        service = module.get<CampaignService>(CampaignService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe("findAll", () => {
        it("Should return every campaign in the database", async () => {
            const campaigns = await service.findAll();
            expect(campaigns).toEqual({campaigns: campaignArray});
            expect(prisma.campaign.findMany).toHaveBeenCalled();
        });

        it("Should return every campaign in the database by its status", async () => {
            const campaigns = await service.findAll(StatusType.ACTIVE);
            expect(campaigns).toEqual({campaigns: campaignArray});
            expect(prisma.campaign.findMany).toHaveBeenCalled();
        });

        it("Should return an error for a nonexistent status", async () => {
            await expect(service.findAll("EXAMPLE" as StatusType)).rejects.toThrow(new BadRequestError("This status is not valid!"));
        });
    });

    describe("create", () => {
        it("Should create a new campaign", async () => {
            const create = await service.create(oneCampaign)
            expect(create).toEqual({campaign: oneCampaign})
            expect(prisma.campaign.create).toHaveBeenCalled();
        })
    })

    describe("update", () => {
        it("Should update a campaign name", async () => {
            const update = await service.update(oneCampaign.id, {...oneCampaign, name: "Edited Campaign"})
            expect(update).toEqual({campaign: oneCampaign})
            expect(prisma.campaign.update).toHaveBeenCalled();
        })
    })

    describe("delete", () => {
        it("Should soft delete a campaign turning its status to paused", async () => {
            const remove = await service.remove(oneCampaign.id);
            expect(remove).toEqual({deleted: oneCampaign})
            expect(prisma.campaign.update).toHaveBeenCalled();
        });
    })
});