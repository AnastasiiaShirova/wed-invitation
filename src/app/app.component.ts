import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import moment, {Duration} from "moment";
import {SheetsService} from "./shared/sheets.service";
import {TransferAnswer} from "./enums/transfer.enum";
import {FoodAnswer} from "./enums/food.enum";
import {ChildAnswer} from "./enums/child.enum";
import {Alcohol} from "./enums/alcohol.enum";
import {PersonInfo} from "./interfaces/person-info.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected readonly moment = moment;
  protected readonly Math = Math;
  protected readonly TransferAnswer = TransferAnswer;
  protected readonly FoodAnswer = FoodAnswer;
  protected readonly ChildAnswer = ChildAnswer;
  protected readonly Object = Object;
  protected readonly Alcohol = Alcohol;

  title = 'Invitations';
  isNavigationOpened = false;
  isQuastionsListOpened = false;
  sendButton = false;
  wedDay = moment('2025-05-25 14:00');
  duration = moment.duration(this.wedDay.diff(moment()));

  form = new FormGroup({
    name: new FormControl<string>(''),
    secondName: new FormControl<string>(''),
    transfer: new FormControl<TransferAnswer | null>(null),
    food: new FormControl<FoodAnswer | null>(null),
    alcohol: new FormArray(
      new Array(Object.keys(Alcohol).length)
        .fill(0)
        .map(() => new FormControl<boolean>(false))
    ),
    child: new FormControl<ChildAnswer | null>(null),

  })

  constructor(private sheetService: SheetsService) {
  }
  ngOnInit() {
    setInterval(() => {
      this.duration.subtract(1, 'seconds');
    }, 1000);

    // this.sheetService.getSheet().subscribe((sheet) => console.log(sheet))

    // this.sheetService.addPerson().subscribe((res) => console.log(res))
  }

  onSubmitClick(): void {
    console.log(this.form.value);
    this.sheetService.addPerson({
      ...this.form.value,
      alcohol: Object.values(Alcohol).filter((_, i) => this.form.value.alcohol![i]).join(',')
    } as any)
      .subscribe((response)=> console.log(response));
  }
}
