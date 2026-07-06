import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      fullName,
      phone,
      email,
      eventDate,
      eventType,
      eventTypeOther,
      eventVenue,
      hostsRequired,
      callUpTime,
      closingTime,
      outfitPreference,
      outfitColour,
      additionalInfo,
      honeypot,
    } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!fullName || !phone || !eventDate || !eventType || !eventVenue || !hostsRequired || !callUpTime || !closingTime || !outfitPreference) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Save to Sanity
    await writeClient.create({
      _type: 'booking',
      fullName,
      phone,
      email: email || '',
      eventDate,
      eventType,
      eventTypeOther: eventTypeOther || '',
      eventVenue,
      hostsRequired,
      callUpTime,
      closingTime,
      outfitPreference,
      outfitColour: outfitColour || '',
      additionalInfo: additionalInfo || '',
      submittedAt: new Date().toISOString(),
      status: 'new',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}