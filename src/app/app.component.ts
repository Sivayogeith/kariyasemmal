import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { LoginService } from './services/login.service';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'infosys';
  data: any = {};
  showDark = 'moon-o';
  showNew = false;
  notifications: any[] = [];
  newNotificationCount = 0;
  private notificationsSubscription: any;

  constructor(
    private darkService: DarkModeService,
    private router: Router,
    private login: LoginService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.data = this.login.getLoginData();
    if (this.data) {
      // Fetch notifications for the current user
      this.notificationsService
        .getNotifications(this.data.username, this.data._id)
        .subscribe((res: any) => {
          if (JSON.stringify(res) !== '[]') {
            res.forEach((notification: any) => {
              this.notifications.unshift(notification);
            });
            this.newNotificationCount = this.getNewNotificationCount();
          }
          console.log(res);
        });

      // Subscribe to new notifications for the current user
      this.notificationsSubscription = this.notificationsService
        .subscribeNotifications(this.data.username, this.data._id)
        .subscribe((notification: any) => {
          if (this.notifications && notification) {
            this.notifications.unshift(JSON.parse(notification));
          }
          this.newNotificationCount = this.getNewNotificationCount();
        });
    }
  }

  ngOnDestroy() {
    // Unsubscribe from the notifications subscription when the component is destroyed
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }

  toggleDarkMode() {
    this.darkService.toggle();
    if (this.showDark == 'moon-o') {
      this.showDark = 'sun-o';
    } else {
      this.showDark = 'moon-o';
    }
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

  getNewNotificationCount() {
    if (this.notifications) {
      this.showNew = true;
      return this.notifications.filter((n) => !n.read).length;
    }
    return 0;
  }

  markAsRead(notification: any) {
    if (!notification.read) {
      notification.read = true;
      this.notificationsService
        .markAsRead(notification._id)
        .subscribe((res) => console.log(res));
      this.newNotificationCount = this.getNewNotificationCount();
    }
  }
  markAllAsRead() {
    this.notifications.forEach((notification) => {
      this.markAsRead(notification);
    });
  }

  getTimeDifferenceString(timestamp: string): string {
    let date = new Date(timestamp);
    let date2 = new Date();
    const diff = Math.abs(date.getTime() - date2.getTime());
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (diff < minute) {
      return Math.floor(diff / 1000) + ' sec ago';
    } else if (diff < hour) {
      return Math.floor(diff / minute) + ' min ago';
    } else if (diff < day) {
      return Math.floor(diff / hour) + ' hours ago';
    } else if (diff < month) {
      return Math.floor(diff / day) + ' days ago';
    } else if (diff < year) {
      return Math.floor(diff / month) + ' months ago';
    } else {
      return Math.floor(diff / year) + ' years ago';
    }
  }

  removeNotification(notification: any) {
    this.notificationsService
      .deleteNotification(notification._id)
      .subscribe((res) => console.log(res));
    this.notifications.findIndex((object, i) => {
      if (object == notification) {
        this.notifications.splice(i, 1);
      }
    });
    this.getNewNotificationCount();
  }
}
