import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  registerUser,
  loginUser
} from "../src/services/auth.service";
import { useAuth } from "../src/context/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      Alert.alert("Error", "Completá todos los campos");
      return;
    }

    try {
      setLoading(true);

      await registerUser({ nombre, email, password });
      const data = await loginUser({ email, password });
      await login(data.token);

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button
        title={loading ? "Creando..." : "Registrarse"}
        onPress={handleRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12
  }
});
