import React, { useState, useEffect, useRef } from 'react';
import { User, Calendar, BookOpen, CheckSquare, Users, Play, FileText, Clock, ChevronRight, LogOut, Home, Star, Lock, Eye, EyeOff, Bell, Settings, MessageCircle, Video, Download, Heart, Bookmark, Search, Filter, ChevronDown, Award, Flame, Target, Compass, Crown, Zap, Gift, CheckCircle, X, Send, Bot, Sparkles, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

// Sacred Geometry Logo Component
const AyekaLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGrad)" strokeWidth="2" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="15" fill="url(#logoGrad)" opacity="0.3" />
    <path d="M50 5 L50 95 M5 50 L95 50" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.5" />
    <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" />
  </svg>
);

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="rgb(229 231 235)" strokeWidth={strokeWidth} fill="transparent"
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="rgb(99 102 241)" strokeWidth={strokeWidth} fill="transparent"
        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
        strokeLinecap="round" className="transition-all duration-500"
      />
    </svg>
  );
};

// Tier Badge Component
const TierBadge = ({ tier, size = "md" }) => {
  const tiers = {
    novice: { color: "bg-gray-100 text-gray-700", icon: Bookmark, label: "Novice" },
    seeker: { color: "bg-blue-100 text-blue-700", icon: Compass, label: "Seeker" },
    mystic: { color: "bg-indigo-100 text-indigo-700", icon: Star, label: "Mystic" },
    teacher: { color: "bg-purple-100 text-purple-700", icon: Crown, label: "Teacher" }
  };
  
  const config = tiers[tier] || tiers.novice;
  const Icon = config.icon;
  const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${config.color} ${sizeClasses}`}>
      <Icon size={size === "sm" ? 12 : 14} />
      {config.label}
    </span>
  );
};

// Usage Indicator for ZevGPT
const UsageIndicator = ({ remaining, total, showWarning = false }) => {
  const percentage = (remaining / total) * 100;
  
  return (
    <div className={`px-4 py-2 border-b ${showWarning ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-center justify-between text-sm">
        <span className={`font-medium ${showWarning ? 'text-orange-700' : 'text-gray-700'}`}>
          ZevGPT Messages: {remaining} / {total}
        </span>
        {showWarning && (
          <span className="text-orange-600 font-medium">Running low</span>
        )}
      </div>
      <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full transition-all duration-300 ${
            showWarning ? 'bg-orange-500' : 'bg-indigo-600'
          }`}
          style={{ width: `${Math.max(percentage, 5)}%` }}
        />
      </div>
    </div>
  );
};

// Chat Message Component
const ChatMessage = ({ role, content, timestamp, isStreaming = false }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-indigo-600 text-white' : 'bg-amber-100 text-amber-700'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={`max-w-[70%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 rounded-2xl ${
          isUser 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p className="text-sm leading-relaxed">{content}</p>
          {isStreaming && (
            <div className="flex items-center gap-1 mt-2">
              <div className="w-1 h-1 bg-amber-600 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-amber-600 rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-1 bg-amber-600 rounded-full animate-pulse delay-150"></div>
            </div>
          )}
        </div>
        {timestamp && (
          <p className="text-xs text-gray-500 mt-1 px-2">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};

// Coming Soon ZevGPT Component
const ComingSoonZevGPT = ({ userTier }) => {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  
  const handleNotifyMe = (e) => {
    e.preventDefault();
    // TODO: Add email to waitlist
    setNotified(true);
  };
  
  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">
          <Sparkles size={16} />
          <span className="text-sm font-medium">Coming Soon</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ZevGPT: AI Spiritual Guidance</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          Experience personalized spiritual guidance powered by Zev's teachings on Kabbalah, 
          Enneagram, quantum consciousness, and contemplative practice—available 24/7.
        </p>
      </div>
      
      {/* Feature Preview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <MessageCircle className="text-indigo-600 mb-3" size={32} />
          <h3 className="font-semibold text-gray-900 mb-2">Socratic Dialogue</h3>
          <p className="text-gray-600 text-sm">Guided questioning that leads to personal insights and spiritual breakthroughs</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Star className="text-purple-600 mb-3" size={32} />
          <h3 className="font-semibold text-gray-900 mb-2">Ancient Wisdom</h3>
          <p className="text-gray-600 text-sm">Teachings grounded in authentic Kabbalah, Enneagram psychology, and mystic tradition</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Zap className="text-amber-600 mb-3" size={32} />
          <h3 className="font-semibent text-gray-900 mb-2">Quantum Integration</h3>
          <p className="text-gray-600 text-sm">Where ancient mysticism meets modern consciousness research</p>
        </div>
      </div>
      
      {/* Access Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6 max-w-md w-full">
        <h4 className="font-semibold text-gray-900 mb-4">Your Access Level</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Mystic Tier</span>
            <span className="text-indigo-600 font-medium">175 messages/month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Teacher Track</span>
            <span className="text-purple-600 font-medium">Unlimited access</span>
          </div>
          {userTier === 'seeker' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 text-sm">
                Upgrade to Mystic to access ZevGPT when available
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Launch Timeline */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 mb-6 max-w-md w-full">
        <h4 className="font-semibold mb-2">Expected Launch</h4>
        <p className="text-indigo-100 mb-2">Phase 1: February 2026</p>
        <div className="text-sm text-indigo-200">
          Beta testing begins January 2026 for Teacher track members
        </div>
      </div>
      
      {/* Notification Signup */}
      {!notified ? (
        <form onSubmit={handleNotifyMe} className="w-full max-w-md">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Get notified when ZevGPT launches"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Notify Me
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <CheckCircle className="text-green-600 mx-auto mb-2" size={32} />
          <p className="text-green-700 font-medium">You'll be notified when ZevGPT launches!</p>
        </div>
      )}
    </div>
  );
};

// Active ZevGPT Chat Component
const ZevGPTChat = ({ userId, userTier, remainingMessages = null }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: "Shalom. I am here to walk with you on your spiritual journey, drawing from the wisdom of Kabbalah, the insights of the Enneagram, and the mysteries where quantum consciousness meets ancient knowing. Tell me—where are you right now in your seeking?",
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // TODO: Replace with actual API call
      setTimeout(() => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I hear you exploring this question. What draws you to ask this now? Sometimes the soul poses questions not for answers, but to awaken something within us that already knows. Can you sit with this inquiry for a moment and notice what arises?",
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
      setIsTyping(false);
    }
  };
  
  const isLimitApproaching = userTier === 'mystic' && remainingMessages !== null && remainingMessages < 25;
  const hasNoMessagesLeft = userTier === 'mystic' && remainingMessages === 0;
  
  if (hasNoMessagesLeft) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <AlertTriangle className="text-orange-500 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly Limit Reached</h3>
        <p className="text-gray-600 mb-6">You've used all 175 ZevGPT messages for this month.</p>
        <div className="space-y-3">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Upgrade to Teacher Track for Unlimited Access
          </button>
          <p className="text-sm text-gray-500">Or wait for your limit to reset next month</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Usage indicator for Mystic tier */}
      {userTier === 'mystic' && remainingMessages !== null && (
        <UsageIndicator 
          remaining={remainingMessages} 
          total={175}
          showWarning={isLimitApproaching}
        />
      )}
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && (
          <ChatMessage
            role="assistant"
            content="..."
            isStreaming={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Limit warning */}
      {isLimitApproaching && (
        <div className="px-4 py-3 bg-orange-50 border-t border-orange-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-orange-500 mt-0.5" size={16} />
            <div className="flex-1">
              <p className="text-orange-800 text-sm font-medium">
                You have {remainingMessages} messages remaining this month
              </p>
              <button className="text-orange-600 hover:text-orange-700 text-sm underline">
                Upgrade to Teacher Track for unlimited access
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Input form */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Share what's stirring in your soul..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Send size={16} />
            Send
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          ZevGPT provides guidance based on Zev's teachings. For crisis support, please contact a mental health professional.
        </p>
      </div>
    </div>
  );
};

// Lock Overlay Component for Restricted Content
const LockedContent = ({ title, description, tier, onUpgrade }) => (
  <div className="relative group cursor-pointer" onClick={onUpgrade}>
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/40 rounded-lg z-10 flex items-center justify-center">
      <div className="text-center text-white">
        <Lock className="mx-auto mb-2" size={24} />
        <p className="text-sm font-medium">Unlock with {tier}</p>
        <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
    <div className="bg-white rounded-lg border border-gray-200 p-4 opacity-75">
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// Pricing Card Component
const PricingCard = ({ 
  tier, 
  title, 
  price, 
  period, 
  description, 
  features, 
  buttonText, 
  highlighted = false,
  onSelect,
  badge,
  originalPrice
}) => (
  <div className={`rounded-2xl p-8 ${highlighted ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white transform scale-105' : 'bg-white border border-gray-200'}`}>
    {badge && (
      <div className="text-center mb-4">
        <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {badge}
        </span>
      </div>
    )}
    
    <div className="text-center mb-6">
      <TierBadge tier={tier} />
      <h3 className={`text-xl font-bold mt-3 ${highlighted ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`mt-2 ${highlighted ? 'text-indigo-100' : 'text-gray-600'}`}>{description}</p>
    </div>
    
    <div className="text-center mb-8">
      {originalPrice && (
        <div className={`text-sm ${highlighted ? 'text-indigo-200' : 'text-gray-500'} line-through`}>
          ${originalPrice}/month
        </div>
      )}
      <div className="flex items-baseline justify-center">
        <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>${price}</span>
        {period && <span className={`ml-1 ${highlighted ? 'text-indigo-200' : 'text-gray-600'}`}>/{period}</span>}
      </div>
      {tier === 'seeker' && (
        <div className={`text-sm mt-1 ${highlighted ? 'text-indigo-200' : 'text-indigo-600'} font-medium`}>
          ✡ Chai - Life in Hebrew
        </div>
      )}
    </div>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle className={`mt-0.5 flex-shrink-0 ${highlighted ? 'text-green-300' : 'text-green-500'}`} size={16} />
          <span className={`text-sm ${highlighted ? 'text-indigo-100' : 'text-gray-600'}`}>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button
      onClick={() => onSelect(tier)}
      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
        highlighted 
          ? 'bg-white text-indigo-600 hover:bg-gray-100' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
      }`}
    >
      {buttonText}
    </button>
  </div>
);

// Main App Component
const AyekaApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedTier, setSelectedTier] = useState('seeker');
  const [trialDaysLeft, setTrialDaysLeft] = useState(14);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [zevGPTEnabled, setZevGPTEnabled] = useState(false); // Toggle for development
  const [remainingGPTMessages, setRemainingGPTMessages] = useState(175);
  
  // Mock user tiers for demo
  const userTiers = {
    novice: { library: ['basic'], live: false, coaching: false, zevgpt: false },
    seeker: { library: ['basic', 'kabbalah'], live: false, coaching: false, zevgpt: false },
    mystic: { library: ['basic', 'kabbalah', 'enneagram', 'quantum'], live: true, coaching: false, zevgpt: true },
    teacher: { library: 'all', live: true, coaching: true, zevgpt: true }
  };

  const currentTier = currentUser?.tier || 'novice';
  const tierAccess = userTiers[currentTier];

  // Library content with access controls
  const libraryContent = [
    {
      id: 1,
      title: "Foundations of Spiritual Practice",
      description: "Beginning your journey with contemplative traditions",
      category: "basic",
      type: "video",
      duration: "45 min",
      locked: false
    },
    {
      id: 2,
      title: "Introduction to Kabbalah",
      description: "The Tree of Life and its mystical significance",
      category: "kabbalah", 
      type: "course",
      duration: "2 hours",
      locked: !tierAccess.library.includes('kabbalah') && tierAccess.library !== 'all'
    },
    {
      id: 3,
      title: "Quantum Consciousness",
      description: "Where science meets spirituality",
      category: "quantum",
      type: "video",
      duration: "1 hour",
      locked: !tierAccess.library.includes('quantum') && tierAccess.library !== 'all'
    },
    {
      id: 4,
      title: "Enneagram Deep Dive",
      description: "Personality patterns and spiritual growth",
      category: "enneagram",
      type: "course", 
      duration: "3 hours",
      locked: !tierAccess.library.includes('enneagram') && tierAccess.library !== 'all'
    },
    {
      id: 5,
      title: "Advanced Integration Practices",
      description: "Synthesizing all modalities for transformation",
      category: "advanced",
      type: "workshop",
      duration: "90 min",
      locked: tierAccess.library !== 'all'
    }
  ];

  // Updated pricing data with ZevGPT
  const pricingPlans = [
    {
      tier: 'seeker',
      title: 'Seeker',
      price: '18',
      period: 'month',
      description: 'Begin your spiritual journey with foundational teachings',
      features: [
        'Limited content library access',
        'General spirituality & intro Kabbalah',
        'Self-guided practices & homework',
        'Preview of advanced content',
        'Customer app interface'
      ],
      buttonText: 'Start Seeking',
      badge: 'CHAI ✡'
    },
    {
      tier: 'mystic',
      title: 'Mystic', 
      price: '54',
      period: 'month',
      description: 'Deepen your practice with live guidance and AI support',
      features: [
        'Full content library access',
        'All topics: Kabbalah, Enneagram, Quantum theory',
        'Monthly live lecture with Zev',
        'Monthly live meditation session',
        'ZevGPT: 175 AI guidance messages/month',
        'Complete customer app experience',
        'Priority support'
      ],
      buttonText: 'Become a Mystic',
      highlighted: true
    },
    {
      tier: 'teacher',
      title: 'Teacher Track',
      price: '2,520',
      period: '90 days',
      description: 'Intensive transformation with personal coaching',
      features: [
        '12 weekly coaching sessions over 3 months',
        'Small community cohort access',
        'Full integration of all modalities', 
        'Personal Enneagram & Kabbalah mapping',
        'Unlimited ZevGPT access',
        'Application to ongoing coaching ($1,260/month)',
        'Teacher certification pathway'
      ],
      buttonText: 'Apply for Teacher Track',
      originalPrice: '3,780'
    }
  ];

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    setShowUpgradeModal(true);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <AyekaLogo size={32} />
            <span className="text-xl font-bold text-gray-900">Ayeka</span>
          </div>
          
          {currentUser && (
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`text-sm font-medium ${currentView === 'dashboard' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('library')}
                className={`text-sm font-medium ${currentView === 'library' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Library
              </button>
              <button 
                onClick={() => setCurrentView('journey')}
                className={`text-sm font-medium ${currentView === 'journey' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                My Journey
              </button>
              {tierAccess.live && (
                <button 
                  onClick={() => setCurrentView('live')}
                  className={`text-sm font-medium ${currentView === 'live' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Live Sessions
                </button>
              )}
              {tierAccess.zevgpt && (
                <button 
                  onClick={() => setCurrentView('zevgpt')}
                  className={`flex items-center gap-1 text-sm font-medium ${currentView === 'zevgpt' ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Bot size={16} />
                  ZevGPT
                  {!zevGPTEnabled && (
                    <span className="ml-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs">Soon</span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <TierBadge tier={currentTier} size="sm" />
              {currentTier === 'novice' && trialDaysLeft > 0 && (
                <span className="text-sm text-orange-600 font-medium">
                  {trialDaysLeft} days left in trial
                </span>
              )}
              <button
                onClick={handleUpgrade}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Upgrade
              </button>
              <User className="text-gray-600 cursor-pointer hover:text-gray-900" size={20} />
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentView('pricing')}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => setCurrentUser({ name: 'Demo User', tier: 'novice' })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Start Free Trial
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Where Are You?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A spiritual guidance platform integrating ancient wisdom with modern understanding. 
            Explore Kabbalah, Enneagram psychology, quantum theory, and contemplative practice—now with AI-powered guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentUser({ name: 'Demo User', tier: 'novice' })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
            >
              Start Your 14-Day Free Trial
            </button>
            <button 
              onClick={() => setCurrentView('pricing')}
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
            >
              View Pricing
            </button>
          </div>
        </div>

        {/* New ZevGPT Feature Highlight */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-20 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot size={32} />
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Introducing ZevGPT</h2>
          <p className="text-indigo-100 text-lg mb-6 max-w-2xl mx-auto">
            Experience personalized spiritual guidance powered by Zev's teachings, available 24/7. 
            Coming February 2026 for Mystic and Teacher track members.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Beta launching January 2026</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Star, title: "Kabbalah", description: "Ancient Jewish mysticism and Tree of Life teachings" },
            { icon: Target, title: "Enneagram", description: "Personality psychology for spiritual growth" },
            { icon: Zap, title: "Quantum Theory", description: "Where science meets consciousness" },
            { icon: Heart, title: "Contemplative Practice", description: "Meditation and mindful awareness" }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <feature.icon className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Journey Stages */}
        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Your Spiritual Journey</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { tier: 'novice', title: 'Novice', description: '14-day free exploration of foundational teachings' },
              { tier: 'seeker', title: 'Seeker', description: 'Self-guided learning with limited library access' },
              { tier: 'mystic', title: 'Mystic', description: 'Full content plus live monthly sessions + ZevGPT' },
              { tier: 'teacher', title: 'Teacher', description: '90-day intensive with personal coaching + unlimited ZevGPT' }
            ].map((stage, index) => (
              <div key={index} className="text-center group cursor-pointer" onClick={() => setCurrentView('pricing')}>
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <TierBadge tier={stage.tier} size="sm" />
                  </div>
                  {index < 3 && (
                    <ChevronRight className="absolute top-8 -right-4 text-gray-300 hidden md:block" size={16} />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                <p className="text-gray-600 text-sm">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Pricing Page
  const PricingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-indigo-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Begin with a 14-day free trial, then select the level of guidance that calls to you. 
            Now with ZevGPT AI guidance included for Mystic and Teacher levels.
          </p>
        </div>

        {/* Free Trial Highlight */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center text-white mb-12">
          <Gift className="mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Start with 14 Days Free</h2>
          <p className="text-green-100 mb-4">Explore foundational content and experience the Ayeka approach</p>
          <button 
            onClick={() => setCurrentUser({ name: 'Demo User', tier: 'novice' })}
            className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Begin Your Free Trial
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              onSelect={handleTierSelect}
            />
          ))}
        </div>

        {/* ZevGPT Feature Highlight */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white mb-12">
          <Bot className="mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-2">ZevGPT: AI Spiritual Guidance</h3>
          <p className="text-indigo-100 mb-4 max-w-2xl mx-auto">
            24/7 access to Zev's teachings through AI conversation. Socratic questioning, 
            Kabbalistic wisdom, and Enneagram insights at your fingertips.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-1">Mystic Tier</h4>
              <p className="text-indigo-200 text-sm">175 messages per month</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-1">Teacher Track</h4>
              <p className="text-indigo-200 text-sm">Unlimited access</p>
            </div>
          </div>
        </div>

        {/* Coaching Note */}
        <div className="bg-purple-50 rounded-2xl p-8 text-center">
          <Crown className="mx-auto text-purple-600 mb-4" size={48} />
          <h3 className="text-xl font-bold text-purple-900 mb-2">Individual Coaching</h3>
          <p className="text-purple-700 mb-4">
            After completing the 90-day Teacher Track, apply for ongoing weekly coaching at $1,260/month. 
            Limited spots available - Zev's time is carefully curated for maximum transformation.
          </p>
          <p className="text-sm text-purple-600 italic">
            "My time is extremely limited and very valuable. Coaching is by application only."
          </p>
        </div>
      </div>
    </div>
  );

  // Member Dashboard
  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <TierBadge tier={currentTier} />
                {currentTier === 'novice' && (
                  <span className="text-orange-600 font-medium">
                    {trialDaysLeft} days remaining in free trial
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <ProgressRing progress={65} size={80} strokeWidth={6} />
              <p className="text-sm text-gray-600 mt-2">Journey Progress</p>
            </div>
          </div>
        </div>

        {/* ZevGPT Feature Preview for qualified users */}
        {tierAccess.zevgpt && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Bot size={24} />
              <h3 className="text-lg font-bold">ZevGPT is coming soon!</h3>
              <Sparkles size={20} />
            </div>
            <p className="text-indigo-100 mb-4">
              Get ready for 24/7 spiritual guidance powered by Zev's teachings. 
              {currentTier === 'mystic' ? ' You\'ll have 175 messages per month.' : ' You\'ll have unlimited access.'}
            </p>
            <div className="flex items-center gap-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Beta: January 2026</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Launch: February 2026</span>
            </div>
          </div>
        )}

        {/* Upgrade Prompt for Trial Users */}
        {currentTier === 'novice' && trialDaysLeft <= 7 && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">Your trial ends in {trialDaysLeft} days</h3>
                <p className="text-orange-100">Continue your spiritual journey and get early access to ZevGPT</p>
              </div>
              <button
                onClick={handleUpgrade}
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Choose Your Path
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: BookOpen, title: "Continue Learning", subtitle: "Resume your current course", locked: false },
            { icon: Bot, title: "ZevGPT", subtitle: tierAccess.zevgpt ? "Coming February 2026" : "Upgrade for AI guidance", locked: !tierAccess.zevgpt },
            { icon: Video, title: "Live Sessions", subtitle: tierAccess.live ? "Next: Monthly Meditation" : "Upgrade to access", locked: !tierAccess.live },
            { icon: MessageCircle, title: "Community", subtitle: currentTier === 'teacher' ? "Join the conversation" : "Available in Teacher Track", locked: currentTier !== 'teacher' }
          ].map((action, index) => (
            <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${action.locked ? 'opacity-60' : ''}`} onClick={action.locked ? handleUpgrade : undefined}>
              <action.icon className={`${action.locked ? 'text-gray-400' : 'text-indigo-600'} mb-4`} size={24} />
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.subtitle}</p>
              {action.locked && <Lock className="mt-2 text-gray-400" size={16} />}
            </div>
          ))}
        </div>

        {/* Recent Activity & Upcoming */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { title: "Completed: Foundations of Kabbalah", time: "2 hours ago", type: "course" },
                { title: "Journal Entry: Daily Reflection", time: "Yesterday", type: "journal" },
                { title: "Practice: Morning Meditation", time: "2 days ago", type: "practice" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming</h2>
            <div className="space-y-4">
              {tierAccess.zevgpt && (
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Bot className="text-purple-600 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">ZevGPT Beta Access</p>
                    <p className="text-xs text-gray-600">January 2026</p>
                  </div>
                </div>
              )}
              {tierAccess.live ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <Calendar className="text-indigo-600 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Monthly Live Meditation</p>
                      <p className="text-xs text-gray-600">Tomorrow at 7:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Video className="text-purple-600 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Live Teaching: Quantum Mysticism</p>
                      <p className="text-xs text-gray-600">Next week, Date TBA</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Lock className="mx-auto text-gray-400 mb-3" size={32} />
                  <p className="text-gray-600">Upgrade to Mystic to access live sessions</p>
                  <button
                    onClick={handleUpgrade}
                    className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Library Page with Access Controls
  const LibraryPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
          <p className="text-gray-600">
            Your access level: <TierBadge tier={currentTier} size="sm" />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryContent.map(content => (
            content.locked ? (
              <LockedContent
                key={content.id}
                title={content.title}
                description={content.description}
                tier={content.category === 'enneagram' || content.category === 'quantum' ? 'Mystic tier' : 'higher tier'}
                onUpgrade={handleUpgrade}
              />
            ) : (
              <div key={content.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {content.type === 'video' && <Play className="text-indigo-600" size={16} />}
                    {content.type === 'course' && <BookOpen className="text-green-600" size={16} />}
                    {content.type === 'workshop' && <Users className="text-purple-600" size={16} />}
                    <span className="text-xs text-gray-600 uppercase tracking-wide font-medium">{content.type}</span>
                  </div>
                  <span className="text-xs text-gray-500">{content.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{content.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{content.description}</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Continue Learning
                </button>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );

  // ZevGPT Page
  const ZevGPTPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <Bot size={24} />
              <div>
                <h1 className="text-xl font-bold">ZevGPT</h1>
                <p className="text-indigo-100 text-sm">AI spiritual guidance powered by Zev's teachings</p>
              </div>
            </div>
          </div>
          
          <div className="h-[600px]">
            {zevGPTEnabled ? (
              <ZevGPTChat 
                userId={currentUser?.id} 
                userTier={currentTier}
                remainingMessages={currentTier === 'mystic' ? remainingGPTMessages : null}
              />
            ) : (
              <ComingSoonZevGPT userTier={currentTier} />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Upgrade Modal
  const UpgradeModal = () => (
    showUpgradeModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Journey</h2>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  {...plan}
                  onSelect={(tier) => {
                    setCurrentUser({...currentUser, tier});
                    setShowUpgradeModal(false);
                    setCurrentView('dashboard');
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {!currentUser && currentView === 'home' && <HomePage />}
      {currentView === 'pricing' && <PricingPage />}
      {currentUser && currentView === 'dashboard' && <Dashboard />}
      {currentUser && currentView === 'library' && <LibraryPage />}
      {currentUser && currentView === 'zevgpt' && <ZevGPTPage />}
      
      <UpgradeModal />
    </div>
  );
};

export default AyekaApp;
