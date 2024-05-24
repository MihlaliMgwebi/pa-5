// import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { IonicModule } from '@ionic/angular';
import { LecturerServiceService } from '../../../services/lecturer/lecturer-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.page.html',
  styleUrls: ['logout.page.scss'],
  // TODO
  // standalone: true,
  // imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LogoutPage implements OnInit {
  // create 2 variables to store results emitted from observable
  lecturers: any;
  newLecturers: any;

  // inject student service into the constructor
  constructor(private lecturerService: LecturerServiceService) {}

  // create a method to get the data from the json-data-students.php file
  getLecturerData() {
    // subscribe to the observable
    // result is the data emitted from the observable
    this.lecturerService.getLecturers().subscribe((result) => {
      // store the data emitted from the observable into the lecturers variable
      this.lecturers = result;
      // console.log(this.lecturers);
      // store the data emitted from the observable into the newLecturers variable
      this.newLecturers = this.lecturers.lecturers;
    });
  }

  // call the getLecturerData() method when the page loads
  ngOnInit() {
    this.getLecturerData();
  }
}