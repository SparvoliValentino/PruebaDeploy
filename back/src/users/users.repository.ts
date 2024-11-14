import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }

    async findUsersRepository() {
        return await this.usersRepository.find({
            select: ['id', 'name', 'email', 'address', 'phone', 'admin']
        })
    }

    async createUserRepository(user: CreateUserDto) {
        const newUser = await this.usersRepository.save(
            this.usersRepository.create(user)
        )
        return newUser
    }


    async findOneUserRepository(id: string) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'address', 'phone']
        })


        return user
    }

    async updateUserRepository(id: string, user: UpdateUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { id } })

        if (!existingUser) {
            return null
        }

        Object.assign(existingUser, user)

        await this.usersRepository.save(existingUser)

        return existingUser
    }

    async deleteUserRepository(id: string) {
        const userToDelete = await this.usersRepository.findOne({ where: { id } })
        await this.usersRepository.delete(id)
        return userToDelete
    }

    async findUserByEmailRepository(email: string) {
        return await this.usersRepository.findOne({ where: { email } })
    }
}




