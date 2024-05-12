import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../core/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthResponseDto } from './dto/user-auth-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserAuthResponseDto> {
    const checkExistingUser = await this.findCountByEmail(createUserDto.email);
    if (checkExistingUser) {
      throw new BadRequestException('User with email already exists');
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    let user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    user = await user.save();
    const userAuthResponseDto = new UserAuthResponseDto();
    userAuthResponseDto.token = this.generateToken(user);
    return userAuthResponseDto;
  }

  async login(email: string, pass: string): Promise<UserAuthResponseDto> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!this.comparePasswords(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const userAuthResponseDto = new UserAuthResponseDto();
    userAuthResponseDto.token = this.generateToken(user);
    return userAuthResponseDto;
  }

  async findCountByEmail(email: string): Promise<number> {
    return await this.userModel.countDocuments({ email });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }, {}, { lean: true });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  comparePasswords(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  public generateToken(user: User): string {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
