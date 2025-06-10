import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, RefreshControl, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setHasError(false);
    // The WebView will automatically reload when the refresh control is released
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    setRefreshing(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load arXiv</Text>
            <Text style={styles.errorSubText}>Pull down to refresh</Text>
          </View>
        ) : (
          <WebView 
            source={{ uri: 'https://arxiv.org' }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
          />
        )}
      </ScrollView>
      {isLoading && <LoadingIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  webview: {
    flex: 1,
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666',
  },
}); 