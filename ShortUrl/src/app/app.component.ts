import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { IUrlData } from './core/interfaces/url-data';
import { PathService } from './core/services/path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public urlForm: FormGroup = new FormGroup({
    url: new FormControl('', Validators.required)
  })

  public destroyStream$: Subject<boolean> = new Subject<boolean>()

  public pathData!: IUrlData;

  constructor(
    private readonly pathService: PathService
  ){}

  private fetch(url: string): void {
    this.pathService.getShortURL(url)
    .pipe(
      takeUntil(this.destroyStream$),
      map(data => data.result),
    )
    .subscribe({
      next: (res) => this.pathData = res,
      error: () => alert('Wrong Url')
    })
  }

  public shortUrl(): void {
    const url = this.urlForm.getRawValue().url;
    this.fetch(url)    
  }

  public ngOnDestroy(): void {
    this.destroyStream$.next(true)
  }
  
}
