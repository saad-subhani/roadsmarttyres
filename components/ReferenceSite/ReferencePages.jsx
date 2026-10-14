import {
  FaCheck,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ContactForm from "./ContactForm";
import fallbackReviews from "./fallbackReviews";
import blogPosts from "./blogPosts";
import "./interior-site.css";

const serviceData = {
  "brand-new-and-part-worn-tyres": {
    pageTitle: "Brand new and part worn tyres",
    title: "BRAND NEW & PART WORN TYRES",
    subtitle: "QUALITY TYRES FOR EVERY BUDGET",
    intro:
      "When it comes to keeping your vehicle safe on the road, the condition of your tyres is one of the most important factors you can control. At our tyre centre, we specialise in supplying and fitting both brand new and certified part worn tyres to suit every driver and every budget. Whether you drive a small city car, a family saloon, a van, or a 4x4, we stock a wide range of sizes and brands to match your exact requirements. Our brand new tyres come directly from leading manufacturers, offering full tread depth, maximum grip, and complete peace of mind on every journey. For those looking for a more cost-effective solution, our part worn tyres are individually inspected, pressure tested, and certified road-legal before they ever reach our forecourt. Every tyre we supply meets strict safety standards, so you never have to choose between quality and affordability. Our experienced technicians carry out professional fitting and computer wheel balancing on-site, ensuring your tyres are fitted correctly and your wheels are perfectly balanced for a smooth, vibration-free drive. We pride ourselves on fast, reliable service — most fittings completed same day — with honest advice and competitive prices you can trust.",
    benefits: [
      "Wide range of sizes — brand new & part worn tyres for all makes and models",
      "Certified road-legal — every part worn tyre inspected & tested before fitting",
      "Same-day fitting — fast professional service with computer wheel balancing",
      "Competitive pricing — honest, transparent prices with no hidden charges",
      "Free safety check — tyre pressure & condition inspection on every visit",
    ],
    serviceTitle: "BRAND NEW & PART WORN TYRES",
    serviceIntro:
      "From premium brand new tyres to certified part worn options — we supply and fit tyres for all makes and models, keeping you safe and road-ready.",
    offers: [
      {
        number: "01",
        category: "BRAND NEW STOCK",
        title: "BRAND NEW TYRES",
        text: "Top-quality brand new tyres sourced directly from leading manufacturers. Every tyre delivers full tread depth, maximum grip, and a manufacturer warranty for total peace of mind.",
        points: [
          "All major brands — Continental, Michelin, Pirelli & more",
          "Full 8mm+ tread depth — factory fresh condition",
          "Full manufacturer warranty included on every tyre",
          "Same-day fitting with professional equipment",
          "All sizes available for cars, vans & SUVs",
        ],
      },
      {
        number: "02",
        category: "BUDGET FRIENDLY",
        title: "PART WORN TYRES",
        text: "Certified part worn tyres that are fully inspected, tested, and road-legal. A smart, cost-effective solution for drivers who want safety and reliability without overspending.",
        points: [
          "Minimum 3mm tread depth — safe & road-legal",
          "Every tyre individually inspected & pressure tested",
          "Fully compliant with UK road tyre regulations",
          "Up to 60% cheaper than buying brand new tyres",
          "Wide range of sizes always available in stock",
        ],
      },
      {
        number: "03",
        category: "EXPERT FITTING",
        title: "FITTING & BALANCING",
        text: "Professional tyre fitting and computer wheel balancing carried out on-site by experienced technicians. We eliminate vibrations and ensure every tyre is fitted to the highest standard.",
        points: [
          "Computer wheel balancing for a smooth, safe ride",
          "Fast same-day fitting on new & part worn tyres",
          "New valve replacement included as standard",
          "Free tyre pressure & safety check on every visit",
          "Suitable for cars, vans, 4x4s & light commercials",
        ],
      },
    ],
    faqTitle: "BRAND NEW & PART WORN",
    faqIntro:
      "Everything you need to know about our brand new and part worn tyre service — answered clearly and honestly.",
    faqs: [
      {
        question: "WHAT IS THE DIFFERENCE BETWEEN BRAND NEW AND PART WORN TYRES?",
        answer:
          "Brand new tyres come directly from the manufacturer with full tread depth of 8mm or more, a manufacturer warranty, and maximum grip and performance from the moment they are fitted. Part worn tyres are previously used tyres that have been inspected, tested, and certified as road-legal. They offer a more affordable alternative while still meeting the minimum legal safety standards required for use on UK roads.",
      },
      {
        question: "ARE PART WORN TYRES SAFE AND LEGAL?",
        answer:
          "Yes, provided they meet the required safety standards. In the UK, part worn tyres must have a minimum tread depth of 2mm across the full width of the tread, no structural damage, no cuts or bulges in the sidewall, and must be marked with the letter E in a circle. Every part worn tyre we sell is individually inspected, pressure tested, and certified road-legal before it is offered for sale or fitting.",
      },
      {
        question: "HOW LONG WILL PART WORN TYRES LAST?",
        answer:
          "The lifespan of a part worn tyre depends on the remaining tread depth, your driving style, and road conditions. As a general guide, a part worn tyre with 3mm of tread remaining will last less mileage than a brand new tyre starting at 8mm. We will always advise you on the remaining tread depth so you can make an informed decision.",
      },
      {
        question: "WHAT IS THE MINIMUM LEGAL TREAD DEPTH IN THE UK?",
        answer:
          "The minimum legal tread depth for car tyres in the UK is 1.6mm across the central three-quarters of the tread around the full circumference of the tyre. Driving with tyres below this limit is illegal and can result in a fine of up to £2,500 and three penalty points per tyre. We recommend replacing tyres before they reach 3mm for optimum safety.",
      },
      {
        question: "DO YOU STOCK TYRES FOR ALL VEHICLE TYPES?",
        answer:
          "Yes. We stock a wide range of tyre sizes suitable for small city cars, family saloons, estates, vans, 4x4s, and SUVs. Both brand new and part worn tyres are available in a variety of sizes and brands. If you are unsure of the correct size for your vehicle, bring it in and we will check and advise you.",
      },
      {
        question: "HOW LONG DOES TYRE FITTING TAKE?",
        answer:
          "Most tyre fittings are completed while you wait. A single tyre is typically fitted and balanced within 20 to 30 minutes. If you are having all four tyres replaced, allow around one hour. We offer same-day fitting on both brand new and part worn tyres subject to availability.",
      },
      {
        question:
          "WHAT IS COMPUTER WHEEL BALANCING AND DO I NEED IT?",
        answer:
          "Wheel balancing ensures that the weight of the tyre and wheel is distributed evenly around the axle. An unbalanced wheel causes vibrations through the steering wheel, uneven tyre wear, and increased stress on suspension components. We include computer wheel balancing as standard with every tyre fitting to ensure a smooth, safe ride after every job.",
      },
    ],
    image: "/images/car-service-workers-with-new-tires-at-the-shop.jpg",
  },
  "breakpads-and-discs": {
    pageTitle: "Breakpads and discs",
    title: "BRAKE PADS & DISCS",
    subtitle: "RELIABLE BRAKING YOU CAN TRUST",
    intro:
      "Your brakes are the single most important safety system on your vehicle, and keeping them in peak condition is not something you should ever compromise on. At our service centre, we specialise in the supply and fitting of high-quality brake pads and discs for all makes and models of cars, vans, and 4x4s. Whether your vehicle needs a straightforward brake pad replacement or a complete disc and pad overhaul, our experienced technicians carry out every job with precision and care. We stock a full range of OEM-spec and performance-grade components from trusted manufacturers, so you always get the right part at the right price. Every brake job begins with a thorough inspection of your entire braking system — pads, discs, callipers, brake lines, and fluid — so nothing gets missed. We only replace what genuinely needs replacing and give you an honest assessment before any work begins. Our workshop is equipped with the latest tools to ensure correct torque settings, proper bedding-in procedures, and a full post-fit road test so you leave with complete confidence in your vehicle's stopping power.",
    benefits: [
      "OEM & performance parts — brake pads and discs for all makes and models",
      "Full system inspection — pads, discs, callipers and brake fluid checked",
      "Same-day fitting — fast, professional service with no unnecessary delays",
      "Honest pricing — transparent quotes with no hidden charges or upselling",
      "Post-fit road test — every brake job signed off with a full performance check",
    ],
    serviceTitle: "BRAKE PADS & DISCS",
    serviceIntro:
      "From precision brake pad replacements to full disc upgrades — we supply and fit braking components for all makes and models, keeping you safe and stopping when it matters most.",
    offers: [
      {
        number: "01",
        category: "OEM & AFTERMARKET",
        title: "BRAKE PADS",
        text: "High-performance brake pads sourced from trusted manufacturers. Whether you need standard OEM replacements or upgraded performance pads, we have the right fit for your vehicle and driving style.",
        points: [
          "OEM & performance pads for all makes and models",
          "Low-dust & low-noise formulas available",
          "Wear indicator check included on fitting",
          "Same-day supply & fitting available",
          "Front, rear & handbrake pad replacement",
        ],
      },
      {
        number: "02",
        category: "SOLID & VENTED",
        title: "BRAKE DISCS",
        text: "Precision-engineered brake discs for reliable, consistent stopping power. We stock solid and vented disc options from leading brands, suitable for everyday driving through to high-performance applications.",
        points: [
          "Solid & vented discs for all vehicle types",
          "Disc thickness & runout checked on every job",
          "Drilled & grooved performance discs available",
          "Front & rear axle disc replacement",
          "Corrosion-resistant coated discs in stock",
        ],
      },
      {
        number: "03",
        category: "COMPLETE SERVICE",
        title: "FULL BRAKE SERVICE",
        text: "A complete brake inspection and service carried out by experienced technicians. We assess your entire braking system — pads, discs, callipers, and fluid — and replace only what is needed.",
        points: [
          "Full brake system inspection — pads, discs & callipers",
          "Brake fluid condition & level check included",
          "Calliper slide pin service & lubrication",
          "Honest advice — only replace what is necessary",
          "Post-fit road test to confirm braking performance",
        ],
      },
    ],
    faqTitle: "BRAKE PADS & DISCS",
    faqIntro:
      "Everything you need to know about our brake pads and discs service — answered clearly and honestly.",
    faqs: [
      {
        question: "HOW DO I KNOW IF MY BRAKE PADS NEED REPLACING?",
        answer:
          "The most common signs that your brake pads need replacing include a squealing or grinding noise when braking, a longer stopping distance than usual, a vibration or pulsing feeling through the brake pedal, or a warning light on your dashboard. If you notice any of these symptoms, you should have your brakes inspected as soon as possible.",
      },
      {
        question: "HOW OFTEN SHOULD BRAKE PADS AND DISCS BE REPLACED?",
        answer:
          "Brake pads typically last between 30,000 and 70,000 miles depending on your driving style, vehicle type, and the quality of the pads fitted. Brake discs generally last longer but should be inspected at every service. We check the thickness and condition of both pads and discs on every visit and will only recommend replacement when it is genuinely necessary.",
      },
      {
        question:
          "DO I NEED TO REPLACE BRAKE DISCS AT THE SAME TIME AS BRAKE PADS?",
        answer:
          "Not always. In many cases brake pads can be replaced without changing the discs. However, if the discs are worn below the minimum thickness, heavily scored, corroded, or warped, they should be replaced at the same time. Fitting new pads onto worn discs reduces braking performance and can cause premature pad wear.",
      },
      {
        question: "WHAT IS THE DIFFERENCE BETWEEN SOLID AND VENTED BRAKE DISCS?",
        answer:
          "Solid discs are a single piece of metal and are typically found on the rear axle or smaller, lighter vehicles. Vented discs have internal channels that allow air to flow through, helping to dissipate heat more effectively. They are usually fitted to the front axle and on larger or performance vehicles. We stock both types and will always fit the correct specification for your vehicle.",
      },
      {
        question: "CAN YOU REPLACE JUST THE FRONT OR REAR BRAKES?",
        answer:
          "Yes. We can replace brake pads and discs on just the front axle, rear axle, or all four corners depending on what your vehicle requires. We will carry out a full inspection first and only recommend replacing what is actually needed.",
      },
    ],
    image: "/images/alloy-rim-on-white-background-1.png",
  },
  "full-service": {
    pageTitle: "Full service",
    title: "PROFESSIONAL FULL SERVICE",
    subtitle: "COMPLETE VEHICLE FULL SERVICE",
    intro:
      "A full vehicle service is one of the most important investments you can make in the long-term health, safety, and reliability of your car. At our service centre, we carry out comprehensive full services covering every major system of your vehicle, from the engine and transmission through to the brakes, suspension, steering, and electrics. Our experienced technicians follow a thorough multi-point inspection checklist, ensuring that nothing is overlooked and every component is assessed to the highest standard. We use quality parts and premium oils that meet or exceed manufacturer specifications, so your vehicle performs exactly as it should after every service. A full service with us includes an engine oil and filter change, air filter, fuel filter, spark plug inspection, brake fluid check, coolant level top-up, battery health test, tyre condition and pressure check, and a full visual inspection of all accessible components underneath the vehicle. We provide you with a clear, honest report of everything we find — flagging any safety concerns and advising on any work that may be needed in the near future — with no pressure and no unnecessary upselling. Whether your vehicle is due a service by mileage or by time, our team is ready to take care of it quickly, professionally, and at a competitive price you can rely on.",
    benefits: [
      "Multi-point inspection — engine, brakes, suspension, steering & electrics checked",
      "Quality parts & oils — meeting or exceeding manufacturer specifications",
      "Full written report — honest findings with no pressure or unnecessary upselling",
      "Same-day service — most full services completed within the day",
      "All makes & models — cars, vans, 4x4s & light commercials welcome",
    ],
    serviceTitle: "FULL VEHICLE SERVICE",
    serviceIntro:
      "From interim oil changes to complete full services — we keep your vehicle running safely, efficiently, and to manufacturer specification all year round.",
    offers: [
      {
        number: "01",
        category: "EVERY 6 MONTHS",
        title: "INTERIM SERVICE",
        text: "An interim service is recommended every 6 months or 6,000 miles, ideal for high-mileage drivers. It covers the essential checks and changes to keep your vehicle safe between full services.",
        points: [
          "Engine oil & oil filter change included",
          "Brake fluid, coolant & screen wash top-up",
          "Tyre condition, pressure & tread depth check",
          "Battery health & lights inspection",
          "30-point visual safety inspection report",
        ],
      },
      {
        number: "02",
        category: "FULL ANNUAL SERVICE",
        title: "FULL SERVICE",
        text: "A comprehensive annual full service covering every major system of your vehicle. Carried out by experienced technicians using quality parts that meet or exceed manufacturer specifications.",
        points: [
          "Engine oil, oil filter & air filter replacement",
          "Spark plug inspection & replacement if needed",
          "Full brake, suspension & steering inspection",
          "Brake fluid & coolant condition checked",
          "60-point inspection with full written report",
        ],
      },
      {
        number: "03",
        category: "QUICK & ESSENTIAL",
        title: "OIL CHANGE",
        text: "A regular engine oil and filter change is the single most important maintenance task for your vehicle's engine health. We use premium grade oils matched exactly to your vehicle's specification.",
        points: [
          "Premium engine oil matched to manufacturer spec",
          "New oil filter fitted on every oil change",
          "Suitable for petrol, diesel & hybrid vehicles",
          "Completed quickly — most done within the hour",
          "Free top-up fluid check included on every visit",
        ],
      },
    ],
    faqTitle: "FULL SERVICE",
    faqIntro:
      "Everything you need to know about our full vehicle service — answered clearly and honestly.",
    faqs: [
      {
        question: "WHAT IS INCLUDED IN A FULL SERVICE?",
        answer:
          "A full service includes an engine oil and filter change, air filter replacement, spark plug inspection, brake fluid and coolant level check, battery health test, full brake and suspension inspection, tyre condition and pressure check, lights check, and a comprehensive 60-point multi-system inspection. You will receive a full written report detailing everything we find.",
      },
      {
        question: "HOW OFTEN SHOULD I GET A FULL SERVICE?",
        answer:
          "A full service is recommended once a year or every 12,000 miles — whichever comes first. If you cover a high mileage, we also recommend an interim service every 6 months or 6,000 miles to keep your vehicle in peak condition between full services.",
      },
      {
        question: "HOW LONG DOES A FULL SERVICE TAKE?",
        answer:
          "Most full services are completed within the same day. The time required depends on the make and model of your vehicle and whether any additional work is identified during the inspection. We will always give you an estimated time when you drop your vehicle off.",
      },
      {
        question: "WILL A FULL SERVICE AFFECT MY MANUFACTURER WARRANTY?",
        answer:
          "No. Under EU block exemption regulations, you are entitled to have your vehicle serviced by any qualified independent garage without affecting your manufacturer warranty, provided the service is carried out using parts that meet manufacturer specification. We use quality parts and correct grade oils on every service.",
      },
      {
        question:
          "WHAT IS THE DIFFERENCE BETWEEN AN INTERIM AND A FULL SERVICE?",
        answer:
          "An interim service covers the essential checks — oil and filter change, fluid top-ups, tyre and brake inspection — and is typically a 30-point check. A full service is more comprehensive, covering all of the above plus air filter, spark plugs, suspension, steering, battery, and a full 60-point inspection.",
      },
    ],
    image: "/images/car-service-workers-with-new-tires-at-the-shop.jpg",
  },
  "punctures-repair": {
    pageTitle: "Punctures repair",
    title: "PROFESSIONAL PUNCTURE REPAIR",
    subtitle: "FAST & RELIABLE PUNCTURE REPAIR",
    intro:
      "A puncture can happen at any time and on any road, leaving you stranded and in need of a quick, reliable solution. At our service centre, we offer a professional puncture repair service for all types of vehicles, carried out by experienced technicians using industry-approved methods. When you bring your vehicle to us, we start with a thorough inspection of the tyre to assess the location and extent of the damage. Not all punctures can or should be repaired — if the damage is outside the repairable zone or has compromised the tyre's structure, we will always give you an honest assessment and recommend the safest course of action. Where a repair is safe and viable, we carry it out using a British Standard BS AU 159 compliant plug and patch method, which is the only permanently approved repair process. We also re-check your tyre pressure and inspect the remaining tyres as part of every visit, so you drive away with complete confidence. Whether it is a slow puncture, a nail in the tread, or a blowout, we are here to get you back on the road quickly, safely, and at a price that is fair.",
    benefits: [
      "BS AU 159 approved repairs — safe, permanent plug & patch method used",
      "Full tyre inspection — damage assessed before any repair is carried out",
      "Fast turnaround — most puncture repairs completed while you wait",
      "Honest advice — we only repair when it is genuinely safe to do so",
      "Free pressure check — all four tyres inspected & pressure",
    ],
    serviceTitle: "PUNCTURE REPAIR",
    serviceIntro:
      "From slow punctures to blowouts — we diagnose, repair, and get you back on the road quickly, safely, and at a price that is fair.",
    offers: [
      {
        number: "01",
        category: "BS AU 159 APPROVED",
        title: "PUNCTURE REPAIR",
        text: "Professional puncture repair using the only British Standard approved plug and patch method. Safe, permanent, and carried out by experienced technicians on all vehicle types.",
        points: [
          "BS AU 159 compliant plug & patch repair method",
          "Safe & permanent repair — not a temporary fix",
          "Suitable for cars, vans, 4x4s & light commercials",
          "Most repairs completed while you wait",
          "Tyre pressure corrected & re-checked after repair",
        ],
      },
      {
        number: "02",
        category: "FAST DIAGNOSIS",
        title: "SLOW PUNCTURE",
        text: "Slow punctures are often caused by a nail, screw, or damaged valve and can go unnoticed until it is too late. We carry out a full diagnosis, locate the source, and advise on the safest solution.",
        points: [
          "Full tyre inspection to locate source of air loss",
          "Valve stem check & replacement if required",
          "Bead seal & rim inspection included",
          "Honest advice — repair or replace recommendation",
          "All four tyre pressures checked & adjusted free",
        ],
      },
      {
        number: "03",
        category: "SAFETY CHECK",
        title: "TYRE INSPECTION",
        text: "A full tyre safety inspection assessing tread depth, sidewall condition, pressure, and overall tyre health. We identify issues early before they lead to a puncture, blowout, or MOT failure.",
        points: [
          "Tread depth check across all four tyres",
          "Sidewall & tread damage visual inspection",
          "Tyre pressure check & inflation to correct levels",
          "Early identification of wear & potential failure",
          "Free inspection carried out on every tyre visit",
        ],
      },
    ],
    faqTitle: "PUNCTURE REPAIR",
    faqIntro:
      "Everything you need to know about our puncture repair service — answered clearly and honestly.",
    faqs: [
      {
        question: "CAN ALL PUNCTURES BE REPAIRED?",
        answer:
          "Not all punctures can be safely repaired. A puncture is repairable only if the damage is within the central three-quarters of the tread area and the hole is no larger than 6mm in diameter. Damage to the sidewall, shoulder, or outer edge of the tyre cannot be repaired safely and the tyre will need to be replaced. We will always inspect the tyre thoroughly and give you an honest assessment before any work begins.",
      },
      {
        question: "HOW LONG DOES A PUNCTURE REPAIR TAKE?",
        answer:
          "Most puncture repairs are completed while you wait and typically take between 20 to 40 minutes. This includes removing the tyre, locating the damage, carrying out the repair using the approved plug and patch method, refitting the tyre, and re-checking the pressure.",
      },
      {
        question: "IS A PLUG AND PATCH REPAIR PERMANENT?",
        answer:
          "Yes. A proper plug and patch repair carried out to British Standard BS AU 159 is a permanent repair. We do not use temporary plug-only repairs, as these are not considered a safe long-term solution. Our repairs are done correctly the first time so you can drive with complete confidence.",
      },
      {
        question: "WHAT CAUSES A SLOW PUNCTURE?",
        answer:
          "A slow puncture is usually caused by a small nail, screw, or piece of debris embedded in the tread, a damaged or faulty valve stem, or a poor seal between the tyre and the wheel rim. Slow punctures can be difficult to notice until the tyre is significantly underinflated, which is why we recommend checking your tyre pressures regularly.",
      },
      {
        question: "CAN I DRIVE ON A FLAT OR PUNCTURED TYRE?",
        answer:
          "No. Driving on a flat or significantly underinflated tyre can cause serious damage to the tyre sidewall, the wheel rim, and your vehicle’s suspension. It also greatly reduces your ability to steer and brake safely. If you have a puncture, you should stop as soon as it is safe to do so and seek assistance.",
      },
    ],
    image: "/images/man-in-uniform-changing-tire-of-automobile-conception-of-car-service.jpg",
  },
};

const generalFaqs = [
  {
    question: "WHAT SERVICES DO YOU OFFER?",
    answer:
      "We provide a range of services including brand new and part worn tyres, brake pads and discs replacement, puncture repairs, and full vehicle servicing.",
  },
  {
    question: "DO YOU SUPPLY BOTH NEW AND PART WORN TYRES?",
    answer:
      "Yes, we offer both brand new tyres and high-quality part worn tyres to suit different budgets and needs.",
  },
  {
    question: "ARE PART WORN TYRES SAFE?",
    answer:
      "Absolutely. All our part worn tyres are carefully inspected and tested to ensure they meet safety standards before being fitted.",
  },
  {
    question: "HOW DO I KNOW WHEN MY BRAKE PADS OR DISCS NEED REPLACING?",
    answer:
      "Common signs include squeaking or grinding noises, reduced braking performance, or vibrations when braking. If you notice any of these, it’s best to get them checked.",
  },
  {
    question: "CAN YOU REPAIR PUNCTURED TYRES?",
    answer:
      "Yes, we offer professional puncture repair services, depending on the location and severity of the damage.",
  },
  {
    question: "WHAT IS INCLUDED IN A FULL SERVICE?",
    answer:
      "A full service typically includes checking and replacing essential components such as oil, filters, brakes, tyres, and a general inspection to ensure your vehicle is running smoothly.",
  },
];

const contactDescription =
  "Have questions or need more details? We’re here to help. Reach out to us and get clear, accurate information tailored to your needs.";

const pageBannerImages = {
  "about-us": "/images/choosing-right-car-tires-1536x1024-1.jpg",
  services: "/images/man-is-doing-balancing-for-tyres-1.jpg",
  "brand-new-and-part-worn-tyres":
    "/images/man-is-doing-balancing-for-tyres-1.jpg",
  "breakpads-and-discs": "/images/sport-rim-and-red-brake-caliper-of-car.jpg",
  "full-service":
    "/images/one-last-wheel-mechanic-holding-a-tire-at-the-repair-garage-replacement-of-winter-and-summer-tires.jpg",
  "punctures-repair": "/images/man-is-doing-balancing-for-tyres-1.jpg",
  faq: "/images/mechanic-unscrewing-car-wheel-with-impact-wrench.jpg",
  blog: "/images/sport-rim-and-red-brake-caliper-of-car.jpg",
  "contact-us": "/images/parts-of-broken-red-car-in-workshop.jpg",
};

function PageBanner({ title, pageKey }) {
  return (
    <section
      className="reference-page-banner"
      data-page={pageKey}
      style={{
        "--reference-page-banner-image": `url("${pageBannerImages[pageKey]}")`,
      }}
    >
      <div className="reference-page-banner-inner">
        <h1>{title}</h1>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">›</span>
          <span>{title}</span>
        </nav>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const cards = [
    {
      title: "AFFORDABLE PRICE",
      text: "Premium tyres and complete car care at competitive, budget-friendly prices.",
      image:
        "/images/garage-business-service-client-customer-person-make-a-payment-with-credit-card-or-money-to-buy.jpg",
      alt: "customer pay credit card",
    },
    {
      title: "GOOD SERVICE",
      text: "We take pride in delivering honest, dependable service to keep you safe on the road.",
      image:
        "/images/man-in-uniform-changing-tire-of-automobile-conception-of-car-service.jpg",
      alt: "Roadside Tyre change",
    },
    {
      title: "HIGH QUALITY",
      text: "Top-quality tyres and services you can rely on. Built for safety and durability.",
      image: "/images/off-road-tire-closeup.jpg",
      alt: "Off road tyre",
    },
  ];

  return (
    <section className="reference-why">
      <div className="reference-section-heading">
        <p className="reference-section-eyebrow">WELCOME TO ROAD SMART TYRE</p>
        <h2>ALL YOU NEED IN ONE PLACE</h2>
        <p>
          All your tyre and car care needs in one place. We provide quality
          tyres, quick puncture repairs, full servicing, and expert brake pad
          and disc replacement for a smooth, safe drive.
        </p>
      </div>
      <div className="reference-why-grid">
        {cards.map((card) => (
          <article key={card.title} className="reference-why-card">
            <img src={card.image} alt={card.alt} />
            <div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutStory() {
  return (
    <section className="reference-about-story">
      <div className="reference-about-image">
        <img
          src="/images/winter-tires-with-spikes-for-a-car-close-up.jpg"
          alt="Spikes winter tire"
        />
        <img
          src="/images/car-service-workers-with-new-tires-at-the-shop.jpg"
          alt="car-service-workers-with-new-tires-at-the-shop.jpg"
        />
      </div>
      <div>
        <h2>THE BEST TYRE SOLUTION FOR YOUR LOVELY CAR</h2>
        <p>
          At Road Smart Tyre, we provide reliable and affordable tyre and car
          care solutions all in one place. From brand new and part-worn tyres
          to puncture repairs, full servicing, and brake pads &amp; discs, our
          goal is to keep your vehicle safe, smooth, and road-ready.
        </p>
        <p>
          With a focus on quality, honest service, and customer satisfaction,
          we make sure all job is done with care and precision. Whether it’s a
          quick repair or a full check-up, you can trust us to keep you moving
          with confidence.
        </p>
        <a className="reference-button" href="/about-us">
          More About Us
        </a>
      </div>
    </section>
  );
}

function VisionMission() {
  const values = [
    {
      title: "OUR VISION",
      text: "To provide reliable, high-quality tyre and car care services that prioritize safety, performance, and customer satisfaction — all at affordable prices.",
    },
    {
      title: "OUR MISSION",
      text: "To become the most trusted and convenient one-stop solution for vehicle care, where every customer drives away confident, safe, and happy.",
    },
    {
      title: "OUR AWARDS",
      text: "Recognized for excellence in tyre service and customer care, we proudly uphold industry standards and consistently deliver top-quality solutions for every vehicle.",
    },
  ];

  return (
    <section className="reference-values">
      {values.map((value) => (
        <article key={value.title}>
          <h2>{value.title}</h2>
          <p>{value.text}</p>
        </article>
      ))}
    </section>
  );
}

function CarNeedsSection() {
  const points = [
    "Trusted experts ready to assist you",
    "Solutions for both small and large vehicles",
    "Friendly guidance from our experienced staff",
    "Valued customer feedback drives our service",
  ];

  return (
    <section className="reference-car-needs">
      <a
        className="reference-car-needs-image"
        href="/images/workers-changing-wheels-at-the-car-service-1.jpg"
      >
        <img
          src="/images/workers-changing-wheels-at-the-car-service-1.jpg"
          alt="workers changing wheels"
        />
      </a>
      <div>
        <h2>
          GET ALL YOUR CAR NEEDS
          <br />
          IN OUR STORE
        </h2>
        <p>
          We provide comprehensive tyre and vehicle care services to keep your
          car safe and performing at its best. Whether you need new tyres,
          repairs, or expert advice, we’re here to help with quality you can
          trust.
        </p>
        <ul>
          {points.map((point) => (
            <li key={point}>
              <span aria-hidden="true">›</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" pageKey="about-us" />
      <main className="reference-main reference-about-page">
        <WhyChooseSection />
        <AboutStory />
        <VisionMission />
        <CarNeedsSection />
      </main>
    </>
  );
}

function OurServices() {
  const cards = [
    {
      slug: "brand-new-and-part-worn-tyres",
      title: "Brand new and part worn tyres",
      description:
        "We offer a wide range of high-quality new and part-worn tyres to suit every vehicle and budget, ensuring safety, grip, and long-lasting performance.",
      image: "/images/car-service-workers-changing-wheels.jpg",
    },
    {
      slug: "punctures-repair",
      title: "Punctures repair",
      description:
        "Quick and reliable puncture repair services to get you back on the road safely, minimizing downtime and hassle.",
      image: "/images/car-service-worker-changing-wheel.jpg",
    },
    {
      slug: "full-service",
      title: "Full service",
      description:
        "Comprehensive vehicle servicing including engine checks, oil changes, and overall maintenance to keep your car running smoothly and efficiently.",
      image: "/images/auto-mechanics-making-wheel-alignment-at-the-car.jpg",
    },
    {
      slug: "breakpads-and-discs",
      title: "Brakepads and discs",
      description:
        "Expert brake maintenance and replacement to ensure your vehicle stops safely every time, with high-quality parts and precise installation.",
      image: "/images/warehouse-with-car-tires-and-worker.jpg",
    },
  ];

  return (
    <section className="reference-our-services">
      <h2>OUR BEST SERVICES</h2>
      <div className="reference-service-cards">
        {cards.map((card, index) => (
          <article
            key={card.slug}
            className="reference-service-card"
            style={{ backgroundImage: `url("${card.image}")` }}
          >
            <span>0{index + 1}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <a href={`/${card.slug}`} aria-label={`Read more about ${card.title}`}>
              Read More
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClientReviews({ reviews: cmsReviews }) {
  return (
    <section className="reference-client-reviews">
      <p className="reference-section-eyebrow">Testimonial</p>
      <h2>OUR CLIENT REVIEWS</h2>
      <p className="reference-review-intro">
        We’re proud to share what our customers say about us. Quality service,
        trust, and satisfaction drive everything we do.
      </p>
      <div className="reference-review-grid">
        {(cmsReviews ?? fallbackReviews).map((review) => (
          <article className="reference-review-card" key={review.id ?? review.slug ?? review.name}>
            <p>{review.text ?? review.description}</p>
            <div className="reference-review-author">
              {review.image ? <img src={review.image} alt="" /> : null}
              <div>
                <h3>{review.name}</h3>
                <span>{review.role || review.category || "Customer"}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TyreServicesOverview() {
  return (
    <section className="reference-tyre-overview">
      <div className="reference-tyre-intro">
        <p>
          At Road Smart Tyre, we specialize in offering premium new and
          part-worn tyres, fast puncture repairs, full vehicle servicing, and
          expert brake maintenance. Quality, safety, and customer satisfaction
          are our priorities.
        </p>
        <ul>
          <li>Quality tyres from trusted brands</li>
          <li>Expert puncture repairs on the spot</li>
          <li>Comprehensive full-service checks</li>
          <li>Brake pads &amp; discs replacement done right</li>
        </ul>
        <a className="reference-button" href="/contact-us">
          Contact Us
        </a>
      </div>
      <article>
        <h2>CAR TYRES FOR EVERY NEED</h2>
        <img
          src="/images/car-wheel-on-alloy-disc-with-tyre-isolated-1.png"
          alt="Car wheel"
        />
        <h3>CAR TYRES</h3>
        <p>
          Choose from a wide selection of tyres tailored to your vehicle and
          budget. Whether you want brand new or part-worn, we have reliable
          options that deliver performance and safety.
        </p>
      </article>
      <article>
        <h2>TYRE AND DISK SERVICES</h2>
        <img
          src="/images/alloy-rim-on-white-background-1.png"
          alt="alloy rim white background"
        />
        <h3>TYRE DISK</h3>
        <p>
          We provide professional tyre fitting and wheel balancing, plus brake
          pads and discs replacement for your vehicle’s safety and smooth
          driving experience.
        </p>
      </article>
    </section>
  );
}

function DiscountSection() {
  return (
    <section className="reference-discount">
      <h2>GET 30% DISCOUNT</h2>
      <p>
        Reach out to us directly through our website and claim your{" "}
        <strong>30% discount</strong> on tyres and car services. Quick, easy,
        and hassle-free.
      </p>
      <a className="reference-button" href="/contact-us">
        Contact Us
      </a>
    </section>
  );
}

function ServicesPage({ reviews }) {
  return (
    <>
      <PageBanner title="Services" pageKey="services" />
      <main className="reference-main reference-services-page">
        <OurServices />
        <ClientReviews reviews={reviews} />
        <TyreServicesOverview />
        <CarNeedsSection />
        <DiscountSection />
      </main>
    </>
  );
}

function ServiceHighlights({ service }) {
  return (
    <section className="reference-benefits">
      {service.benefits.map((benefit) => (
        <div key={benefit}>
          <FaCheck aria-hidden="true" />
          <p>{benefit}</p>
        </div>
      ))}
    </section>
  );
}

function ServicePackages({ service }) {
  return (
    <section className="reference-packages">
      <header className="reference-section-heading">
        <h2>{service.serviceTitle}</h2>
        <p>{service.serviceIntro}</p>
      </header>
      <div className="reference-package-grid">
        {service.offers.map((offer) => (
          <article className="reference-package" key={offer.number}>
            <span className="reference-package-number">{offer.number}</span>
            <p className="reference-package-category">{offer.category}</p>
            <h3>{offer.title}</h3>
            <p>{offer.text}</p>
            <ul>
              {offer.points.map((point) => (
                <li key={point}>
                  <FaCheck aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceFaq({ title, intro, faqs }) {
  return (
    <section className="reference-faq">
      <header className="reference-section-heading">
        <h2>{title}</h2>
        <p>{intro}</p>
      </header>
      <div className="reference-faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactInformation() {
  return (
    <section className="reference-contact-information">
      <h2>CONTACT US TO GET BETTER INFORMATION</h2>
      <p>{contactDescription}</p>
      <div className="reference-contact-cards">
        <article>
          <FiPhone aria-hidden="true" />
          <h3>Phone</h3>
          <a href="https://wa.me/447405419723">+44 7405 419723</a>
        </article>
        <article>
          <FiMail aria-hidden="true" />
          <h3>Drop Us a Line</h3>
          <a href="mailto:Roadsmarttyreltd@gmail.com">
            Roadsmarttyreltd@gmail.com
          </a>
        </article>
      </div>
      <h3>Official Social Media :</h3>
      <div className="reference-contact-socials">
        <a href="https://www.facebook.com/share/1DFHUZEgE7/">
          <FaFacebookF /> Facebook-f
        </a>
        <a href="https://www.tiktok.com/@roadsmarttyre1?_r=1&_t=ZN-94SazLwoUze">
          <FaTiktok /> Tiktok
        </a>
        <a href="https://www.instagram.com/roadsmarttyres/">
          <FaInstagram /> Instagram
        </a>
        <a href="https://wa.me/447405419723">
          <FaWhatsapp /> Whatsapp
        </a>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="reference-contact-section">
      <ContactInformation />
      <ContactForm />
    </section>
  );
}

function ServiceDetailPage({ service, pageKey }) {
  return (
    <>
      <PageBanner title={service.pageTitle} pageKey={pageKey} />
      <main className="reference-main reference-service-detail">
        <section className="reference-service-intro">
          <div>
            <p className="reference-kicker">{service.title}</p>
            <h2>{service.subtitle}</h2>
            <p>{service.intro}</p>
          </div>
          <img src={service.image} alt={service.pageTitle} />
        </section>
        <ServiceHighlights service={service} />
        <ServicePackages service={service} />
        <ServiceFaq
          title={service.faqTitle}
          intro={service.faqIntro}
          faqs={service.faqs}
        />
        <ContactSection />
      </main>
    </>
  );
}

function FaqPage() {
  return (
    <>
      <PageBanner title="FAQ" pageKey="faq" />
      <main className="reference-main reference-faq-page">
        <div className="reference-faq-layout">
          <div>
            <header className="reference-section-heading">
              <h2>GENERAL CLIENT QUESTION</h2>
              <p>
                Find answers to common questions about our tyre services, brake
                repairs, puncture fixes, and full vehicle servicing to help
                keep your car safe and running smoothly.
              </p>
            </header>
            <div className="reference-faq-list">
              {generalFaqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <img
            className="reference-faq-image"
            src="/images/car-mechanic-working-at-automotive-service-center.jpg"
            alt="Mechanic working at an automotive service centre"
          />
        </div>
      </main>
    </>
  );
}

function BlogPage({ posts }) {
  return (
    <>
      <PageBanner title="Blog" pageKey="blog" />
      <main className="reference-main reference-blog-page">
        <header className="reference-section-heading">
          <p className="reference-section-eyebrow">Road Smart Tyre Advice</p>
          <h2>Latest Articles</h2>
          <p>
            Practical tyre advice to help you choose, care for, and get the
            most from your tyres.
          </p>
        </header>
        <div className="reference-blog-grid">
          {posts.map((post) => (
            <article className="reference-blog-card" key={post.slug}>
              <a
                className="reference-blog-card-image"
                href={`/blog/${post.slug}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <img src={post.image} alt="" />
              </a>
              <div className="reference-blog-card-content">
                <p className="reference-blog-meta">
                  {post.category} <span aria-hidden="true">·</span> {post.date}
                </p>
                <h3>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p>{post.excerpt}</p>
                <a className="reference-blog-read-more" href={`/blog/${post.slug}`}>
                  Read Article <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

function BlogArticlePage({ post }) {
  return (
    <>
      <PageBanner title="Blog" pageKey="blog" />
      <main className="reference-main reference-blog-article-page">
        <a className="reference-blog-back-link" href="/blog">
          <span aria-hidden="true">←</span> All articles
        </a>
        <article>
          <header className="reference-blog-article-header">
            <p className="reference-blog-meta">
              {post.category} <span aria-hidden="true">·</span> {post.date || post.readTime}
            </p>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </header>
          <img
            className="reference-blog-article-image"
            src={post.image}
            alt=""
          />
          <div className="reference-blog-article-content">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
          <a className="reference-button" href="/contact-us">
            Contact Our Team
          </a>
        </article>
      </main>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" pageKey="contact-us" />
      <main className="reference-main reference-contact-page">
        <ContactSection />
        <iframe
          className="reference-map"
          title="Road Smart Tyre location"
          src="https://www.google.com/maps?q=Ilford%20UK&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </main>
    </>
  );
}

export default function ReferencePage({ slug, content }) {
  let activePage = slug;
  let page;
  const posts = content?.blogs ?? blogPosts;
  const reviews = content?.reviews;

  if (slug === "about-us") {
    page = <AboutPage />;
  } else if (slug === "services") {
    page = <ServicesPage reviews={reviews} />;
  } else if (slug === "faq") {
    page = <FaqPage />;
    activePage = "faq";
  } else if (slug === "blog" || slug === "blog-2") {
    page = <BlogPage posts={posts} />;
    activePage = "blog";
  } else if (slug.startsWith("blog-post:")) {
    const post = posts.find(
      (blogPost) => blogPost.slug === slug.slice("blog-post:".length),
    );
    if (post) {
      page = <BlogArticlePage post={post} />;
      activePage = "blog";
    }
  } else if (slug === "contact-us") {
    page = <ContactPage />;
  } else if (serviceData[slug]) {
    page = <ServiceDetailPage service={serviceData[slug]} pageKey={slug} />;
    activePage = slug;
  }

  if (!page) return null;

  return (
    <div className="reference-site">
      <Header activePage={activePage} />
      {page}
      <Footer />
      <a
        className="reference-floating-whatsapp"
        href="https://wa.me/447405419723"
        aria-label="Chat with Road Smart Tyre on WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </div>
  );
}
