import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/*temporary pictures */
function Home() {
  const events = [
    {
      id: 1,
      name: "Jakarta Music Night",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60",
      description:
        "Live music, great vibes, and a night to remember with top local performers.",
      price: 150000,
    },
    {
      id: 2,
      name: "UI/UX Workshop",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
      description:
        "Hands-on workshop to learn practical UI/UX, from wireframes to prototypes.",
      price: 250000,
    },
    {
      id: 3,
      name: "Charity Fun Run",
      image:
        "https://images.unsplash.com/photo-1526676037579-6a0bf99b75df?auto=format&fit=crop&w=1200&q=60",
      description:
        "Run for a cause. Family-friendly 5K fun run with prizes and food stalls.",
      price: 100000,
    },
    {
      id: 4,
      name: "Coffee & Business Meetup",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=60",
      description:
        "Network with founders, professionals, and investors over great coffee.",
      price: 75000,
    },
  ];

  const formatIDR = (value: number) => {
    return `IDR ${value.toLocaleString("id-ID")}`;
  };

  const handleJoin = (eventId: number) => {
    alert(`Joined event ID: ${eventId}`);
  };

  return (
    <section id="Homepage" className="min-h-screen bg-[#0c1c3a]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <div className="relative h-44 w-full">
                <img
                  src={event.image}
                  alt={event.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-semibold text-white">
                    {event.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <p className="text-sm text-white/80">{event.description}</p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    {formatIDR(event.price)}
                  </span>
                </div>

                <button
                  onClick={() => handleJoin(event.id)}
                  className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Join Event
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">IKUTI KAMI</h2>
          <p className="mt-2 text-sm text-white/70">
            Follow our updates and latest events.
          </p>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default Home;