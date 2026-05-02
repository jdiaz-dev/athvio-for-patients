import { PaperProvider } from 'react-native-paper';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './src/core/graphql/ApolloClient';
import AuthProvider from 'src/modules/auth/adapters/in/components/providers/AuthProvider';
import { Provider } from 'react-redux';
import store from 'src/core/redux/configureStore';
import { ThemeContextProvider, useAppTheme } from 'src/shared/theme/ThemeContext';
import Screens from 'src/core/components/Screens';

function Root() {
  const { theme } = useAppTheme();

  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <AuthProvider>
            <Screens />
          </AuthProvider>
        </Provider>
      </PaperProvider>
    </ApolloProvider>
  );
}
export default function App() {
  return (
    <ThemeContextProvider>
      <Root />
    </ThemeContextProvider>
  );
}
