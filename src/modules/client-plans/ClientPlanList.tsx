import React from "react";
import { Button, Text, View } from "react-native";

function ClientPlanList({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="ClientPlanList"
        onPress={() => navigation.navigate("ClientProfile", { name: "Jane" })}
      />
    </View>
  );
}

export default ClientPlanList;
