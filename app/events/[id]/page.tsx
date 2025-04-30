import Link from "next/link"
import { Calendar, Clock, MapPin, Share2, Ticket, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would come from a database in a real app
const events = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description:
      "The biggest tech conference of the year, featuring keynotes from industry leaders, workshops, networking opportunities, and the latest in technology innovations. Join thousands of tech enthusiasts and professionals for three days of learning and collaboration.",
    longDescription:
      "Tech Conference 2025 is the premier gathering for technology professionals, innovators, and enthusiasts. This three-day event features keynote presentations from industry leaders, hands-on workshops, panel discussions, and networking opportunities.\n\nAttendees will have access to the latest in technology innovations, from artificial intelligence and machine learning to blockchain, cybersecurity, and more. The conference also includes a startup showcase, where emerging companies can present their ideas to potential investors and partners.\n\nWhether you're a developer, designer, entrepreneur, or simply passionate about technology, Tech Conference 2025 offers something for everyone. Don't miss this opportunity to connect with like-minded individuals and stay ahead of the curve in the rapidly evolving tech landscape.",
    date: "May 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Moscone Center, San Francisco, CA",
    organizer: "TechEvents Inc.",
    category: "Technology",
    price: "$499",
    image: "/placeholder.svg?height=400&width=800",
    speakers: [
      {
        name: "Jane Smith",
        title: "CEO, TechCorp",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "John Doe",
        title: "CTO, InnovateTech",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Sarah Johnson",
        title: "AI Research Lead, FutureLabs",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    agenda: [
      {
        day: "Day 1 - May 15",
        items: [
          {
            time: "9:00 AM - 10:00 AM",
            title: "Registration and Breakfast",
          },
          {
            time: "10:00 AM - 11:30 AM",
            title: "Opening Keynote: The Future of Technology",
            speaker: "Jane Smith",
          },
          {
            time: "11:45 AM - 12:45 PM",
            title: "Panel: Emerging Tech Trends",
          },
          {
            time: "1:00 PM - 2:00 PM",
            title: "Lunch Break",
          },
          {
            time: "2:15 PM - 3:45 PM",
            title: "Workshop: AI Implementation Strategies",
            speaker: "Sarah Johnson",
          },
          {
            time: "4:00 PM - 5:30 PM",
            title: "Networking Reception",
          },
        ],
      },
      {
        day: "Day 2 - May 16",
        items: [
          {
            time: "9:00 AM - 10:00 AM",
            title: "Breakfast",
          },
          {
            time: "10:00 AM - 11:30 AM",
            title: "Keynote: Building Scalable Systems",
            speaker: "John Doe",
          },
          {
            time: "11:45 AM - 12:45 PM",
            title: "Workshop: Cloud Architecture Best Practices",
          },
          {
            time: "1:00 PM - 2:00 PM",
            title: "Lunch Break",
          },
          {
            time: "2:15 PM - 3:45 PM",
            title: "Panel: Cybersecurity Challenges",
          },
          {
            time: "4:00 PM - 5:30 PM",
            title: "Startup Showcase",
          },
        ],
      },
      {
        day: "Day 3 - May 17",
        items: [
          {
            time: "9:00 AM - 10:00 AM",
            title: "Breakfast",
          },
          {
            time: "10:00 AM - 11:30 AM",
            title: "Workshop: Blockchain Applications",
          },
          {
            time: "11:45 AM - 12:45 PM",
            title: "Panel: The Future of Work",
          },
          {
            time: "1:00 PM - 2:00 PM",
            title: "Lunch Break",
          },
          {
            time: "2:15 PM - 3:45 PM",
            title: "Closing Keynote: Innovation and Impact",
          },
          {
            time: "4:00 PM - 5:00 PM",
            title: "Closing Remarks and Farewell",
          },
        ],
      },
    ],
  },
]

export default function EventPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    return (
      <div className="container mx-auto flex h-[70vh] items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Event Not Found</CardTitle>
            <CardDescription>The event you're looking for doesn't exist or has been removed.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Event Image and Details */}
        <div className="lg:col-span-2">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="mb-6 h-[300px] w-full rounded-lg object-cover md:h-[400px]"
          />

          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <h2 className="text-2xl font-bold">About This Event</h2>
              <p className="whitespace-pre-line">{event.longDescription}</p>
            </TabsContent>

            <TabsContent value="agenda" className="space-y-6">
              <h2 className="text-2xl font-bold">Event Agenda</h2>
              {event.agenda.map((day, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-semibold">{day.day}</h3>
                  <div className="space-y-3">
                    {day.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="rounded-lg border p-4 shadow-sm">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div className="font-medium text-muted-foreground">{item.time}</div>
                          <div className="flex-1">
                            <div className="font-medium">{item.title}</div>
                            {item.speaker && (
                              <div className="text-sm text-muted-foreground">Speaker: {item.speaker}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="speakers" className="space-y-6">
              <h2 className="text-2xl font-bold">Speakers</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {event.speakers.map((speaker, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                      <img
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{speaker.name}</CardTitle>
                        <CardDescription>{speaker.title}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Card */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>Organized by {event.organizer}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{event.price}</span>
                <span className="text-sm text-muted-foreground">per person</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Ticket className="mr-2 h-5 w-5" />
                Book Tickets
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-5 w-5" />
                Share Event
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
