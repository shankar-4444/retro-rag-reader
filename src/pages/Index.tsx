import React, { useState, useEffect } from "react";
import {
  Search,
  Newspaper,
  Clock,
  TrendingUp,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsSource {
  text: string;
  source: string;
  time: string;
}

interface ApiResponse {
  answer: string;
  sources: NewsSource[];
}

const Index = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect for the answer
  useEffect(() => {
    if (answer && answer !== displayedAnswer) {
      setIsTyping(true);
      setDisplayedAnswer("");
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i < answer.length) {
          setDisplayedAnswer(answer.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(typeTimer);
        }
      }, 30);
      return () => clearInterval(typeTimer);
    }
  }, [answer]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setAnswer("");
    setDisplayedAnswer("");
    setSources([]);

    try {
      // Updated to match your backend URL
      const rawBaseUrl = import.meta.env.VITE_API_URL || "https://retro-rag-reader.onrender.com";
      const BASE_URL = rawBaseUrl.replace(/\/+$/, ""); // remove trailing slashes

      const response = await fetch(`${BASE_URL}/query`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data: ApiResponse = await response.json();
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (error) {
      console.error("Search error:", error);
      setAnswer(
        "Sorry, there was an error processing your request. Please try again."
      );
      setSources([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrendingClick = (topic: string) => {
    setQuery(topic);
  };

  const trendingTopics = [
    "AI Revolution",
    "Climate Change",
    "Space Exploration",
    "Healthcare Innovation",
    "Cryptocurrency",
  ];

  const loadingMessages = [
    "Scanning news archives...",
    "Analyzing breaking stories...",
    "Gathering latest updates...",
    "Processing information...",
    "Almost ready...",
  ];

  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentLoadingMessage((prev) => (prev + 1) % loadingMessages.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Animated Header */}
      <header className="bg-black text-white py-6 border-b-4 border-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-6xl font-bold font-serif tracking-wider mb-2 animate-fade-in">
              THE NEWS BULLOCK
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm opacity-90">
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                POWERED BY AI
              </span>
              <div className="w-px h-4 bg-white"></div>
              <span>REAL-TIME RAG</span>
              <div className="w-px h-4 bg-white"></div>
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Search Section */}
        <section className="mb-12">
          <Card className="border-2 border-black shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="text-center bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
                <Newspaper className="h-6 w-6 animate-pulse" />
                BREAKING NEWS INQUIRY DESK
              </CardTitle>
              <p className="text-red-100">
                Ask any question about current events and breaking news
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-red-600 transition-colors" />
                  <Input
                    type="text"
                    placeholder="What's happening in the world today? Ask me anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 py-6 text-lg border-2 border-gray-300 focus:border-red-600 rounded-lg transition-all duration-300 hover:shadow-md"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="w-full py-6 text-lg font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-2 border-black shadow-lg transform transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="animate-pulse">
                        {loadingMessages[currentLoadingMessage]}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      PUBLISH INQUIRY
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Enhanced Trending Topics */}
        <section className="mb-12">
          <Card className="border-2 border-black bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gray-800 text-white">
              <CardTitle className="text-xl font-serif flex items-center gap-2">
                <TrendingUp className="h-5 w-5 animate-bounce" />
                TODAY'S TRENDING TOPICS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {trendingTopics.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-4 py-2 border-2 border-gray-800 hover:bg-gray-800 hover:text-white cursor-pointer transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md"
                    onClick={() => handleTrendingClick(topic)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AI Answer Section */}
        {(answer || isLoading) && (
          <section className="mb-12">
            <Card className="border-2 border-black shadow-xl bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-xl font-serif flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI ANALYSIS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 animate-pulse">
                        {loadingMessages[currentLoadingMessage]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                      {displayedAnswer}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Sources Section */}
        {sources.length > 0 && (
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold font-serif text-gray-800 mb-2 animate-fade-in">
                SOURCE MATERIALS
              </h2>
              <div className="w-32 h-1 bg-red-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sources.map((source, index) => (
                <Card
                  key={index}
                  className="border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="border-b-2 border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className="border-blue-600 text-blue-600"
                      >
                        Source {index + 1}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {source.time !== "N/A" ? source.time : "Recent"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
                      {source.text}
                    </p>
                    {source.source !== "unknown" && (
                      <div className="border-t pt-3">
                        <a
                          href={source.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Source
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Empty State */}
        {!answer && !isLoading && sources.length === 0 && (
          <section className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <Newspaper className="h-16 w-16 text-gray-400 mx-auto animate-pulse" />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <h3 className="text-2xl font-serif text-gray-600 mb-4 animate-fade-in">
                Ready to Break the Story?
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Enter your news query above to get AI-powered analysis and the
                latest information from our comprehensive news database.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-black text-white py-8 mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="border-t-4 border-red-600 pt-6">
            <p className="text-sm opacity-90">
              © 2024 THE NEWS BULLOCK • All Rights Reserved • Powered by Advanced
              RAG Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
