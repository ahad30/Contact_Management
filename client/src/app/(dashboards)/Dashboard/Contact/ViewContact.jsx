import React from 'react';

const ViewContact = ({ selectedContact }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Contact Details</h2>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-lg text-gray-900">{selectedContact?.name}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-lg text-gray-900">{selectedContact?.email}</p>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <p className="mt-1 text-lg text-gray-900">{selectedContact?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;