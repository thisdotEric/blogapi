import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@JsonController()
@Service()
export class HomeController {
  @Get('/')
  async index() {
    return 'Ok';
  }
}
