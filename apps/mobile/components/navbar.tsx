import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../src/context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.nombre
  )}`;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Odenta</Text>

      <View style={styles.right}>
        {/* Usuario */}
        <View style={styles.user}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <Text style={styles.username}>{user.nombre}</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  logo: {
    fontSize: 20,
    fontWeight: "600",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ddd",
  },

  username: {
    fontSize: 14,
    maxWidth: 120,
  },

  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
  },

  logoutText: {
    fontSize: 13,
    color: "#d00",
    fontWeight: "500",
  },
});
