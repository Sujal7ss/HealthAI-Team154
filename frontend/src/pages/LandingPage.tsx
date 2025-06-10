import React, { useState, useEffect } from "react";
import {
  Stethoscope,
  Languages,
  FileText,
  Zap,
  Users,
  BarChart3,
  Shield,
  Mic,
  Brain,
  Image,
  Activity,
  Globe,
  Target,
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
  Play,
  Pause,
  Volume2,
  TrendingUp,
  Heart,
  Eye,
  Cpu,
  Database,
  Cloud,
  Lock,
  Award,
  Star,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    patients: 0,
    accuracy: 0,
    languages: 0,
    hospitals: 0,
  });

  // Animated counter effect
  useEffect(() => {
    const targets = {
      patients: 50000,
      accuracy: 94,
      languages: 15,
      hospitals: 200,
    };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        patients: Math.floor(targets.patients * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        languages: Math.floor(targets.languages * progress),
        hospitals: Math.floor(targets.hospitals * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialTimer);
  }, []);

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Rural Health Officer",
      location: "Rajasthan",
      quote:
        "DiagnosticAI has transformed how we handle multilingual consultations. The accuracy is remarkable.",
      rating: 5,
    },
    {
      name: "Dr. Amit Kumar",
      role: "General Physician",
      location: "Bihar",
      quote:
        "The diagnostic interpretation feature has helped me catch conditions I might have missed.",
      rating: 5,
    },
    {
      name: "Dr. Meera Patel",
      role: "Mobile Clinic Director",
      location: "Gujarat",
      quote:
        "Our patient outcomes have improved significantly since implementing this AI assistant.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group">
              <div className="relative">
                <Stethoscope className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                DiagnosticAI
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["Solution", "Features", "Pricing", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 relative group py-2"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link to={"/dashboard"}>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 transform">
                  Get Started
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-2">
              {["Solution", "Features", "Pricing", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="inline-block animate-slide-in-left">
                  AI-Powered Healthcare
                </span>
                <span
                  className="text-blue-600 block animate-slide-in-right"
                  style={{ animationDelay: "0.2s" }}
                >
                  for Rural Communities
                </span>
              </h1>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Breaking language barriers and enhancing diagnostic accuracy
                with advanced AI. Empowering rural healthcare providers with
                intelligent conversation analysis and diagnostic interpretation.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Link to="/dashboard">
                <button className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
              <button
                className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform flex items-center justify-center"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="mr-2 h-5 w-5" />
                ) : (
                  <Play className="mr-2 h-5 w-5" />
                )}
                Watch Demo
              </button>
            </div>

            {/* Animated Stats */}
            <div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {animatedStats.patients.toLocaleString()}+
                </div>
                <div className="text-gray-600">Patients Served</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {animatedStats.accuracy}%
                </div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {animatedStats.languages}+
                </div>
                <div className="text-gray-600">Languages</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {animatedStats.hospitals}+
                </div>
                <div className="text-gray-600">Hospitals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Addressing Critical Healthcare Challenges
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Rural healthcare in India faces unprecedented challenges that our
              AI solution directly addresses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Languages,
                title: "Language Barriers",
                description:
                  "Diverse languages hinder accurate patient assessments and communication between doctors and patients",
                color: "red",
                delay: "0s",
              },
              {
                icon: FileText,
                title: "Inconsistent Records",
                description:
                  "Manual paperwork leads to incomplete patient histories and poor continuity of care",
                color: "orange",
                delay: "0.2s",
              },
              {
                icon: Zap,
                title: "Limited Diagnostic Tools",
                description:
                  "Lack of advanced equipment and specialists delays accurate diagnoses and treatment",
                color: "yellow",
                delay: "0.4s",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-${item.color}-50 border border-${item.color}-100 rounded-xl p-8 text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: item.delay }}
              >
                <div className="relative mb-4">
                  <item.icon
                    className={`h-12 w-12 text-${item.color}-600 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  />
                  <div
                    className={`absolute -inset-2 bg-${item.color}-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section
        id="solution"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div id="features" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Our AI-Driven Solution
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Comprehensive diagnostic assistance that transforms rural
              healthcare delivery
            </p>
          </div>

          {/* Conversation Assistant */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Conversation-to-Assessment Assistant
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Mic,
                    title: "Multilingual Speech Recognition",
                    description:
                      "Records doctor-patient interactions in any language",
                    delay: "0s",
                  },
                  {
                    icon: Languages,
                    title: "Real-time Translation",
                    description:
                      "Translates speech to English using advanced NLP models",
                    delay: "0.1s",
                  },
                  {
                    icon: Brain,
                    title: "AI-Powered Analysis",
                    description:
                      "Extracts symptoms, suggests diagnoses, and highlights red flags",
                    delay: "0.2s",
                  },
                  {
                    icon: BarChart3,
                    title: "Visual Dashboard",
                    description:
                      "Presents concise, visual case assessment summaries",
                    delay: "0.3s",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group animate-fade-in-up hover:bg-white/50 p-4 rounded-lg transition-all duration-300"
                    style={{ animationDelay: feature.delay }}
                  >
                    <div className="relative">
                      <feature.icon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">
                      Live Consultation Analysis
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">
                        LIVE
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div
                      className="flex items-center justify-between text-sm animate-fade-in"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <span className="text-gray-600">Language Detected:</span>
                      <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Hindi
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between text-sm animate-fade-in"
                      style={{ animationDelay: "0.7s" }}
                    >
                      <span className="text-gray-600">Symptoms Extracted:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div
                      className="flex items-center justify-between text-sm animate-fade-in"
                      style={{ animationDelay: "0.9s" }}
                    >
                      <span className="text-gray-600">Confidence Level:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full animate-pulse"
                            style={{ width: "94%" }}
                          ></div>
                        </div>
                        <span className="font-medium text-green-600">94%</span>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg animate-pulse-slow">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
                        <p className="text-sm font-medium text-yellow-800">
                          🚨 Red Flag Detected
                        </p>
                      </div>
                      <p className="text-xs text-yellow-700">
                        Chest pain with radiating symptoms - Immediate attention
                        required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Assistant */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-in-left">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Diagnostic Analysis
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg group hover:scale-105 transition-transform duration-300">
                      <Activity className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:animate-pulse" />
                      <p className="text-sm font-medium">ECG Normal</p>
                      <div className="w-full h-1 bg-green-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full animate-pulse"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg group hover:scale-105 transition-transform duration-300">
                      <Image className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:animate-pulse" />
                      <p className="text-sm font-medium">X-Ray Clear</p>
                      <div className="w-full h-1 bg-blue-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full animate-pulse"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800">
                        ✓ Analysis Complete
                      </p>
                    </div>
                    <p className="text-xs text-blue-700">
                      No abnormalities detected - Patient cleared for discharge
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-slide-in-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Diagnostic Interpretation Assistant
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Image,
                    title: "Medical Imaging Analysis",
                    description:
                      "Interprets X-rays, ECGs, and other diagnostic data with 94% accuracy",
                    delay: "0s",
                  },
                  {
                    icon: Shield,
                    title: "Abnormality Detection",
                    description:
                      "Uses pre-trained models to identify potential issues and anomalies",
                    delay: "0.1s",
                  },
                  {
                    icon: Users,
                    title: "Decision Support",
                    description:
                      "Empowers general physicians with AI-powered insights and recommendations",
                    delay: "0.2s",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group animate-fade-in-up hover:bg-white/50 p-4 rounded-lg transition-all duration-300"
                    style={{ animationDelay: feature.delay }}
                  >
                    <div className="relative">
                      <feature.icon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Advanced AI Architecture
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Powered by cutting-edge machine learning models and technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Speech & Translation",
                color: "blue",
                features: [
                  "Whisper for transcription",
                  "NLLB for translation",
                  "Multi-language support",
                ],
                delay: "0s",
              },
              {
                icon: Brain,
                title: "Clinical NLP",
                color: "green",
                features: [
                  "GPT-4 fine-tuned",
                  "LLaMA models",
                  "Symptom extraction",
                ],
                delay: "0.2s",
              },
              {
                icon: Image,
                title: "Diagnostic Imaging",
                color: "purple",
                features: [
                  "CheXNet for X-rays",
                  "Custom CNN models",
                  "ECG analysis",
                ],
                delay: "0.4s",
              },
            ].map((tech, index) => (
              <div
                key={index}
                className={`bg-${tech.color}-50 border border-${tech.color}-200 rounded-xl p-8 group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 animate-fade-in-up relative overflow-hidden`}
                style={{ animationDelay: tech.delay }}
              >
                {/* Animated background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${tech.color}-100/20 to-${tech.color}-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative">
                  <div className="relative mb-6">
                    <tech.icon
                      className={`h-12 w-12 text-${tech.color}-600 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div
                      className={`absolute -inset-2 bg-${tech.color}-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {tech.title}
                  </h3>

                  <ul className="space-y-3">
                    {tech.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 animate-fade-in"
                        style={{
                          animationDelay: `${0.6 + featureIndex * 0.1}s`,
                        }}
                      >
                        <div className="relative mr-3">
                          <Check className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute -inset-1 bg-green-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl animate-float"></div>
            <div
              className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full blur-xl animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            Trusted by Healthcare Professionals
          </h2>
          <p
            className="text-xl text-blue-100 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            See what doctors are saying about DiagnosticAI
          </p>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentTestimonial
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-full absolute inset-0"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-blue-200 text-sm">
                        {testimonial.role}, {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-white" : "bg-white/30"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section id="pricing" className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Flexible Business Models
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Choose the solution that fits your healthcare organization's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "B2B SaaS",
                description:
                  "Subscription-based access for hospitals and clinics",
                features: [
                  "Scalable AI diagnostics",
                  "Multilingual assistance",
                  "Cloud-based platform",
                ],
                color: "blue",
                delay: "0s",
              },
              {
                icon: Target,
                title: "Freemium Model",
                description:
                  "Essential features free, premium diagnostics paid",
                features: [
                  "Free basic features",
                  "Premium analytics",
                  "Scalable pricing",
                ],
                color: "green",
                popular: true,
                delay: "0.2s",
              },
              {
                icon: Zap,
                title: "API Licensing",
                description: "License AI APIs to medical device manufacturers",
                features: [
                  "Integration ready",
                  "White-label options",
                  "Revenue sharing",
                ],
                color: "purple",
                delay: "0.4s",
              },
            ].map((model, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 shadow-sm border border-gray-200 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up relative overflow-hidden ${
                  model.popular ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ animationDelay: model.delay }}
              >
                {model.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-medium animate-pulse">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative">
                  <div className="relative mb-6">
                    <model.icon
                      className={`h-12 w-12 text-${model.color}-600 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div
                      className={`absolute -inset-2 bg-${model.color}-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {model.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{model.description}</p>

                  <ul className="space-y-3">
                    {model.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600 animate-fade-in"
                        style={{
                          animationDelay: `${0.6 + featureIndex * 0.1}s`,
                        }}
                      >
                        <div className="relative mr-3">
                          <Check className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute -inset-1 bg-green-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Transforming Healthcare Delivery
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Empowering healthcare providers across diverse settings and
              initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Stethoscope,
                title: "General Physicians",
                description:
                  "Enhance diagnostic capabilities in under-resourced rural areas",
                color: "blue",
                delay: "0s",
              },
              {
                icon: Users,
                title: "Mobile Health Clinics",
                description:
                  "Support NGO healthcare providers with AI-powered diagnostics",
                color: "green",
                delay: "0.2s",
              },
              {
                icon: Shield,
                title: "Public Health Missions",
                description:
                  "Integrate with Ayushman Bharat and National Health Mission",
                color: "purple",
                delay: "0.4s",
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="text-center p-8 group hover:bg-gray-50 rounded-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: useCase.delay }}
              >
                <div
                  className={`bg-${useCase.color}-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <useCase.icon
                    className={`h-10 w-10 text-${useCase.color}-600`}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
            <div
              className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Transform Rural Healthcare?
          </h2>
          <p
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Join healthcare providers across India who are already using AI to
            deliver better patient care.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-white py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4 group">
                <div className="relative">
                  <Stethoscope className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-xl font-bold group-hover:text-blue-400 transition-colors duration-300">
                  DiagnosticAI
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transforming rural healthcare with AI-powered diagnostic
                assistance, breaking language barriers and enhancing medical
                decision-making.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Mail, text: "contact@diagnosticai.com" },
                  { icon: Phone, text: "+91 12345 67890" },
                  { icon: MapPin, text: "Bangalore, India" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group hover:text-blue-400 transition-colors duration-300"
                  >
                    <contact.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                    <span className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {[
                  "Features",
                  "Pricing",
                  "API Documentation",
                  "Integration",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Press", "Contact"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 DiagnosticAI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
