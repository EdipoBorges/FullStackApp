import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
  async execute({email, password}: AuthRequest) {
    //Verficar se email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }
    
    //Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    //Se tudo OK, Gerar token JWT
    const token = sign({
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: "30d" //30 dias que expira o token
    }
    );

    
    return {
        id: user.id,
        nome: user.name,
        email: user.email,
        token: token
    };
  }
}

export { AuthUserService };
