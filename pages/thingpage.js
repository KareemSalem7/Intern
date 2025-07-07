import React from 'react';
import ThingsList from '../components/ThingsList';
import Header from '../components/Header';
import { UserProvider } from '../lib/UserContext';

export default function Home() {
  return (
    <UserProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <ThingsList />
        </main>
      </div>
    </UserProvider>
  );
}
