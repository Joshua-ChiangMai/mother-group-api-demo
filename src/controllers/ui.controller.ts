import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { renderDashboardPage } from '../ui/dashboard.page';

@ApiExcludeController()
@Controller()
export class UiController {
  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  index() {
    return renderDashboardPage();
  }
}
