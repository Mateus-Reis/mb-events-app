import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { EventType } from "../../types/navigation";

const DUMMY_EVENTS: EventType[] = [
  {
    id: "1",
    title: "Conferência de Tecnologia",
    description:
      "Uma conferência incrível sobre as últimas tendências em tecnologia",
    date: "2024-02-20",
    location: "São Paulo, SP",
    price: 199.99,
    image: "...tenho q add imagem dps",
    category: "Tecnologia",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Eventos em Destaque</Text>

        {DUMMY_EVENTS.map((event, index) => (
          <Animated.View
            key={event.id}
            entering={FadeInUp.delay(index * 200)}
            className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
          >
            <Image
              source={{ uri: event.image }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-lg font-semibold">{event.title}</Text>
              <Text className="text-gray-600 mb-2">{event.description}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-primary font-semibold">
                  R$ {event.price.toFixed(2)}
                </Text>
                <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
                  <Text className="text-white font-semibold">Comprar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
