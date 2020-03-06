import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div />}>
        <Switch>
         <Route path="/login" render={() => <div>silly</div>} />
         <Route render={() => <div>nomatch</div>} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
