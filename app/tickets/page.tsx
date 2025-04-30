"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Download, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would come from a database in a real app
const tickets = [
  {
    id: "ticket-1",
    eventId: "1",
    eventName: "Tech Conference 2025",
    date: "May 15-17, 2025",
    location: "Moscone Center, San Francisco, CA",
    ticketType: "General Admission",
    price: "$499",
    purchaseDate: "January 15, 2025",
    status: "upcoming",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "ticket-2",
    eventId: "2",
    eventName: "Music Festival",
    date: "June 10-12, 2025",
    location: "Zilker Park, Austin, TX",
    ticketType: "VIP Pass",
    price: "$799",
    purchaseDate: "February 20, 2025",
    status: "upcoming",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "ticket-3",
    eventId: "3",
    eventName: "Business Leadership Summit",
    date: "March 5, 2025",
    location: "Javits Center, New York, NY",
    ticketType: "Standard Admission",
    price: "$299",
    purchaseDate: "December 10, 2024",
    status: "past",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
]

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<(typeof tickets)[0] | null>(null)
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false)

  const upcomingTickets = tickets.filter((ticket) => ticket.status === "upcoming")
  const pastTickets = tickets.filter((ticket) => ticket.status === "past")

  const handleViewQrCode = (ticket: (typeof tickets)[0]) => {
    setSelectedTicket(ticket)
    setIsQrDialogOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">My Tickets</h1>
        <p className="text-muted-foreground">View and manage your event tickets</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming ({upcomingTickets.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastTickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingTickets.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Upcoming Tickets</CardTitle>
                <CardDescription>You don't have any upcoming event tickets.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{ticket.eventName}</CardTitle>
                    <CardDescription>{ticket.ticketType}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-muted-foreground"
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
                      <span className="line-clamp-1">{ticket.location}</span>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Price:</span>
                        <span className="font-bold">{ticket.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Purchased:</span>
                        <span className="text-sm">{ticket.purchaseDate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleViewQrCode(ticket)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      View QR
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastTickets.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Past Tickets</CardTitle>
                <CardDescription>You don't have any past event tickets.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastTickets.map((ticket) => (
                <Card key={ticket.id} className="opacity-80">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="line-clamp-1">{ticket.eventName}</CardTitle>
                        <CardDescription>{ticket.ticketType}</CardDescription>
                      </div>
                      <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium">Past</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-muted-foreground"
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
                      <span className="line-clamp-1">{ticket.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/events/${ticket.eventId}`}>View Event Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* QR Code Dialog */}
      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ticket QR Code</DialogTitle>
            <DialogDescription>Present this QR code at the event entrance for check-in.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            {selectedTicket && (
              <>
                <img src={selectedTicket.qrCode || "/placeholder.svg"} alt="Ticket QR Code" className="h-64 w-64" />
                <div className="text-center">
                  <h3 className="font-bold">{selectedTicket.eventName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTicket.ticketType}</p>
                  <p className="text-sm text-muted-foreground">{selectedTicket.date}</p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
