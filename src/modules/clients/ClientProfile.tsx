import React from "react";
import { Button, Text, View } from "react-native";

function ClientProfile({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="ClientProfile"
        onPress={() => navigation.push("ClientProfile", { name: "Jane" })}
      />
    </View>
  );
}

export default ClientProfile;
