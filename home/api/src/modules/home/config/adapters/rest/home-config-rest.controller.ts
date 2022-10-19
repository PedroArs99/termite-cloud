import { Controller, Get } from '@nestjs/common';

@Controller("/config")
export class HomeConfigRestController {
    @Get()
    getHomeConfig(): HomeConfigRestDto {
        return {
            bridgeState: "offline"
        }
    }
}
