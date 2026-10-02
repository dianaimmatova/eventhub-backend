import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";



export const databaseConfig = (
    ConfigService: ConfigService 
):TypeOrmModuleOptions => ({
    type: "postgres",
    host: ConfigService.getOrThrow<string>("DB_HOST"),
    port: Number(ConfigService.getOrThrow<string>("DB_PORT")),
    username: ConfigService.getOrThrow<string>("DB_USERNAME"),
    password: ConfigService.getOrThrow<string>("DB_PASSWORD"),
    database: ConfigService.getOrThrow<string>("DB_DATABASE"),

    autoLoadEntities: true,

    synchronize: ConfigService.getOrThrow<string>("DB_SYNC") === "true"
})