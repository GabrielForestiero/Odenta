import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Navbar } from "../../components/navbar";

export default function Home() {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated]);

  if (loading || !isAuthenticated) return null;

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={styles.screen}>
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 📄 Contenido */}
      <View style={styles.container}>
        <Text style={styles.text}>Bienvenido 🎉</Text>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  text: {
    fontSize: 20,
  },
});
