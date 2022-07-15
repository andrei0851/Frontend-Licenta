import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  okmessage!: string;
  errormessage!: string;

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.confirm()
  }

  confirm() {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    this.accountService.confirm(token,email).subscribe((response: any) => {
      this.okmessage = response.message;
    }, (error) => {
      this.errormessage = error;
    });
  }
}
