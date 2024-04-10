import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const RootLayout = () => {
  const client = new ApolloClient({
    uri: "https://charoensin.stepzen.net/api/waxen-spaniel/__graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization:
        "apikey charoensin::stepzen.io+1000::2538f63fbd6b414ae1c8839d40e1351adf96b8b75171b4ac8f094d6969f9831d",
    },
  });

  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default RootLayout;
