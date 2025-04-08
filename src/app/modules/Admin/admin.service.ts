import { Prisma, PrismaClient } from "@prisma/client";
import { equal } from "assert";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  const {searchTerm, ...filterData} = params
  console.log(Object.keys(filterData).length);
  

  const andCondition: Prisma.AdminWhereInput[] = [];
  const adminSearchAbleFields = ["name", "email"]

  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]:{
          equals: filterData[key], // 
          mode: "insensitive",
        },
      }))
    })
  }
  console.dir(andCondition, { depth: "infinity" });
  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereCondition,
  });

  return result;
};

export const AdminService = {
  getAllFromDB,
};