
import ClientProvider from './components/ClientProvider';
import RootLayout from './root-layout';
// Re-export metadata
export { metadata } from './metadata';
import ReduxProvider from './reduxProvider';

// Wrap the root layout with our client provider
function LayoutWrapper(props: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <RootLayout>
        <ClientProvider>{props.children}</ClientProvider>
      </RootLayout>
      </ReduxProvider>
  );
}

export default LayoutWrapper;
