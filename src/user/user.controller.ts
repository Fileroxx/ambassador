import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';



@Controller()
export class UserController {
   
    constructor(
        private readonly userService: UserService) {

    }

    @Get('api/admin/ambassadors')
        async ambassadors() {
            return this.userService.find({
                is_ambassador: true
            });
       }

       @Get('ambassador/rankings')
       async rankings() {
            const ambassadors = this.userService.find({
                is_ambassador: true,
                relations: ['orders', 'orders.order_items']
            });

            return (await ambassadors).map(ambassador => {
                return {
                    name: ambassador.name,
                    revenue: ambassador.revenue
                }
            })

       }

    }
