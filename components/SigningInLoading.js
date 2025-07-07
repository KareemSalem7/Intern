import React from 'react';
import { Loader2 } from 'lucide-react';

const SigningInLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-xl">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#526880]/20 border-t-[#C68E17] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-[#C68E17]" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h4 className="text-xl font-semibold text-[#526880]">Signing in with Google</h4>
          <p className="text-gray-600 max-w-md">
            Please wait while we authenticate your Google account...
          </p>
        </div>
        <div className="w-full max-w-md bg-gray-100 rounded-full h-2.5">
          <div className="bg-[#C68E17] h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SigningInLoading; 