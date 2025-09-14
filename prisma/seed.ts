import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.rSVP.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  console.log('📊 Cleared existing data');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@eventease.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const eventOwner1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'EVENT_OWNER',
    },
  });

  const eventOwner2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: hashedPassword,
      role: 'EVENT_OWNER',
    },
  });

  const staff = await prisma.user.create({
    data: {
      email: 'staff@eventease.com',
      name: 'Staff Member',
      password: hashedPassword,
      role: 'STAFF',
    },
  });

  console.log('👥 Created users');

  // Create events
  const techConference = await prisma.event.create({
    data: {
      title: 'Tech Conference 2024',
      description: 'A comprehensive technology conference featuring the latest innovations in AI, blockchain, and cloud computing. Join industry leaders for an inspiring day of learning and networking.',
      location: 'San Francisco Convention Center, CA',
      startDate: new Date('2024-07-15T09:00:00Z'),
      endDate: new Date('2024-07-15T18:00:00Z'),
      maxAttendees: 500,
      status: 'PUBLISHED',
      isPublic: true,
      creatorId: eventOwner1.id,
    },
  });

  const workshopEvent = await prisma.event.create({
    data: {
      title: 'React & Next.js Workshop',
      description: 'Hands-on workshop covering advanced React patterns and Next.js features. Perfect for developers looking to enhance their skills in modern web development.',
      location: 'Online Virtual Event',
      startDate: new Date('2024-06-20T14:00:00Z'),
      endDate: new Date('2024-06-20T17:00:00Z'),
      maxAttendees: 50,
      status: 'PUBLISHED',
      isPublic: true,
      creatorId: eventOwner1.id,
    },
  });

  const networking = await prisma.event.create({
    data: {
      title: 'Business Networking Meetup',
      description: 'Connect with fellow entrepreneurs and business professionals in a relaxed networking environment. Includes refreshments and interactive activities.',
      location: 'Downtown Business Center, NYC',
      startDate: new Date('2024-06-25T18:30:00Z'),
      endDate: new Date('2024-06-25T21:00:00Z'),
      maxAttendees: 100,
      status: 'PUBLISHED',
      isPublic: true,
      creatorId: eventOwner2.id,
    },
  });

  const musicFestival = await prisma.event.create({
    data: {
      title: 'Summer Music Festival',
      description: 'A weekend of amazing music featuring local and international artists. Food trucks, craft vendors, and family-friendly activities.',
      location: 'Central Park, New York',
      startDate: new Date('2024-08-10T12:00:00Z'),
      endDate: new Date('2024-08-11T22:00:00Z'),
      maxAttendees: 2000,
      status: 'PUBLISHED',
      isPublic: true,
      creatorId: eventOwner2.id,
    },
  });

  const webinarEvent = await prisma.event.create({
    data: {
      title: 'Digital Marketing Strategies',
      description: 'Learn the latest digital marketing techniques and strategies from industry experts. Includes Q&A session and downloadable resources.',
      location: 'Zoom Webinar',
      startDate: new Date('2024-06-30T15:00:00Z'),
      endDate: new Date('2024-06-30T16:30:00Z'),
      maxAttendees: 200,
      status: 'PUBLISHED',
      isPublic: true,
      creatorId: eventOwner1.id,
    },
  });

  const draftEvent = await prisma.event.create({
    data: {
      title: 'Product Launch Event',
      description: 'Exclusive product launch event for our latest innovation. Stay tuned for more details!',
      location: 'TBD',
      startDate: new Date('2024-09-15T10:00:00Z'),
      endDate: new Date('2024-09-15T16:00:00Z'),
      maxAttendees: 150,
      status: 'DRAFT',
      isPublic: false,
      creatorId: eventOwner1.id,
    },
  });

  console.log('📅 Created events');

  // Create RSVPs
  const rsvpData = [
    // Tech Conference RSVPs
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1-555-0101',
      message: 'Really excited about the AI sessions!',
      status: 'CONFIRMED' as const,
      eventId: techConference.id,
    },
    {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1-555-0102',
      message: 'Looking forward to networking.',
      status: 'CONFIRMED' as const,
      eventId: techConference.id,
    },
    {
      name: 'Carol Davis',
      email: 'carol@example.com',
      phone: '+1-555-0103',
      message: 'First time attending, very excited!',
      status: 'PENDING' as const,
      eventId: techConference.id,
    },
    {
      name: 'David Miller',
      email: 'david@example.com',
      status: 'DECLINED' as const,
      eventId: techConference.id,
    },
    
    // Workshop RSVPs
    {
      name: 'Emily Brown',
      email: 'emily@example.com',
      phone: '+1-555-0201',
      message: 'I have some experience with React but excited to learn Next.js!',
      status: 'CONFIRMED' as const,
      eventId: workshopEvent.id,
    },
    {
      name: 'Frank Garcia',
      email: 'frank@example.com',
      status: 'CONFIRMED' as const,
      eventId: workshopEvent.id,
    },
    {
      name: 'Grace Lee',
      email: 'grace@example.com',
      phone: '+1-555-0203',
      status: 'PENDING' as const,
      eventId: workshopEvent.id,
    },
    
    // Networking RSVPs
    {
      name: 'Henry Zhang',
      email: 'henry@example.com',
      phone: '+1-555-0301',
      message: 'Looking to connect with fellow entrepreneurs.',
      status: 'CONFIRMED' as const,
      eventId: networking.id,
    },
    {
      name: 'Isabel Rodriguez',
      email: 'isabel@example.com',
      status: 'CONFIRMED' as const,
      eventId: networking.id,
    },
    {
      name: 'Jack Thompson',
      email: 'jack@example.com',
      phone: '+1-555-0303',
      status: 'CONFIRMED' as const,
      eventId: networking.id,
    },
    
    // Music Festival RSVPs
    {
      name: 'Kelly White',
      email: 'kelly@example.com',
      phone: '+1-555-0401',
      message: 'Can\'t wait for the weekend!',
      status: 'CONFIRMED' as const,
      eventId: musicFestival.id,
    },
    {
      name: 'Luis Martinez',
      email: 'luis@example.com',
      status: 'CONFIRMED' as const,
      eventId: musicFestival.id,
    },
    {
      name: 'Maria Gonzalez',
      email: 'maria@example.com',
      phone: '+1-555-0403',
      message: 'Coming with family - 4 people total.',
      status: 'CONFIRMED' as const,
      eventId: musicFestival.id,
    },
    {
      name: 'Nathan Scott',
      email: 'nathan@example.com',
      status: 'PENDING' as const,
      eventId: musicFestival.id,
    },
    
    // Webinar RSVPs
    {
      name: 'Olivia Taylor',
      email: 'olivia@example.com',
      phone: '+1-555-0501',
      message: 'Interested in social media strategies.',
      status: 'CONFIRMED' as const,
      eventId: webinarEvent.id,
    },
    {
      name: 'Paul Anderson',
      email: 'paul@example.com',
      status: 'CONFIRMED' as const,
      eventId: webinarEvent.id,
    },
  ];

  for (const rsvp of rsvpData) {
    await prisma.rSVP.create({
      data: rsvp,
    });
  }

  console.log('✅ Created RSVPs');

  // Get final counts
  const userCount = await prisma.user.count();
  const eventCount = await prisma.event.count();
  const rsvpCount = await prisma.rSVP.count();

  console.log('\n📊 Database seeding completed successfully!');
  console.log(`   👥 Users: ${userCount}`);
  console.log(`   📅 Events: ${eventCount}`);
  console.log(`   📝 RSVPs: ${rsvpCount}`);
  console.log('\n🔑 Test credentials:');
  console.log('   Admin: admin@eventease.com / password123');
  console.log('   Event Owner: john@example.com / password123');
  console.log('   Event Owner: jane@example.com / password123');
  console.log('   Staff: staff@eventease.com / password123');
}

main()
  .catch((e : any) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

