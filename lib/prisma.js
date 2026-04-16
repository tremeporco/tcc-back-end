import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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