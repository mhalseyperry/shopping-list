// import { subDays } from "date-fns";
import { prisma } from "./prisma.server";

export const getShoppingListsByUserId = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: {
      shoppingLists: true,
    },
  });

  return user?.shoppingLists ?? [];
};

export const createShoppingList = async (userId: string, name: string) => {
  return await prisma.shoppingList.create({
    data: {
      name,
      authorId: userId,
    },
  });
};

export const getShoppingList = async (listId: string) => {
  return await prisma.shoppingList.findUnique({
    where: { id: listId },
    include: {
      // items: {
      //   where: {
      //     OR: [{ removed: null }, { removed: { gte: subDays(new Date(), 3) } }],
      //   },
      // },
      items: true,
    },
  });
};

export type ShoppingListWithItems = NonNullable<
  Awaited<ReturnType<typeof getShoppingList>>
>;
