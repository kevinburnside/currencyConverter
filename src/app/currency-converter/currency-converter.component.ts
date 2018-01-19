import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  public availCurrency: string[] = [];
  public convertTo: string;
  public convertFrom: string;
  public convertRate: any;
  public curr: any;
  public convertFromInput: number;
  public convertToInput: any;
  public url = 'https://api.fixer.io/latest';
  constructor(private httpClient: HttpClient) {
    this.availCurrency = ['CAD', 'USD', 'EUR'];
  }
/**
 * Checks if the currency rates are selected
 * if yes then it calls the getExchanceRates fn
 */
  private fxExchange() {
    if (this.convertFrom != null || this.convertTo != null) {
    console.log('clicked');
    this.getExhangeRates();
    }
  }
/**
 * Gets the exchange rates based on selection
 * calls convert Fn to convert the rates
 */
  public async getExhangeRates() {
    this.httpClient.get(this.url, {
      params: {
        'base': this.convertFrom,
        'symbols': this.convertTo
      }
    }).toPromise()
      .then(response => {
        this.convertRate = response;
        this.curr = Object.values(this.convertRate.rates);
        this.convert();
      })
      .catch(console.log);
  }
  /**
   * Converts the rates given by the API and the users input
   */
  public convert() {
    this.convertToInput = (this.curr * this.convertFromInput).toFixed(2);
    console.log(this.convertToInput);
  }
}
