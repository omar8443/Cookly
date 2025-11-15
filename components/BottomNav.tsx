import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", icon: "home", label: "Home" },
    { path: "/search", icon: "magnify", label: "Search" },
    { path: "/profile", icon: "account", label: "Profile" },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.navBar, { backgroundColor: theme.colors.surface }]}>
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.navButton,
                active && { backgroundColor: theme.colors.primaryContainer },
              ]}
              onPress={() => router.push(item.path as any)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "85%",
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});


