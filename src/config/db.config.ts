import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";



export const databaseConfig = (
    configService: ConfigService 
):TypeOrmModuleOptions => ({
    type: "postgres",
    host: configService.getOrThrow<string>("DB_HOST"),
    port: Number(configService.getOrThrow<string>("DB_PORT")),
    username: configService.getOrThrow<string>("DB_USERNAME"),
    password: configService.getOrThrow<string>("DB_PASSWORD"),
    database: configService.getOrThrow<string>("DB_DATABASE"),

    autoLoadEntities: true,

    synchronize: configService.getOrThrow<string>("DB_SYNC") === "true"
})