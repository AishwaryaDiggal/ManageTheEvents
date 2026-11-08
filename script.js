const events = [
    {
        id: 1,
        name: "Annual College Cultural Fest",
        category: "Cultural",
        date: "15 December 2026",
        eventDate: "2026-12-15T09:00:00",
        location: "College Main Campus",
        price: 299,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700",
        description: "Experience an exciting celebration of music, dance, art and creativity. Participate in cultural performances, enjoy live entertainment and connect with students from different colleges. This festival brings together talent, energy and unforgettable campus memories."
    },
    {
        id: 2,
        name: "24-Hour National Hackathon",
        category: "Technical",
        date: "20 December 2026",
        eventDate: "2026-12-20T09:00:00",
        location: "School of Computer Science",
        price: 199,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700",
        description: "Put your coding and problem-solving skills to the test in this 24-hour hackathon. Work in teams, develop innovative solutions, learn from mentors and compete with talented student developers."
    },
    {
        id: 3,
        name: "Inter-College Sports Championship",
        category: "Sports",
        date: "25 December 2026",
        eventDate: "2026-12-25T09:00:00",
        location: "University Sports Complex",
        price: 149,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700",
        description: "Bring your competitive spirit to the Inter-College Sports Championship. Compete in different sporting events, represent your college and enjoy a day of teamwork, fitness and sportsmanship."
    },
    {
        id: 4,
        name: "AI & Machine Learning Workshop",
        category: "Workshop",
        date: "28 December 2026",
        eventDate: "2026-12-28T10:00:00",
        location: "School of Engineering",
        price: 99,
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700",
        description: "Explore the fundamentals and real-world applications of Artificial Intelligence and Machine Learning. Take part in practical sessions, interact with instructors and understand how AI technologies are shaping the future."
    },
    {
        id: 5,
        name: "National Student Project Exhibition",
        category: "Exhibition",
        date: "05 January 2027",
        eventDate: "2027-01-05T10:00:00",
        location: "College Main Auditorium",
        price: 0,
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700",
        description: "Discover innovative projects created by students across different disciplines. Explore creative ideas, interact with project teams and experience technology, research and innovation under one roof."
    },
    {
        id: 6,
        name: "Inter-College Coding Competition",
        category: "Competition",
        date: "10 January 2027",
        eventDate: "2027-01-10T09:00:00",
        location: "School of Computer Science",
        price: 49,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
        description: "Challenge yourself with programming problems and compete against other talented students. Test your logical thinking, algorithmic knowledge and coding speed in this competitive programming event."
    }
];


const eventContainer = document.getElementById("eventContainer");
const eventDetails = document.getElementById("eventDetails");
const eventDetailsContent = document.getElementById("eventDetailsContent");
const eventsSection = document.getElementById("events");
const searchInput = document.getElementById("searchInput");

const pad = n => String(n).padStart(2, "0");

function formatFee(price) {
    return price === 0 ? "Free" : "\u20B9" + price;
}

function splitTime(difference) {
    return {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
}


/* ---------- ticket list ---------- */

function displayEvents(eventList) {

    if (eventList.length === 0) {
        eventContainer.innerHTML = `
            <p class="no-events">Nothing matches that. Try a kind of event like "workshop" or a building like "auditorium".</p>
        `;
        return;
    }

    eventContainer.innerHTML = eventList.map(event => {

        const d = new Date(event.eventDate);
        const day = pad(d.getDate());
        const mon = d.toLocaleString("en-GB", { month: "short" });
        const yr = d.getFullYear();

        return `
        <article class="ticket">

            <div class="stub">
                <span class="stub-day">${day}</span>
                <span class="stub-mon">${mon}</span>
                <span class="stub-yr">${yr}</span>
            </div>

            <div class="body">
                <div class="pic">
                    <img src="${event.image}" alt="" loading="lazy">
                </div>

                <div class="txt">
                    <p class="kind">${event.category}</p>
                    <h3>${event.name}</h3>
                    <p class="where">${event.location}</p>
                    <p class="event-countdown" data-event-time="${event.eventDate}">Counting...</p>
                </div>
            </div>

            <div class="cut">
                <span class="fee">${formatFee(event.price)}</span>
                <button class="event-btn" type="button" data-event-id="${event.id}">
                    View details
                </button>
            </div>

        </article>
        `;
    }).join("");

    updateCountdowns();
}


function searchEvents(searchText) {

    const searchValue = searchText.trim().toLowerCase();

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchValue) ||
        event.category.toLowerCase().includes(searchValue) ||
        event.location.toLowerCase().includes(searchValue)
    );

    displayEvents(filteredEvents);
}


/* ---------- details view ---------- */

function showEventDetails(eventId) {

    const event = events.find(item => item.id === Number(eventId));

    if (!event) {
        return;
    }

    eventDetailsContent.innerHTML = `
        <div class="detail">

            <div class="detail-pic">
                <img src="${event.image}" alt="${event.name}">
            </div>

            <div class="detail-info">

                <span class="detail-tag">${event.category}</span>

                <h1>${event.name}</h1>

                <p class="detail-desc">${event.description}</p>

                <dl class="facts">
                    <div><dt>Date</dt><dd>${event.date}</dd></div>
                    <div><dt>Venue</dt><dd>${event.location}</dd></div>
                    <div><dt>Entry fee</dt><dd>${formatFee(event.price)}</dd></div>
                    <div><dt>Category</dt><dd>${event.category}</dd></div>
                </dl>

                <div class="detail-clock">
                    <p>Time left until it starts</p>
                    <div class="event-countdown" data-event-time="${event.eventDate}">Counting...</div>
                </div>

            </div>

        </div>
    `;

    document.querySelector(".next").hidden = true;
    eventsSection.hidden = true;
    eventDetails.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });

    updateCountdowns();
}


function goBackToEvents() {

    eventDetails.hidden = true;
    eventsSection.hidden = false;
    document.querySelector(".next").hidden = false;

    window.scrollTo({
        top: eventsSection.offsetTop - 80,
        behavior: "smooth"
    });
}


/* ---------- countdowns ---------- */

function updateCountdowns() {

    document.querySelectorAll(".event-countdown").forEach(timer => {

        const eventTime = new Date(timer.dataset.eventTime).getTime();
        const difference = eventTime - Date.now();

        if (Number.isNaN(eventTime)) {
            timer.textContent = "Date unavailable";
            return;
        }

        if (difference <= 0) {
            timer.textContent = "Already started";
            return;
        }

        const t = splitTime(difference);
        timer.textContent = `${t.days}d ${pad(t.hours)}h ${pad(t.minutes)}m ${pad(t.seconds)}s`;
    });

    updateHero();
}


/* ---------- hero: next upcoming event ---------- */

const heroEls = {
    name: document.getElementById("nextName"),
    where: document.getElementById("nextWhere"),
    btn: document.getElementById("nextBtn"),
    days: document.getElementById("cdDays"),
    hours: document.getElementById("cdHours"),
    mins: document.getElementById("cdMins"),
    secs: document.getElementById("cdSecs")
};

function getNextEvent() {
    const now = Date.now();
    return events
        .filter(e => new Date(e.eventDate).getTime() > now)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))[0];
}

function updateHero() {

    const next = getNextEvent();

    if (!next) {
        heroEls.name.textContent = "No events coming up right now";
        heroEls.where.textContent = "Check back soon for the next season.";
        heroEls.btn.hidden = true;
        return;
    }

    const t = splitTime(new Date(next.eventDate).getTime() - Date.now());

    heroEls.name.textContent = next.name;
    heroEls.where.textContent = `${next.date} at ${next.location}`;
    heroEls.btn.dataset.eventId = next.id;
    heroEls.btn.hidden = false;
    heroEls.days.textContent = pad(t.days);
    heroEls.hours.textContent = pad(t.hours);
    heroEls.mins.textContent = pad(t.minutes);
    heroEls.secs.textContent = pad(t.seconds);
}

heroEls.btn.addEventListener("click", function () {
    showEventDetails(this.dataset.eventId);
});


/* ---------- events ---------- */

eventContainer.addEventListener("click", function (event) {

    const button = event.target.closest("[data-event-id]");

    if (button) {
        showEventDetails(button.dataset.eventId);
    }
});

document.getElementById("backToEvents").addEventListener("click", goBackToEvents);

searchInput.addEventListener("input", function () {
    searchEvents(this.value);
});


/* ---------- theme ---------- */

const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

let savedTheme = "light";
try { savedTheme = localStorage.getItem("theme") || "light"; } catch (e) {}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeLabel.textContent = theme === "dark" ? "Day" : "Night";
    try { localStorage.setItem("theme", theme); } catch (e) {}
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
});


/* ---------- navigation ---------- */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("active"));
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        showListView();
    });
});

function showListView() {
    eventDetails.hidden = true;
    eventsSection.hidden = false;
    document.querySelector(".next").hidden = false;
}

document.getElementById("homeLink").addEventListener("click", function () {
    showListView();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();


/* ---------- start ---------- */

displayEvents(events);
updateHero();
setInterval(updateCountdowns, 1000);
