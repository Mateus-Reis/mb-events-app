import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Search } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const CATEGORIES = ["Todos", "Tecnologia", "Música", "Esportes", "Educação"];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2 mb-4">
          <Search size={20} color="#64748b" />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCategory === category ? "bg-primary" : "bg-gray-100"
              }`}
            >
              <Text
                className={`${
                  selectedCategory === category ? "text-white" : "text-gray-600"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView>
          <Animated.View entering={FadeInUp.delay(200)}>
            <Text className="text-lg font-semibold mb-2">
              Resultados da busca
            </Text>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
}
