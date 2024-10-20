import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

// components
import { AppTopCardsComponent } from '../../../components/dashboard1/top-cards/top-cards.component';
import { AppRevenueUpdatesComponent } from '../../../components/dashboard1/revenue-updates/revenue-updates.component';
import { AppYearlyBreakupComponent } from '../../../components/dashboard1/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from '../../../components/dashboard1/monthly-earnings/monthly-earnings.component';
import { AppEmployeeSalaryComponent } from '../../../components/dashboard1/employee-salary/employee-salary.component';
import { AppCustomersComponent } from '../../../components/dashboard1/customers/customers.component';
import { AppProductsComponent } from '../../../components/dashboard2/products/products.component';
import { AppSocialCardComponent } from '../../../components/dashboard1/social-card/social-card.component';
import { AppSellingProductComponent } from '../../../components/dashboard1/selling-product/selling-product.component';
import { AppWeeklyStatsComponent } from '../../../components/dashboard1/weekly-stats/weekly-stats.component';
import { AppTopProjectsComponent } from '../../../components/dashboard1/top-projects/top-projects.component';
import { AppProjectsComponent } from '../../../components/dashboard1/projects/projects.component';
import { RevenueService } from 'src/app/services/revenue.service';
import { IChartRevenue, ITotalRevenue } from 'src/app/models/revenue.model';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    TablerIconsModule,
    AppTopCardsComponent,
    AppRevenueUpdatesComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppEmployeeSalaryComponent,
    AppCustomersComponent,
    AppProductsComponent,
    AppSocialCardComponent,
    AppSellingProductComponent,
    AppWeeklyStatsComponent,
    AppTopProjectsComponent,
    AppProjectsComponent,
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component implements OnInit {
  totalRevenue: ITotalRevenue;
  chartRevenue: IChartRevenue[];

  topCardsData: any;
  revenueUpdatesData: any;
  yearlyBreakupData: any;
  monthlyEarningsData: any;
  employeeSalaryData: any;
  customersData: any;
  projectsData: any;
  socialCardData: any;
  sellingProductData: any;
  weeklyStatsData: any;
  topProjectsData: any;

  constructor(private revenueService: RevenueService) {}

  ngOnInit(): void {
    this.fetchRevenueData();
  }

  fetchRevenueData() {
    this.revenueService.getSellerReevenue().subscribe((data: ITotalRevenue) => {
      this.totalRevenue = data;
      this.updateTopCards();
    });

    this.revenueService
      .getSellerChartRevenue()
      .subscribe((data: IChartRevenue[]) => {
        this.chartRevenue = data;
        this.updateCharts();
      });
  }

  updateTopCards() {
    this.topCardsData = {
      totalRevenue: this.totalRevenue.total_revenue,
      totalSales: this.totalRevenue.total_sales,
      averageOrderValue:
        this.totalRevenue.total_revenue / this.totalRevenue.total_sales,
      conversionRate: 3.5, // Fake data
    };
  }

  updateCharts() {
    this.revenueUpdatesData = this.chartRevenue.map((item) => ({
      month: item.month,
      revenue: item.total_revenue,
      sales: item.totalQuantity,
    }));

    this.yearlyBreakupData = this.chartRevenue.reduce((acc: number[], item) => {
      acc.push(item.total_revenue);
      return acc;
    }, []);

    this.monthlyEarningsData = this.chartRevenue.map((item) => ({
      month: item.month,
      earnings: item.total_revenue,
    }));

    // Fake data for other charts
    this.employeeSalaryData = [
      /* Fake employee salary data */
    ];
    this.customersData = [
      /* Fake customers data */
    ];
    this.projectsData = [
      /* Fake projects data */
    ];
    this.socialCardData = [
      /* Fake social card data */
    ];
    this.sellingProductData = [
      /* Fake selling product data */
    ];
    this.weeklyStatsData = [
      /* Fake weekly stats data */
    ];
    this.topProjectsData = [
      /* Fake top projects data */
    ];
  }
}
