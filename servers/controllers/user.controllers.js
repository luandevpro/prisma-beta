const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  const createUser = await prisma.user.create({
    data: {
      email: req.body.email,
      username: req.body.username,
    },
  });
  res.json(createUser);
};

exports.getUsers = async (req, res) => {
  const getUsers = await prisma.user.findMany({
    first: 20,
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.json(getUsers);
};

exports.getUser = async (req, res) => {
  const getUser = await prisma.user.findOne({
    where: { id: req.params.id },
    select: {
      id: true,
      username: true,
    },
  });
  Promise.all([getUser]).then((result) => {
    if (result[0]) {
      res.json(getUser);
    } else {
      res.json({ data: 'No find user' });
    }
  });
};

exports.updateUser = async (req, res) => {
  const updateUser = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      email: req.body.email,
      username: req.body.username,
    },
  });
  res.json(updateUser);
};

exports.deleteUser = async (req, res) => {
  const deleteUser = await prisma.user.delete({
    where: { id: req.params.id },
  });
  res.json(deleteUser);
};
