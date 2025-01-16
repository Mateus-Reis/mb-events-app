import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { User, Settings, CreditCard, LogOut } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta");
    }
  };

  const menuItems = [
    {
      icon: User,
      title: "Dados Pessoais",
      onPress: () =>
        Alert.alert("Em breve", "Funcionalidade em desenvolvimento"),
    },
    {
      icon: CreditCard,
      title: "Métodos de Pagamento",
      onPress: () =>
        Alert.alert("Em breve", "Funcionalidade em desenvolvimento"),
    },
    {
      icon: Settings,
      title: "Configurações",
      onPress: () =>
        Alert.alert("Em breve", "Funcionalidade em desenvolvimento"),
    },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-2">Perfil</Text>
        <Text className="text-gray-600">{user?.email}</Text>
      </View>

      <View className="space-y-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            onPress={item.onPress}
            className="flex-row items-center py-4 border-b border-gray-200"
          >
            <item.icon size={24} color="#6366f1" />
            <Text className="ml-4 text-lg text-gray-800">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleSignOut}
        className="flex-row items-center py-4 mt-8"
      >
        <LogOut size={24} color="#ef4444" />
        <Text className="ml-4 text-lg text-red-500">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
