import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      description: "Create, edit, and manage events with comprehensive details and customization options.",
    },
    {
      icon: Users,
      title: "RSVP Management",
      description: "Track attendees, manage RSVPs, and export attendee data with ease.",
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Admin, Staff, and Event Owner roles with appropriate permissions and controls.",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Get instant notifications and updates on event activities and registrations.",
    },
  ];

  const benefits = [
    "Professional event management dashboard",
    "Public event pages with custom URLs",
    "Comprehensive attendee tracking",
    "CSV export functionality",
    "Mobile-responsive design",
    "Secure authentication system",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-primary">EventEase</div>
            <div className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Professional
              <span className="text-primary block">Event Management</span>
              Made Simple
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Create, manage, and track events with ease. EventEase provides everything you need 
              to organize successful events, from planning to execution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/auth/register">
                  Start Creating Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/auth/login">
                  Sign In to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Event Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for professional event management
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">
                Why Choose EventEase?
              </h2>
              <p className="text-xl text-gray-600">
                Built for professionals who demand excellence in event management.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="mt-8" asChild>
                <Link href="/auth/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-indigo-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-500">RECENT EVENTS</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Tech Conference 2025</div>
                        <div className="text-sm text-gray-500">142 attendees</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Team Building Workshop</div>
                        <div className="text-sm text-gray-500">28 attendees</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Product Launch</div>
                        <div className="text-sm text-gray-500">89 attendees</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to Elevate Your Events?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of event organizers who trust EventEase for their professional events.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link href="/auth/register">
              Create Your First Event
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">EventEase</div>
          <p className="text-gray-400 mb-8">
            Professional event management made simple.
          </p>
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://github.com/ssubrt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-700 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/subrat-gangwar-51605b205"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-700 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 Subrat Gangwar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}