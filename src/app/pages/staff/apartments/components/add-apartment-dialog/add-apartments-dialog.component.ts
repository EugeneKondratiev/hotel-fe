import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-apartments-dialog.html',
})
export class AddApartmentsDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.getAllApartmentsClasses();
  }

  addApartmentForm: FormGroup;

  apartment = {} as Apartments;
  apartmentClass = {} as ApartmentsClass;

  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;

  ngOnInit(): void {
    this.addApartmentForm = this.formBuilder.group({
      roomNumber: ['', Validators.pattern('^\\d{1,3}$')],
      photo: ['', Validators.pattern(
        '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')],
      description: [''],
      status: [''],
      apartmentClass: [''],
      numberOfRooms: [{value: '', disabled: true}],
      numberOfCouchette: [{value: '', disabled: true}]
    });
  }

  checkValid() {
    this.addApartmentForm.markAllAsTouched();
    console.log('FormGroup: ', this.addApartmentForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addApartmentForm.valid ;
  }

  onSubmit() {
    if (this.addApartmentForm.valid) {
      this.setApartment();
      this.createApartment();
    }
  }

  createApartment() {
    this.http.post(URL + 'apartments', this.apartment).subscribe(
      res => {
        console.log(res);
        this.apartment = (res as Apartments);
      });
  }

  setApartment() {
    this.apartment.apartmentClass = this.selectedApartmentsClass;
    this.apartment.description = this.addApartmentForm.value.description;
    this.apartment.status = this.addApartmentForm.value.status;
    this.apartment.photo = this.addApartmentForm.value.photo;
    this.apartment.roomNumber = this.addApartmentForm.value.roomNumber;
    console.log(this.apartment);
  }

  onSelect(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }
}


