import prisma from "../../../shared/prisma";
import { Admin, Prisma } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";



const getAllFromDB = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];

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
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key], //
          mode: "insensitive",
        },
      })),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereCondition
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result
  };
};

const getByIdFromDB = async (id: string) => {
  
  const result = await prisma.admin.findUnique({
    where: {
      id,
    }
  })
  
  return result
}

const updateIntoDB = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id
    }
  })
  const result = await prisma.admin.update({
    where: {
      id
    },
    data
  })

  return result
}

const deleteFromDB = async (id:string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id
    }
  })
  
  const result = prisma.$transaction(async(transactionClient)=> {

    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id
      }
    });

    const userDeletedData = await transactionClient.user.delete({
      where:{
        email: adminDeletedData.email
      }
    })
    return adminDeletedData
  })

  return result
}

const softDeleteFromDB = async (id:string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id
    }
  })
  
  const result = prisma.$transaction(async(transactionClient)=> {

    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id
      },
      data: {
        isDeleted: true
      }
    });

    const userDeletedData = await transactionClient.user.update({
      where:{
        email: adminDeletedData.email
      },
      data:{
        status: "DELETED"
      }
    })
    return adminDeletedData
  })

  return result
}


export const AdminService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB
};
