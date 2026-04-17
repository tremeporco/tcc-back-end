// lib/prisma.js
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };


async function criarUsuario() {
  const usuario = await prisma.user.create({
    data: {
      email: "joao@exemplo.com",
      passwordHash: "hash_da_senha_aqui",
    
    },
  });
  console.log("Usuário criado:", usuario);
}

async function buscarUsuario() {
  const usuario = await prisma.user.findUnique({
    where: {
      email: "joao@exemplo.com",
    },
    include: {
      reactions: true, 
    },
  });

  console.log("Usuário encontrado:", usuario);
}


async function criarReacao(userId) {
  const reacao = await prisma.reactionHistory.create({
    data: {
      userId: userId,
      reagents: "H2 + O2",
      products: "H2O",
      equation: "2H2 + O2 -> 2H2O",
      isBalanced: true,
    },
  });

  console.log("Reação criada:", reacao);
}

async function listarReacoes(userId) {
  const reacoes = await prisma.reactionHistory.findMany({
    where: {
      userId: userId,
    },
  });

  console.log("Reações do usuário:", reacoes);
}

async function atualizarReacao(id) {
  const reacao = await prisma.reactionHistory.update({
    where: { id },
    data: {
      notes: "Atualizado: reação revisada",
    },
  });

  console.log("Reação atualizada:", reacao);
}


async function deletarReacao(id) {
  await prisma.reactionHistory.delete({
    where: { id },
  });

  console.log("Reação deletada");
}