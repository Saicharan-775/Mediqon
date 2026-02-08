import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    ) {}


  async register(email: string, password: string, role: string) {
    // basic safety checks
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    // check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user entity
    const user = this.userRepository.create({
    email,
    password: hashedPassword,
    role: role as UserRole,
    });


    // save to database
    const savedUser = await this.userRepository.save(user);

    // never return password
    delete (savedUser as any).password;

    return savedUser;
  }
  async login(email: string, password: string) {
  // 1. Find user by email
  const user = await this.userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new BadRequestException('Invalid email or password');
  }

  // 2. Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestException('Invalid email or password');
  }

  // 3. Never return password
  delete (user as any).password;

  const payload = {
  sub: user.id,
  email: user.email,
  role: user.role,
};

const accessToken = await this.jwtService.signAsync(payload);

return {
  accessToken,
  user,
};

}

}
