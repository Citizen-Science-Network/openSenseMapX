import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'osem-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  dummyCampaigns = [
    {
    "_id": "ajiodsdakjsdajkhdskjhad",
        "title": "testcampaign1",
        "startDate": "1st November",
        "endDate": "1st December",
        "owner": "testowner",
        "aboutMe": "test",
        "campaignGoals": "goals",
        "campaignDetails": "details",
        "phenomena": "PM10"
    },
    {
    "_id": "ajiodsdakjsdajkhdskjhad",

        "title": "testcampaign2",
        "startDate": "1st November",
        "endDate": "1st December",
        "owner": "testowner",
        "aboutMe": "test",
        "campaignGoals": "goals",
        "campaignDetails": "details",
        "phenomena": "PM10"
    },
    {
    "_id": "ajiodsdakjsdajkhdskjhad",
        "title": "testcampaign3",
        "startDate": "1st November",
        "endDate": "1st December",
        "owner": "testowner",
        "aboutMe": "test",
        "campaignGoals": "goals",
        "campaignDetails": "details",
        "phenomena": "PM10"
    },
    {
      "_id": "ajiodsdakjsdajkhdskjhad",
          "title": "testcampaign4",
          "startDate": "1st November",
          "endDate": "1st December",
          "owner": "testowner",
          "aboutMe": "test",
          "campaignGoals": "goals",
          "campaignDetails": "details",
          "phenomena": "PM10"
    },
    {
      "_id": "ajiodsdakjsdajkhdskjhad",
          "title": "testcampaign5",
          "startDate": "1st November",
          "endDate": "1st December",
          "owner": "testowner",
          "aboutMe": "test",
          "campaignGoals": "goals",
          "campaignDetails": "details",
          "phenomena": "PM10"
    },
    {
      "_id": "ajiodsdakjsdajkhdskjhad",
          "title": "testcampaign6",
          "startDate": "1st November",
          "endDate": "1st December",
          "owner": "testowner",
          "aboutMe": "test",
          "campaignGoals": "goals",
          "campaignDetails": "details",
          "phenomena": "PM10"
    }]

  constructor() { }

  ngOnInit() {
  }

}
