import { useEffect, useState } from 'react';
import {
  Cog6ToothIcon,
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function AccountPanel() {
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedIsAdmin = localStorage.getItem('isAdmin');

    if (storedEmail) setEmail(storedEmail);
    if (storedIsAdmin === 'true') setIsAdmin(true);
  }, []);

  if (!isAdmin) return null;

  const name = email.replace(/@.*$/, '');

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Cog6ToothIcon className="h-6 w-6 text-blue-600" />

        <h2 className="text-2xl font-bold text-gray-800">Setting</h2>
      </div>

      <div className="space-y-4 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-gray-500" />
          <span>
            <strong>Name:</strong> {name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <EnvelopeIcon className="h-5 w-5 text-gray-500" />

          <span>
            <strong>Email:</strong> {email}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-5 w-5 text-gray-500" />
          <span>
            <strong>Role:</strong> Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
         <CalendarDaysIcon className="h-5 w-5 text-gray-500" />

          <span>
            <strong>Creation date:</strong> undefined
          </span>
        </div>
      </div>
    </div>
  );
}
