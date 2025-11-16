import { COLORS } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string) => {
    // Don't navigate if already on this route
    if (isActive(path)) {
      return;
    }
    router.replace(path as any);
  };

  const navItems = [
    { path: "/", icon: "home", label: "Home" },
    { path: "/search", icon: "magnify", label: "Search" },
    { path: "/profile", icon: "account", label: "Profile" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.navButton,
                active && styles.navButtonActive,
              ]}
              onPress={() => handleNavigation(item.path)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={active ? COLORS.primary : COLORS.textMuted}
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
    // Translucent blur effect - using semi-transparent background
    // For true blur, install expo-blur and use BlurView component
    backgroundColor: Platform.select({
      ios: "rgba(0, 0, 0, 0.7)", // More translucent on iOS for blur effect
      web: "rgba(0, 0, 0, 0.75)", // Web with backdrop filter
      default: "rgba(0, 0, 0, 0.85)",
    }),
    // Backdrop blur effect (works on web)
    ...(Platform.OS === "web" && {
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
    }),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4, // Shadow above for depth
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)", // Subtle border for definition
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  // Active state using new primary color - Blue theme (replaces orange/coral-pink)
  navButtonActive: {
    backgroundColor: "rgba(91, 141, 239, 0.2)", // 20% opacity of primary color (#5B8DEF - blue)
  },
});


