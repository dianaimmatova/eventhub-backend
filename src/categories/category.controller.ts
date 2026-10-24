import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service.js";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('categories')
@Controller('categories')
export class CategoryController{
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    findAll(){
        return this.categoryService.findAll()
    }

}