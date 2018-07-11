/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  "statuses": ["Prepare", "Notified", "Claimed", "Deferred", "Exempt", "Extended", "Not claimed"],

  "claimants": [
    {
      "nino": "QQ123456C",
      "firstName": "Joe",
      "lastName": "Bloggs",
      "dob": [
        "1980",
        "1",
        "1"
      ],
      "address": {
        "street": "23 River View",
        "street2": "",
        "city": "Bedlington",
        "postcode": "NE22 5LS"
      },
      "partner": [
        "true"
      ],
      "partnerName": "Jane Doe",
      "partnerCode": "1234",
      "appointee": [
        "true"
      ],
      "appointeeName": "Richard Roe",
      "appointeeNino": "UI255634A",
      "legacyBenefits": [
        "Housing Benefit",
        "income-based Jobseeker’s Allowance (JSA)"
      ],
      "welsh": [
        "false"
      ],
      "landline": "",
      "mobile": "07771900900",
      "status": "Prepare",
      "history": [
        {
          "title": "Preparation letter sent",
          "body": "Re-issue letter",
          "link": "Preparation letter",
          "time": "1 Jun 2018"
        }
      ],
      "ucbreakdown": [
        {
          "title": "Universal Credit amount",
          "amount": "£317.80 per week"
        },
        {
          "title": "Universal Credit amount",
          "amount": "No TP awarded, UC is more than legacy"
        },
        {
          "title": "Total benefit amount",
          "amount": "£317.80 per week"
        }
      ]
    },
    {
      "nino": "UU123456C",
      "firstName": "Jane",
      "lastName": "Doe",
      "dob": [
        "1972",
        "12",
        "12"
      ],
      "address": {
        "street": "23 River View",
        "street2": "",
        "city": "Bedlington",
        "postcode": "NE22 5LS"
      },
      "partner": [
        "false"
      ],
      "child": [
        "true"
      ],
      "childDOB": [
        "2009",
        "7",
        "23"
      ],
      "childDisability": "true",
      "partnerName": "",
      "partnerCode": "",
      "appointee": "_unchecked",
      "appointeeName": "",
      "legacyBenefits": [
        "Child Tax Credit"
      ],
      "welsh": "true",
      "landline": "0121 496 0649",
      "mobile": "07700900374",
      "status": "Completed",
      "history": [
        {
          "title": "Preparation letter sent",
          "body": "Re-issue letter",
          "link": "Preparation letter",
          "time": "1 Feb 2018"
        },
        {
          "title": "Notification letter sent",
          "body": "Re-issue letter",
          "link": "Notification letter",
          "time": "1 Mar 2018"
        },
        {
          "title": "Reminder text sent",
          "body": "Re-issue text",
          "link": "Reminder text",
          "time": "14 Mar 2018"
        }
      ],
      "ucbreakdown": [
        {
          "title": "Universal Credit amount",
          "amount": "£317.80 per week"
        },
        {
          "title": "Universal Credit amount",
          "amount": "No TP awarded, UC is more than legacy"
        },
        {
          "title": "Total benefit amount",
          "amount": "£317.80 per week"
        }
      ]
    },
    {
      "nino": "II123456C",
      "firstName": "Jane",
      "lastName": "Roe",
      "dob": [
        "1972",
        "12",
        "12"
      ],
      "address": {
        "street": "23 River View",
        "street2": "",
        "city": "Bedlington",
        "postcode": "NE22 5LS"
      },
      "partner": [
        "false"
      ],
      "partnerName": "",
      "partnerCode": "",
      "appointee": "_unchecked",
      "appointeeName": "",
      "legacyBenefits": [
        "income-related Employment and Support Allowance (ESA)"
      ],
      "welsh": "_unchecked",
      "landline": "0121 496 0649",
      "mobile": "07700900374",
      "status": "Claimed",
      "history": [
        {
          "title": "Preparation letter sent",
          "body": "Re-issue letter",
          "link": "Preparation letter",
          "time": "1 Feb 2018"
        },
        {
          "title": "Notification letter sent",
          "body": "Re-issue letter",
          "link": "Notification letter",
          "time": "1 Mar 2018"
        },
        {
          "title": "Reminder text sent",
          "body": "Re-issue text",
          "link": "Reminder text",
          "time": "14 Mar 2018"
        },
        {
          "title": "Reminder call sent",
          "time": "28 Mar 2018"
        },
        {
          "title": "Claimed Universal Credit",
          "time": "29 Mar 2018"
        }
      ],
      "ucbreakdown": [
        {
          "title": "Universal Credit amount",
          "amount": "£317.80 per week"
        },
        {
          "title": "Universal Credit amount",
          "amount": "No TP awarded, UC is more than legacy"
        },
        {
          "title": "Total benefit amount",
          "amount": "£317.80 per week"
        }
      ]
    }
  ]


}
