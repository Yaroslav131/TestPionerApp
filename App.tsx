import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { ContentContainer } from './src/components/ContentContainer';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContentContainer>
          <AppNavigator />
        </ContentContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;