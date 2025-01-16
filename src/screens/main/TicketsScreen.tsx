import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ticket } from "lucide-react-native";

type TicketType = {
  id: string;
  eventTitle: string;
  date: string;
  location: string;
  ticketNumber: string;
};

const DUMMY_TICKETS: TicketType[] = [
  {
    id: "1",
    eventTitle: "Conferência de Tecnologia",
    date: "2024-02-20",
    location: "São Paulo, SP",
    ticketNumber: "TK-001",
  },
];

export default function TicketsScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Meus Ingressos</Text>

        {DUMMY_TICKETS.map((ticket, index) => (
          <Animated.View
            key={ticket.id}
            entering={FadeInUp.delay(index * 200)}
            className="bg-white rounded-lg shadow-sm mb-4 p-4 border border-gray-200"
          >
            <View className="flex-row items-center mb-2">
              <Ticket size={24} color="#6366f1" />
              <Text className="text-lg font-semibold ml-2">
                {ticket.eventTitle}
              </Text>
            </View>

            <View className="border-t border-gray-200 mt-2 pt-2">
              <Text className="text-gray-600">Data: {ticket.date}</Text>
              <Text className="text-gray-600">Local: {ticket.location}</Text>
              <Text className="text-gray-600">
                Nº do Ingresso: {ticket.ticketNumber}
              </Text>
            </View>

            <TouchableOpacity className="bg-primary mt-3 px-4 py-2 rounded-lg">
              <Text className="text-white text-center font-semibold">
                Ver Detalhes
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
