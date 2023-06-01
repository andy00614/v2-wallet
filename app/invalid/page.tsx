import React from 'react';

const InvalidPage = () => {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Invalid Public Key
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          The public key in the URL does not match the logged in account.
        </p>
      </div>
    </div>
  );
}

export default InvalidPage;
