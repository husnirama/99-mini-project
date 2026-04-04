import { prisma } from "../src/lib/prisma.js";
const dummyEvents = [
    {
        eventName: "Jakarta AI Future Summit 2026",
        category: "Technology",
        location: "Jakarta",
        eventDescription: "A technology conference focused on artificial intelligence, machine learning, and modern data products. Attendees will join keynote sessions, hands-on workshops, and networking with engineers, founders, and product leaders.",
        eventCoverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        eventStartTime: "2026-04-12T09:00:00+07:00",
        eventEndTime: "2026-04-12T17:30:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "Early Bird",
                availability: "paid",
                price: 150000,
                capacity: 100,
            },
            {
                ticketTypeName: "Regular Pass",
                availability: "paid",
                price: 250000,
                capacity: 250,
            },
            {
                ticketTypeName: "VIP Networking",
                availability: "paid",
                price: 500000,
                capacity: 50,
            },
        ],
        picEventName: "Rizky Pratama",
        picEventEmail: "rizky.pratama@example.com",
        phoneNumber: "081234567801",
        voucherPromotion: {
            promoName: "AI Launch Promo",
            voucherCode: "AIFUTURE20",
            discountType: "Percentage",
            discountValue: 20,
            quota: 80,
            minimumPurchase: 150000,
            maximumDiscount: 50000,
            startDateVoucherEffective: "2026-03-20T00:00:00+07:00",
            endDateVoucherEffective: "2026-04-05T23:59:59+07:00",
        },
    },
    {
        eventName: "Bandung Creative Art Market",
        category: "Art",
        location: "Bandung",
        eventDescription: "An art and creative market featuring local illustrators, painters, ceramic artists, and handcrafted products. The event includes mini workshops, live sketching sessions, and a curated art showcase.",
        eventCoverImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
        eventStartTime: "2026-05-03T10:00:00+07:00",
        eventEndTime: "2026-05-03T20:00:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "General Entry",
                availability: "free",
                price: 0,
                capacity: 300,
            },
            {
                ticketTypeName: "Workshop Pass",
                availability: "paid",
                price: 75000,
                capacity: 80,
            },
        ],
        picEventName: "Nabila Maharani",
        picEventEmail: "nabila.maharani@example.com",
        phoneNumber: "081234567802",
        voucherPromotion: {
            promoName: "ART DEAL",
            voucherCode: "ARTDEAL10",
            discountType: "Percentage",
            discountValue: 10,
            quota: 50,
            minimumPurchase: 75000,
            maximumDiscount: 15000,
            startDateVoucherEffective: "2026-04-10T00:00:00+07:00",
            endDateVoucherEffective: "2026-04-28T23:59:59+07:00",
        },
    },
    {
        eventName: "Surabaya Indie Music Night",
        category: "Music",
        location: "Surabaya",
        eventDescription: "A live music event showcasing indie bands, acoustic performers, and emerging local artists. Guests can enjoy a full evening of performances, community interaction, and exclusive merchandise booths.",
        eventCoverImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
        eventStartTime: "2026-06-14T18:30:00+07:00",
        eventEndTime: "2026-06-14T23:00:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "Festival Pass",
                availability: "paid",
                price: 120000,
                capacity: 400,
            },
            {
                ticketTypeName: "Backstage Pass",
                availability: "paid",
                price: 350000,
                capacity: 40,
            },
        ],
        picEventName: "Dimas Saputra",
        picEventEmail: "dimas.saputra@example.com",
        phoneNumber: "081234567803",
        voucherPromotion: {
            promoName: "MUSIC VIBES",
            voucherCode: "INDIE25",
            discountType: "Percentage",
            discountValue: 25,
            quota: 100,
            minimumPurchase: 120000,
            maximumDiscount: 40000,
            startDateVoucherEffective: "2026-05-20T00:00:00+07:00",
            endDateVoucherEffective: "2026-06-05T23:59:59+07:00",
        },
    },
    {
        eventName: "Yogyakarta Startup Founders Forum",
        category: "Business",
        location: "Yogyakarta",
        eventDescription: "A business networking forum for startup founders, operators, and investors. The program covers fundraising, product growth, team building, and go-to-market strategy through panels and roundtable discussion.",
        eventCoverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978",
        eventStartTime: "2026-04-25T08:30:00+07:00",
        eventEndTime: "2026-04-25T16:00:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "Community Pass",
                availability: "free",
                price: 0,
                capacity: 150,
            },
            {
                ticketTypeName: "Business Pass",
                availability: "paid",
                price: 200000,
                capacity: 120,
            },
        ],
        picEventName: "Farhan Akbar",
        picEventEmail: "farhan.akbar@example.com",
        phoneNumber: "081234567804",
        voucherPromotion: {
            promoName: "FOUNDER SAVE",
            voucherCode: "FOUNDER50",
            discountType: "Fixed Amount",
            discountValue: 50000,
            quota: 40,
            minimumPurchase: 200000,
            maximumDiscount: 50000,
            startDateVoucherEffective: "2026-04-01T00:00:00+07:00",
            endDateVoucherEffective: "2026-04-20T23:59:59+07:00",
        },
    },
    {
        eventName: "Malang Edu Fair and Career Prep",
        category: "Education",
        location: "Malang",
        eventDescription: "An education fair for students and young professionals with sessions on scholarship opportunities, career preparation, portfolio building, and interview strategy. Universities and training institutions will also open information booths.",
        eventCoverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        eventStartTime: "2026-07-08T09:00:00+07:00",
        eventEndTime: "2026-07-08T15:30:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "Student Entry",
                availability: "free",
                price: 0,
                capacity: 500,
            },
            {
                ticketTypeName: "Premium Seminar Seat",
                availability: "paid",
                price: 50000,
                capacity: 120,
            },
        ],
        picEventName: "Alya Putri",
        picEventEmail: "alya.putri@example.com",
        phoneNumber: "081234567805",
        voucherPromotion: {
            promoName: "EDU BOOST",
            voucherCode: "EDU15",
            discountType: "Percentage",
            discountValue: 15,
            quota: 70,
            minimumPurchase: 50000,
            maximumDiscount: 10000,
            startDateVoucherEffective: "2026-06-15T00:00:00+07:00",
            endDateVoucherEffective: "2026-07-05T23:59:59+07:00",
        },
    },
    {
        eventName: "Bali Product & UX Conference",
        category: "Technology",
        location: "Denpasar",
        eventDescription: "A conference for product managers, designers, and software teams to discuss user experience, experimentation, roadmap planning, and digital product delivery in fast-moving organizations.",
        eventCoverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        eventStartTime: "2026-08-16T09:00:00+08:00",
        eventEndTime: "2026-08-16T18:00:00+08:00",
        ticketTiers: [
            {
                ticketTypeName: "Standard Pass",
                availability: "paid",
                price: 300000,
                capacity: 180,
            },
            {
                ticketTypeName: "VIP Pass",
                availability: "paid",
                price: 650000,
                capacity: 40,
            },
        ],
        picEventName: "Kevin Wijaya",
        picEventEmail: "kevin.wijaya@example.com",
        phoneNumber: "081234567806",
        voucherPromotion: {
            promoName: "UX EARLY",
            voucherCode: "UXEARLY30",
            discountType: "Percentage",
            discountValue: 30,
            quota: 30,
            minimumPurchase: 300000,
            maximumDiscount: 90000,
            startDateVoucherEffective: "2026-07-10T00:00:00+08:00",
            endDateVoucherEffective: "2026-07-25T23:59:59+08:00",
        },
    },
    {
        eventName: "Semarang Jazz by the Harbor",
        category: "Music",
        location: "Semarang",
        eventDescription: "A relaxing evening jazz event with local and national performers, food stalls, and outdoor seating. Designed for music lovers seeking a cozy and memorable live performance atmosphere.",
        eventCoverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        eventStartTime: "2026-09-05T19:00:00+07:00",
        eventEndTime: "2026-09-05T22:30:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "Regular Seat",
                availability: "paid",
                price: 100000,
                capacity: 220,
            },
            {
                ticketTypeName: "Front Row Seat",
                availability: "paid",
                price: 200000,
                capacity: 60,
            },
        ],
        picEventName: "Sinta Larasati",
        picEventEmail: "sinta.larasati@example.com",
        phoneNumber: "081234567807",
        voucherPromotion: {
            promoName: "JAZZ DEAL",
            voucherCode: "JAZZ40K",
            discountType: "Fixed Amount",
            discountValue: 40000,
            quota: 60,
            minimumPurchase: 100000,
            maximumDiscount: 40000,
            startDateVoucherEffective: "2026-08-15T00:00:00+07:00",
            endDateVoucherEffective: "2026-08-30T23:59:59+07:00",
        },
    },
    {
        eventName: "Makassar Modern Business Expo",
        category: "Business",
        location: "Makassar",
        eventDescription: "A business expo connecting SMEs, corporate professionals, and entrepreneurs through exhibitions, networking sessions, and expert talks on finance, digital transformation, and market expansion.",
        eventCoverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865",
        eventStartTime: "2026-10-10T10:00:00+08:00",
        eventEndTime: "2026-10-10T17:00:00+08:00",
        ticketTiers: [
            {
                ticketTypeName: "Expo Entry",
                availability: "free",
                price: 0,
                capacity: 600,
            },
            {
                ticketTypeName: "Executive Session",
                availability: "paid",
                price: 180000,
                capacity: 100,
            },
        ],
        picEventName: "Rafi Hidayat",
        picEventEmail: "rafi.hidayat@example.com",
        phoneNumber: "081234567808",
        voucherPromotion: {
            promoName: "BIZ SAVE",
            voucherCode: "BIZ20",
            discountType: "Percentage",
            discountValue: 20,
            quota: 90,
            minimumPurchase: 180000,
            maximumDiscount: 36000,
            startDateVoucherEffective: "2026-09-15T00:00:00+08:00",
            endDateVoucherEffective: "2026-10-01T23:59:59+08:00",
        },
    },
    {
        eventName: "Solo Heritage Art and Culture Fest",
        category: "Art",
        location: "Surakarta",
        eventDescription: "A cultural art festival celebrating local heritage through batik exhibitions, traditional performances, contemporary installations, and artisan talks. Suitable for families, creators, and tourists.",
        eventCoverImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
        eventStartTime: "2026-11-21T09:30:00+07:00",
        eventEndTime: "2026-11-21T19:00:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "Festival Entry",
                availability: "free",
                price: 0,
                capacity: 450,
            },
            {
                ticketTypeName: "Craft Workshop",
                availability: "paid",
                price: 90000,
                capacity: 70,
            },
        ],
        picEventName: "Mega Anindita",
        picEventEmail: "mega.anindita@example.com",
        phoneNumber: "081234567809",
        voucherPromotion: {
            promoName: "CULTURE15",
            voucherCode: "HERITAGE15",
            discountType: "Percentage",
            discountValue: 15,
            quota: 40,
            minimumPurchase: 90000,
            maximumDiscount: 20000,
            startDateVoucherEffective: "2026-11-01T00:00:00+07:00",
            endDateVoucherEffective: "2026-11-15T23:59:59+07:00",
        },
    },
    {
        eventName: "Medan Tech Career Bootcamp",
        category: "Education",
        location: "Medan",
        eventDescription: "An intensive educational event for aspiring tech talent with sessions on frontend engineering, backend development, data careers, interview preparation, and portfolio review by industry practitioners.",
        eventCoverImage: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
        eventStartTime: "2026-12-06T08:00:00+07:00",
        eventEndTime: "2026-12-06T16:30:00+07:00",
        ticketTiers: [
            {
                ticketTypeName: "Bootcamp Pass",
                availability: "paid",
                price: 125000,
                capacity: 200,
            },
            {
                ticketTypeName: "Scholarship Seat",
                availability: "free",
                price: 0,
                capacity: 50,
            },
        ],
        picEventName: "Aditya Nugraha",
        picEventEmail: "aditya.nugraha@example.com",
        phoneNumber: "081234567810",
        voucherPromotion: {
            promoName: "CAREER START",
            voucherCode: "START50K",
            discountType: "Fixed Amount",
            discountValue: 50000,
            quota: 45,
            minimumPurchase: 125000,
            maximumDiscount: 50000,
            startDateVoucherEffective: "2026-11-10T00:00:00+07:00",
            endDateVoucherEffective: "2026-11-28T23:59:59+07:00",
        },
    },
];
const REGION_BY_CITY = {
    Jakarta: "DKI Jakarta",
    Bandung: "Jawa Barat",
    Surabaya: "Jawa Timur",
    Yogyakarta: "DI Yogyakarta",
    Malang: "Jawa Timur",
    Denpasar: "Bali",
    Semarang: "Jawa Tengah",
    Makassar: "Sulawesi Selatan",
    Surakarta: "Jawa Tengah",
    Medan: "Sumatera Utara",
};
function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}
function mapPromotionDiscountType(discountType) {
    return discountType === "Percentage" ? "PERCENTAGE" : "FIXED";
}
function getTicketDescription(ticket, category) {
    if (ticket.availability === "free") {
        return `Free ${category.toLowerCase()} event access for ${ticket.ticketTypeName}.`;
    }
    return `Paid ticket for ${ticket.ticketTypeName} with access to the ${category.toLowerCase()} event sessions.`;
}
function getTicketStatus(quota) {
    return quota > 0 ? "ACTIVE" : "SOLD_OUT";
}
function getSalesStartAt(eventStartTime) {
    const start = new Date(eventStartTime);
    start.setDate(start.getDate() - 30);
    return start;
}
function getSalesEndAt(eventStartTime) {
    return new Date(eventStartTime);
}
async function seed() {
    try {
        console.info("🌱 Seeding started...");
        const organizers = await prisma.user.findMany({
            where: { role: "EVENT_ORGANIZER" },
            select: { id: true },
        });
        if (organizers.length === 0) {
            throw new Error("No EVENT_ORGANIZER users found.");
        }
        const organizerIds = organizers.map((user) => user.id);
        for (const dummyEvent of dummyEvents) {
            const organizerId = randomItem(organizerIds);
            await prisma.$transaction(async (tx) => {
                const createdEvent = await tx.event.create({
                    data: {
                        organizeBy: organizerId,
                        title: dummyEvent.eventName,
                        category: dummyEvent.category,
                        image: dummyEvent.eventCoverImage,
                        eventDateStart: new Date(dummyEvent.eventStartTime),
                        eventDateEnd: new Date(dummyEvent.eventEndTime),
                        status: "DRAFT",
                        eventDescription: dummyEvent.eventDescription,
                        eventTnC: "No outside food or beverages. Please show valid ticket at entry.",
                        termsAccepted: true,
                    },
                });
                await tx.eventImage.create({
                    data: {
                        eventId: createdEvent.id,
                        imageURL: dummyEvent.eventCoverImage,
                    },
                });
                await tx.venue.create({
                    data: {
                        eventId: createdEvent.id,
                        name: `${dummyEvent.location} Convention Hall`,
                        addressLine: `${dummyEvent.location}, Indonesia`,
                        city: dummyEvent.location,
                        region: REGION_BY_CITY[dummyEvent.location] ?? null,
                        country: "Indonesia",
                        latitude: null,
                        longitude: null,
                    },
                });
                await tx.ticketType.createMany({
                    data: dummyEvent.ticketTiers.map((ticket) => ({
                        eventId: createdEvent.id,
                        name: ticket.ticketTypeName,
                        price: ticket.price,
                        quota: ticket.capacity,
                        sold: 0,
                        reserved: 0,
                        description: getTicketDescription(ticket, dummyEvent.category),
                        salesStartAt: getSalesStartAt(dummyEvent.eventStartTime),
                        salesEndAt: getSalesEndAt(dummyEvent.eventStartTime),
                        status: getTicketStatus(ticket.capacity),
                        contactPerson: dummyEvent.picEventName,
                        emailContactPerson: dummyEvent.picEventEmail,
                        phoneContactPerson: dummyEvent.phoneNumber,
                    })),
                });
                if (dummyEvent.voucherPromotion) {
                    await tx.promotion.create({
                        data: {
                            eventId: createdEvent.id,
                            name: dummyEvent.voucherPromotion.promoName,
                            code: dummyEvent.voucherPromotion.voucherCode,
                            discountType: mapPromotionDiscountType(dummyEvent.voucherPromotion.discountType),
                            discountValue: dummyEvent.voucherPromotion.discountValue,
                            maxDiscount: dummyEvent.voucherPromotion.maximumDiscount,
                            minPurchase: dummyEvent.voucherPromotion.minimumPurchase,
                            quota: dummyEvent.voucherPromotion.quota,
                            startDate: new Date(dummyEvent.voucherPromotion.startDateVoucherEffective),
                            endDate: new Date(dummyEvent.voucherPromotion.endDateVoucherEffective),
                        },
                    });
                }
            });
            console.log(`✅ Seeded event: ${dummyEvent.eventName}`);
        }
        console.info("✅ Seeding finished.");
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
seed();
//# sourceMappingURL=seed.js.map