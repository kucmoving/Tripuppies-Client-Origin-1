import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_service/account.service';
import { environment } from 'src/environments/environment';
import { take } from'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/_service/members.service';
import { Router } from '@angular/router';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private http: HttpClient, private toastr: ToastrService,
    private memberService: MembersService, private router:Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  file: any;
  getFile(event: any){
    this.file = event.target.files[0];
    console.log("file", this.file)
  };

  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo.id).subscribe(()=>{
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain =false;
        if (p.id === photo.id) p.isMain =true;
      })
    })
  }

  uploadPhoto(){
    let formData = new FormData();
    formData.set("file", this.file);
    return this.http.post(this.baseUrl + "Users/add-photo", formData).subscribe((response) => {
      this.toastr.success("photo upload. will be redirected to homepage after 3 seconds");
      setTimeout(()=>{ location.reload() }, 3000)
      //要F5, 同埋loading效果
    })
  }

  deletePhoto(photoId: number){
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }
}




