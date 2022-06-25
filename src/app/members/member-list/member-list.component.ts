import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_service/account.service';
import { MembersService } from 'src/app/_service/members.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams : UserParams;
  user: User;
  genderList = [{value:'male', display:'Males'}, {value: 'female', display:'female'}]

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
   }



  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMemebers(this.userParams).subscribe(response=>{
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }


}
