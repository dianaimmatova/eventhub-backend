import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity.js";
import { Repository } from "typeorm";


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async findAll(){
        return await this.categoryRepository.find({order: {name: 'ASC'}});
    }
}