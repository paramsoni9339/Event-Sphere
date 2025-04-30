import Link from "next/link"
import { Calendar, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      name: "Indian Music Festival 2025",
      description: "A celebration of classical and contemporary Indian music",
      date: "May 15-17, 2025",
      location: "Jawaharlal Nehru Stadium, Delhi",
      category: "Music",
      price: "₹1,500 - ₹5,000",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      organizer: "Cultural Events India",
      tickets_available: 2000,
      featured: true
    },
    {
      id: 2,
      name: "Tech Summit 2025",
      description: "India's largest technology conference",
      date: "June 1-3, 2025",
      location: "BIEC, Bangalore",
      category: "Conference",
      price: "₹8,000 - ₹15,000",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      organizer: "TechEvents India",
      tickets_available: 1500,
      featured: true
    },
    {
      id: 3,
      name: "Food & Wine Festival",
      description: "Experience the finest cuisines and wines",
      date: "July 8-10, 2025",
      location: "JW Marriott, Mumbai",
      category: "Food & Drink",
      price: "₹2,500 - ₹7,500",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      organizer: "Gourmet Events Co",
      tickets_available: 800,
      featured: false
    },
    {
      id: 4,
      name: "Comic Con India",
      description: "The ultimate pop culture festival",
      date: "August 20-22, 2025",
      location: "India Expo Centre, Greater Noida",
      category: "Entertainment",
      price: "₹999 - ₹2,999",
      image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      organizer: "Comic Con India",
      tickets_available: 5000,
      featured: true
    },
    {
      id: 5,
      name: "Fashion Week 2025",
      description: "Showcasing the latest in Indian fashion",
      date: "September 5-10, 2025",
      location: "The Lalit, New Delhi",
      category: "Fashion",
      price: "₹3,500 - ₹25,000",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      organizer: "Fashion Design Council of India",
      tickets_available: 1200,
      featured: false
    },
    {
      id: 6,
      name: "Startup Summit",
      description: "Connect with investors and entrepreneurs",
      date: "October 15-16, 2025",
      location: "ITC Grand Chola, Chennai",
      category: "Business",
      price: "₹5,000 - ₹12,000",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      organizer: "StartupIndia",
      tickets_available: 600,
      featured: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Upcoming Events</h1>
        <p className="text-muted-foreground">Browse and discover events happening near you</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-9" />
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button className="w-full gap-2">
              <Filter className="h-4 w-4" />
              Filter Results
            </Button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.name} className="h-48 w-full object-cover" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="line-clamp-1">{event.name}</CardTitle>
                  <CardDescription>{event.category}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-2 text-sm">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {event.date}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
