import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModal } from '../../models/user/UserModal';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() userModal?: UserModal;
  @Output() messageEvent = new EventEmitter<boolean>();

  userDetailClickCallback:boolean = false;
  constructor() { }

  ngOnInit(): void {  
  }

  sendCloseToBaseComponent(){
    this.userDetailClickCallback = true;
    this.messageEvent.emit(this.userDetailClickCallback)
  }
  
}
