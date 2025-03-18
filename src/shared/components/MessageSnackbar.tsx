import React, { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';

function MessageSnackbar({ error }: { error: string | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(error !== null ? true : false);
  }, [error]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={() => {}}
      action={{
        label: 'Undo',
        onPress: () => {
          setVisible(false);
        },
      }}
    >
      {error}
    </Snackbar>
  );
}

export default MessageSnackbar;
