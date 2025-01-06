import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import User from '../../services/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder)
  userForm:FormGroup = this.formBuilder.group({
    name:["",[Validators.required]],
    age:["",[Validators.required, Validators.min(1)]],
    gender:["",[Validators.required]],
    mobileNumber:["",[Validators.required, Validators.pattern('^[0-9]{10}$')]],
  })
  userService = inject(UserService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  editUserId!:string
  ngOnInit(){
    this.editUserId = this.route.snapshot.params["id"]
    // console.log(this.editUserId)
    if(this.editUserId){
      this.userService.getUser(this.editUserId).subscribe(result=>{
        this.userForm.patchValue(result)
      })
    }
  }
  
  addUser(){
    if(this.userForm.invalid){
      alert("please provide all field with valid data")
      return
    }
    const model:User = this.userForm.value;
    this.userService.addUser(model).subscribe(result=>{
       alert("User added Successfully")
       this.router.navigateByUrl("/")
    })
    // console.log("Before data")
    // console.log(this.userForm.value)
    // console.log("after data")
  }
  updateUser(){
    if(this.userForm.invalid){
      alert("please provide all field with valid data")
      return
    }
    const model:User = this.userForm.value
    this.userService.updateUser(this.editUserId, model).subscribe(result=>{
      alert("User Updated Successfully")
      this.router.navigateByUrl("/")
    })
  }

}
