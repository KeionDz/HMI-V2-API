import { Controller, Post, UseGuards } from '@nestjs/common';
import { LayerService } from './layer.service';
import { JwtCookieGuard } from '../auth/guard/jwt-cookie.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('layer')
export class LayerController {
    constructor(private layerService: LayerService) {}
    @Post('create')
    @UseGuards(JwtCookieGuard, RoleGuard)
    @Roles('ADMIN')
    async createLayer() {
        return this.layerService.createLayer();
    }
}
