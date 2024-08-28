import { Controller, Body, Post, Delete, Param, Put, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('2. Users - អ្នកប្រើប្រាស់')
@Controller('users')
export class UsersController {

    constructor( private readonly userService: UsersService){}


    @ApiOperation({
        summary:'សំរាប់ធ្វើការស្វែងរកអ្នកប្រើប្រាស់តាមរយៈលេខសំគាល់'
    })
    @Get('findById/:id')
    async findById(@Param('id') id: string){
        return await this.userService.findById(id)
    }

    @ApiOperation({
        summary:'សំរាប់ធ្វើការស្វែងរកអ្នកប្រើប្រាស់តាមរយៈឈ្មោះ'
    })
    @Get('findByEmail/:email')
    async findByEmail(@Param('email') email: string){
        return await this.userService.findByEmail(email)
    }

    @ApiOperation({
        summary: 'សំរាប់ធ្វើការបន្ថែមអ្នកប្រើប្រាស់ថ្មី',
    })
    @Post('create')
    async create(@Body() dto: UserDto){
        return await this.userService.create(dto)
    }

    @ApiOperation({
        summary: 'សំរាប់ធ្វើការកែប្រែពត៍មានអ្នកប្រើប្រាស់',
    })
    @Put('update/:id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.update(id,dto)
    }

    @ApiOperation({
        summary: 'សំរាប់ធ្វើការលុបឈ្មោះអ្នកប្រើប្រាស់ថ្មី',
    })
    @Delete('delete/:id')
    async delete(@Param('id') id: string){
        return await this.userService.delete(id)
    }
}
