import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
    constructor(
        private linkService: LinkService
    ){
    }

    @UseGuards(AuthGuard)
    @Get('api/admin/users/:id/links')
    async all(@Param('id') id: number) {
        return this.linkService.find({
            user: id,
            relations: ['orders']
        });
    }

}
