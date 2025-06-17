
import React, { useState } from 'react';
import { Search, Newspaper, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate API call - replace with your backend endpoint
    setTimeout(() => {
      setResults([
        {
          id: 1,
          headline: "Breaking: Major Development in Technology Sector",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          source: "Tech Tribune",
          timestamp: "2 hours ago",
          category: "Technology"
        },
        {
          id: 2,
          headline: "Economic Markets Show Positive Trends",
          summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          source: "Financial Herald",
          timestamp: "4 hours ago",
          category: "Finance"
        },
        {
          id: 3,
          headline: "Local Community Initiative Gains Momentum",
          summary: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          source: "Community Gazette",
          timestamp: "6 hours ago",
          category: "Local"
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const trendingTopics = [
    "AI Revolution", "Climate Change", "Space Exploration", "Healthcare Innovation", "Cryptocurrency"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Newspaper Header */}
      <header className="bg-black text-white py-6 border-b-4 border-red-600">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold font-serif tracking-wider mb-2">
              THE NEWS HERALD
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm">
              <span>ESTABLISHED 2024</span>
              <div className="w-px h-4 bg-white"></div>
              <span>EDITION NO. 1</span>
              <div className="w-px h-4 bg-white"></div>
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-12">
          <Card className="border-2 border-black shadow-lg bg-white">
            <CardHeader className="text-center bg-red-600 text-white">
              <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
                <Newspaper className="h-6 w-6" />
                BREAKING NEWS INQUIRY DESK
              </CardTitle>
              <p className="text-red-100">Ask any question about current events and breaking news</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="What's happening in the world today? Ask me anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 py-6 text-lg border-2 border-gray-300 focus:border-red-600 rounded-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !query.trim()}
                  className="w-full py-6 text-lg font-bold bg-red-600 hover:bg-red-700 text-white border-2 border-black shadow-lg transform transition hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      SEARCHING ARCHIVES...
                    </div>
                  ) : (
                    "PUBLISH INQUIRY"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Trending Topics */}
        <section className="mb-12">
          <Card className="border-2 border-black bg-white shadow-lg">
            <CardHeader className="bg-gray-800 text-white">
              <CardTitle className="text-xl font-serif flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                TODAY'S TRENDING TOPICS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {trendingTopics.map((topic, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="px-4 py-2 border-2 border-gray-800 hover:bg-gray-800 hover:text-white cursor-pointer transition-colors text-sm font-medium"
                    onClick={() => setQuery(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Results Section */}
        {results.length > 0 && (
          <section>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold font-serif text-gray-800 mb-2">
                LATEST DEVELOPMENTS
              </h2>
              <div className="w-32 h-1 bg-red-600 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <Card key={article.id} className="border-2 border-black shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardHeader className="border-b-2 border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-red-600 text-red-600">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.timestamp}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-serif leading-tight text-gray-800 hover:text-red-600 transition-colors cursor-pointer">
                      {article.headline}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {article.summary}
                    </p>
                    <div className="text-sm font-medium text-gray-600 border-t pt-3">
                      Source: {article.source}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {results.length === 0 && !isLoading && (
          <section className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-gray-600 mb-4">
                Ready to Break the Story?
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Enter your news query above to get the latest information and breaking updates from our comprehensive news database.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="border-t-4 border-red-600 pt-6">
            <p className="text-sm">
              © 2024 THE NEWS HERALD • All Rights Reserved • Powered by Advanced RAG Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
