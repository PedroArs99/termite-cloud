import { Module } from "@nestjs/common";
import { HomeStateModule } from "./state/home.state.module";

@Module({
    imports: [HomeStateModule]
})
export class HomeModule{}