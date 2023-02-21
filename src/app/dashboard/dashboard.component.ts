import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  accountBalance: number = Math.floor(Math.random() * (9565 - 500 + 1) + 500);
  transactionHistory = this.divideIntoParts(this.accountBalance, 5);
  creditScore: number = 750;
  doughnutData = {
    labels: ['Savings', 'Checking', 'Investments', 'Credit'],
    datasets: [
      {
        data: [10000, 5000, 15000, 3000],
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
      },
    ],
  };
  barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Deposit',
        data: [10000, 15000, 20000, 18000, 25000, 12000, 22000],
        backgroundColor: [
          'rgba(0, 128, 0, 0.2)',
          'rgba(0, 128, 0, 0.2)',
          'rgba(0, 128, 0, 0.2)',
          'rgba(0, 128, 0, 0.2)',
          'rgba(0, 128, 0, 0.2)',
          'rgba(0, 128, 0, 0.2)',
          'rgba(0, 128, 0, 0.2)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 128, 0, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Withdrawal',
        data: [5000, 8000, 10000, 12000, 15000, 10000, 8000],
        backgroundColor: [
          'rgba(255, 99, 71, 0.2)',
          'rgba(255, 99, 71, 0.2)',
          'rgba(255, 99, 71, 0.2)',
          'rgba(255, 99, 71, 0.2)',
          'rgba(255, 99, 71, 0.2)',
          'rgba(255, 99, 71, 0.2)',
          'rgba(255, 99, 71, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 71, 1)',
          'rgba(255, 99, 71, 1)',
          'rgba(255, 99, 71, 1)',
          'rgba(255, 99, 71, 1)',
          'rgba(255, 99, 71, 1)',
          'rgba(255, 99, 71, 1)',
          'rgba(255, 99, 71, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Balance',
        data: [1000, 1200, 1100, 1300, 1400, 1350, 1500],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: [200, 300, 250, 400, 350, 500, 450],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  constructor() {}

  ngOnInit() {
    Chart.register(...registerables);
    new Chart('barChart', {
      type: 'bar',
      data: this.barData,
    });

    let chartOptions: any = {
      legend: {
        position: 'right',
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            let label = data.labels[tooltipItem.index];
            let value = data.datasets[0].data[tooltipItem.index];
            let formattedValue = '$' + value.toLocaleString();
            return label + ': ' + formattedValue;
          },
        },
      },
    };

    new Chart('doughnutChart', {
      type: 'doughnut',
      data: this.doughnutData,
      options: chartOptions,
    });

    new Chart('lineChart', {
      type: 'line',
      data: this.lineData,
    });
  }
  divideIntoParts(num: number, n: number) {
    // Calculate the sum of the first n-1 random parts
    let sum = 0;
    const parts = [];
    for (let i = 1; i < n; i++) {
      const part = Math.round((Math.random() * num) / 2);
      parts.push({
        date: '01/0' + i + '/2022',
        description: 'Deposit',
        amount: part,
      });
      sum += part;
    }

    // Calculate the last part to ensure the sum is num
    let part = num - sum;
    let desc = 'Deposit';
    if (part < 0) {
      desc = 'Withdrawal';
      part = part - part - part;
    }
    parts.push({
      date: '01/0' + n + '/2022',
      description: desc,
      amount: part,
    });

    return parts;
  }
}
