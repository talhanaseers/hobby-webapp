import React from 'react';
import './custom-styles.css';

// AWS imports
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


// Importing components from the correct path
import SiteNav from '../Commons/SiteNav'; 
import SiteFooter from '../Commons/SiteFooter';

function Journal() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <SiteNav logOut={signOut} /> {/* Custom Nav Component */}

          <div className="container">
              <h1>This is the journal page</h1>
          </div>

          <SiteFooter /> {/* Custom Footer Component */}
        </div>
      )}
    </Authenticator>
  );
}

export default Journal;
