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
        "postcode": "NE2 5LS"
      },
      "partner": [
        "true"
      ],
      "partnerName": "Jane Doe",
      "partnerCode": "1234",
      "appointee": [
        "true"
      ],
      "appointeeType": "Personal",
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
          "link": "Preparation letter",
          "date": "10"
        }
      ],
      "ucbreakdown": [
        // {
        //   "title": "Universal Credit amount",
        //   "amount": "£317.80 per week"
        // },
        // {
        //   "title": "Transitional protection amount",
        //   "amount": "No TP awarded, UC is more than legacy"
        // },
        {
          "title": "Total payment amount",
          "amount": "£317.82 per week"
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
        "street": "98  Wrexham Rd",
        "street2": "",
        "city": "Fairstead",
        "postcode": "NR10 0WX"
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
          "title": "Preparation text sent",
          "link": "Preparation text",
          "date": "7"
        },
        {
          "title": "Notification letter sent",
          "link": "Notification letter",
          "date": "6"
        },
        {
          "title": "Contact with claimant added",
          "link": "Notification letter",
          "date": "3",
          "name": "Paul Mason",
          "body": "Claimant visited jobcentre about:",
          "reasons": [
            "Notification letter",
            "When they have to claim by"
          ]
        },
        {
          "title": "Reminder text sent",
          "link": "Reminder text",
          "date": "1"
        }
      ],
      "ucbreakdown": [
        // {
        //   "title": "Universal Credit amount",
        //   "amount": "251.77 per week"
        // },
        // {
        //   "title": "Universal Credit amount",
        //   "amount": "No TP awarded, UC is more than legacy"
        // },
        // {
        //   "title": "Child award",
        //   "amount": "£277.08"
        // },
        {
          "title": "Total payment amount",
          "amount": "£528.85 per week"
        }
      ]
    },
    {
      "nino": "II123456C",
      "firstName": "Jane",
      "lastName": "Roe",
      "dob": [
        "1998",
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
          "link": "Preparation letter",
          "date": "53"
        },
        {
          "title": "Preparation letter resent",
          "link": "Preparation letter",
          "date": "48",
          "name": "Paul Mason"
        },
        {
          "title": "Notification letter sent",
          "link": "Notification letter",
          "date": "23"
        },
        {
          "title": "Reminder text sent",
          "link": "Reminder text",
          "date": "19"
        },
        {
          "title": "Reminder call",
          "date": "12",
          "name": "Kay Hubbard"
        },
        {
          "title": "Claimed Universal Credit",
          "date": "10"
        }
      ],
      "ucbreakdown": [
        // {
        //   "title": "Universal Credit amount",
        //   "amount": "£317.80 per week"
        // },
        // {
        //   "title": "Universal Credit amount",
        //   "amount": "No TP awarded, UC is more than legacy"
        // },
        {
          "title": "Total payment amount",
          "amount": "395.20 per week"
        }
      ]
    }
  ]


}
