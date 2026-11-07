'use client';

import { useState, useTransition } from 'react';
import { sendEmail } from '@/app/actions/sendEmail';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await sendEmail(formData);
      if (result.success) {
        setIsError(false);
        setResponseMessage('Message sent successfully!');
        (event.target as HTMLFormElement).reset();
      } else {
        setIsError(true);
        setResponseMessage(result.error || 'Failed to send message.');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" name="name" required className="w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" name="email" required className="w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" required rows={4} className="w-full border rounded p-2" />
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {responseMessage && (
        <p className={`text-sm mt-2 ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {responseMessage}
        </p>
      )}
    </form>
  );
}