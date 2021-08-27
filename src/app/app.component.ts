import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  public weatherSearchForm: FormGroup;
  public weatherData: any;
 

  constructor(
    private formBuilder: FormBuilder,
   
  ) {}
  WeatherData: any;
  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      city: ['']
    });
    this.WeatherData = {
      main : {}
    };
   
  }
  async getWeatherData(formValues){
  // alert(formValues.city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${formValues.city}&appid=fd58ff5dbef8c84fbba211800b4d3cf9`)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }
  setWeatherData(data){
    this.WeatherData = data;
   
    console.log(this.WeatherData);
    
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.icon=(this.WeatherData.weather[0].icon);
    this.WeatherData.description=(this.WeatherData.weather[0].description);
       
  }

}
