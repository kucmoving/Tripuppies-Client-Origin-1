import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(private memberService: MembersService, private toastr:ToastrService) {
   }

  ngOnInit(): void {
  }

  addLike(member:Member) {
    this.memberService.addLike(member.username).subscribe(()=>{
      this.toastr.success('You have liked' + member.knownAs);
    }, error => {
      this.toastr.error('You have already like the userd!');
    })
  }
}
