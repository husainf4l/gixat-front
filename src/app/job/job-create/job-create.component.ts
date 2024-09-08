import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css'],
})
export class JobCreateComponent {
  @Input() clientId: number | null = null; // Default value for clientId
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.jobForm = this.fb.group({
      description: ['', [Validators.required]],
      carId: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid && this.clientId) {
      this.jobService.createJob(this.clientId, this.jobForm.value).subscribe(() => {
        console.log('Job created successfully');
      });
    }
  }
}
