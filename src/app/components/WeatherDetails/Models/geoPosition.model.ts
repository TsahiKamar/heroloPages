export class GeoPosition {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: {
    ID: string,
    LocalizedName: string,
    EnglishName: string
  };
  Country: {
    ID: string,
    LocalizedName: string,
    EnglishName: string
  };
  AdministrativeArea: {
    ID: string,
    LocalizedName: string,
    EnglishName: string,
    Level: number,
    LocalizedType: string,
    EnglishType: string,
    CountryID: string
  };
  TimeZone: {
    Code: string,
    Name: string,
    GmtOffset: number,
    IsDaylightSaving: boolean,
    NextOffsetChange: string 
  };
  GeoPosition: {
    Latitude: number,
    Longitude: number,
    Elevation: {
      Metric: {
        Value: number,
        Unit: string,//char
        UnitType: number
      },
      Imperial: {
        Value: number,
        Unit: string,//"ft",
        UnitType: number
      }
    }
  };
  IsAlias: boolean;
  SupplementalAdminAreas: [];
  DataSets: [
    'AirQualityCurrentConditions',
    'AirQualityForecasts',
    'Alerts',
    'ForecastConfidence'
  ]


}


// Name":"Kiryat Atidim","EnglishName":"Kiryat Atidim","PrimaryPostalCode":"","Region":{"ID":"MEA","LocalizedName":"Middle East","EnglishName":"Middle East"},"Country":{"ID":"IL","LocalizedName":"Israel","EnglishName":"Israel"},"AdministrativeArea":{"ID":"TA","LocalizedName":"Tel Aviv","EnglishName":"Tel Aviv","Level":1,"LocalizedType":"District","EnglishType":"District","CountryID":"IL"},"TimeZone":{"Code":"IDT","Name":"Asia/Jerusalem","GmtOffset":3.0,"IsDaylightSaving":true,"NextOffsetChange":"2020-10-24T23:00:00Z"},
// "GeoPosition":
// {"Latitude":32.117,"Longitude":34.845,"Elevation":{"Metric":{"Value":47.0,"Unit":"m","UnitType":5},"Imperial":{"Value":154.0,"Unit":"ft","UnitType":0}}},
// "IsAlias":false,"SupplementalAdminAreas":[],"DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Alerts","ForecastConfidence"]}