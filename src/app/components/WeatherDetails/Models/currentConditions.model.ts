export class CurrentConditions {        
    LocalObservationDateTime: string; //date
    EpochTime:number;
    WeatherText: string;
    WeatherIcon:number;
    HasPrecipitation:boolean;
    PrecipitationType:string;
    IsDayTime:boolean;
    Temperature: { Metric: {Value:number,Unit:string,UnitType:number}, Imperial: {Value:number,Unit:string,UnitType:number}};
    MobileLink:string;
    Link:string;
}

//[{"LocalObservationDateTime":"2020-08-06T10:16:00+03:00","EpochTime":1596698160,"WeatherText":"Clouds and sun","WeatherIcon":4,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":{"Value":29.6,"Unit":"C","UnitType":17},"Imperial":{"Value":85.0,"Unit":"F","UnitType":18}},"MobileLink":"http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us","Link":"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"}]


  
//"Temperature":{"Metric":{"Value":31.1,"Unit":"C","UnitType":17},"Imperial":{"Value":88.0,"Unit":"F","UnitType":18}}