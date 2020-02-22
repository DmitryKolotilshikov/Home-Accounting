import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit{ 
  constructor(
    private router: Router, 
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
      // this.route.queryParams.subscribe((params: Params) => {
      //   if(params['accessDenied']) {
      //     this.router.navigate(['/'])
      //   } 
      // })     
  }
}
