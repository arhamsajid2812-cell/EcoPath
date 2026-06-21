export const generateMockEcoResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hello there! I'm ready to help you reduce your carbon footprint. How can I assist you today?";
  }
  if (lowerInput.match(/\b(challenge|quests|habit)\b/)) {
    return "Challenges are a great way to build habits! I highly recommend trying a 'Meatless Weekend' or 'Public Transit Pioneer'. Both can significantly reduce your impact.";
  }
  if (lowerInput.match(/\b(transport|car|drive|flight|fly)\b/)) {
    return "Transportation is a major emission source. Did you know that switching just 20% of your car commutes to public transit can cut your yearly footprint by nearly 500kg?";
  }
  if (lowerInput.match(/\b(food|diet|meat|vegan|vegetarian)\b/)) {
    return "Diet plays a huge role. A plant-based diet can cut your food-related emissions by up to 70%. Even just one meatless day a week makes a noticeable difference!";
  }
  if (lowerInput.match(/\b(electricity|power|energy|kwh)\b/)) {
    return "To lower your electricity footprint, try unplugging idle devices, switching to LED bulbs, and turning down your thermostat by just 1 degree in winter.";
  }
  if (lowerInput.match(/\b(1\+1|math|calculate|joke)\b/)) {
    return "I'm specifically trained to help you with environmental sustainability! I might not be a math genius, but I can definitely help you calculate your carbon footprint.";
  }
  if (lowerInput.match(/\b(thank|thanks)\b/)) {
    return "You're very welcome! Every little step counts towards a greener planet. Let me know if you need anything else.";
  }
  
  // Generic fallback responses
  const fallbacks = [
    "That's a great point. Small daily choices really add up when it comes to sustainability. Have you checked your 'Insights' tab today?",
    "Interesting! If you want to dive deeper into that, you can log it as an activity to see its exact carbon impact.",
    "I'm here to help you live more sustainably. Could you provide a bit more detail about your daily habits related to that?",
    "That's an interesting question. Based on your profile, I'd say focusing on local produce over imported goods is a great next step."
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
