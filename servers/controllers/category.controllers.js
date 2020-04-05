const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getCategory = async (req, res) => {
  const getCategory = await prisma.category.findOne({
    where: { id: req.params.id },
    select: {
      id: true,
      name: true,
      posts: {
        select: {
          id: true,
            title: true,
            description: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
              },
          },
        },
      },
    },
  });
  res.json(getCategory);
};

exports.getCategories = async (req, res) => {
  const getCategories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      posts: {
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
        },
      },
    },
  });
  res.json(getCategories);
};
