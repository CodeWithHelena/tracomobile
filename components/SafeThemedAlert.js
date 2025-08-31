import React from 'react';
import ThemedAlert from './ThemedAlert';
import { useAlert } from '../contexts/AlertContext';
const SafeThemedAlert = () => {
  const { alert, hideAlert } = useAlert();
  
  console.log("SafeThemedAlert alert state:", alert);
  
  return (
    <ThemedAlert
      visible={alert.visible}
      message={alert.message}
      type={alert.type}
      onDismiss={hideAlert}
    />
  );
};
export default SafeThemedAlert;