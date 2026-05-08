import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CheckOut } from "./CheckOut";
import { Page } from "@playwright/test";

export class POManager
{
    getloginPage : LoginPage;
    dashboardPage : DashboardPage;
    checkOut : CheckOut;
    page : Page; 
constructor(page:Page)
{
    this.page = page;
    this.getloginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkOut = new CheckOut(this.page);
}
}