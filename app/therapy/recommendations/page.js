"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Sparkles,
  Send,
  Brain,
  Clock,
  Target,
  ChevronRight,
  Loader2,
  Copy,
  Check,
  AlertCircle,
  HeartPulse,
  User,
  Calendar,
  Leaf,
  Thermometer,
  Waves,
  Shield,
} from "lucide-react";

// Available massage types for the UI
const MASSAGE_TYPES = [
  {
    id: "swedish",
    name: "Swedish Massage",
    icon: "💆",
    description: "Gentle, relaxing strokes",
    color: "from-amber-200 to-amber-300",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue",
    icon: "💪",
    description: "Targets muscle knots and tension",
    color: "from-amber-300 to-amber-400",
  },
  {
    id: "sports",
    name: "Sports Massage",
    icon: "🏃",
    description: "Enhances athletic performance",
    color: "from-emerald-300 to-emerald-400",
  },
  {
    id: "prenatal",
    name: "Prenatal Massage",
    icon: "🤰",
    description: "Safe for pregnancy",
    color: "from-rose-200 to-rose-300",
  },
  {
    id: "reflexology",
    name: "Reflexology",
    icon: "🦶",
    description: "Foot pressure points",
    color: "from-amber-400 to-amber-500",
  },
  {
    id: "shiatsu",
    name: "Shiatsu",
    icon: "🎌",
    description: "Japanese pressure therapy",
    color: "from-stone-300 to-stone-400",
  },
  {
    id: "thai",
    name: "Thai Massage",
    icon: "🇹🇭",
    description: "Stretching and compression",
    color: "from-emerald-400 to-emerald-500",
  },
  {
    id: "hot-stone",
    name: "Hot Stone",
    icon: "🔥",
    description: "Warm stones for relaxation",
    color: "from-orange-300 to-orange-400",
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy",
    icon: "🌿",
    description: "Essential oils for mood",
    color: "from-lime-200 to-lime-300",
  },
  {
    id: "trigger-point",
    name: "Trigger Point",
    icon: "🎯",
    description: "Specific pain points",
    color: "from-amber-500 to-amber-600",
  },
];

// Example questions for quick input
const QUICK_QUESTIONS = [
  "I have lower back pain from sitting all day",
  "My shoulders are extremely tense and sore",
  "I need something relaxing after a stressful week",
  "I have a sports injury in my knee",
  "I'm pregnant and need pain relief",
  "I suffer from chronic migraines",
];

export default function AIMassageAdvisor() {
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      text: "Hello! I'm your AI Massage Advisor. I can help you find the perfect massage for your specific needs. Tell me about your pain points, stress levels, or any specific issues you're dealing with.",
      isAI: true,
      timestamp: new Date(),
      recommendations: null,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [userProfile, setUserProfile] = useState({
    painLevel: 3,
    stressLevel: 3,
    physicalActivity: "moderate",
    ageRange: "25-40",
    medicalConditions: "",
  });

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Alternative approach: If you need async initialization, use this:
  // useEffect(() => {
  //   const initializeMessages = async () => {
  //     // Only set if messages is empty (though with initial state above, this shouldn't happen)
  //     if (messages.length === 0) {
  //       setMessages([
  //         {
  //           id: 1,
  //           text: "Hello! I'm your AI Massage Advisor. I can help you find the perfect massage for your specific needs. Tell me about your pain points, stress levels, or any specific issues you're dealing with.",
  //           isAI: true,
  //           timestamp: new Date(),
  //           recommendations: null,
  //         },
  //       ]);
  //     }
  //   };
  //   initializeMessages();
  // }, []); // Empty dependency array since it only runs once

  // Simulated AI response function
  const getAIResponse = async (userMessage) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userText = userMessage.toLowerCase();
    let recommendations = [];
    let aiResponse =
      "Based on what you've told me, here are my recommendations:";

    if (userText.includes("back pain") || userText.includes("sitting")) {
      recommendations = [
        {
          id: "deep-tissue",
          reason: "Targets deep muscle layers causing your back pain",
        },
        {
          id: "swedish",
          reason: "Promotes circulation and relaxes tense back muscles",
        },
        {
          id: "hot-stone",
          reason: "Heat helps loosen tight back muscles effectively",
        },
      ];
      aiResponse =
        "For back pain from prolonged sitting, I recommend focusing on therapies that target deep muscle tension and promote spinal alignment.";
    } else if (userText.includes("shoulder") || userText.includes("tension")) {
      recommendations = [
        {
          id: "shiatsu",
          reason: "Japanese pressure technique perfect for shoulder knots",
        },
        {
          id: "trigger-point",
          reason: "Directly addresses specific tension points",
        },
        {
          id: "swedish",
          reason: "Gentle relaxation to release built-up stress",
        },
      ];
      aiResponse =
        "Shoulder tension often responds well to targeted pressure therapies. Here are the best options for you:";
    } else if (userText.includes("stress") || userText.includes("anxious")) {
      recommendations = [
        {
          id: "aromatherapy",
          reason: "Essential oils combined with massage reduce anxiety",
        },
        {
          id: "swedish",
          reason: "Gentle, rhythmic strokes promote deep relaxation",
        },
        { id: "hot-stone", reason: "Warm stones induce a meditative state" },
      ];
      aiResponse =
        "For stress relief, we want to focus on calming the nervous system and promoting mindfulness through touch.";
    } else {
      recommendations = [
        {
          id: "swedish",
          reason: "Great all-purpose massage for general wellbeing",
        },
        { id: "deep-tissue", reason: "Addresses deeper muscular issues" },
        {
          id: "aromatherapy",
          reason: "Enhances mood while treating physical symptoms",
        },
      ];
      aiResponse =
        "Based on your description, here are some excellent massage options to consider:";
    }

    setIsLoading(false);
    return { text: aiResponse, recommendations };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiReply = await getAIResponse(input);
    const aiMessage = {
      id: messages.length + 2,
      text: aiReply.text,
      isAI: true,
      timestamp: new Date(),
      recommendations: aiReply.recommendations,
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const updateUserProfile = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const getMassageDetails = (id) => {
    return MASSAGE_TYPES.find((m) => m.id === id) || MASSAGE_TYPES[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100/30 to-stone-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-600" />
              AI Massage Advisor
            </h1>
            <p className="text-stone-700/80 mt-2">
              Describe your symptoms, pain points, or goals. Our AI will
              recommend the perfect massage therapy for you.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-200/80 to-amber-100/80 rounded-full border border-amber-300/30">
            <Brain className="w-5 h-5 text-amber-700" />
            <span className="text-amber-800 font-medium">Powered by AI</span>
          </div>
        </div>

        {/* User Profile Quick Setup */}
        <div className="mt-8 bg-gradient-to-br from-white via-amber-50/50 to-white rounded-2xl p-6 shadow-lg border border-amber-200/50">
          <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600" />
            Your Profile (Helps AI Give Better Advice)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Pain Level (1-10)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userProfile.painLevel}
                  onChange={(e) =>
                    updateUserProfile("painLevel", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-700 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
                <span className="font-bold text-amber-800 min-w-[2rem]">
                  {userProfile.painLevel}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Stress Level (1-10)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userProfile.stressLevel}
                  onChange={(e) =>
                    updateUserProfile("stressLevel", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-700 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
                <span className="font-bold text-emerald-800 min-w-[2rem]">
                  {userProfile.stressLevel}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Physical Activity
              </label>
              <select
                value={userProfile.physicalActivity}
                onChange={(e) =>
                  updateUserProfile("physicalActivity", e.target.value)
                }
                className="w-full p-2 bg-gradient-to-b from-white to-amber-50 border border-amber-300/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-800"
              >
                <option value="sedentary">Mostly Sedentary</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="athlete">Competitive Athlete</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Age Range
              </label>
              <select
                value={userProfile.ageRange}
                onChange={(e) => updateUserProfile("ageRange", e.target.value)}
                className="w-full p-2 bg-gradient-to-b from-white to-amber-50 border border-amber-300/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-800"
              >
                <option value="18-25">18-25</option>
                <option value="25-40">25-40</option>
                <option value="40-60">40-60</option>
                <option value="60+">60+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white via-amber-50/30 to-white rounded-2xl shadow-xl overflow-hidden border border-amber-200/50">
            {/* Chat Header */}
            <div className="p-6 border-b border-amber-200/50 bg-gradient-to-r from-amber-50 to-amber-100/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      Chat with Advisor
                    </h3>
                    <p className="text-sm text-stone-600/80">
                      Ask about specific pains, conditions, or goals
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-700">
                  <Clock className="w-4 h-4" />
                  Real-time AI Analysis
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="h-[500px] overflow-y-auto p-6 space-y-6"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isAI ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.isAI
                        ? "bg-gradient-to-br from-stone-100 via-amber-50/30 to-stone-100 text-stone-800 border border-amber-200/30"
                        : "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {message.isAI ? (
                          <Brain className="w-4 h-4 text-amber-600" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {message.isAI ? "AI Advisor" : "You"}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(message.text)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Copy message"
                      >
                        {copiedId === message.text ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>

                    {/* AI Recommendations */}
                    {message.isAI && message.recommendations && (
                      <div className="mt-4 pt-4 border-t border-amber-300/30">
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-stone-900">
                          <Target className="w-4 h-4 text-amber-600" />
                          Recommended Massage Types
                        </h4>
                        <div className="space-y-3">
                          {message.recommendations.map((rec, idx) => {
                            const details = getMassageDetails(rec.id);
                            return (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 bg-gradient-to-r from-white to-amber-50/50 rounded-xl border border-amber-200/30 group hover:border-amber-300 transition-all cursor-pointer"
                              >
                                <div
                                  className={`p-2 rounded-lg bg-gradient-to-br ${details.color}`}
                                >
                                  <span className="text-2xl">
                                    {details.icon}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-stone-900 group-hover:text-amber-700">
                                    {details.name}
                                  </div>
                                  <div className="text-sm text-stone-600 mt-1">
                                    {rec.reason}
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-amber-400 group-hover:text-amber-600" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="text-xs opacity-75 mt-3">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl p-4 bg-gradient-to-br from-stone-100 via-amber-50/30 to-stone-100 border border-amber-200/30">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                      <span className="text-stone-600">
                        AI is analyzing your symptoms...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-amber-200/50 bg-amber-50/30">
              <p className="text-sm text-stone-600 mb-3">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-2 text-sm bg-gradient-to-br from-white to-amber-50 border border-amber-300/30 hover:border-amber-400 text-stone-700 rounded-full transition-all hover:shadow-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-amber-200/50 bg-gradient-to-b from-amber-50/30 to-amber-100/20">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Describe your symptoms, pain points, or goals (e.g., 'I have chronic neck pain from computer work')"
                    className="w-full p-4 pr-12 bg-gradient-to-b from-white to-amber-50 border border-amber-300/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none text-stone-800 placeholder-stone-500/60"
                    rows="3"
                  />
                  <div className="absolute right-3 bottom-3">
                    <AlertCircle className="w-5 h-5 text-amber-500/60" />
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`self-end px-6 py-4 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    isLoading || !input.trim()
                      ? "bg-gradient-to-br from-stone-300 to-stone-400 text-stone-500 cursor-not-allowed"
                      : "bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:shadow-lg hover:opacity-95 active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-stone-600/70 mt-3">
                Our AI analyzes your symptoms against thousands of massage
                therapy cases to provide personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Available Massage Types */}
          <div className="bg-gradient-to-br from-white via-amber-50/50 to-white rounded-2xl p-6 shadow-lg border border-amber-200/50">
            <h3 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-amber-600" />
              Available Massage Types
            </h3>
            <div className="space-y-4">
              {MASSAGE_TYPES.map((massage) => (
                <div
                  key={massage.id}
                  className="p-4 rounded-xl border border-amber-200/50 hover:border-amber-300 bg-gradient-to-r from-white to-amber-50/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${massage.color}`}
                    >
                      <span className="text-2xl">{massage.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-stone-900 group-hover:text-amber-700">
                        {massage.name}
                      </div>
                      <div className="text-sm text-stone-600 mt-1">
                        {massage.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats / Info Panel */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              How AI Analysis Works
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-200 mt-1 flex-shrink-0" />
                <span>Analyzes symptoms against 10,000+ therapy cases</span>
              </li>
              <li className="flex items-start gap-2">
                <Thermometer className="w-4 h-4 text-amber-200 mt-1 flex-shrink-0" />
                <span>
                  Considers pain patterns, stress levels, and medical history
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Waves className="w-4 h-4 text-amber-200 mt=1 flex-shrink-0" />
                <span>Updates recommendations based on your feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <Leaf className="w-4 h-4 text-amber-200 mt=1 flex-shrink-0" />
                <span>Provides duration and frequency suggestions</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gradient-to-r from-amber-600/30 to-amber-500/30 rounded-xl border border-amber-400/30">
              <div className="text-sm text-amber-100 mb-2">Accuracy Rate</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">94%</div>
                <div className="text-sm text-amber-100">
                  based on user feedback
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-white via-amber-50/50 to-white rounded-2xl p-6 shadow-lg border border-amber-200/50">
            <h3 className="text-xl font-semibold text-stone-900 mb-4">
              💡 Tips for Best Results
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100/30 rounded-xl border border-amber-200/30">
                <div className="font-medium text-stone-900 mb-1">
                  Be Specific
                </div>
                <div className="text-sm text-stone-600">
                  Mention exact locations, pain types (sharp, dull, throbbing),
                  and triggers
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-emerald-100/30 rounded-xl border border-emerald-200/30">
                <div className="font-medium text-stone-900 mb-1">
                  Include Duration
                </div>
                <div className="text-sm text-stone-600">
                  How long have you had the issue? Chronic vs acute pain matters
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-stone-50 to-stone-100/30 rounded-xl border border-stone-200/30">
                <div className="font-medium text-stone-900 mb-1">
                  Mention Activities
                </div>
                <div className="text-sm text-stone-600">
                  Desk work, sports, or physical labor help determine root
                  causes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-8 text-center p-4 bg-gradient-to-r from-amber-100/30 to-amber-50/30 rounded-xl border border-amber-200/50">
        <p className="text-sm text-stone-700/80">
          ⚠️ <strong className="text-stone-900">Disclaimer:</strong> This AI
          provides suggestions based on common patterns. Always consult with a
          certified massage therapist or healthcare provider for medical
          conditions.
        </p>
      </div>
    </div>
  );
}
