import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppService } from '@services/app.service';

@UntilDestroy()
@Component({
  selector: 'ak-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  public taskForm!: FormGroup;

  constructor(
    private readonly appService: AppService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup<any>({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  public taskFormSubmit(): void {
    const { title, description } = this.taskForm.value;

    this.appService
      .createTask(title, description)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.taskForm.reset();
        this.router.navigateByUrl('/').then();
      });
  }
}
