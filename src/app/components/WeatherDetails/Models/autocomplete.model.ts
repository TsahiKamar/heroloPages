export class Autocomplete {        
    
    // "Version": 1,
    // "Key": "213490",
    // "Type": "City",
    // "Rank": 20,
    // "LocalizedName": "Rome",
    // "Country": {
    //    "ID": "IT",
    //    "LocalizedName": "Italy"
    //           },
    // "AdministrativeArea": {
    //     "ID": "62",
    //     "LocalizedName": "Lazio"
    //                       }
    // }

    Version: number;
    Key: string;
    Type:string;
    Rank:number;
    LocalizedName:string;
    Country:{ID:string,LocalizedName:string};
    AdministrativeArea:{ID:string,LocalizedName:string};


}

  
  
 