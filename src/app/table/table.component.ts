import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { NotificationsService } from '../shared/notifications.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'openDate',
    'closedDate',
    'status',
    'actions',
  ];
  dataSource: any = null;
  status: boolean = true;

  constructor(
    private router: Router,
    private tableService: BackendService,
    public notificationService: NotificationsService
  ) {}

  public langSelect = 'Select';
  langSelected = [];

  ngOnInit() {
    this.tableService.getSurveyList().subscribe(
      (response) => {
        //this.dataSource = response;
        this.dataSource = response.d.results[0].SurveyHdrToItemNav.results;
        
        // this.dataSource = null;//* To check whether loading data is working or not
        delete this.dataSource.__metadata;
        delete this.dataSource.__proto__;
        //console.log(this.dataSource);
        this.dataSource = new Array(this.dataSource);
        this.dataSource = this.dataSource[0];
        console.log(this.dataSource);
        // console.log(this.dataSource);
        this.langSelected = this.dataSource.map((obj) => {
          let rObj = {};
          rObj[obj.SurveyId] = '';
          return rObj;
        });
        //console.log(this.langSelected);
      },
      (error) => {
        //console.log(error);
        this.notificationService.config.duration = 10000;
        this.notificationService.success(`${error.url} : Not found`);
        this.dataSource = [];
        // console.log(this.dataSource);
      }
    );
    // this.tableService.getOdataTable().subscribe((odata) => {
    //   // console.log(odata.entry.link[1].inline.feed.entry.content.properties);
    //   // console.log(odata);
    // });
    // console.log(this.dataSource);
  }

  goToSurvey(element) {
    this.langSelected.forEach((poll) => {
      if (element.SurveyId == Object.keys(poll)) {
        if (poll[element.SurveyId] !== '') {
          this.tableService.updateSurveyName(element.SurveyName);
          this.tableService.updateSurveyDesc(element.SurveyDesc);
          this.tableService.updateSurveyLang(poll[element.SurveyId]);
          this.router.navigateByUrl('/survey/' + element.SurveyId);
        } else {
          this.notificationService.success(':: Select a language');
        }
      }
    });
  }
  onLangSelect(element, lang) {
    this.langSelected.forEach((poll) => {
      if (element.SurveyId == Object.keys(poll)) {
        var key1 = element.SurveyId;
        poll[key1] = lang._value;
      }
    });
    //console.log(this.langSelected);
  }
}
