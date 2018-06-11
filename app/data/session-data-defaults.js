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
      "legacyBenefits": [
        "ctc",
        "hb"
      ],
      "welsh": [
        "true"
      ],
      "landline": "",
      "mobile": "07000000000",
      "history": [
        {
          "title": "Orientation letter sent",
          "body": "Re-issue letter",
          "link": "#0",
          "time": "Automated, 1 Jan 2018, 14:11"
        },
        {
          "title": "Claimant call",
          "body": "Claimant called to confirm that they didn't need to apply yet. Captured mobile number while on call.",
          "time": "Rachael Stewart, 9 Jan 2018, 10:10"
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
        "true"
      ],
      "partnerName": "Joe Bloggs",
      "partnerCode": "1234",
      "appointee": "_unchecked",
      "appointeeName": "",
      "legacyBenefits": [
        "ctc"
      ],
      "welsh": "_unchecked"
    }
  ]


}
