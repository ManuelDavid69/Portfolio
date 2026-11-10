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

      <button type="submit" [disabled]="status() === 'sending'">
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
      margin-top: 2rem;
    }
    label {
      font-size: var(--step--1);
      font-weight: 600;
      color: var(--ink);
      margin-top: 0.75rem;
    }
    input,
    textarea {
      font: inherit;
      color: var(--text);
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: 3px;
      padding: 0.6rem 0.75rem;
      width: 100%;
    }
    input:focus,
    textarea:focus {
      border-color: var(--accent);
      outline: 1px solid var(--accent);
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
      margin-top: 1.25rem;
      font: inherit;
      font-weight: 600;
      color: var(--bg);
      background: var(--ink);
      border: 0;
      border-radius: 3px;
      padding: 0.65rem 1.25rem;
      cursor: pointer;
    }
    button:hover {
      background: var(--accent);
    }
    button:disabled {
      opacity: 0.6;
      cursor: progress;
    }
    .status {
      min-height: 1.6em;
      margin-top: 0.5rem;
    }
    .error {
      color: #b42318;
    }
    :host-context([data-theme='dark']) .error {
      color: #ff8f84;
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
