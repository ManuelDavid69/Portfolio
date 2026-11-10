import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { LangService } from '../../core/lang.service';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="send()" novalidate>
      <label for="cf-name">{{ i18n.t('formName') }}</label>
      <input id="cf-name" formControlName="name" autocomplete="name" maxlength="100" />

      <label for="cf-email">{{ i18n.t('formEmail') }}</label>
      <input id="cf-email" formControlName="email" type="email" autocomplete="email" maxlength="200" />

      <label for="cf-message">{{ i18n.t('formMessage') }}</label>
      <textarea id="cf-message" formControlName="message" rows="6" maxlength="5000"></textarea>

      <div class="trap" aria-hidden="true">
        <label for="cf-website">Website</label>
        <input id="cf-website" formControlName="website" tabindex="-1" autocomplete="off" />
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="status() === 'sending'">
        {{ status() === 'sending' ? i18n.t('formSending') : i18n.t('formSend') }}
      </button>

      <p class="status" role="status" aria-live="polite">
        @switch (status()) {
          @case ('sent') { {{ i18n.t('formSent') }} }
          @case ('error') { <span class="error">{{ i18n.t('formError') }}</span> }
          @case ('invalid') { <span class="error">{{ i18n.t('formInvalid') }}</span> }
        }
      </p>
    </form>
  `,
  styles: `
    form {
      display: grid;
      gap: 0.35rem;
      padding: 1.5rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }
    label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--heading);
      margin-top: 0.6rem;
    }
    label:first-child {
      margin-top: 0;
    }
    input,
    textarea {
      font: inherit;
      color: var(--text);
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.6rem 0.75rem;
      width: 100%;
    }
    input:focus,
    textarea:focus {
      border-color: var(--accent);
      outline: 2px solid var(--accent-soft);
    }
    textarea {
      resize: vertical;
    }
    .trap {
      position: absolute;
      left: -10000px;
    }
    button {
      justify-self: start;
      margin-top: 1rem;
    }
    .status {
      min-height: 1.5em;
      margin: 0.25rem 0 0;
      font-size: 0.925rem;
    }
    .error {
      color: #dc2626;
    }
  `,
})
export class ContactForm {
  readonly i18n = inject(LangService);
  private readonly api = inject(ApiService);

  readonly status = signal<Status>('idle');

  readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    website: [''],
  });

  send() {
    if (this.form.invalid) {
      this.status.set('invalid');
      return;
    }
    this.status.set('sending');
    this.api.sendContact({ ...this.form.getRawValue(), lang: this.i18n.lang() }).subscribe({
      next: () => {
        this.status.set('sent');
        this.form.reset();
      },
      error: () => this.status.set('error'),
    });
  }
}
