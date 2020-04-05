const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const createPost = await prisma.post.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      user: {
        connect: {
          id: req.body.userId,
        },
      },
    },
  });
  res.json(createPost);
};

exports.getPosts = async (req, res) => {
  const getPosts = await prisma.post.findMany({
    first: 20,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      description: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          username: true,
        },
      },
    },
  });
  res.json(getPosts);
};

exports.getPost = async (req, res) => {
  const getPost = await prisma.post.findOne({
    where: { id: req.params.id },
    select: {
      id: true,
      title: true,
      description: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  res.json(getPost);
};

exports.updatePost = async (req, res) => {
  const updatePost = await prisma.post.update({
    where: { id: req.params.id },
    data: {
      title: req.body.title,
      description: req.body.description,
      categories: {
        create: {
          name: req.body.categoryName,
        },
      },
    },
  });
  res.json(updatePost);
};

exports.deletePost = async (req, res) => {
  const deletePost = await prisma.post.delete({
    where: { id: req.params.id },
  });
  res.json(deletePost);
};
