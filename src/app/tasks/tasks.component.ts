import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '@services/app.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ak-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  public taskForm!: FormGroup;

  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup<any>({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  public taskFormSubmit(): void {
    if (this.taskForm.valid) {
      const { title, description } = this.taskForm.value;

      this.appService
        .createTask(title, description)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.taskForm.reset();
        });
    }
  }
}
