import React from "react";

export default async function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Check Your Email
        </h1>

        <p className="text-gray-600 text-center mb-6">
          We&apos;ve sent a verification link to your email address.
          <strong className="block mt-2">
            Click the link to activate your account.
          </strong>
        </p>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            What happens next?
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✓ Check your inbox (and spam folder)</li>
            <li>✓ Click the verification link in the email</li>
            <li>✓ You&apos;ll be automatically logged in and redirected</li>
            <li>✓ If you don&apos;t see it within 5 minutes, check spam</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center transition"
          >
            Open Gmail
          </a>
          <a
            href="/authentication?mode=login"
            className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg text-center hover:bg-gray-50 transition"
          >
            Back to Login
          </a>
        </div>

        {/* Troubleshooting */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Didnt receive the email?
            <a
              href="/authentication?mode=register"
              className="text-blue-600 hover:text-blue-800 ml-1"
            >
              Try signing up again
            </a>{" "}
            or contact support if the problem persists.
          </p>
        </div>
      </div>
    </div>
  );
}
