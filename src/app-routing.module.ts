import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { ListsComponent } from './app/lists/lists.component';
import { MemberDetailComponent } from './app/members/member-detail/member-detail.component';
import { MemberEditComponent } from './app/members/member-edit/member-edit.component';
import { MemberListComponent } from './app/members/member-list/member-list.component';
import { MessagesComponent } from './app/messages/messages.component';
import { AuthGuard } from './app/_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './app/_guards/prevent-unsaved-changes.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path:'',
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children:[
      { path: 'members', component: MemberListComponent},
      { path: 'members/:username', component: MemberDetailComponent},
      { path: 'member/edit', component: MemberEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},
      { path: 'lists', component: ListsComponent},
      { path: 'messages', component: MessagesComponent}
    ]
  },
  { path: '**', component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
